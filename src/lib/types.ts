import { z } from 'zod';

export const PageContentSchema = z.object({
  description: z.string().describe('The main description of the tool.'),
  faq: z.string().describe('The Frequently Asked Questions content.'),
  features: z.array(z.string()).describe('A list of tool features.'),
  howItWorks: z.array(z.string()).describe('A list of steps explaining how the tool works.'),
  useCases: z.array(z.string()).describe('A list of common use cases for the tool.'),
});
export type PageContent = z.infer<typeof PageContentSchema>;
