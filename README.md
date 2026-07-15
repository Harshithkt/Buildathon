Pharmaco - Real-Time Pharmacovigilance Signal Extractor
Pharmaco ingests unstructured social media text in Indian languages (Hindi, Tamil, Hinglish, etc.) and uses Nebius AI Token Factory to extract structured Adverse Drug Reaction (ADR) signals mapped to WHO MedDRA terminology. It automatically generates CDSCO/PvPI-compatible draft reports based on severity and causality assessments.

Prerequisites
Node.js 18+
npm
Firebase project
Nebius Token Factory API key
Setup
Clone/Open the project directory
Setup Backend:
cd backend
npm install
Configure Backend Environment: Create or edit backend/.env with your Nebius API Key and Firebase service account settings. Use either FIREBASE_SERVICE_ACCOUNT_PATH for a local JSON file or FIREBASE_SERVICE_ACCOUNT_JSON for an inline secret.
Firebase Admin Setup: Download your Firebase service account JSON from the Firebase Console (Project Settings -> Service Accounts -> Generate new private key). Save it locally as backend/firebase/serviceAccount.json or point FIREBASE_SERVICE_ACCOUNT_PATH to your own secure copy. The file is ignored by git.
Setup Frontend:
cd ../frontend
npm install
Configure Frontend Environment: Create or edit frontend/.env with your Firebase web configuration values. Those values are loaded from import.meta.env and should stay local.
Example env templates are available at backend/.env.example and frontend/.env.example.

Running the Application
Start Backend (Port 4000):
cd backend
npm run dev
Start Frontend (Port 5173):
cd frontend
npm run dev
Demo Posts to Test
Try pasting these into the single post analyzer:

Hinglish / Hindi:

"BP ki dawa Amlodipine lene ke 2 ghante baad mujhe bahut chakkar aaya, sar dard ho raha tha aur haath kaanpne lage. Pata nahi kya hua."

Tamil / English Mix:

"Took Paracetamol for fever yesterday. Kaalailaye severe rash and itching on my arms. Couldn't sleep all night because of nausea."

Marathi / English:

"Aai la Metformin dilyanantar don tasanni potat khup dukhayla lagla. Tila chakkari aali and breathing la problem hot hota. We took her to hospital."

Architecture
[Social Media Text]
       │
       ▼
 [React Frontend] ────────► [Express Backend]
 (Vite, Tailwind,           (Node.js, CORS)
  Framer Motion)                   │
                                   ├──► [Nebius AI Token Factory]
                                   │    - Extraction: Llama-3.1-8B-Instruct
                                   │    - Reasoning: Qwen3-32B
                                   │
                                   └──► [Firebase Firestore]
                                        - scan_sessions (History)
                                        - drug_stats (Aggregations)
Token Cost
~$0.001 per scan.
A $50 credit allows for approximately ~50,000 scans.
