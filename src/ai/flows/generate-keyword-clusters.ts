'use server';

/**
 * @fileOverview A Genkit flow that takes a primary keyword and a list of secondary keywords and groups them into semantic clusters.
 *
 * - generateKeywordClusters - A function that returns a list of keyword clusters.
 * - GenerateKeywordClustersInput - The input type for the generateKeywordClusters function.
 * - GenerateKeywordClustersOutput - The return type for the generateKeywordClusters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKeywordClustersInputSchema = z.object({
  primaryKeyword: z.string().describe('The main keyword to base the clusters on.'),
  secondaryKeywords: z.array(z.string()).describe('A list of secondary keywords to be grouped.'),
});
export type GenerateKeywordClustersInput = z.infer<typeof GenerateKeywordClustersInputSchema>;

const ClusterSchema = z.object({
    clusterTitle: z.string().describe('A short, descriptive title for the keyword cluster.'),
    keywords: z.array(z.string()).describe('A list of keywords belonging to this cluster.'),
});

const GenerateKeywordClustersOutputSchema = z.object({
  clusters: z.array(ClusterSchema),
});
export type GenerateKeywordClustersOutput = z.infer<typeof GenerateKeywordClustersOutputSchema>;

export async function generateKeywordClusters(input: GenerateKeywordClustersInput): Promise<GenerateKeywordClustersOutput> {
  return generateKeywordClustersFlow(input);
}

const generateKeywordClustersPrompt = ai.definePrompt({
  name: 'generateKeywordClustersPrompt',
  input: {schema: GenerateKeywordClustersInputSchema},
  output: {schema: GenerateKeywordClustersOutputSchema},
  prompt: `You are an expert SEO strategist specializing in topic clusters. Your task is to group a list of secondary keywords into semantically relevant clusters around a primary keyword. Analyze the search intent (informational, transactional, navigational) and the entities within the keywords.

Primary Keyword: {{{primaryKeyword}}}

Secondary Keywords to Cluster:
{{#each secondaryKeywords}}- {{{this}}}
{{/each}}

Instructions:
1. Create logical clusters of keywords that would be targeted on the same page.
2. Each cluster should have a descriptive title that represents the core topic of that group.
3. Not all secondary keywords must be used. If a keyword doesn't fit well into any cluster, omit it.
4. The primary keyword might not appear in a cluster itself, but it provides the core context for the grouping.
`,
});

const generateKeywordClustersFlow = ai.defineFlow(
  {
    name: 'generateKeywordClustersFlow',
    inputSchema: GenerateKeywordClustersInputSchema,
    outputSchema: GenerateKeywordClustersOutputSchema,
  },
  async input => {
    const {output} = await generateKeywordClustersPrompt(input);
    return output!;
  }
);
