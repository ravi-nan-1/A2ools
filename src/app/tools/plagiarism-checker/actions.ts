'use server';

import { textVsTextCheck } from '@/ai/flows/text-vs-text-check';
import { z } from 'zod';

const formSchema = z.object({
  sourceText: z.string().min(1),
  comparisonText: z.string().min(1),
});

export async function checkPlagiarismAction(values: z.infer<typeof formSchema>) {
  const parsedValues = formSchema.parse(values);
  const result = await textVsTextCheck(parsedValues);
  return result;
}
