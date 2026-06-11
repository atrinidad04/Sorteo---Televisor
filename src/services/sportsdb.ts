// ============================================================
// TheSportsDB API Service
// ============================================================
// API Key: 123 (free/public)
// Rate limit: max 30 requests/min → 1 req per 2s minimum
// ============================================================

const API_KEY = '123';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// FIFA World Cup 2026 league ID on TheSportsDB
const WORLD_CUP_LEAGUE_ID = '4429';
const WORLD_CUP_SEASON = '2026';

// Local storage cache TTL values (ms)
const CACHE_TTL_EVENTS = 60_000;    // 60s for all events
const CACHE_TTL_LIVE = 30_000;      // 30s for live score refresh

// Rate limiter: min 2 seconds between requests
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2100; // ms — slightly above 2s to be safe

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_REQUEST_INTERVAL) {
    await new Promise(r => setTimeout(r, MIN_REQUEST_INTERVAL - elapsed));
  }
  lastRequestTime = Date.now();
  return fetch(url);
}

// Cache helpers
function cacheGet<T>(key: string, ttl: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > ttl) return null;
    return data as T;
  } catch {
    return null;
  }
}

function cacheSet(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // storage full — ignore
  }
}

// ============================================================
// Types
// ============================================================

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface SportEvent {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  dateEvent: string;          // "YYYY-MM-DD"
  strTime: string;            // "HH:MM:SS" UTC
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string;          // NS, 1H, HT, 2H, ET, P, FT, AET, PEN, etc.
  strProgress?: string;       // minute or extra info
  intRound?: string;
  strRound?: string;
  status: MatchStatus;        // computed
}

// ============================================================
// Status computation
// ============================================================

const LIVE_STATUSES = new Set(['1H', 'HT', '2H', 'ET', 'P', 'BT', 'LIVE', 'PAUSE']);
const FINISHED_STATUSES = new Set(['FT', 'AET', 'PEN', 'AWD', 'WO', 'AP']);

export function computeStatus(raw: string | null | undefined): MatchStatus {
  if (!raw) return 'scheduled';
  const s = raw.toUpperCase().trim();
  if (LIVE_STATUSES.has(s)) return 'live';
  if (FINISHED_STATUSES.has(s)) return 'finished';
  return 'scheduled';
}

// ============================================================
// API fetchers
// ============================================================

export interface FetchResult<T> {
  data: T | null;
  error: string | null;
  fromCache: boolean;
  updatedAt: number | null;
}

/**
 * Fetch all events for the World Cup 2026 season
 */
export async function fetchWorldCupEvents(forceRefresh = false): Promise<FetchResult<SportEvent[]>> {
  const cacheKey = `wc2026_events`;
  
  if (!forceRefresh) {
    const cached = cacheGet<SportEvent[]>(cacheKey, CACHE_TTL_EVENTS);
    if (cached) {
      try {
        const raw = localStorage.getItem(cacheKey);
        const ts = raw ? JSON.parse(raw).ts : null;
        return { data: cached, error: null, fromCache: true, updatedAt: ts };
      } catch {
        return { data: cached, error: null, fromCache: true, updatedAt: null };
      }
    }
  }

  try {
    let allEvents: SportEvent[] = [];
    let round = 1;
    let hasMoreRounds = true;

    while (hasMoreRounds) {
      const url = `${BASE_URL}/eventsround.php?id=${WORLD_CUP_LEAGUE_ID}&r=${round}&s=${WORLD_CUP_SEASON}`;
      const res = await rateLimitedFetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const json = await res.json();
      const roundEvents = json.events;
      
      if (!roundEvents || roundEvents.length === 0) {
        hasMoreRounds = false;
      } else {
        const parsedEvents: SportEvent[] = roundEvents.map((e: Record<string, string>) => ({
          ...e,
          status: computeStatus(e.strStatus),
        }));
        allEvents = allEvents.concat(parsedEvents);
        round++;
      }
    }
    
    if (allEvents.length === 0) {
      throw new Error('No se encontraron partidos para la temporada.');
    }
    
    cacheSet(cacheKey, allEvents);
    const ts = Date.now();
    return { data: allEvents, error: null, fromCache: false, updatedAt: ts };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    // Try to return stale cache on error
    const stale = cacheGet<SportEvent[]>(cacheKey, Infinity);
    if (stale) {
      return { data: stale, error: `API error: ${msg} (showing cached data)`, fromCache: true, updatedAt: null };
    }
    return { data: null, error: `API error: ${msg}`, fromCache: false, updatedAt: null };
  }
}

/**
 * Fetch live scores for a specific event (for real-time updates)
 */
export async function fetchLiveEvent(eventId: string): Promise<SportEvent | null> {
  const cacheKey = `event_live_${eventId}`;
  const cached = cacheGet<SportEvent>(cacheKey, CACHE_TTL_LIVE);
  if (cached) return cached;

  try {
    const url = `${BASE_URL}/lookupevent.php?id=${eventId}`;
    const res = await rateLimitedFetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const ev = json.events?.[0];
    if (!ev) return null;
    const event: SportEvent = {
      ...ev,
      status: computeStatus(ev.strStatus),
    };
    cacheSet(cacheKey, event);
    return event;
  } catch {
    return null;
  }
}

/**
 * Fetch live scores for all currently live events
 */
export async function fetchAllLiveEvents(): Promise<FetchResult<SportEvent[]>> {
  const cacheKey = `wc2026_live`;
  const cached = cacheGet<SportEvent[]>(cacheKey, CACHE_TTL_LIVE);
  if (cached) {
    try {
      const raw = localStorage.getItem(cacheKey);
      const ts = raw ? JSON.parse(raw).ts : null;
      return { data: cached, error: null, fromCache: true, updatedAt: ts };
    } catch {
      return { data: cached, error: null, fromCache: true, updatedAt: null };
    }
  }

  try {
    const url = `${BASE_URL}/eventslive.php?l=${WORLD_CUP_LEAGUE_ID}`;
    const res = await rateLimitedFetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const events: SportEvent[] = (json.events || []).map((e: Record<string, string>) => ({
      ...e,
      status: computeStatus(e.strStatus),
    }));
    cacheSet(cacheKey, events);
    return { data: events, error: null, fromCache: false, updatedAt: Date.now() };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { data: null, error: msg, fromCache: false, updatedAt: null };
  }
}
