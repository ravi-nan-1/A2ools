'use server';

/**
 * @fileOverview A Genkit flow that takes a primary keyword and a list of secondary keywords and groups them into semantic clusters with advanced SEO metrics.
 *
 * - generateKeywordClusters - A function that returns a list of keyword clusters with intent and difficulty scores.
 * - GenerateKeywordClustersInput - The input type for the generateKeywordClusters function.
 * - GenerateKeywordClustersOutput - The return type for the generateKeywordClusters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKeywordClustersInputSchema = z.object({
  primaryKeyword: z.string().describe('The main, overarching keyword that defines the core topic.'),
  secondaryKeywords: z.array(z.string()).describe('A list of secondary and long-tail keywords to be grouped.'),
});
export type GenerateKeywordClustersInput = z.infer<typeof GenerateKeywordClustersInputSchema>;

const ClusterSchema = z.object({
    clusterTitle: z.string().describe('A short, descriptive title for the keyword cluster that captures its main theme.'),
    parentTopic: z.string().describe('The broader parent topic or category this cluster belongs to. This might be the primary keyword or a more general theme.'),
    intent: z.enum(['Informational', 'Transactional', 'Commercial', 'Navigational', 'Unknown']).describe('The most likely user search intent for this cluster.'),
    relevanceScore: z.number().min(0).max(100).describe('A score from 0-100 indicating how semantically related the keywords in the cluster are to each other.'),
    difficultyScore: z.number().min(0).max(100).describe('An estimated SEO difficulty score from 0-100 for ranking for the keywords in this cluster, where 0 is easy and 100 is very difficult.'),
    keywords: z.array(z.string()).describe('A list of keywords from the input that belong to this cluster.'),
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
  prompt: `You are an expert SEO strategist specializing in topic clusters and semantic keyword analysis. Your task is to group a list of secondary keywords into highly relevant, semantically-sound clusters around a primary keyword.

For each cluster, you must:
1.  **Create a Cluster Title:** A short, descriptive title that represents the core topic of that group.
2.  **Assign a Parent Topic:** Identify the broader category. This will often be the primary keyword or a more general theme.
3.  **Determine User Intent:** Analyze the search intent and classify it as Informational, Transactional, Commercial, or Navigational.
4.  **Score Relevance:** Provide a "Relevance Score" (0-100) indicating how semantically cohesive the keywords within the cluster are. A high score means they are very closely related.
5.  **Estimate SEO Difficulty:** Provide a "Difficulty Score" (0-100) estimating how difficult it would be to rank for the keywords in this cluster.
6.  **Group Keywords:** List the keywords from the input that belong to this cluster. Group both exact match and broad match variations.

**Primary Keyword (Core Context):** {{{primaryKeyword}}}

**Secondary Keywords to Cluster:**
{{#each secondaryKeywords}}- {{{this}}}
{{/each}}

Instructions:
- Create logical clusters that would be targeted by a single, comprehensive piece of content.
- Think about SERP similarity: keywords that would likely show similar search results should be grouped together.
- Not all secondary keywords must be used. If a keyword doesn't fit well into any cluster, omit it.
- Ensure the scores are plausible and reflect a deep understanding of SEO principles.
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
