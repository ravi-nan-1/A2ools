import { z } from 'zod';

export const AdvancedCheckOutputSchema = z.object({
  similarityScore: z.number().describe("A score from 0 to 100 representing the similarity between the two texts."),
  originalityScore: z.number().describe("A score from 0 to 100 representing the originality of the source text."),
  paraphrasingScore: z.number().describe("A score from 0 to 100 representing the likelihood of paraphrasing in the source text."),
  structuralSimilarityScore: z.number().describe("A score from 0 to 100 representing the structural similarity between the two texts."),
  highlightedSource: z.string().describe("The source text with sections that are plagiarized or paraphrased highlighted."),
  highlightedComparison: z.string().describe("The comparison text with sections similar to the source text highlighted."),
  analysis: z.string().describe("A detailed analysis of the similarities and originality of the texts."),
});

export type AdvancedCheckOutput = z.infer<typeof AdvancedCheckOutputSchema>;
