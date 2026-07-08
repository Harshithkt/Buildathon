import React, { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';

const STAGES = [
  { label: 'Translating & extracting drug mentions...', duration: 15000 },
  { label: 'Mapping to WHO MedDRA terminology...', duration: 15000 },
  { label: 'Running causality assessment...', duration: 15000 },
  { label: 'Generating PvPI draft report...', duration: null },
];

const ScanInput = ({ mode, setMode, inputText, setInputText, batchPosts, setBatchPosts, onScan, loading }) => {
  const isSingle = mode === 'single';
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      setStageIndex(0);
      return;
    }
    setStageIndex(0);
    let currentStage = 0;
    const timers = [];

    const advance = (idx) => {
      if (idx < STAGES.length - 1 && STAGES[idx].duration) {
        const t = setTimeout(() => {
          currentStage = idx + 1;
          setStageIndex(currentStage);
          advance(currentStage);
        }, STAGES[idx].duration);
        timers.push(t);
      }
    };
    advance(0);

    return () => timers.forEach(clearTimeout);
  }, [loading]);

  const handleBatchChange = (index, value) => {
    const newPosts = [...batchPosts];
    newPosts[index] = value;
    setBatchPosts(newPosts);
  };

  const addBatchPost = () => {
    if (batchPosts.length < 10) {
      setBatchPosts([...batchPosts, '']);
    }
  };

  const removeBatchPost = (index) => {
    if (batchPosts.length > 2) {
      const newPosts = batchPosts.filter((_, i) => i !== index);
      setBatchPosts(newPosts);
    }
  };

  const isSubmitDisabled = loading || (isSingle ? !inputText.trim() : batchPosts.some(p => !p.trim()));

  return (
    <div className="card p-6 w-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setMode('single')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isSingle ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted hover:text-text-secondary'}`}
        >
          Single Post
        </button>
        <button 
          onClick={() => setMode('batch')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!isSingle ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted hover:text-text-secondary'}`}
        >
          Batch (2-10)
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {isSingle ? (
          <div className="relative">
            <textarea
              className="input-dark resize-y min-h-[160px] font-sans text-[15px] leading-relaxed"
              placeholder={"Paste social media post in any Indian language or Hinglish...\nExample: 'BP ki dawa lene ke 2 ghante baad bahut chakkar aaya aur haath kaanpne lage'"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
              maxLength={2000}
            />
            <div className="absolute bottom-3 right-3 text-xs text-text-muted font-mono">
              {inputText.length}/2000
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {batchPosts.map((post, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-text-secondary font-medium">Post {index + 1}</label>
                  {batchPosts.length > 2 && (
                    <button 
                      onClick={() => removeBatchPost(index)}
                      className="text-xs text-text-muted hover:text-accent-red flex items-center gap-1 transition-colors"
                    >
                      <X size={12} /> Remove
                    </button>
                  )}
                </div>
                <textarea
                  className="input-dark min-h-[80px] font-sans text-sm resize-y"
                  placeholder="Paste post text here..."
                  value={post}
                  onChange={(e) => handleBatchChange(index, e.target.value)}
                  disabled={loading}
                />
              </div>
            ))}
            {batchPosts.length < 10 && (
              <button 
                onClick={addBatchPost}
                className="self-start text-sm text-primary flex items-center gap-1 hover:brightness-110 transition-all font-medium"
              >
                <Plus size={16} /> Add Post
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={onScan}
          disabled={isSubmitDisabled}
          className={`btn-primary w-full py-3.5 text-base ${loading ? 'glow-pulse' : ''}`}
        >
          {loading ? 'Analysing...' : (isSingle ? 'Analyse for ADR Signals' : 'Analyse Batch')}
        </button>

        {loading && (
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-1.5 justify-center">
              {STAGES.map((stage, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    i < stageIndex ? 'w-6 bg-accent-green' :
                    i === stageIndex ? 'w-6 bg-primary animate-pulse' :
                    'w-2 bg-surface-elevated'
                  }`}
                />
              ))}
            </div>
            <p className="text-[11px] text-primary text-center font-medium animate-pulse">
              {STAGES[stageIndex]?.label}
            </p>
            <p className="text-[10px] text-text-muted text-center">
              Large language models take 30–60s — results will appear automatically
            </p>
          </div>
        )}

        {!loading && (
          <p className="text-[11px] text-text-muted text-center">
            Powered by Groq API · Open Models · WHO MedDRA Mapped
          </p>
        )}
      </div>
    </div>
  );
};

export default ScanInput;
