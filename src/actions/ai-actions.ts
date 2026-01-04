'use server';

import { textSummarizer } from '@/ai/flows/text-summarizer';
import { fileVsTextCheck } from '@/ai/flows/file-vs-text-check';
import { aiContextualAnalysis } from '@/ai/flows/ai-contextual-analysis';

export async function runTextSummarizer(text: string, length: 'short' | 'medium' | 'long') {
  return await textSummarizer({ text, length });
}

export async function runFileVsTextCheck(fileContent: string, text: string) {
  return await fileVsTextCheck({ fileContent, text });
}

export async function runAIContextualAnalysis(text: string) {
  return await aiContextualAnalysis({ text });
}
