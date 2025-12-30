import { z } from 'zod';

export const TextSummarizerOutputSchema = z.object({
  summary: z.string().describe("The summarized text."),
  keyPoints: z.array(z.string()).describe("A list of key points from the text."),
});

export type TextSummarizerOutput = z.infer<typeof TextSummarizerOutputSchema>;
