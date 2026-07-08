import OpenAI from 'openai';
import { buildExtractionPrompt, buildReportPrompt } from '../prompts/adrPrompts.js';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.GROQ_BASE_URL
});

// Strip <think>...</think> blocks from thinking models like Qwen3
function stripThinkingBlocks(content) {
  return content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

// Extract clean JSON from model output (handles markdown fences and thinking blocks)
function parseModelJSON(rawContent) {
  let content = stripThinkingBlocks(rawContent);
  
  // Strip markdown code fences if present
  if (content.startsWith('```json')) {
    content = content.substring(7);
    content = content.substring(0, content.lastIndexOf('```')).trim();
  } else if (content.startsWith('```')) {
    content = content.substring(3);
    content = content.substring(0, content.lastIndexOf('```')).trim();
  }

  return JSON.parse(content);
}

export async function extractADR(text) {
  try {
    const messages = buildExtractionPrompt(text);
    const response = await openai.chat.completions.create({
      model: process.env.EXTRACTION_MODEL,
      messages: messages,
      temperature: 0.1,
      max_tokens: 1000
    });
    
    const content = response.choices[0].message.content;
    return parseModelJSON(content);
  } catch (error) {
    throw new Error(`Extraction failed: ${error.message || error}`);
  }
}

export async function generateReport(extractedData, originalText) {
  try {
    const messages = buildReportPrompt(JSON.stringify(extractedData), originalText);
    const response = await openai.chat.completions.create({
      model: process.env.REASONING_MODEL,
      messages: messages,
      temperature: 0.2,
      max_tokens: 1200
    });

    const content = response.choices[0].message.content;
    return parseModelJSON(content);
  } catch (error) {
    throw new Error(`Report generation failed: ${error.message || error}`);
  }
}

