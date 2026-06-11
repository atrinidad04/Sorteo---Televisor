import React from 'react';
import { Flag } from '../shared/Flag';
import type { ParticipantScore } from '../../hooks/useWorldCupData';

interface PodiumProps {
  scores: ParticipantScore[];
}

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_LABELS = ['1°', '2°', '3°'];

export const Podium: React.FC<PodiumProps> = ({ scores }) => {
  const top3 = scores.slice(0, 3);
  if (top3.length === 0) return null;

  // Reorder: 2nd, 1st, 3rd (classic podium layout)
  const order = [top3[1], top3[0], top3[2]].filter(Boolean);
  const classMap: Record<number, string> = { 1: 'rank-1', 2: 'rank-2', 3: 'rank-3' };

  return (
    <section className="podium-section" aria-label="Podio top 3">
      <h2 className="podium-title">🏆 Clasificación</h2>
      <div className="podium-grid">
        {order.map(s => (
          <div
            key={s.participant.id}
            className={`podium-card ${classMap[s.rank]}`}
            role="article"
            aria-label={`${RANK_LABELS[s.rank - 1]} lugar: ${s.participant.name}`}
          >
            <span className="podium-medal">{MEDALS[s.rank - 1]}</span>
            <div className="podium-rank-num">{RANK_LABELS[s.rank - 1]}</div>
            <div className="podium-name">{s.participant.name}</div>
            <div className="podium-flags">
              {s.participant.teams.map(t => (
                <Flag
                  key={t.countryCode}
                  countryCode={t.countryCode}
                  emoji={t.flag}
                  size={22}
                />
              ))}
            </div>
            <div className="podium-pts">{s.points}</div>
            <div className="podium-pts-label">PTS</div>
            <div style={{ marginTop: 6, fontSize: '0.7rem', color: 'var(--offwhite-dim)' }}>
              {s.goals}G · {s.wins}V
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
