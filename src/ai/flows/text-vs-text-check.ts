import 'server-only';

import { z } from 'zod';
import { defineFlow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai';
import { textVsTextCheckPrompt } from './prompts';
import { TextVsTextCheckOutputSchema } from './text-vs-text-check-types';

const TextVsTextCheckInputSchema = z.object({
  sourceText: z.string(),
  comparisonText: z.string(),
});

export const textVsTextCheck = defineFlow(
  {
    name: 'textVsTextCheck',
    inputSchema: TextVsTextCheckInputSchema,
    outputSchema: TextVsTextCheckOutputSchema,
  },
  async (input) => {
    const prompt = textVsTextCheckPrompt(input);
    const llmResponse = await geminiPro.generate({
      prompt,
      config: { temperature: 0.5 },
    });
    return llmResponse.output();
  }
);
