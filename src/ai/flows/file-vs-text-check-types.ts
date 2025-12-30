import { z } from 'zod';

export const FileVsTextCheckOutputSchema = z.object({
  similarityScore: z.number().describe("A score from 0 to 100 representing the similarity between the file content and the text."),
  highlightedFileContent: z.string().describe("The file content with plagiarized sections highlighted."),
  highlightedText: z.string().describe("The text with sections similar to the file content highlighted."),
  analysis: z.string().describe("A detailed analysis of the similarities between the file content and the text."),
});

export type FileVsTextCheckOutput = z.infer<typeof FileVsTextCheckOutputSchema>;
