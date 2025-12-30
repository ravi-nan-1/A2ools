'use client';

import { z } from 'zod';
import { defineFlow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai';
import { textSummarizerPrompt } from './prompts';
import { TextSummarizerOutputSchema } from './text-summarizer-types';

const TextSummarizerInputSchema = z.object({
  text: z.string(),
  length: z.enum(['short', 'medium', 'long']),
});

export const textSummarizer = defineFlow(
  {
    name: 'textSummarizer',
    inputSchema: TextSummarizerInputSchema,
    outputSchema: TextSummarizerOutputSchema,
  },
  async (input) => {
    const prompt = textSummarizerPrompt(input);
    const llmResponse = await geminiPro.generate({
      prompt,
      config: { temperature: 0.5 },
    });
    return llmResponse.output();
  }
);
