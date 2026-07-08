import React, { useState } from 'react';
import { Activity, Globe2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ADRCard from './ADRCard';
import PvPIReport from './PvPIReport';

const Skeleton = () => (
  <div className="card p-5 flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <div className="skeleton h-6 w-1/3"></div>
      <div className="skeleton h-5 w-16 rounded-full"></div>
    </div>
    <div className="flex gap-2">
      <div className="skeleton h-12 w-full"></div>
    </div>
  </div>
);

const ResultPanel = ({ result, loading, isBatchItem = false }) => {
  const [reportOpen, setReportOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (!result) {
    if (isBatchItem) return null;
    return (
      <div className="flex flex-col items-center justify-center p-12 card border-dashed text-center h-full min-h-[300px]" style={{ borderColor: 'var(--border)' }}>
        <Activity size={48} className="text-border mb-4" />
        <p className="text-text-muted text-sm">Paste a social media post and analyse to see ADR signals</p>
      </div>
    );
  }

  // Handle batch results display inside accordion
  if (result.error) {
    return (
      <div className="card p-4 border-accent-red/30 bg-accent-red/5">
        <p className="text-accent-red text-sm">{result.error}</p>
        {result.text_snippet && <p className="text-text-muted text-xs mt-2 italic">"{result.text_snippet}"</p>}
      </div>
    );
  }

  const extracted = result.extraction || result;
  const report = result.report || result;
  const sessionId = result.sessionId;

  const noSignals = !extracted.adverse_events || extracted.adverse_events.length === 0;

  if (noSignals) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center mb-3">
          <Activity size={24} className="text-accent-green" />
        </div>
        <h3 className="font-heading text-lg font-medium text-text-primary mb-1">No ADR Signals Detected</h3>
        <p className="text-text-muted text-sm">This post does not appear to contain adverse drug reactions.</p>
      </div>
    );
  }

  const getStrengthColor = (str) => {
    const s = str?.toLowerCase() || '';
    if (s.includes('strong')) return 'bg-accent-red text-accent-red';
    if (s.includes('moderate')) return 'bg-accent-yellow text-accent-yellow';
    return 'bg-accent-green text-accent-green';
  };

  const strengthColor = getStrengthColor(report.signal_strength);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 w-full"
    >
      {/* Detection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-text-muted font-bold">Drugs Detected</span>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-heading font-bold">{extracted.drugs?.length || 0}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {extracted.drugs?.map((d, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-elevated text-text-secondary border border-border">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-4 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-text-muted font-bold">ADR Signals</span>
          <span className="text-2xl font-heading font-bold text-accent-red">{extracted.adverse_events?.length || 0}</span>
        </div>

        <div className="card p-4 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-text-muted font-bold">Language</span>
          <div className="flex items-center gap-2 mt-1">
            <Globe2 size={18} className="text-primary" />
            <span className="font-medium">{extracted.language_detected}</span>
          </div>
        </div>
      </div>

      {/* Signal Assessment */}
      <div className="card p-5 border-l-4 border-l-primary flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-text-muted tracking-wider">Signal Strength</span>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-current ${strengthColor} bg-opacity-10 bg-current`}>
              {report.signal_strength}
            </span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{report.signal_reasoning}</p>
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-bold uppercase text-text-muted tracking-wider">Causality Assessment</span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-semibold">{report.causality_assessment?.category}</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{report.causality_assessment?.who_umc_basis}</p>
        </div>
      </div>

      {/* Adverse Events */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-base font-semibold m-0">Detected Adverse Events</h3>
          <span className="px-2 py-0.5 rounded-full bg-surface-elevated text-xs font-medium text-text-secondary border border-border">
            {extracted.adverse_events?.length || 0}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {extracted.adverse_events?.map((ae, i) => (
            <ADRCard key={i} adverseEvent={ae} />
          ))}
        </div>
      </div>

      {/* PvPI Report */}
      {report.pvpi_report && (
        <div className="card overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <button 
            onClick={() => setReportOpen(!reportOpen)}
            className="w-full flex items-center justify-between p-4 transition-colors hover:bg-surface-elevated"
            style={{ background: 'var(--surface)' }}
          >
            <h3 className="font-heading text-sm font-semibold m-0">CDSCO PvPI Draft Report</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium border border-primary/30 rounded px-2 py-0.5 bg-primary/10">View</span>
              {reportOpen ? <ChevronUp size={18} className="text-text-muted" /> : <ChevronDown size={18} className="text-text-muted" />}
            </div>
          </button>
          
          {reportOpen && (
            <div className="p-4" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
              <PvPIReport 
                reportData={report.pvpi_report} 
                recommendedAction={report.recommended_action}
                sessionId={sessionId}
              />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ResultPanel;
