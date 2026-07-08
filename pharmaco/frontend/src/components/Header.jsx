import React from 'react';
import { Activity, ChevronLeft } from 'lucide-react';

const Header = ({ totalScans = 0, drugsDetected = 0, adrSignals = 0, onBack }) => {
  return (
    <header className="dashboard-header scanline-effect">
      <div className="dashboard-header-main">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                background: 'none', border: '1px solid var(--border)',
                borderRadius: '8px', padding: '0.35rem 0.75rem',
                cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem',
                transition: 'all 0.2s', fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--surface-alt)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
            >
              <ChevronLeft size={14} /> Back
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(217,119,87,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)'
            }}>
              <Activity size={18} />
            </div>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.35rem', color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              Pharmaco
            </span>
          </div>
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          India Pharmacovigilance Signal Network
        </span>
      </div>

      <div className="dashboard-header-ribbon">
        <div className="dashboard-header-ribbon-inner">
          <div>
            <span className="dashboard-stat-label">Total Scans</span>
            <span className="dashboard-stat-value">{totalScans.toLocaleString()}</span>
          </div>
          <div>
            <span className="dashboard-stat-label">Drugs Detected</span>
            <span className="dashboard-stat-value">{drugsDetected.toLocaleString()}</span>
          </div>
          <div>
            <span className="dashboard-stat-label">ADR Signals</span>
            <span className="dashboard-stat-value">{adrSignals.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
