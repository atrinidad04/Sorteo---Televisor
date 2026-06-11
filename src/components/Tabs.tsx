import React from 'react';

export type TabId = 'ranking' | 'matches' | 'teams';

interface TabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
  liveCount: number;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'ranking', label: 'Ranking', icon: '🏅' },
  { id: 'matches', label: 'Partidos', icon: '⚽' },
  { id: 'teams', label: 'Equipos', icon: '🌍' },
];

export const Tabs: React.FC<TabsProps> = ({ active, onChange, liveCount }) => {
  return (
    <nav className="tabs-wrapper" role="navigation" aria-label="Navegación principal">
      <div className="app-container tabs-inner">
        {TABS.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`tab-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
            aria-selected={active === tab.id}
            role="tab"
          >
            <span className="icon">{tab.icon}</span>
            {tab.label}
            {tab.id === 'matches' && liveCount > 0 && (
              <span style={{
                background: 'var(--live-green)',
                color: '#000',
                fontSize: '0.6rem',
                fontWeight: 700,
                borderRadius: '20px',
                padding: '1px 5px',
                marginLeft: '2px',
              }}>
                {liveCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
