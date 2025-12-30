import { z } from 'zod';

export const AIContextualAnalysisOutputSchema = z.object({
  originalityScore: z.number().describe("A score from 0 to 100 representing the originality of the text."),
  paraphrasingScore: z.number().describe("A score from 0 to 100 representing the likelihood of paraphrasing."),
  structuralSimilarityScore: z.number().describe("A score from 0 to 100 representing the structural similarity to other texts."),
  highlightedText: z.string().describe("The text with sections that are likely paraphrased or structurally similar highlighted."),
  analysis: z.string().describe("A detailed analysis of the text's originality."),
});

export type AIContextualAnalysisOutput = z.infer<typeof AIContextualAnalysisOutputSchema>;
