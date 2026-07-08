import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const PvPIReport = ({ reportData, recommendedAction, sessionId }) => {
  const reportRef = useRef(null);

  const handleExport = () => {
    const element = reportRef.current;
    const opt = {
      margin:       10,
      filename:     `pharmaco_report_${sessionId || 'draft'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  if (!reportData) return null;

  return (
    <div ref={reportRef} className="flex flex-col gap-4 p-5 rounded-xl border border-border mt-2" style={{ background: 'var(--surface-alt)' }}>
      <div className="flex justify-between items-start border-b border-border/50 pb-4">
        <div>
          <div className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-1">
            Pharmacovigilance Programme of India
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-semibold text-text-primary text-lg m-0">Draft ADR Report</h4>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
              AUTO-GENERATED
            </span>
          </div>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
        >
          <Download size={14} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mt-2">
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Report Type</span>
          <span className="text-text-primary">{reportData.report_type}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Source Type</span>
          <span className="text-text-primary">{reportData.source_type}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Country</span>
          <span className="text-text-primary">{reportData.country}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Suspected Drugs</span>
          <span className="text-text-primary">{reportData.drugs_suspected}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Adverse Reactions</span>
          <span className="text-text-primary">{reportData.adverse_reactions}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Seriousness</span>
          <span className="text-text-primary">{reportData.seriousness}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Outcome</span>
          <span className="text-text-primary">{reportData.outcome}</span>
        </div>
      </div>

      <div className="mt-2 border border-border/50 rounded-lg p-4" style={{ background: 'var(--surface)' }}>
        <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold block mb-2">Narrative</span>
        <p className="text-text-secondary text-sm leading-relaxed m-0">
          {reportData.narrative}
        </p>
      </div>

      {recommendedAction && (
        <div className="mt-2 bg-accent-yellow/5 border border-accent-yellow/20 border-l-[3px] border-l-accent-yellow rounded-r-lg p-4">
          <span className="text-accent-yellow text-[11px] uppercase tracking-wider font-bold block mb-1">Recommended Action</span>
          <p className="text-text-primary text-sm m-0">{recommendedAction}</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-2 pt-4 border-t border-border/50">
        <span className="font-mono text-[10px] text-text-muted">Session ID: {sessionId || 'N/A'}</span>
        <a href="https://pvpi.gov.in" target="_blank" rel="noreferrer" className="text-[11px] text-text-muted hover:text-primary transition-colors underline-offset-2 hover:underline">
          Submit to PvPI: pvpi.gov.in
        </a>
      </div>
    </div>
  );
};

export default PvPIReport;
