import express from 'express';
import { extractADR, generateReport } from '../services/nebiusService.js';
import { saveScanSession, updateDrugStats, getRecentSessions, getDrugStats } from '../services/firebaseService.js';

const router = express.Router();

router.post('/single', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string' || text.length < 10 || text.length > 2000) {
      return res.status(400).json({ error: 'Text must exist and be between 10 and 2000 characters.' });
    }
    
    const extracted = await extractADR(text);
    const generated = await generateReport(extracted, text);
    
    let sessionId = null;
    let warning = null;
    
    try {
      sessionId = await saveScanSession({
        original_text: text,
        language_detected: extracted.language_detected,
        drugs: extracted.drugs,
        adverse_events: extracted.adverse_events,
        signal_strength: generated.signal_strength,
        causality_category: generated.causality_assessment?.category,
        pvpi_report: generated.pvpi_report
      });
      
      await updateDrugStats(extracted.drugs, extracted.adverse_events);
    } catch (dbError) {
      warning = "Failed to save to Firebase, but analysis completed.";
      console.error(dbError);
    }
    
    res.status(200).json({
      sessionId,
      warning,
      extraction: extracted,
      report: generated
    });
    
  } catch (error) {
    console.error('Error in /single route:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.post('/batch', async (req, res) => {
  try {
    const { posts } = req.body;
    
    if (!Array.isArray(posts) || posts.length < 2 || posts.length > 10) {
      return res.status(400).json({ error: 'posts must be an array of 2-10 strings.' });
    }
    
    const results = [];
    let total_drugs = 0;
    let total_signals = 0;
    const signal_distribution = { strong: 0, moderate: 0, weak: 0, noise: 0 };
    const drug_counts = {};
    
    // Process sequentially
    for (const text of posts) {
      if (!text || text.length < 10) continue;
      
      try {
        const extracted = await extractADR(text);
        const generated = await generateReport(extracted, text);
        
        let sessionId = null;
        try {
          sessionId = await saveScanSession({
            original_text: text,
            language_detected: extracted.language_detected,
            drugs: extracted.drugs,
            adverse_events: extracted.adverse_events,
            signal_strength: generated.signal_strength,
            causality_category: generated.causality_assessment?.category,
            pvpi_report: generated.pvpi_report
          });
          await updateDrugStats(extracted.drugs, extracted.adverse_events);
        } catch (dbError) {
          console.error('DB Error in batch:', dbError);
        }
        
        results.push({
          sessionId,
          text_snippet: text.substring(0, 50) + '...',
          extraction: extracted,
          report: generated
        });
        
        // Aggregations
        total_drugs += extracted.drugs?.length || 0;
        total_signals += extracted.adverse_events?.length || 0;
        
        const strength = generated.signal_strength?.toLowerCase();
        if (signal_distribution[strength] !== undefined) {
          signal_distribution[strength]++;
        } else {
          signal_distribution.noise++; // default fallback
        }
        
        if (extracted.drugs) {
          extracted.drugs.forEach(d => {
            const dLower = d.toLowerCase();
            drug_counts[dLower] = (drug_counts[dLower] || 0) + 1;
          });
        }
        
      } catch (err) {
        console.error('Error processing post in batch:', err);
        results.push({
          error: err.message || 'Failed to process this post',
          text_snippet: text.substring(0, 50) + '...'
        });
      }
    }
    
    let most_common_drug = 'None';
    let max_count = 0;
    for (const [drug, count] of Object.entries(drug_counts)) {
      if (count > max_count) {
        max_count = count;
        most_common_drug = drug;
      }
    }
    
    res.status(200).json({
      results,
      summary: {
        total_posts: posts.length,
        processed_posts: results.length,
        total_drugs_detected: total_drugs,
        total_adr_signals: total_signals,
        most_common_drug,
        signal_distribution
      }
    });
    
  } catch (error) {
    console.error('Error in /batch route:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await getRecentSessions(10);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch history' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await getDrugStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch stats' });
  }
});

export default router;
