// src/ai/flows/file-vs-text-check.ts
import 'server-only';

import { z } from 'zod';
import { ai } from '../genkit';
import { FileVsTextCheckOutputSchema } from './file-vs-text-check-types';

const FileVsTextCheckInputSchema = z.object({
  fileContent: z.string(),
  comparisonText: z.string(),
});

export const fileVsTextCheck = ai.defineFlow(
  {
    name: 'fileVsTextCheck',
    inputSchema: FileVsTextCheckInputSchema,
    outputSchema: FileVsTextCheckOutputSchema,
  },
  async (input) => {
    const prompt = `Compare the following file content with text for plagiarism:

File Content:
${input.fileContent}

Comparison Text:
${input.comparisonText}

Provide:
1. Similarity score (0-100)
2. Detailed analysis
3. Highlighted file content
4. Highlighted comparison text`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: FileVsTextCheckOutputSchema },
      config: { temperature: 0.5 },
    });

    if (!output) {
      return {
        similarityScore: 0,
        analysis: 'Unable to perform analysis. Please try again.',
        highlightedFileContent: input.fileContent,
        highlightedText: input.comparisonText,
      };
    }

    return output;
  }
);
