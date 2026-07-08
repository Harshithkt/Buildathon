import React, { useState, useEffect } from 'react';
import ScanInput from '../components/ScanInput';
import ResultPanel from '../components/ResultPanel';
import SignalStats from '../components/SignalStats';
import HistoryLog from '../components/HistoryLog';
import { scanSingle, scanBatch, getHistory, getStats } from '../utils/api';
import { ChevronDown, ChevronRight, AlertTriangle, FileText } from 'lucide-react';

const Home = () => {
  const [mode, setMode] = useState('single');
  const [inputText, setInputText] = useState('');
  const [batchPosts, setBatchPosts] = useState(['', '']);
  const [result, setResult] = useState(null);
  const [batchResult, setBatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState([]);
  const [activeTab, setActiveTab] = useState('scan');
  
  // Batch specific states
  const [batchTab, setBatchTab] = useState('summary'); // 'summary' | 'individual'
  const [expandedBatchItems, setExpandedBatchItems] = useState({});

  useEffect(() => {
    fetchHistoryAndStats();
  }, []);

  const fetchHistoryAndStats = async () => {
    try {
      const [historyData, statsData] = await Promise.all([
        getHistory(),
        getStats()
      ]);
      setHistory(historyData || []);
      setStats(statsData || []);
    } catch (err) {
      console.error("Failed to fetch initial data", err);
    }
  };

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setBatchResult(null);

    try {
      if (mode === 'single') {
        const data = await scanSingle(inputText);
        setResult(data);
      } else {
        const postsToScan = batchPosts.filter(p => p.trim().length > 10);
        if (postsToScan.length < 2) {
          throw new Error('Please enter at least two valid posts (min 10 characters each).');
        }
        const data = await scanBatch(postsToScan);
        setBatchResult(data);
      }
      
      // Refresh history & stats after successful scan
      await fetchHistoryAndStats();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBatchItem = (index) => {
    setExpandedBatchItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
      {/* Left Sidebar - 20% on Desktop */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="card p-2 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab('scan')}
            style={activeTab === 'scan' ? { background: 'rgba(217,119,87,0.1)', color: 'var(--primary)' } : {}}
            className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'scan' ? '' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
          >
            <AlertTriangle size={18} />
            Signal Detection
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            style={activeTab === 'history' ? { background: 'rgba(217,119,87,0.1)', color: 'var(--primary)' } : {}}
            className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history' ? '' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
          >
            <FileText size={18} />
            Scan History
          </button>
        </div>

        <HistoryLog history={history} />
      </div>

      {/* Main Content - 55% on Desktop */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        {error && (
          <div className="card p-4" style={{ borderLeft: '4px solid var(--error)', background: 'rgba(196,93,93,0.06)' }}>
            <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--error)' }}>Backend Error</h3>
            <p className="text-text-secondary text-sm">{error}</p>
          </div>
        )}

        <ScanInput 
          mode={mode} 
          setMode={setMode} 
          inputText={inputText} 
          setInputText={setInputText}
          batchPosts={batchPosts}
          setBatchPosts={setBatchPosts}
          onScan={handleScan}
          loading={loading}
        />

        {/* Display Single Result */}
        {mode === 'single' && (loading || result) && (
          <div className="animate-fade-in">
            <ResultPanel result={result} loading={loading} />
          </div>
        )}

        {/* Display Batch Result */}
        {mode === 'batch' && batchResult && !loading && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="card p-4 flex items-center justify-between" style={{ background: 'rgba(217,119,87,0.08)', borderColor: 'rgba(217,119,87,0.25)' }}>
              <span className="font-heading font-medium text-primary">
                Batch Analysis Complete
              </span>
              <span className="text-sm font-medium text-text-primary">
                {batchResult.summary?.processed_posts} posts · {batchResult.summary?.total_drugs_detected} drugs · {batchResult.summary?.total_adr_signals} signals
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <button 
                onClick={() => setBatchTab('summary')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${batchTab === 'summary' ? 'bg-surface-elevated text-text-primary border border-border' : 'text-text-muted hover:text-text-secondary'}`}
              >
                Summary
              </button>
              <button 
                onClick={() => setBatchTab('individual')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${batchTab === 'individual' ? 'bg-surface-elevated text-text-primary border border-border' : 'text-text-muted hover:text-text-secondary'}`}
              >
                Individual Results
              </button>
            </div>

            {batchTab === 'summary' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 flex flex-col gap-1">
                  <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Posts Processed</span>
                  <span className="font-heading text-2xl font-bold">{batchResult.summary?.processed_posts}</span>
                </div>
                <div className="card p-4 flex flex-col gap-1">
                  <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Most Common Drug</span>
                  <span className="font-heading text-xl font-bold text-primary capitalize truncate">{batchResult.summary?.most_common_drug}</span>
                </div>
                
                <div className="card p-4 col-span-2 flex flex-col gap-3">
                  <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Signal Distribution</span>
                  <div className="flex items-center gap-2 w-full h-4 bg-surface-elevated rounded-full overflow-hidden">
                    {Object.entries(batchResult.summary?.signal_distribution || {}).map(([key, val]) => {
                      if (val === 0) return null;
                      const width = `${(val / batchResult.summary.processed_posts) * 100}%`;
                      let bg = 'bg-text-muted';
                      if (key === 'strong') bg = 'bg-accent-red';
                      if (key === 'moderate') bg = 'bg-accent-yellow';
                      if (key === 'weak') bg = 'bg-accent-green';
                      
                      return <div key={key} className={`h-full ${bg}`} style={{ width }} title={`${key}: ${val}`} />;
                    })}
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Strong: {batchResult.summary?.signal_distribution?.strong || 0}</span>
                    <span>Moderate: {batchResult.summary?.signal_distribution?.moderate || 0}</span>
                    <span>Weak: {batchResult.summary?.signal_distribution?.weak || 0}</span>
                    <span>Noise: {batchResult.summary?.signal_distribution?.noise || 0}</span>
                  </div>
                </div>
              </div>
            )}

            {batchTab === 'individual' && (
              <div className="flex flex-col gap-3">
                {batchResult.results?.map((res, idx) => (
                  <div key={idx} className="card border border-border overflow-hidden">
                    <button 
                      onClick={() => toggleBatchItem(idx)}
                      className="w-full flex items-center justify-between p-4 bg-surface hover:bg-surface-elevated transition-colors text-left"
                    >
                      <div className="flex flex-col gap-1 pr-4">
                        <span className="text-xs font-semibold text-text-muted uppercase">Post {idx + 1}</span>
                        <span className="text-sm text-text-primary font-medium truncate">"{res.text_snippet}"</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {res.error ? (
                          <span className="text-[10px] bg-accent-red/10 text-accent-red px-2 py-0.5 rounded font-bold uppercase border border-accent-red/20">Error</span>
                        ) : (
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase border border-primary/20">
                            {res.extraction?.adverse_events?.length || 0} Signals
                          </span>
                        )}
                        {expandedBatchItems[idx] ? <ChevronDown size={18} className="text-text-muted" /> : <ChevronRight size={18} className="text-text-muted" />}
                      </div>
                    </button>
                    
                    {expandedBatchItems[idx] && (
                      <div className="p-4 border-t border-border/50 bg-[#0A0E1A]/30">
                        <ResultPanel result={res} loading={false} isBatchItem={true} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Right Sidebar - 25% on Desktop */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <SignalStats stats={stats} onRefresh={fetchHistoryAndStats} />
      </div>
    </div>
  );
};

export default Home;
