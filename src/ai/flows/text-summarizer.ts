// src/ai/flows/text-summarizer.ts
import 'server-only';

import { z } from 'zod';
import { ai } from '../genkit';
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
    const prompt = `Summarize the following text in a ${input.length} format:

${input.text}

Provide:
1. A concise summary
2. Key points as a list`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: TextSummarizerOutputSchema },
      config: { temperature: 0.5 },
    });

    // ✅ Add null check
    if (!output) {
      return {
        summary: 'Unable to generate summary. Please try again.',
        keyPoints: [],
      };
    }

    return output;
  }
);
