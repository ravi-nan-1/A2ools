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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { FileVsTextCheckOutput } from '@/ai/flows/file-vs-text-check-types';
import { PlagiarismChecker } from '../plagiarism-checker';

const formSchema = z.object({
  file: z.any(),
  text: z.string().min(1, { message: 'Text is required.' }),
});

export default function FileVsTextPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FileVsTextCheckOutput | null>(null);
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

    const file = values.file[0];
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please upload a file to continue.',
      });
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target?.result as string;
      try {
        const response = await fetch('/api/file-vs-text-check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileContent, text: values.text }),
        });

        if (!response.ok) {
          throw new Error('Failed to run analysis');
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
    };
    reader.readAsText(file);
  }

  return (
    <PlagiarismChecker>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">File vs. Text</h2>
        <p className="text-gray-500 mb-6">Upload a file and enter a piece of text to check for similarities.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your text here..." className="min-h-[200px]" {...field} />
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
                  <h4 className="font-semibold">Highlighted File Content</h4>
                  <div className="mt-2 p-2 border rounded-md whitespace-pre-wrap">{result.highlightedFileContent}</div>
                </div>
                <div>
                  <h4 className="font-semibold">Highlighted Text</h4>
                  <div className="mt-2 p-2 border rounded-md whitespace-pre-wrap">{result.highlightedText}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlagiarismChecker>
  );
}
