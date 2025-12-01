
'use server';
/**
 * @fileOverview A Genkit flow for generating mock webhook payloads.
 *
 * - generateWebhookPayload - Generates a realistic webhook payload for a given service.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WebhookPayloadInputSchema = z.object({
  type: z.enum(['github', 'stripe']).describe('The type of webhook payload to generate (e.g., github, stripe).'),
});

const WebhookPayloadOutputSchema = z.object({
  payload: z.any().describe('The generated JSON payload for the webhook.'),
});

export async function generateWebhookPayload(input: z.infer<typeof WebhookPayloadInputSchema>): Promise<z.infer<typeof WebhookPayloadOutputSchema>> {
  return generateWebhookPayloadFlow(input);
}

const generateWebhookPayloadPrompt = ai.definePrompt(
  {
    name: 'generateWebhookPayloadPrompt',
    input: { schema: WebhookPayloadInputSchema },
    output: { schema: WebhookPayloadOutputSchema },
    prompt: `Generate a realistic and valid JSON payload for a webhook.

- If the type is 'github', generate a payload for a 'push' event to the main branch, including repository details, commit information, and pusher data.
- If the type is 'stripe', generate a payload for a 'payment_intent.succeeded' event, including a payment intent object with amount, currency, customer, and card details.

Return ONLY the JSON object for the payload.

Webhook Type: {{{type}}}
`,
  },
);

const generateWebhookPayloadFlow = ai.defineFlow(
  {
    name: 'generateWebhookPayloadFlow',
    inputSchema: WebhookPayloadInputSchema,
    outputSchema: WebhookPayloadOutputSchema,
  },
  async (input) => {
    const { output } = await generateWebhookPayloadPrompt(input);
    return output!;
  }
);
