import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchWorldCupEvents,
  fetchAllLiveEvents,
  type SportEvent,
} from '../services/sportsdb';
import { PARTICIPANTS, buildTeamOwnerMap, type Participant } from '../data/participants';

// ============================================================
// Scoring logic
// ============================================================

export interface ParticipantScore {
  participant: Participant;
  goals: number;
  wins: number;
  draws: number;
  points: number;
  rank: number;
  liveGoals: number; // goals from currently live matches (informational)
}

function normalizeTeamName(name: string): string {
  return name.toLowerCase().trim();
}

function teamMatches(apiName: string, targetName: string): boolean {
  return normalizeTeamName(apiName) === normalizeTeamName(targetName);
}

export function computeScores(events: SportEvent[]): ParticipantScore[] {
  const ownerMap = buildTeamOwnerMap();

  // Initialize scores
  const scores = new Map<number, ParticipantScore>();
  for (const p of PARTICIPANTS) {
    scores.set(p.id, { participant: p, goals: 0, wins: 0, draws: 0, points: 0, rank: 0, liveGoals: 0 });
  }

  for (const ev of events) {
    // Count goals from FINISHED and LIVE matches (real-time)
    const countGoals = ev.status === 'finished' || ev.status === 'live';
    // Count wins ONLY from definitively FINISHED matches
    const countWins = ev.status === 'finished';

    if (!countGoals) continue;

    const homeGoals = parseInt(ev.intHomeScore ?? '0', 10) || 0;
    const awayGoals = parseInt(ev.intAwayScore ?? '0', 10) || 0;

    const homeOwners = findOwners(ev.strHomeTeam, ownerMap);
    const awayOwners = findOwners(ev.strAwayTeam, ownerMap);

    // Accumulate goals
    for (const ownerId of homeOwners) {
      const s = scores.get(ownerId);
      if (s) {
        s.goals += homeGoals;
        if (ev.status === 'live') s.liveGoals += homeGoals;
      }
    }
    for (const ownerId of awayOwners) {
      const s = scores.get(ownerId);
      if (s) {
        s.goals += awayGoals;
        if (ev.status === 'live') s.liveGoals += awayGoals;
      }
    }

    // Accumulate wins and draws (only confirmed / finished)
    if (countWins) {
      if (homeGoals > awayGoals) {
        for (const ownerId of homeOwners) {
          const s = scores.get(ownerId);
          if (s) s.wins += 1;
        }
      } else if (awayGoals > homeGoals) {
        for (const ownerId of awayOwners) {
          const s = scores.get(ownerId);
          if (s) s.wins += 1;
        }
      } else {
        // Draw
        for (const ownerId of homeOwners) {
          const s = scores.get(ownerId);
          if (s) s.draws += 1;
        }
        for (const ownerId of awayOwners) {
          const s = scores.get(ownerId);
          if (s) s.draws += 1;
        }
      }
    }
  }

  // Compute points
  const arr = Array.from(scores.values()).map(s => ({
    ...s,
    points: s.goals * 2 + s.wins * 3 + s.draws * 1,
  }));

  // Sort by points, then wins, then goals
  arr.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.goals - a.goals;
  });

  // Assign ranks
  arr.forEach((s, i) => { s.rank = i + 1; });

  return arr;
}

function findOwners(teamName: string, ownerMap: Map<string, Participant[]>): number[] {
  const ids = new Set<number>();
  for (const [key, owners] of ownerMap.entries()) {
    if (teamMatches(teamName, key)) {
      owners.forEach(o => ids.add(o.id));
    }
  }
  return Array.from(ids);
}

// ============================================================
// Detect live→finished transitions
// ============================================================

/**
 * Returns true if any event transitioned from 'live' to 'finished'
 * between two snapshots. When this happens we need to bypass cache
 * to get the confirmed final score from the API.
 */
function hasLiveToFinishedTransition(
  prevEvents: SportEvent[],
  nextEvents: SportEvent[],
): boolean {
  const prevMap = new Map(prevEvents.map(e => [e.idEvent, e.status]));
  for (const ev of nextEvents) {
    const prev = prevMap.get(ev.idEvent);
    if (prev === 'live' && ev.status === 'finished') {
      return true;
    }
  }
  return false;
}

// ============================================================
// Exported hook
// ============================================================

export interface WorldCupData {
  events: SportEvent[];
  scores: ParticipantScore[];
  lastUpdated: number | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

const REFRESH_INTERVAL = 60_000;         // 60s — no live matches
const LIVE_REFRESH_INTERVAL = 30_000;    // 30s — live matches in progress
const POST_FINISH_DELAY = 5_000;         // 5s extra wait after a match finishes
                                          // (API needs time to settle final score)

export function useWorldCupData(): WorldCupData {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [scores, setScores] = useState<ParticipantScore[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const prevEventsRef = useRef<SportEvent[]>([]);

  const load = useCallback(async (force = false) => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all season events
      const result = await fetchWorldCupEvents(force);
      if (!isMountedRef.current) return;

      let allEvents = result.data || [];

      // Merge in live event scores (fresh, bypasses cache if needed)
      const liveResult = await fetchAllLiveEvents();
      if (liveResult.data && liveResult.data.length > 0) {
        const liveMap = new Map(liveResult.data.map(e => [e.idEvent, e]));
        allEvents = allEvents.map(e => liveMap.get(e.idEvent) ?? e);
        for (const le of liveResult.data) {
          if (!allEvents.find(e => e.idEvent === le.idEvent)) {
            allEvents.push(le);
          }
        }
      }

      if (!isMountedRef.current) return;

      // ── Transition detection ─────────────────────────────────
      // If any match just changed live → finished, schedule a quick
      // follow-up refresh (after 5s) to pull final confirmed scores,
      // then recompute ranking.
      const justFinished = hasLiveToFinishedTransition(prevEventsRef.current, allEvents);

      // Update state
      prevEventsRef.current = allEvents;
      setEvents(allEvents);
      setScores(computeScores(allEvents));

      const ts = result.updatedAt ?? (result.fromCache ? null : Date.now());
      if (ts) setLastUpdated(ts);
      else if (!result.fromCache) setLastUpdated(Date.now());

      if (result.error) setError(result.error);

      // ── Immediate follow-up for just-finished matches ────────
      if (justFinished) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => load(true), POST_FINISH_DELAY);
        return; // skip the normal scheduleNext below (will be set after follow-up)
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  }, []);

  const scheduleNext = useCallback((currentEvents: SportEvent[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const hasLive = currentEvents.some(e => e.status === 'live');
    const interval = hasLive ? LIVE_REFRESH_INTERVAL : REFRESH_INTERVAL;
    timerRef.current = setTimeout(() => load(true), interval);
  }, [load]);

  // Load on mount
  useEffect(() => {
    isMountedRef.current = true;
    load(false);
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [load]);

  // Schedule next refresh whenever events settle
  useEffect(() => {
    if (!isLoading) {
      scheduleNext(events);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [events, isLoading, scheduleNext]);

  const refresh = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    load(true);
  }, [load]);

  return { events, scores, lastUpdated, isLoading, error, refresh };
}
