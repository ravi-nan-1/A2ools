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
import { aiContextualAnalysis } from '@/ai/flows/ai-contextual-analysis';
import type { AIContextualAnalysisOutput } from '@/ai/flows/ai-contextual-analysis-types';
import PlagiarismCheckerLayout from './plagiarism-checker-layout';

const formSchema = z.object({
  text: z.string().min(1, { message: 'Text is required.' }),
});

export default function AIContextualAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIContextualAnalysisOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await aiContextualAnalysis(values);
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
        <h2 className="text-xl font-semibold mb-4">AI Contextual Analysis</h2>
        <p className="text-gray-500 mb-6">Analyze text for subtle plagiarism like paraphrasing and structural similarity.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text to Analyze</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your text here..." className="min-h-[200px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Text
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Analysis Result</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4 mb-4">
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
              <div className="mt-4">
                <h4 className="font-semibold">Highlighted Text</h4>
                <div className="mt-2 p-2 border rounded-md whitespace-pre-wrap">{result.highlightedText}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlagiarismCheckerLayout>
  );
}
