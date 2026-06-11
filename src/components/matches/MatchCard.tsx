import React, { useMemo } from 'react';
import type { SportEvent } from '../../services/sportsdb';
import { PARTICIPANTS, buildTeamOwnerMap } from '../../data/participants';
import { Flag } from '../shared/Flag';

interface MatchCardProps {
  event: SportEvent;
}

// Team name → flag/code lookup using our participants list
function getTeamMeta(apiName: string): { flag: string; countryCode: string } | null {
  const name = apiName.toLowerCase();
  for (const p of PARTICIPANTS) {
    for (const t of p.teams) {
      const en = t.nameEn.toLowerCase();
      if (name === en || name.includes(en) || en.includes(name)) {
        return { flag: t.flag, countryCode: t.countryCode };
      }
    }
  }
  return null;
}

function getOwnerNames(apiTeamName: string): string[] {
  const map = buildTeamOwnerMap();
  const name = apiTeamName.toLowerCase();
  const owners: string[] = [];
  for (const [key, participants] of map.entries()) {
    if (name.includes(key) || key.includes(name) || name === key) {
      participants.forEach(p => {
        if (!owners.includes(p.name)) owners.push(p.name);
      });
    }
  }
  return owners;
}

const STATUS_LABELS: Record<string, string> = {
  live: 'En Vivo',
  scheduled: 'Programado',
  finished: 'Terminado',
};

function formatDate(dateStr: string, timeStr?: string): string {
  try {
    if (timeStr && timeStr !== '00:00:00') {
      const dt = new Date(`${dateStr}T${timeStr}Z`);
      return dt.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'America/Santo_Domingo' });
    }
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short' });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string, dateStr: string): string {
  try {
    if (!timeStr || timeStr === '00:00:00') return '';
    const dt = new Date(`${dateStr}T${timeStr}Z`);
    return dt.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santo_Domingo' });
  } catch {
    return timeStr.slice(0, 5);
  }
}

export const MatchCard: React.FC<MatchCardProps> = ({ event }) => {
  const homeMeta = useMemo(() => getTeamMeta(event.strHomeTeam), [event.strHomeTeam]);
  const awayMeta = useMemo(() => getTeamMeta(event.strAwayTeam), [event.strAwayTeam]);
  const homeOwners = useMemo(() => getOwnerNames(event.strHomeTeam), [event.strHomeTeam]);
  const awayOwners = useMemo(() => getOwnerNames(event.strAwayTeam), [event.strAwayTeam]);
  const allOwners = useMemo(() => [...new Set([...homeOwners, ...awayOwners])], [homeOwners, awayOwners]);

  const formattedDate = formatDate(event.dateEvent, event.strTime);
  const formattedTime = formatTime(event.strTime, event.dateEvent);
  const hasScore = event.intHomeScore !== null && event.intAwayScore !== null;

  return (
    <article
      className={`match-card ${event.status}`}
      aria-label={`${event.strHomeTeam} vs ${event.strAwayTeam}`}
      id={`match-${event.idEvent}`}
    >
      {/* Top row: meta + status badge */}
      <div className="match-top">
        <div className="match-meta">
          <span className="match-date">{formattedDate}</span>
          {formattedTime && <span className="match-time">{formattedTime}</span>}
          {(event.strRound || event.intRound) && (
            <span className="match-round">Ronda {event.strRound ?? event.intRound}</span>
          )}
        </div>
        <span className={`status-badge ${event.status}`}>
          {STATUS_LABELS[event.status]}
          {event.status === 'live' && event.strProgress && (
            <span style={{ marginLeft: 3 }}>{event.strProgress}'</span>
          )}
        </span>
      </div>

      {/* Main: teams + score */}
      <div className="match-body">
        {/* Home team */}
        <div className="match-team home">
          {homeMeta ? (
            <Flag countryCode={homeMeta.countryCode} emoji={homeMeta.flag} size={26} />
          ) : (
            <span style={{ fontSize: 22 }}>⚽</span>
          )}
          <span className="match-team-name">{event.strHomeTeam}</span>
        </div>

        {/* Score / vs */}
        <div className="match-score-area">
          {hasScore ? (
            <>
              <span className={`match-score ${event.status === 'live' ? 'live-score' : ''}`}>
                {event.intHomeScore}
              </span>
              <span className="score-sep">-</span>
              <span className={`match-score ${event.status === 'live' ? 'live-score' : ''}`}>
                {event.intAwayScore}
              </span>
            </>
          ) : (
            <span className="match-score-placeholder">vs</span>
          )}
        </div>

        {/* Away team */}
        <div className="match-team away">
          {awayMeta ? (
            <Flag countryCode={awayMeta.countryCode} emoji={awayMeta.flag} size={26} />
          ) : (
            <span style={{ fontSize: 22 }}>⚽</span>
          )}
          <span className="match-team-name">{event.strAwayTeam}</span>
        </div>
      </div>

      {/* Owner chips — only if some participants have these teams */}
      {allOwners.length > 0 && (
        <div className="match-owners" aria-label="Participantes con estos equipos">
          {allOwners.map(name => (
            <span key={name} className="owner-chip">👤 {name}</span>
          ))}
        </div>
      )}
    </article>
  );
};
