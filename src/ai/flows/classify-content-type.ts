'use server';

/**
 * @fileOverview Content type classifier AI agent.
 *
 * - classifyContentType - A function that classifies content type.
 * - ClassifyContentTypeInput - The input type for the classifyContentType function.
 * - ClassifyContentTypeOutput - The return type for the classifyContentType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyContentTypeInputSchema = z.object({
  text: z.string().describe('The text content to classify.'),
});
export type ClassifyContentTypeInput = z.infer<typeof ClassifyContentTypeInputSchema>;

const ClassifyContentTypeOutputSchema = z.object({
  content_type: z
    .enum([
      'math',
      'programming',
      'react',
      'computer science theory',
      'marketing',
      'business',
      'medical',
      'law',
      'general',
    ])
    .describe('The classified content type.'),
  confidence: z.number().describe('The confidence level of the classification (0-1).'),
  reason: z.string().describe('The reason for the classification.'),
});
export type ClassifyContentTypeOutput = z.infer<typeof ClassifyContentTypeOutputSchema>;

export async function classifyContentType(input: ClassifyContentTypeInput): Promise<ClassifyContentTypeOutput> {
  return classifyContentTypeFlow(input);
}

const classifyContentTypePrompt = ai.definePrompt({
  name: 'classifyContentTypePrompt',
  input: {schema: ClassifyContentTypeInputSchema},
  output: {schema: ClassifyContentTypeOutputSchema},
  prompt: `You are an AI specialized in classifying the content type of a given text.\nAnalyze the text and classify which subject it belongs to. Return a JSON object with the following format:\n\n{
  "content_type": "...", // Possible values: math, programming, react, computer science theory, marketing, business, medical, law, general
  "confidence": 0.0, // The confidence level of the classification (0-1)
  "reason": "..." // The reason for the classification
}\n\nConsider the following keywords for each category:\n\nMath / Physics: formula, theorem, ∑, ∫, derivative, equation, matrix
Programming: code blocks, function(), <div>, React, JS, Python
React: useState, useEffect, JSX, component
Computer Science Theory: algorithm, time complexity, big O
Marketing / Business: funnel, ROI, strategy, case study
Medical: symptoms, diagnosis, treatment
Law: article, section, act, legal term
General Study: paragraphs + definitions\n\nText to classify: {{{text}}}`,
});

const classifyContentTypeFlow = ai.defineFlow(
  {
    name: 'classifyContentTypeFlow',
    inputSchema: ClassifyContentTypeInputSchema,
    outputSchema: ClassifyContentTypeOutputSchema,
  },
  async input => {
    const {output} = await classifyContentTypePrompt(input);
    return output!;
  }
);
