'use server';

/**
 * @fileOverview A flow to extract key information from content, such as formulas, code snippets, and definitions.
 *
 * - extractKeyInformation - A function that orchestrates the extraction process.
 * - ExtractKeyInformationInput - The input type for the extractKeyInformation function.
 * - ExtractKeyInformationOutput - The return type for the extractKeyInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeyInformationInputSchema = z.object({
  contentType: z
    .string()
    .describe(
      'The type of content to extract key information from (e.g., math, react, business, medical, law, general).'
    ),
  rawText: z.string().describe('The raw text content to extract information from.'),
});

export type ExtractKeyInformationInput = z.infer<typeof ExtractKeyInformationInputSchema>;

const ExtractKeyInformationOutputSchema = z.object({
  title: z.string().describe('The title of the content.'),
  sections: z.string().describe('Key sections of the content.'),
  formula: z.string().describe('Important formulas found in the content.'),
  code: z.string().describe('Code snippets extracted from the content.'),
  points: z.string().describe('Key bullet points or concepts.'),
  examples: z.string().describe('Illustrative examples from the content.'),
  keynotes: z.string().describe('Important notes.'),
  definitions: z.string().describe('Definitions of key terms'),
  frameworks: z.string().describe('Key frameworks mentioned in the content'),
  steps: z.string().describe('Actionable steps outlined in the text.'),
  symptoms: z.string().describe('Symptoms described in the content.'),
  causes: z.string().describe('Causes outlined in the content.'),
  treatment: z.string().describe('Treatment options discussed.'),
  terms: z.string().describe('Important legal terms'),
  tips: z.string().describe('Helpful tips and tricks'),
  summary: z.string().describe('A concise summary of the content.'),
});

export type ExtractKeyInformationOutput = z.infer<typeof ExtractKeyInformationOutputSchema>;

export async function extractKeyInformation(input: ExtractKeyInformationInput): Promise<ExtractKeyInformationOutput> {
  return extractKeyInformationFlow(input);
}

const extractKeyInformationPrompt = ai.definePrompt({
  name: 'extractKeyInformationPrompt',
  input: {schema: ExtractKeyInformationInputSchema},
  output: {schema: ExtractKeyInformationOutputSchema},
  prompt: `You are an AI expert at extracting key information from various types of content to create concise and effective cheat sheets.

  Analyze the following text and extract the most important concepts, formulas, code snippets, definitions, and examples relevant to the content type.
  Organize the extracted information into the appropriate output fields, ensuring that the cheat sheet is easy to understand and visually appealing.

  Content Type: {{{contentType}}}
  Raw Text: {{{rawText}}}
  
  Output the information in JSON format.
  `,
});

const extractKeyInformationFlow = ai.defineFlow(
  {
    name: 'extractKeyInformationFlow',
    inputSchema: ExtractKeyInformationInputSchema,
    outputSchema: ExtractKeyInformationOutputSchema,
  },
  async input => {
    const {output} = await extractKeyInformationPrompt(input);
    return output!;
  }
);
