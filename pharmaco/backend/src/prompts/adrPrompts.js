export function buildExtractionPrompt(text) {
  const systemMessage = "You are a WHO pharmacovigilance analyst specialising in Indian-language adverse drug reaction detection. Extract ADR signals from social media text. Always respond with valid JSON only. No explanation, no markdown, no preamble.";
  
  const userMessage = `Analyse this social media post for adverse drug reactions. Extract every drug mentioned (brand or generic), every adverse symptom (translate to English), patient demographics if present, time-to-onset if mentioned, and severity signals from language intensity. Map each symptom to its closest MedDRA Preferred Term from this reference list: [Dizziness 10013573, Nausea 10028813, Vomiting 10047700, Headache 10019211, Rash 10037844, Fatigue 10016256, Chest pain 10008479, Tremor 10044565, Dyspnoea 10013968, Abdominal pain 10000081, Insomnia 10022437, Palpitations 10033557, Oedema 10030095, Pruritus 10037087, Dry mouth 10013781, Diarrhoea 10012735, Constipation 10010774, Blurred vision 10005886, Hypertension 10020772, Hypotension 10021097, Tachycardia 10043071, Bradycardia 10006093, Urticaria 10046735, Alopecia 10001760, Jaundice 10023126, Confusion 10010300, Anxiety 10002855, Depression 10012378, Weight gain 10047899, Weight loss 10047900].

Respond ONLY with this JSON structure:
{
  "drugs": ["drug name"],
  "adverse_events": [
    {
      "original_text": "exact phrase from post",
      "english_translation": "english meaning",
      "meddra_term": "MedDRA Preferred Term",
      "meddra_code": "8-digit code",
      "severity": "mild|moderate|severe",
      "onset_hours": number or null
    }
  ],
  "patient": {
    "age_mentioned": string or null,
    "gender_mentioned": string or null
  },
  "language_detected": "Hindi|Tamil|Telugu|Kannada|Bengali|Marathi|Hinglish|English",
  "causality_language": "string describing time/dose relationship mentioned or null"
}

Post to analyse: ${text}`;

  return [
    { role: "system", content: systemMessage },
    { role: "user", content: userMessage }
  ];
}

export function buildReportPrompt(extractedJSON, originalText) {
  const systemMessage = "You are a CDSCO pharmacovigilance officer generating structured ADR reports for India's Pharmacovigilance Programme (PvPI). Respond with valid JSON only.";
  
  const userMessage = `Given this extracted ADR data, generate: (1) a signal strength assessment, (2) a causality assessment using WHO-UMC criteria, (3) a CDSCO PvPI-compatible draft report, and (4) a recommended action.

Extracted data: ${extractedJSON}
Original post: ${originalText}

Respond ONLY with this JSON:
{
  "signal_strength": "strong|moderate|weak|noise",
  "signal_reasoning": "1-2 sentence explanation",
  "causality_assessment": {
    "category": "Certain|Probable|Possible|Unlikely|Unclassified",
    "who_umc_basis": "brief reasoning"
  },
  "pvpi_report": {
    "report_type": "Spontaneous",
    "source_type": "Social Media — Patient Report",
    "country": "India",
    "drugs_suspected": "[drug list]",
    "adverse_reactions": "[MedDRA terms]",
    "seriousness": "Serious|Non-serious",
    "outcome": "Unknown — patient self-reported",
    "narrative": "2-3 sentence clinical narrative in formal English"
  },
  "recommended_action": "string"
}`;

  return [
    { role: "system", content: systemMessage },
    { role: "user", content: userMessage }
  ];
}
