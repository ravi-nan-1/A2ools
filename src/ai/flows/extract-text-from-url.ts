'use server';
/**
 * @fileOverview A flow to extract text from a URL.
 *
 * - extractTextFromUrl - A function that scrapes a URL and returns the text.
 * - ExtractTextFromUrlInput - The input type for the extractTextFromUrl function.
 * - ExtractTextFromUrlOutput - The return type for the extractTextFromUrl function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as cheerio from 'cheerio';

const ExtractTextFromUrlInputSchema = z.object({
  url: z.string().url().describe('The URL to scrape.'),
});
export type ExtractTextFromUrlInput = z.infer<typeof ExtractTextFromUrlInputSchema>;

const ExtractTextFromUrlOutputSchema = z.object({
  text: z.string().describe('The extracted text from the URL.'),
});
export type ExtractTextFromUrlOutput = z.infer<typeof ExtractTextFromUrlOutputSchema>;

export async function extractTextFromUrl(input: ExtractTextFromUrlInput): Promise<ExtractTextFromUrlOutput> {
  return extractTextFromUrlFlow(input);
}

const extractTextFromUrlFlow = ai.defineFlow(
  {
    name: 'extractTextFromUrlFlow',
    inputSchema: ExtractTextFromUrlInputSchema,
    outputSchema: ExtractTextFromUrlOutputSchema,
  },
  async ({ url }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }
      const html = await response.text();
      const $ = cheerio.load(html);

      // Remove script and style elements
      $('script, style, nav, footer, header, aside').remove();

      // Get text from the body, attempting to get main content
      let text =
        $('main').text() ||
        $('article').text() ||
        $('body').text();
        
      // Clean up the text
      text = text.replace(/\s\s+/g, ' ').replace(/\n\s*\n/g, '\n').trim();

      if (!text) {
        return { text: '' };
      }

      return { text };
    } catch (error: any) {
      console.error(`Error scraping ${url}:`, error);
      throw new Error(`Could not process the URL. It might be invalid or the server is blocking requests. Error: ${error.message}`);
    }
  }
);
