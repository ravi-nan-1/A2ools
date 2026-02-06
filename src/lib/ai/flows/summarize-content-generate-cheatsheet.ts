'use server';

/**
 * Summarizes content and generates a subject-aware cheat sheet.
 */

import { ai } from '@/lib/ai/genkit';
import { z } from 'genkit';

/* -------------------------------------------------
 * ENUMS
 * ------------------------------------------------- */

const ContentType = z.enum([
  'math',
  'react',
  'business',
  'medical',
  'law',
  'general',
  'programming',
  'computer_science_theory',
]);

/* -------------------------------------------------
 * INPUT / OUTPUT SCHEMAS
 * ------------------------------------------------- */

const SummarizeContentAndGenerateCheatSheetInputSchema = z.object({
  text: z.string().min(1, 'Input text cannot be empty'),
  targetLanguage: z.string().optional().default('English'),
});

export type SummarizeContentAndGenerateCheatSheetInput = z.infer<
  typeof SummarizeContentAndGenerateCheatSheetInputSchema
>;

const SummarizeContentAndGenerateCheatSheetOutputSchema = z.object({
  contentType: ContentType,
  cheatSheetHtml: z.string().min(1),
  error: z.string().optional(),
});

export type SummarizeContentAndGenerateCheatSheetOutput = z.infer<
  typeof SummarizeContentAndGenerateCheatSheetOutputSchema
>;

/* -------------------------------------------------
 * PROMPTS
 * ------------------------------------------------- */

const detectContentTypePrompt = ai.definePrompt({
  name: 'detectContentTypePrompt',
  input: {
    schema: z.object({
      text: z.string(),
    }),
  },
  output: {
    schema: z.object({
      contentType: ContentType,
      reason: z.string(),
    }),
  },
  prompt: `
Analyze the text and classify the subject.

Return ONLY valid JSON in this format:
{
  "contentType": "...",
  "reason": "..."
}

Text:
{{{text}}}
`,
});

const generateCheatSheetPrompt = ai.definePrompt({
  name: 'generateCheatSheetPrompt',
  input: {
    schema: z.object({
      text: z.string(),
      contentType: ContentType,
      targetLanguage: z.string(),
    }),
  },
  output: {
    schema: z.object({
      html: z.string().min(1),
    }),
  },
  prompt: `
You are an AI that creates concise, visual cheat sheets.

CRITICAL RULES:
- Output ONLY raw HTML (no markdown, no JSON)
- Must be a valid, non-empty HTML string
- If generation is impossible, return:
  <div class="error">User-friendly error message</div>

Language: {{{targetLanguage}}}
Content Type: {{{contentType}}}

Text:
{{{text}}}

Guidelines:
- Short and easy to scan
- Clear headings
- Colored sections
- Highlight formulas, code, or definitions
`,
});

/* -------------------------------------------------
 * FLOW
 * ------------------------------------------------- */

const summarizeContentAndGenerateCheatSheetFlow = ai.defineFlow(
  {
    name: 'summarizeContentAndGenerateCheatSheetFlow',
    inputSchema: SummarizeContentAndGenerateCheatSheetInputSchema,
    outputSchema: SummarizeContentAndGenerateCheatSheetOutputSchema,
  },
  async input => {
    /* -------- Detect content type -------- */

    let contentType: z.infer<typeof ContentType> = 'general';

    try {
      const result = await detectContentTypePrompt({ text: input.text });
      if (result.output?.contentType) {
        contentType = result.output.contentType;
      }
    } catch (err) {
      console.error('Content type detection failed:', err);
    }

    /* -------- Generate cheat sheet -------- */

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await generateCheatSheetPrompt({
          text: input.text,
          contentType,
          targetLanguage: input.targetLanguage,
        });

        const html = result.output?.html;

        if (!html) {
          throw new Error('Empty HTML response');
        }

        return {
          contentType,
          cheatSheetHtml: html,
        };
      } catch (err) {
        lastError = err as Error;
        console.error(`Attempt ${attempt} failed:`, err);
        await new Promise(res => setTimeout(res, attempt * 1000));
      }
    }

    /* -------- Final fallback -------- */

    return {
      contentType,
      cheatSheetHtml: `
        <div class="error">
          Failed to generate cheat sheet. Please try again later.
        </div>
      `,
      error: lastError?.message ?? 'Unknown error',
    };
  }
);

/* -------------------------------------------------
 * PUBLIC EXPORT
 * ------------------------------------------------- */

export async function summarizeContentAndGenerateCheatSheet(
  input: SummarizeContentAndGenerateCheatSheetInput
): Promise<SummarizeContentAndGenerateCheatSheetOutput> {
  return summarizeContentAndGenerateCheatSheetFlow(input);
}
