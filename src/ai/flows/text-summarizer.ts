// src/ai/flows/text-summarizer.ts
import 'server-only';

import { z } from 'zod';
import { gemini15Pro } from '@genkit-ai/googleai';
import { ai } from '../genkit';
import { textSummarizerPrompt } from './prompts';
import { TextSummarizerOutputSchema } from './text-summarizer-types';

const TextSummarizerInputSchema = z.object({
  text: z.string(),
  length: z.enum(['short', 'medium', 'long']),
});

export const textSummarizer = ai.defineFlow(
  {
    name: 'textSummarizer',
    inputSchema: TextSummarizerInputSchema,
    outputSchema: TextSummarizerOutputSchema,
  },
  async (input) => {
    const prompt = textSummarizerPrompt(input);

    const { output } = await ai.generate({
      model: gemini15Pro,
      prompt,
      config: { temperature: 0.5 },
      output: { schema: TextSummarizerOutputSchema },
    });

    return output;
  }
);