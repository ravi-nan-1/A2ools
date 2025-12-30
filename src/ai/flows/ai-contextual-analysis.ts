'use client';

import { z } from 'zod';
import { defineFlow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai';
import { aiContextualAnalysisPrompt } from './prompts';
import { AIContextualAnalysisOutputSchema } from './ai-contextual-analysis-types';

const AIContextualAnalysisInputSchema = z.object({
  text: z.string(),
});

export const aiContextualAnalysis = defineFlow(
  {
    name: 'aiContextualAnalysis',
    inputSchema: AIContextualAnalysisInputSchema,
    outputSchema: AIContextualAnalysisOutputSchema,
  },
  async (input) => {
    const prompt = aiContextualAnalysisPrompt(input);
    const llmResponse = await geminiPro.generate({
      prompt,
      config: { temperature: 0.5 },
    });
    return llmResponse.output();
  }
);
