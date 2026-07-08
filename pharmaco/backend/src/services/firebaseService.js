import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read service account from FIREBASE_SERVICE_ACCOUNT_PATH
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase/serviceAccount.json';
const absolutePath = path.resolve(process.cwd(), serviceAccountPath);

if (!admin.apps.length) {
  try {
    if (fs.existsSync(absolutePath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      console.warn(`Service account file not found at ${absolutePath}. Firebase features will fail or run in unauthenticated mode if you don't provide a valid JSON.`);
      // Initialize without credentials for development/testing if allowed
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
}

const db = admin.firestore();

/*
## FIREBASE FIRESTORE RULES
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scan_sessions/{doc} {
      allow read, write: if true; // Open for hackathon — restrict in production
    }
    match /drug_stats/{doc} {
      allow read, write: if true;
    }
  }
}
*/

export async function saveScanSession(sessionData) {
  try {
    const docRef = db.collection('scan_sessions').doc();
    
    await docRef.set({
      id: docRef.id,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      original_text: sessionData.original_text || '',
      language_detected: sessionData.language_detected || 'Unknown',
      drugs: sessionData.drugs || [],
      adverse_events: sessionData.adverse_events || [],
      signal_strength: sessionData.signal_strength || 'noise',
      causality_category: sessionData.causality_category || 'Unclassified',
      pvpi_report: sessionData.pvpi_report || {}
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving scan session:', error);
    throw error;
  }
}

export async function updateDrugStats(drugs, adverseEvents) {
  if (!drugs || drugs.length === 0) return;
  
  try {
    const batch = db.batch();
    
    for (const drug of drugs) {
      const drugLower = drug.toLowerCase();
      const docRef = db.collection('drug_stats').doc(drugLower);
      
      const countsUpdate = {};
      if (adverseEvents && adverseEvents.length > 0) {
        adverseEvents.forEach(ae => {
          if (ae.meddra_term) {
            countsUpdate[`adverse_event_counts.${ae.meddra_term}`] = admin.firestore.FieldValue.increment(1);
          }
        });
      }
      
      batch.set(docRef, {
        drug_name: drugLower,
        mention_count: admin.firestore.FieldValue.increment(1),
        ...countsUpdate
      }, { merge: true });
    }
    
    await batch.commit();
  } catch (error) {
    console.error('Error updating drug stats:', error);
    throw error;
  }
}

export async function getRecentSessions(limit = 10) {
  try {
    const snapshot = await db.collection('scan_sessions')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
      
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        timestamp: data.timestamp ? data.timestamp.toDate() : null
      };
    });
  } catch (error) {
    console.error('Error getting recent sessions:', error);
    throw error;
  }
}

export async function getDrugStats() {
  try {
    const snapshot = await db.collection('drug_stats')
      .orderBy('mention_count', 'desc')
      .limit(20)
      .get();
      
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting drug stats:', error);
    throw error;
  }
}
