'use server';
/**
 * @fileOverview A Genkit flow for translating text content.
 *
 * - translateContent - A function that translates text to a specified language.
 * - TranslateContentInput - The input type for the translateContent function.
 * - TranslateContentOutput - The return type for the translateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateContentInputSchema = z.object({
  content: z.string().describe('The text content to be translated.'),
  targetLanguage: z.string().describe('The target language for translation (e.g., "Spanish", "Chinese").'),
});
export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;

const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated text content.'),
});
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;

export async function translateContent(input: TranslateContentInput): Promise<TranslateContentOutput> {
  return translateContentFlow(input);
}

const translateContentPrompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: {schema: TranslateContentInputSchema},
  output: {schema: TranslateContentOutputSchema},
  prompt: `Translate the following content into {{{targetLanguage}}}. Only return the translated text, without any additional explanations or formatting.

Content to translate:
{{{content}}}
`,
});

const translateContentFlow = ai.defineFlow(
  {
    name: 'translateContentFlow',
    inputSchema: TranslateContentInputSchema,
    outputSchema: TranslateContentOutputSchema,
  },
  async input => {
    const {output} = await translateContentPrompt(input);
    return output!;
  }
);
