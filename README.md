# 💊 Pharmaco – Real-Time Pharmacovigilance Signal Extractor

Pharmaco is an AI-powered pharmacovigilance platform that extracts **Adverse Drug Reaction (ADR)** signals from unstructured social media posts written in **Indian languages** such as Hindi, Tamil, Marathi, Hinglish, and more.

Using **Nebius AI Token Factory**, Pharmaco converts noisy multilingual text into structured pharmacovigilance data mapped to **WHO MedDRA terminology**, performs **severity and causality assessment**, and automatically generates **CDSCO/PvPI-compatible draft reports**.

---

## ✨ Features

- 🌐 Multilingual ADR extraction
  - Hindi
  - Hinglish
  - Tamil
  - Marathi
  - English
  - Easily extendable to other Indian languages

- 🤖 AI-powered extraction using Nebius AI Token Factory

- 💊 Automatic identification of:
  - Drug Name
  - Adverse Drug Reaction (ADR)
  - Severity
  - Seriousness
  - Suspected Causality
  - Patient Details (when available)

- 📖 WHO MedDRA terminology mapping

- 📄 Automatic CDSCO/PvPI draft report generation

- 📊 Dashboard with historical scan sessions

- 🔥 Firebase Firestore integration

- ⚡ Real-time analysis with low inference cost

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion

## Backend

- Node.js
- Express.js
- Firebase Admin SDK
- Nebius AI Token Factory

## Database

- Firebase Firestore

## AI Models

### Extraction

- **Llama-3.1-8B-Instruct**

Responsible for:

- Drug extraction
- ADR detection
- Entity extraction

### Reasoning

- **Qwen3-32B**

Responsible for:

- Severity assessment
- Causality reasoning
- MedDRA mapping
- Report generation

---

# Project Structure

```
Pharmaco/
│
├── backend/
│   ├── firebase/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# Architecture

```
                Social Media Posts
                        │
                        ▼
              React Frontend (Vite)
                        │
                        ▼
              Express Backend API
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
 Nebius AI Token Factory      Firebase Firestore
          │                           │
          │                           │
  ┌──────────────┐          ┌───────────────────┐
  │ Llama-3.1-8B │          │ scan_sessions     │
  │ Extraction   │          │ drug_stats        │
  └──────────────┘          └───────────────────┘
          │
          ▼
    Qwen3-32B Reasoning
          │
          ▼
 Structured ADR + MedDRA Mapping
          │
          ▼
 CDSCO/PvPI Draft Report
```

---

# Prerequisites

- Node.js 18+
- npm
- Firebase Project
- Nebius AI Token Factory API Key

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/pharmaco.git

cd pharmaco
```

---

# Backend Setup

Navigate to the backend directory.

```bash
cd backend

npm install
```

### Configure Environment

Create a `.env` file.

```env
NEBIUS_API_KEY=your_api_key

FIREBASE_SERVICE_ACCOUNT_PATH=./firebase/serviceAccount.json
```

Alternatively, provide the Firebase credentials inline.

```env
FIREBASE_SERVICE_ACCOUNT_JSON=<json>
```

---

## Firebase Admin Setup

1. Open Firebase Console
2. Project Settings
3. Service Accounts
4. Generate New Private Key

Save it as

```
backend/firebase/serviceAccount.json
```

or update

```
FIREBASE_SERVICE_ACCOUNT_PATH
```

The service account file is ignored by Git.

---

# Frontend Setup

```bash
cd ../frontend

npm install
```

Create a `.env` file.

```env
VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=
```

Values are loaded using

```javascript
import.meta.env
```

Example templates are available in:

```
backend/.env.example

frontend/.env.example
```

---

# Running the Application

## Start Backend

```bash
cd backend

npm run dev
```

Runs on

```
http://localhost:4000
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Demo Test Posts

## Hinglish / Hindi

```
BP ki dawa Amlodipine lene ke 2 ghante baad mujhe bahut chakkar aaya, sar dard ho raha tha aur haath kaanpne lage. Pata nahi kya hua.
```

---

## Tamil + English

```
Took Paracetamol for fever yesterday. Kaalailaye severe rash and itching on my arms. Couldn't sleep all night because of nausea.
```

---

## Marathi + English

```
Aai la Metformin dilyanantar don tasanni potat khup dukhayla lagla. Tila chakkari aali and breathing la problem hot hota. We took her to hospital.
```

---

# Output

For each post Pharmaco extracts:

- Drug Name
- Suspected ADR
- MedDRA Preferred Term
- Severity
- Seriousness
- Causality Assessment
- Confidence Score
- Structured JSON
- CDSCO/PvPI Draft Report

---

# Firestore Collections

## scan_sessions

Stores

- Original post
- Extracted ADR
- AI response
- Generated report
- Timestamp

---

## drug_stats

Stores aggregated statistics including

- Drug frequency
- ADR frequency
- Signal trends

---

# Cost

Average token cost:

```
~$0.001 per scan
```

Estimated usage:

| Credit | Approximate Scans |
|---------|-------------------:|
| $10 | ~10,000 |
| $25 | ~25,000 |
| $50 | ~50,000 |

---

# Future Improvements

- Voice-to-text ADR reporting
- OCR from handwritten prescriptions
- Signal trend visualization
- Duplicate ADR detection
- Geo-based ADR heatmaps
- WHO Vigibase integration
- Drug interaction prediction
- Batch social media ingestion
- Mobile application
- Automatic multilingual translation

---

# Contributing

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

---

# Acknowledgements

- Nebius AI Token Factory
- Firebase
- React
- Express.js
- WHO MedDRA
- CDSCO
- Pharmacovigilance Programme of India (PvPI)

---

## Authors

Built with ❤️ to improve pharmacovigilance by transforming multilingual social media posts into actionable drug safety insights using AI.
