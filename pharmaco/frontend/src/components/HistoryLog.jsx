import React, { useState } from 'react';
import { History, ChevronRight } from 'lucide-react';
import ADRCard from './ADRCard';

const HistoryLog = ({ history }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <History size={18} className="text-text-muted" />
          <h3 className="font-heading text-sm font-semibold m-0">Recent Scans</h3>
        </div>
        <p className="text-xs text-text-muted italic">No recent scans.</p>
      </div>
    );
  }

  const getTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diff = new Date() - new Date(dateStr);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getStrengthDotColor = (str) => {
    const s = str?.toLowerCase() || '';
    if (s.includes('strong')) return 'bg-accent-red';
    if (s.includes('moderate')) return 'bg-accent-yellow';
    if (s.includes('weak')) return 'bg-accent-green';
    return 'bg-text-muted';
  };

  const displayHistory = history.slice(0, 5);

  return (
    <div className="card p-0 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={18} className="text-text-muted" />
          <h3 className="font-heading text-sm font-semibold m-0">Recent Scans</h3>
        </div>
        {history.length > 5 && (
          <button className="text-[10px] font-medium text-primary hover:underline">
            View all
          </button>
        )}
      </div>

      <div className="flex flex-col divide-y divide-border">
        {displayHistory.map((session, idx) => {
          const isExpanded = expandedId === session.id;
          
          return (
            <div key={session.id || idx} className="flex flex-col">
              <div 
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-surface-elevated transition-colors ${isExpanded ? 'bg-surface-elevated' : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : session.id)}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${getStrengthDotColor(session.signal_strength)}`} />
                
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-primary truncate">{session.original_text?.substring(0, 50)}...</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] uppercase font-bold text-text-muted border border-border px-1.5 rounded">
                      {session.language_detected}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-[10px] text-text-muted">{getTimeAgo(session.timestamp)}</span>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-text-secondary">
                    <span className="text-primary">{session.drugs?.length || 0} drugs</span>
                  </div>
                </div>
              </div>
              
              {isExpanded && session.adverse_events && (
                <div className="p-3 border-t border-border flex flex-col gap-2" style={{ background: 'var(--surface)' }}>
                  <span className="text-xs font-semibold text-text-primary">Detected Signals:</span>
                  {session.adverse_events.map((ae, i) => (
                    <ADRCard key={i} adverseEvent={ae} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryLog;
