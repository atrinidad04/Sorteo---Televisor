import React from 'react';

interface HeaderProps {
  lastUpdated: number | null;
  isLoading: boolean;
  onRefresh: () => void;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('es-DO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, isLoading, onRefresh }) => {
  return (
    <header className="header">
      <div className="app-container header-inner">
        <div className="header-brand">
          <span className="header-trophy">🔥</span>
          <div className="header-title-block">
            <h1 className="header-title">Mundial INFORUM 2026</h1>
            <p className="header-subtitle">Seguimiento del sorteo</p>
          </div>
        </div>

        <button
          className="cache-badge"
          onClick={onRefresh}
          title="Actualizar datos ahora"
          disabled={isLoading}
          id="btn-refresh-data"
        >
          <span className={`dot ${lastUpdated && Date.now() - lastUpdated < 90_000 ? '' : 'stale'}`} />
          <span>
            {isLoading
              ? 'Actualizando...'
              : lastUpdated
                ? `Act — ${formatTime(lastUpdated)}`
                : 'Sin datos'}
          </span>
        </button>
      </div>
    </header>
  );
};
