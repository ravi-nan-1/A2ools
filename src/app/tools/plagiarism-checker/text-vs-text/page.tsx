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
import { useToast } from '@/hooks/use-toast';
import { textVsTextCheck } from '@/ai/flows/text-vs-text-check';
import type { TextVsTextCheckOutput } from '@/ai/flows/text-vs-text-check-types';
import PlagiarismCheckerLayout from '../plagiarism-checker-layout';

const formSchema = z.object({
  sourceText: z.string().min(1, { message: 'Source text is required.' }),
  comparisonText: z.string().min(1, { message: 'Comparison text is required.' }),
});

export default function TextVsTextPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TextVsTextCheckOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceText: '',
      comparisonText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await textVsTextCheck(values);
      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with the analysis. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PlagiarismCheckerLayout>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Compare Two Texts</h2>
        <p className="text-gray-500 mb-6">Enter two pieces of text below to check for similarities.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sourceText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste the source text here..." className="min-h-[200px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comparisonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comparison Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste the text to compare here..." className="min-h-[200px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Check for Plagiarism
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Analysis Result</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><span className="font-semibold">Similarity Score:</span> {result.similarityScore}%</p>
              <p className="font-semibold mt-4">Analysis:</p>
              <p>{result.analysis}</p>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold">Highlighted Source Text</h4>
                  <div className="mt-2 p-2 border rounded-md whitespace-pre-wrap">{result.highlightedSource}</div>
                </div>
                <div>
                  <h4 className="font-semibold">Highlighted Comparison Text</h4>
                  <div className="mt-2 p-2 border rounded-md whitespace-pre-wrap">{result.highlightedComparison}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlagiarismCheckerLayout>
  );
}
