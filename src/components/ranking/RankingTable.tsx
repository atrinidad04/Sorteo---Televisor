import React from 'react';
import { Flag } from '../shared/Flag';
import type { ParticipantScore } from '../../hooks/useWorldCupData';

interface RankingTableProps {
  scores: ParticipantScore[];
}

const TOP_CLASSES: Record<number, string> = {
  1: 'top-1',
  2: 'top-2',
  3: 'top-3',
};

export const RankingTable: React.FC<RankingTableProps> = ({ scores }) => {
  return (
    <section className="ranking-section" aria-label="Clasificación completa">
      <h2 className="section-title">Clasificación Completa</h2>
      <table className="ranking-table" role="grid" aria-label="Tabla de clasificación">
        <thead>
          <tr>
            <th aria-label="Posición">#</th>
            <th>Participante</th>
            <th>Selecciones</th>
            <th className="stat-cell" aria-label="Goles">GOLES</th>
            <th className="stat-cell" aria-label="Victorias">VCT.</th>
            <th className="stat-cell" aria-label="Empates">EMP.</th>
            <th className="stat-cell" aria-label="Puntos">PTS</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(s => (
            <tr
              key={s.participant.id}
              className={`ranking-row ${TOP_CLASSES[s.rank] ?? ''}`}
              aria-label={`${s.rank}° lugar: ${s.participant.name}, ${s.points} puntos`}
            >
              <td className="rank-pos">{s.rank}</td>
              <td>
                <span className="participant-name">{s.participant.name}</span>
              </td>
              <td>
                <div className="participant-teams">
                  {s.participant.teams.map(t => (
                    <span key={t.countryCode} className="team-item" title={t.name}>
                      <Flag countryCode={t.countryCode} emoji={t.flag} size={16} />
                      <span style={{ fontSize: '0.72rem', color: 'var(--offwhite-dim)' }}>
                        {t.name}
                      </span>
                    </span>
                  ))}
                </div>
              </td>
              <td className="stat-cell stat-goals">{s.goals}</td>
              <td className="stat-cell stat-wins">{s.wins}</td>
              <td className="stat-cell stat-draws">{s.draws}</td>
              <td className="stat-cell stat-pts">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
