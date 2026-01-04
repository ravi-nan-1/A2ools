// src/ai/flows/advanced-check.ts
import 'server-only';

import { z } from 'zod';
import { ai } from '../genkit';
import { AdvancedCheckOutputSchema } from './advanced-check-types';

const AdvancedCheckInputSchema = z.object({
  sourceText: z.string(),
  comparisonText: z.string(),
});

export const advancedCheck = ai.defineFlow(
  {
    name: 'advancedCheck',
    inputSchema: AdvancedCheckInputSchema,
    outputSchema: AdvancedCheckOutputSchema,
  },
  async (input) => {
    const prompt = `Perform an advanced plagiarism analysis comparing these two texts:

Source Text:
${input.sourceText}

Comparison Text:
${input.comparisonText}

Provide:
1. A similarity score (0-100)
2. An originality score (0-100)
3. A paraphrasing score (0-100)
4. A structural similarity score (0-100)
5. Highlighted source text
6. Highlighted comparison text
7. Detailed analysis`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: AdvancedCheckOutputSchema },
      config: { temperature: 0.5 },
    });

    // ✅ Handle null case - return default values
    if (!output) {
      return {
        similarityScore: 0,
        originalityScore: 100,
        paraphrasingScore: 0,
        structuralSimilarityScore: 0,
        highlightedSource: input.sourceText,
        highlightedComparison: input.comparisonText,
        analysis: 'Unable to perform analysis. Please try again.',
      };
    }

    return output;
  }
);