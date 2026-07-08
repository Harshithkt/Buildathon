# 🎤 PharmaCo: 2-Minute Demo Script

> **Goal:** Showcase the power of PharmaCo to detect ADRs from Indian languages, run inference using Groq's high-speed API, and instantly generate a CDSCO PvPI-ready PDF report.
> **Vibe:** Fast, confident, creative, and highly professional.

---

### ⏱️ [0:00 - 0:20] The Hook (Landing Page)
*(Screen: Landing Page)*
**Speaker:** 
"Every minute, millions of Indians share their health experiences online in regional languages—and critical Adverse Drug Reactions (ADRs) get lost in the noise. 

Welcome to **PharmaCo**. We are bringing real-time, AI-powered pharmacovigilance to the Indian subcontinent. Let me show you how we go from an unstructured social media post to a regulatory-ready draft report in under 30 seconds."

*(Action: Click "Open Dashboard")*

---

### ⏱️ [0:20 - 0:50] The Extraction (Dashboard & Input)
*(Screen: Dashboard Main View)*
**Speaker:** 
"Here’s our dashboard. We support Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, and Hinglish. 

Let's take a real-world example of a patient complaining about their blood pressure medication on Twitter in Hinglish."

*(Action: Paste the sample post: "BP ki dawa lene ke 2 ghante baad bahut chakkar aaya aur haath kaanpne lage")*

**Speaker:** 
"I just click *Analyse*. Behind the scenes, we're leveraging **Groq's LPU Interface** running state-of-the-art open LLMs (Llama-3.3-70B-Versatile). It’s rapidly translating the text, extracting drug mentions, and mapping the symptoms directly to the WHO MedDRA terminology."

*(Action: Wait for the 4-stage loading animation to complete)*

---

### ⏱️ [0:50 - 1:20] The Reveal (Results Panel)
*(Screen: Results load)*
**Speaker:** 
"Boom. In seconds, the AI has successfully processed the noisy text. 

Look at this—it correctly identified the suspected drug class, detected 'Dizziness' and 'Tremors', and crucially, matched them to their exact 8-digit **MedDRA codes**. 

It’s completely contextual. It flags the signal strength as 'Strong' and causality as 'Probable' based on the timeline mentioned in the post."

*(Action: Hover over the ADR cards to show the MedDRA tags)*

---

### ⏱️ [1:20 - 1:50] The Export (PvPI Report)
*(Screen: Scroll down to the PvPI Report section, click "Export Report")*
**Speaker:** 
"But detecting the signal is only half the battle. Reporting it is what saves lives. 

PharmaCo automatically drafts a report compliant with the **Pharmacovigilance Programme of India (PvPI)**. With one click, I export this directly into a beautifully formatted PDF."

*(Action: Open the downloaded PDF)*

**Speaker:** 
"Ready for review, ready for submission. No manual data entry, no language barriers."

---

### ⏱️ [1:50 - 2:00] The Close
*(Screen: Flash the History/Stats Ribbon)*
**Speaker:** 
"This is Pharmacovigilance scaled for a billion voices. Fast. Accurate. Multilingual. 

Thank you."

---

## 📝 Demo Checklist before presenting:
- [ ] Ensure backend is running (`node src/index.js`)
- [ ] Ensure frontend is running (`npm run dev`)
- [ ] Have the Hinglish text copied to your clipboard ready to paste
- [ ] Do a dry-run to ensure the PDF downloads perfectly
