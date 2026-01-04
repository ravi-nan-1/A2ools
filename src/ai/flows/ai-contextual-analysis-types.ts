// src/ai/flows/ai-contextual-analysis.ts
import 'server-only';

import { z } from 'zod';
import { ai } from '../genkit';
import { AIContextualAnalysisOutputSchema } from './ai-contextual-analysis-types';

const AIContextualAnalysisInputSchema = z.object({
  text: z.string(),
});

export const aiContextualAnalysis = ai.defineFlow(
  {
    name: 'aiContextualAnalysis',
    inputSchema: AIContextualAnalysisInputSchema,
    outputSchema: AIContextualAnalysisOutputSchema,
  },
  async (input) => {
    const prompt = `Perform a contextual analysis on the following text to detect originality, paraphrasing, and structural similarity:

Text:
${input.text}

Provide:
1. Originality score (0-100): How original is this text?
2. Paraphrasing score (0-100): How likely is it that this text is paraphrased from other sources?
3. Structural similarity score (0-100): How similar is the structure to common patterns?
4. Highlighted text: Mark sections that appear paraphrased or structurally similar
5. Detailed analysis of the text's originality`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: AIContextualAnalysisOutputSchema },
      config: { temperature: 0.5 },
    });

    if (!output) {
      return {
        originalityScore: 50,
        paraphrasingScore: 0,
        structuralSimilarityScore: 0,
        highlightedText: input.text,
        analysis: 'Unable to perform contextual analysis. Please try again.',
      };
    }

    return output;
  }
);