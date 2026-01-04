// src/ai/flows/text-vs-text-check.ts
import 'server-only';

import { z } from 'zod';
import { ai } from '../genkit';
import { TextVsTextCheckOutputSchema } from './text-vs-text-check-types';

const TextVsTextCheckInputSchema = z.object({
  sourceText: z.string(),
  comparisonText: z.string(),
});

export const textVsTextCheck = ai.defineFlow(
  {
    name: 'textVsTextCheck',
    inputSchema: TextVsTextCheckInputSchema,
    outputSchema: TextVsTextCheckOutputSchema,
  },
  async (input) => {
    const prompt = `Compare the following two texts for plagiarism and similarity:

Source Text:
${input.sourceText}

Comparison Text:
${input.comparisonText}

Provide:
1. Similarity score (0-100)
2. Detailed analysis
3. Highlighted source text
4. Highlighted comparison text`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: TextVsTextCheckOutputSchema },
      config: { temperature: 0.5 },
    });

    if (!output) {
      return {
        similarityScore: 0,
        analysis: 'Unable to perform analysis. Please try again.',
        highlightedSource: input.sourceText,
        highlightedComparison: input.comparisonText,
      };
    }

    return output;
  }
);
