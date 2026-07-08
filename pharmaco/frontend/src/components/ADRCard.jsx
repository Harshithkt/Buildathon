import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const ADRCard = ({ adverseEvent }) => {
  const getSeverityStyle = (severity) => {
    const s = severity?.toLowerCase() || '';
    if (s.includes('severe') || s.includes('high')) {
      return { dot: 'bg-accent-red', text: 'text-accent-red', border: 'border-accent-red/30' };
    } else if (s.includes('moderate') || s.includes('medium')) {
      return { dot: 'bg-accent-yellow', text: 'text-accent-yellow', border: 'border-accent-yellow/30' };
    } else {
      return { dot: 'bg-accent-green', text: 'text-accent-green', border: 'border-accent-green/30' };
    }
  };

  const style = getSeverityStyle(adverseEvent.severity);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${style.dot} shadow-[0_0_8px_currentColor]`} />
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${style.border} ${style.text} bg-surface-elevated`}>
          {adverseEvent.severity || 'Unspecified'}
        </span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <p className="italic text-text-muted text-sm leading-snug">"{adverseEvent.original_text}"</p>
          <div className="flex items-start gap-2">
            <ArrowRight size={14} className="text-text-muted mt-0.5 shrink-0" />
            <p className="text-text-primary text-sm font-medium">{adverseEvent.english_translation}</p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-2 p-2 rounded-md bg-surface-elevated border border-border">
          <span className="font-mono text-[11px] text-primary">{adverseEvent.meddra_term}</span>
          <span className="font-mono text-[10px] text-text-muted">{adverseEvent.meddra_code}</span>
        </div>
      </div>
      
      {adverseEvent.onset_hours && (
        <div className="flex items-center gap-1.5 text-text-muted text-xs mt-1">
          <Clock size={12} />
          <span>Onset: {adverseEvent.onset_hours}h post-dose</span>
        </div>
      )}
    </motion.div>
  );
};

export default ADRCard;
