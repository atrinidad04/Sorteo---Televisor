import { useState } from 'react';
import { useWorldCupData } from './hooks/useWorldCupData';
import { Header } from './components/Header';
import { Tabs, type TabId } from './components/Tabs';
import { Podium } from './components/ranking/Podium';
import { RankingTable } from './components/ranking/RankingTable';
import { MatchList } from './components/matches/MatchList';
import { TeamsView } from './components/teams/TeamsView';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('ranking');
  const { events, scores, lastUpdated, isLoading, error, refresh } = useWorldCupData();

  const liveCount = events.filter(e => e.status === 'live').length;

  return (
    <div className="pitch-bg" style={{ minHeight: '100vh' }}>
      <Header
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refresh}
      />

      <Tabs
        active={activeTab}
        onChange={(t) => setActiveTab(t as TabId)}
        liveCount={liveCount}
      />

      <main className="app-container" style={{ paddingTop: 16, paddingBottom: 32 }}>
        {/* Error banner */}
        {error && (
          <div className="error-state" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Loading skeleton (first load only) */}
        {isLoading && events.length === 0 && (
          <div className="loading-container">
            <div className="spinner" aria-label="Cargando..." />
            <p className="loading-text">Cargando datos del Mundial 2026...</p>
          </div>
        )}

        {/* RANKING TAB */}
        {activeTab === 'ranking' && (!isLoading || events.length > 0) && (
          <>
            <Podium scores={scores} />
            <RankingTable scores={scores} />
          </>
        )}

        {/* MATCHES TAB */}
        {activeTab === 'matches' && (!isLoading || events.length > 0) && (
          <MatchList events={events} />
        )}

        {/* TEAMS TAB */}
        {activeTab === 'teams' && (
          <TeamsView scores={scores} />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px 16px',
        borderTop: '1px solid var(--green-mid)',
        fontSize: '0.7rem',
        color: 'var(--offwhite-dim)',
        background: 'var(--charcoal-2)',
      }}>
        <p>
          Sorteo Mundial 2026 · Datos:{' '}
          <a
            href="https://www.thesportsdb.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--gold-dim)', textDecoration: 'none' }}
          >
            TheSportsDB
          </a>{' '}
          · Actualización automática cada 60s
        </p>
      </footer>
    </div>
  );
}

export default App;
