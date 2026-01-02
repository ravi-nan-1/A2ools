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
import type { AdvancedCheckOutput } from '@/ai/flows/advanced-check-types';
import { PlagiarismChecker } from '../plagiarism-checker';

const formSchema = z.object({
  sourceText: z.string().min(1, { message: 'Source text is required.' }),
  comparisonText: z.string().min(1, { message: 'Comparison text is required.' }),
});

export default function AdvancedCheckPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdvancedCheckOutput | null>(null);
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
      const response = await fetch('/api/advanced-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysisResult = await response.json();
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
    <PlagiarismChecker>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Advanced Plagiarism Check</h2>
        <p className="text-gray-500 mb-6">Get a comprehensive analysis of two texts, including originality and paraphrasing scores.</p>
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
                      <Textarea placeholder="Paste your source text here..." className="min-h-[200px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comparisonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comparison Text</Label>
                    <FormControl>
                      <Textarea placeholder="Paste your comparison text here..." className="min-h-[200px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Run Advanced Check
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Analysis Result</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="font-semibold text-lg">{result.similarityScore}%</p>
                  <p className="text-sm text-gray-500">Similarity</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{result.originalityScore}%</p>
                  <p className="text-sm text-gray-500">Originality</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{result.paraphrasingScore}%</p>
                  <p className="text-sm text-gray-500">Paraphrasing</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{result.structuralSimilarityScore}%</p>
                  <p className="text-sm text-gray-500">Structural Similarity</p>
                </div>
              </div>
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
    </PlagiarismChecker>
  );
}
