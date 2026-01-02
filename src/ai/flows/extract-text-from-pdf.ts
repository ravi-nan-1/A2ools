'use server';
/**
 * @fileOverview A flow to extract text from a PDF file.
 *
 * - extractTextFromPdf - A function that parses a PDF and returns the text.
 * - ExtractTextFromPdfInput - The input type for the extractTextFromPdf function.
 * - ExtractTextFromPdfOutput - The return type for the extractTextFromPdf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import pdf from 'pdf-parse';

const ExtractTextFromPdfInputSchema = z.object({
  pdf: z.string().describe("A PDF file encoded as a data URI. Expected format: 'data:application/pdf;base64,<encoded_data>'."),
});
export type ExtractTextFromPdfInput = z.infer<typeof ExtractTextFromPdfInputSchema>;

const ExtractTextFromPdfOutputSchema = z.object({
  text: z.string().describe('The extracted text from the PDF.'),
  numPages: z.number().describe('The total number of pages in the PDF.'),
});
export type ExtractTextFromPdfOutput = z.infer<typeof ExtractTextFromPdfOutputSchema>;

export async function extractTextFromPdf(input: ExtractTextFromPdfInput): Promise<ExtractTextFromPdfOutput> {
  return extractTextFromPdfFlow(input);
}

const extractTextFromPdfFlow = ai.defineFlow(
  {
    name: 'extractTextFromPdfFlow',
    inputSchema: ExtractTextFromPdfInputSchema,
    outputSchema: ExtractTextFromPdfOutputSchema,
  },
  async ({ pdf: pdfDataUri }) => {
    // Extract the base64 part of the data URI
    const base64Data = pdfDataUri.split(',')[1];
    if (!base64Data) {
      throw new Error('Invalid PDF data URI: Missing base64 content.');
    }
    
    const pdfBuffer = Buffer.from(base64Data, 'base64');
    const data = await pdf(pdfBuffer);

    // Clean up the extracted text
    let text = data.text;
    text = text.replace(/\s\s+/g, ' ').replace(/\n\s*\n/g, '\n').trim();

    if (!text) {
      throw new Error('Could not extract any text from the PDF. The file might be image-based or empty.');
    }

    return { text, numPages: data.numpages };
  }
);
