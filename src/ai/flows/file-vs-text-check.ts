'use client';

import { z } from 'zod';
import { defineFlow, runFlow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai';
import { fileVsTextCheckPrompt } from './prompts';
import { FileVsTextCheckOutputSchema } from './file-vs-text-check-types';

const FileVsTextCheckInputSchema = z.object({
  fileContent: z.string(),
  text: z.string(),
});

export const fileVsTextCheck = defineFlow(
  {
    name: 'fileVsTextCheck',
    inputSchema: FileVsTextCheckInputSchema,
    outputSchema: FileVsTextCheckOutputSchema,
  },
  async (input) => {
    const prompt = fileVsTextCheckPrompt(input);
    const llmResponse = await geminiPro.generate({
      prompt,
      config: { temperature: 0.5 },
    });
    return llmResponse.output();
  }
);
