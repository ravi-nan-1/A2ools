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
    const prompt = `Perform a contextual analysis on the following text:

${input.text}

Provide a detailed contextual analysis including:
1. Main themes and topics
2. Writing style and tone
3. Target audience
4. Key insights`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: AIContextualAnalysisOutputSchema },
      config: { temperature: 0.5 },
    });

    if (!output) {
      return {
        analysis: 'Unable to perform contextual analysis. Please try again.',
        themes: [],
        tone: 'neutral',
        insights: [],
      };
    }

    return output;
  }
);