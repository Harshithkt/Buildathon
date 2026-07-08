import React, { useEffect, useState } from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Header from './components/Header';
import { getHistory } from './utils/api';

function App() {
  const [page, setPage] = useState('landing');
  const [headerStats, setHeaderStats] = useState({ total: 0, drugs: 0, signals: 0 });

  useEffect(() => {
    if (page !== 'dashboard') return;
    const fetchHeaderStats = async () => {
      try {
        const history = await getHistory();
        if (history && history.length > 0) {
          let drugs = 0;
          let signals = 0;
          history.forEach(h => {
            drugs += h.drugs?.length || 0;
            signals += h.adverse_events?.length || 0;
          });
          setHeaderStats({ total: history.length, drugs, signals });
        }
      } catch (err) {
        console.error("Failed to fetch header stats");
      }
    };
    fetchHeaderStats();
    const interval = setInterval(fetchHeaderStats, 30000);
    return () => clearInterval(interval);
  }, [page]);

  if (page === 'landing') {
    return <Landing onEnter={() => setPage('dashboard')} />;
  }

  return (
    <div className="dashboard-root">
      <Header
        totalScans={headerStats.total}
        drugsDetected={headerStats.drugs}
        adrSignals={headerStats.signals}
        onBack={() => setPage('landing')}
      />
      <main className="dashboard-main">
        <Home />
      </main>
    </div>
  );
}

export default App;
