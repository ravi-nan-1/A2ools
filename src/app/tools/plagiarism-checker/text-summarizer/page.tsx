// src/app/tools/plagiarism-checker/text-summarizer/page.tsx
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlagiarismChecker } from '../plagiarism-checker';

// ❌ REMOVED:
// import { textSummarizer } from '@/ai/flows/text-summarizer';
// import type { TextSummarizerOutput } from '@/ai/flows/text-summarizer-types';

// ✅ ADD TYPE INLINE:
interface TextSummarizerOutput {
  summary: string;
  keyPoints: string[];
}

const formSchema = z.object({
  text: z.string().min(1, { message: 'Text is required.' }),
  length: z.enum(['short', 'medium', 'long']),
});

export default function TextSummarizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TextSummarizerOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      length: 'medium',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      // ✅ USE API ROUTE INSTEAD OF DIRECT IMPORT
      const response = await fetch('/api/text-summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to summarize text');
      }

      const summarizationResult = await response.json();
      setResult(summarizationResult);
    } catch (error) {
      console.error("Summarization failed:", error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with the summarization. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PlagiarismChecker>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Text Summarizer</h2>
        <p className="text-gray-500 mb-6">Summarize a long piece of text into a few key sentences.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text to Summarize</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your text here..." className="min-h-[200px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary Length</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Summarize Text
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Summarization Result</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Summary:</p>
              <p>{result.summary}</p>
              <div className="mt-4">
                <h4 className="font-semibold">Key Points</h4>
                <ul className="list-disc list-inside mt-2">
                  {result.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlagiarismChecker>
  );
}