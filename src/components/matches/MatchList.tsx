import React, { useMemo } from 'react';
import type { SportEvent } from '../../services/sportsdb';
import { MatchCard } from './MatchCard';

interface MatchListProps {
  events: SportEvent[];
}

interface GroupedMatches {
  live: SportEvent[];
  scheduled: SportEvent[];
  finished: SportEvent[];
}

export const MatchList: React.FC<MatchListProps> = ({ events }) => {
  const grouped = useMemo<GroupedMatches>(() => {
    const g: GroupedMatches = { live: [], scheduled: [], finished: [] };
    for (const ev of events) {
      g[ev.status].push(ev);
    }
    // Sort scheduled by date asc, finished by date desc
    g.scheduled.sort((a, b) => a.dateEvent.localeCompare(b.dateEvent) || a.strTime.localeCompare(b.strTime));
    g.finished.sort((a, b) => b.dateEvent.localeCompare(a.dateEvent) || b.strTime.localeCompare(a.strTime));
    return g;
  }, [events]);

  const isEmpty = events.length === 0;

  if (isEmpty) {
    return (
      <div className="empty-state">
        <p>⚽ No hay partidos disponibles aún.</p>
        <p style={{ marginTop: 8, fontSize: '0.78rem' }}>
          Los datos se cargarán automáticamente cuando el torneo comience.
        </p>
      </div>
    );
  }

  return (
    <section className="matches-section" aria-label="Lista de partidos">
      {/* LIVE */}
      {grouped.live.length > 0 && (
        <div className="matches-group" id="matches-live">
          <div className="group-header">
            <h2 className="group-title live">⚡ En Vivo</h2>
            <span className="group-count live">{grouped.live.length}</span>
          </div>
          {grouped.live.map(ev => (
            <MatchCard key={ev.idEvent} event={ev} />
          ))}
        </div>
      )}

      {/* SCHEDULED */}
      {grouped.scheduled.length > 0 && (
        <div className="matches-group" id="matches-scheduled">
          <div className="group-header">
            <h2 className="group-title scheduled">📅 Próximos Partidos</h2>
            <span className="group-count scheduled">{grouped.scheduled.length}</span>
          </div>
          {grouped.scheduled.map(ev => (
            <MatchCard key={ev.idEvent} event={ev} />
          ))}
        </div>
      )}

      {/* FINISHED */}
      {grouped.finished.length > 0 && (
        <div className="matches-group" id="matches-finished">
          <div className="group-header">
            <h2 className="group-title finished">✅ Resultados</h2>
            <span className="group-count finished">{grouped.finished.length}</span>
          </div>
          {grouped.finished.map(ev => (
            <MatchCard key={ev.idEvent} event={ev} />
          ))}
        </div>
      )}
    </section>
  );
};
