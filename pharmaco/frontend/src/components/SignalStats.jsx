import React from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';

const SignalStats = ({ stats, onRefresh }) => {
  if (!stats || stats.length === 0) {
    return (
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-text-muted" />
          <h3 className="font-heading text-sm font-semibold m-0">Drug Signal Frequency</h3>
        </div>
        <p className="text-xs text-text-muted italic">No stats available yet.</p>
      </div>
    );
  }

  const topDrugs = stats.slice(0, 8);
  const maxCount = Math.max(...topDrugs.map(d => d.mention_count || 0));

  const getBarColor = (count) => {
    if (count > 10) return 'bg-accent-red';
    if (count > 5) return 'bg-accent-yellow';
    return 'bg-primary';
  };

  return (
    <div className="card p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-text-muted" />
          <h3 className="font-heading text-sm font-semibold m-0">Drug Signal Frequency</h3>
        </div>
        <button 
          onClick={onRefresh}
          className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded-md transition-colors"
          title="Refresh stats"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {topDrugs.map((item, index) => {
          const width = maxCount > 0 ? `${(item.mention_count / maxCount) * 100}%` : '0%';
          const barColor = getBarColor(item.mention_count);
          
          // Get top 2 adverse events
          const aeEntries = Object.entries(item.adverse_event_counts || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2);

          return (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end text-sm">
                <span className="font-medium text-text-primary capitalize">{item.drug_name}</span>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                  {item.mention_count}
                </span>
              </div>
              
              <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`} 
                  style={{ width }} 
                />
              </div>
              
              {aeEntries.length > 0 && (
                <div className="flex gap-1 mt-0.5">
                  {aeEntries.map(([ae, count], idx) => (
                    <span key={idx} className="text-[9px] text-text-muted px-1.5 py-0.5 bg-surface-elevated rounded">
                      {ae} ({count})
                    </span>
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

export default SignalStats;
