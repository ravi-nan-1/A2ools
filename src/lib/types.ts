import { z } from 'zod';

export const PageContentSchema = z.object({
  longDescription: z.string().describe("The main description of the tool."),
  faq: z.string().describe('The Frequently Asked Questions content.'),
  features: z.string().describe('A list of tool features, separated by newlines.'),
  howItWorks: z.string().describe('A list of steps explaining how the tool works, separated by newlines.'),
  useCases: z.string().describe('A list of common use cases for the tool, separated by newlines.'),
});
export type PageContent = z.infer<typeof PageContentSchema>;
