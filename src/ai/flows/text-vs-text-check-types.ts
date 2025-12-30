import { z } from 'zod';

export const TextVsTextCheckOutputSchema = z.object({
  similarityScore: z.number().describe("A score from 0 to 100 representing the similarity between the two texts."),
  highlightedSource: z.string().describe("The source text with plagiarized sections highlighted."),
  highlightedComparison: z.string().describe("The comparison text with sections similar to the source text highlighted."),
  analysis: z.string().describe("A detailed analysis of the similarities between the two texts."),
});

export type TextVsTextCheckOutput = z.infer<typeof TextVsTextCheckOutputSchema>;
