'use client';

import { z } from 'zod';
import { defineFlow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai';
import { advancedCheckPrompt } from './prompts';
import { AdvancedCheckOutputSchema } from './advanced-check-types';

const AdvancedCheckInputSchema = z.object({
  sourceText: z.string(),
  comparisonText: z.string(),
});

export const advancedCheck = defineFlow(
  {
    name: 'advancedCheck',
    inputSchema: AdvancedCheckInputSchema,
    outputSchema: AdvancedCheckOutputSchema,
  },
  async (input) => {
    const prompt = advancedCheckPrompt(input);
    const llmResponse = await geminiPro.generate({
      prompt,
      config: { temperature: 0.5 },
    });
    return llmResponse.output();
  }
);
