import React from 'react';
import { PARTICIPANTS } from '../../data/participants';
import { Flag } from '../shared/Flag';
import type { ParticipantScore } from '../../hooks/useWorldCupData';

interface TeamsViewProps {
  scores: ParticipantScore[];
}

export const TeamsView: React.FC<TeamsViewProps> = ({ scores }) => {
  // Build score map for quick lookup
  const scoreMap = new Map(scores.map(s => [s.participant.id, s]));

  return (
    <section className="teams-section" style={{ padding: '16px 0 32px' }} aria-label="Vista de equipos por participante">
      <h2 className="section-title">Equipos por Participante</h2>
      <div className="teams-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '12px',
      }}>
        {PARTICIPANTS.map(p => {
          const s = scoreMap.get(p.id);
          return (
            <div
              key={p.id}
              className="team-card"
              id={`team-card-${p.id}`}
              style={{
                background: 'var(--charcoal-2)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'transform var(--transition), box-shadow var(--transition)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--offwhite)' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--offwhite-dim)', marginTop: 2 }}>
                    Participante #{p.id}
                  </div>
                </div>
                {s && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-title)',
                      fontSize: '1.8rem',
                      color: s.rank <= 3 ? ['var(--gold)', '#a0aec0', '#b87333'][s.rank - 1] : 'var(--offwhite)',
                      lineHeight: 1,
                    }}>
                      {s.points}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--offwhite-dim)', letterSpacing: 1, textTransform: 'uppercase' }}>
                      pts
                    </div>
                  </div>
                )}
              </div>

              {/* Teams */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {p.teams.map(t => (
                  <div key={t.countryCode} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                  }}>
                    <Flag countryCode={t.countryCode} emoji={t.flag} size={24} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--offwhite)' }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--offwhite-dim)' }}>
                        {t.nameEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              {s && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {[
                    { label: 'GOLES', value: s.goals },
                    { label: 'VICTORIAS', value: s.wins },
                    { label: 'POSICIÓN', value: `#${s.rank}` },
                  ].map(stat => (
                    <div key={stat.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1.3rem',
                        color: 'var(--offwhite)',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '0.58rem',
                        color: 'var(--offwhite-dim)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
