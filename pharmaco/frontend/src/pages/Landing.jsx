import React from 'react';
import { Activity, Shield, Globe2, Zap, FileText, ArrowRight, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: <Globe2 size={22} />,
    title: 'Indian Language Support',
    desc: 'Detects ADRs from Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, and Hinglish social media posts.'
  },
  {
    icon: <Zap size={22} />,
    title: 'Real-Time AI Extraction',
    desc: 'Powered by Groq LPUs using open LLMs for fast, accurate adverse drug reaction detection.'
  },
  {
    icon: <Shield size={22} />,
    title: 'WHO MedDRA Mapping',
    desc: 'Every adverse event is automatically mapped to the WHO MedDRA Preferred Term dictionary with codes.'
  },
  {
    icon: <FileText size={22} />,
    title: 'PvPI Draft Reports',
    desc: 'Instantly generates CDSCO/PvPI-compatible draft ADR reports with causality assessment and recommendations.'
  },
];

const steps = [
  { number: '01', title: 'Paste Social Media Text', desc: 'Input any unstructured post in any Indian language.' },
  { number: '02', title: 'AI Signal Extraction', desc: 'LLMs identify drugs, symptoms, and severity from natural language.' },
  { number: '03', title: 'MedDRA Mapping', desc: 'Adverse events mapped to WHO terminology with 8-digit codes.' },
  { number: '04', title: 'PvPI Report Ready', desc: 'Download a structured draft report compliant with Indian regulations.' },
];

const Landing = ({ onEnter }) => {
  return (
    <div className="landing-root">
      {/* NAV */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <div className="landing-logo-dot"></div>
            <span className="landing-logo-text">Pharmaco</span>
          </div>
          <div className="landing-nav-right">
            <span className="landing-nav-badge">Beta · PvPI Compliant</span>
            <button className="landing-btn-primary" onClick={onEnter}>
              Open Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-badge">
            <Activity size={14} />
            <span>Real-Time Pharmacovigilance · India</span>
          </div>

          <h1 className="landing-hero-title">
            Detect Adverse Drug<br />
            <em>Reactions Instantly</em>
          </h1>

          <p className="landing-hero-subtitle">
            Pharmaco scans Indian-language social media posts and extracts structured ADR signals 
            mapped to WHO MedDRA terminology — generating draft CDSCO/PvPI reports in seconds.
          </p>

          <div className="landing-hero-cta">
            <button className="landing-btn-primary landing-btn-lg" onClick={onEnter}>
              Start Extracting Signals <ChevronRight size={18} />
            </button>
            <span className="landing-hero-cta-note">
              Supports Hindi · Tamil · Telugu · Kannada · Bengali · Marathi · Hinglish
            </span>
          </div>

          {/* Mock UI Preview Card */}
          <div className="landing-preview">
            <div className="landing-preview-bar">
              <span></span><span></span><span></span>
              <span className="landing-preview-bar-title">Pharmaco · Signal Analysis</span>
            </div>
            <div className="landing-preview-body">
              <div className="landing-preview-input">
                "BP ki dawa lene ke 2 ghante baad chakkar aaya aur haath kaanpne lage..."
              </div>
              <div className="landing-preview-signals">
                <div className="landing-preview-signal red">
                  <span className="landing-signal-dot"></span>
                  <div>
                    <div className="landing-signal-drug">Amlodipine</div>
                    <div className="landing-signal-reaction">Dizziness · MedDRA 10013573</div>
                  </div>
                  <span className="landing-signal-badge severe">SEVERE</span>
                </div>
                <div className="landing-preview-signal yellow">
                  <span className="landing-signal-dot yellow"></span>
                  <div>
                    <div className="landing-signal-drug">Amlodipine</div>
                    <div className="landing-signal-reaction">Tremor · MedDRA 10044565</div>
                  </div>
                  <span className="landing-signal-badge moderate">MODERATE</span>
                </div>
              </div>
              <div className="landing-preview-footer">
                <span className="landing-preview-strength">Signal: <strong>Strong</strong></span>
                <span className="landing-preview-causality">Causality: <strong>Probable</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">Built for Indian Pharmacovigilance</h2>
            <p className="landing-section-sub">Everything you need to detect and report ADRs from social media at scale.</p>
          </div>
          <div className="landing-features-grid">
            {features.map((f, i) => (
              <div key={i} className="landing-feature-card">
                <div className="landing-feature-icon">{f.icon}</div>
                <h3 className="landing-feature-title">{f.title}</h3>
                <p className="landing-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section landing-section-alt">
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">How It Works</h2>
            <p className="landing-section-sub">From raw social media text to a regulatory-ready report in under a minute.</p>
          </div>
          <div className="landing-steps">
            {steps.map((s, i) => (
              <div key={i} className="landing-step">
                <div className="landing-step-number">{s.number}</div>
                <div className="landing-step-content">
                  <h3 className="landing-step-title">{s.title}</h3>
                  <p className="landing-step-desc">{s.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="landing-step-arrow"><ChevronRight size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="landing-cta-banner">
        <div className="landing-container landing-cta-inner">
          <h2 className="landing-cta-title">Ready to Monitor Drug Safety?</h2>
          <p className="landing-cta-sub">Paste your first post and see WHO MedDRA-mapped signals in under 60 seconds.</p>
          <button className="landing-btn-primary landing-btn-lg landing-btn-white" onClick={onEnter}>
            Launch Pharmaco Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <div className="landing-logo">
            <div className="landing-logo-dot"></div>
            <span className="landing-logo-text" style={{ fontSize: '1rem' }}>Pharmaco</span>
          </div>
          <p className="landing-footer-note">
            Powered by Groq API · WHO MedDRA · CDSCO PvPI Programme
          </p>
          <p className="landing-footer-disclaimer">
            For pharmacovigilance research use only. Not a substitute for clinical judgment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
