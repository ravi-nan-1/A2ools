'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, PlusCircle, Sparkles, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleKeywordClusterGeneration } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  primaryKeyword: z.string().min(1, 'Primary keyword is required.'),
  secondaryKeywords: z.array(z.object({
    value: z.string(),
  })).min(1, 'At least one secondary keyword is required.'),
});

type FormValues = z.infer<typeof formSchema>;

interface Cluster {
    clusterTitle: string;
    keywords: string[];
}

interface ClusterResult {
    clusters: Cluster[];
}

export function KeywordClusterGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClusterResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryKeyword: '',
      secondaryKeywords: [{ value: '' }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'secondaryKeywords',
  });

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    const keywords = pasteData.split(/\r?\n/).filter(k => k.trim() !== '');
    if (keywords.length > 0) {
      form.reset({
        ...form.getValues(),
        secondaryKeywords: keywords.map(k => ({ value: k.trim() })),
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('primaryKeyword', data.primaryKeyword);
    data.secondaryKeywords.forEach(kw => {
      if (kw.value) {
        formData.append('secondaryKeywords', kw.value);
      }
    });

    try {
      const response = await handleKeywordClusterGeneration(formData);
      if (response.error) {
        throw new Error(response.error);
      }
      setResult(response.data as ClusterResult);
      toast({
        title: 'Clusters Generated!',
        description: 'Your keyword clusters are ready below.',
      });
    } catch (error: any) {
      toast({
        title: 'Generation Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="primaryKeyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Keyword</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'content marketing'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Secondary Keywords</FormLabel>
              <p className="text-sm text-muted-foreground mb-2">
                Paste a list of keywords, one per line.
              </p>
              <Textarea
                placeholder="Paste your keywords here..."
                onPaste={handlePaste}
                rows={10}
                className="mb-2"
                />
              <p className="text-xs text-muted-foreground">
                Or add manually below.
              </p>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`secondaryKeywords.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input placeholder="Enter a keyword..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ value: '' })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Keyword Manually
            </Button>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Clusters
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Generated Clusters</CardTitle>
                <CardDescription>
                AI-powered semantic keyword groups based on your input.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center p-8 h-64">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <h3 className="text-xl font-semibold">Generating...</h3>
                        <p className="text-muted-foreground max-w-sm">
                            Analyzing SERP intent and semantic relationships...
                        </p>
                    </div>
                )}
                {!isLoading && !result && (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        <p>Your keyword clusters will appear here.</p>
                    </div>
                )}
                {!isLoading && result && (
                    <Accordion type="multiple" className="w-full" defaultValue={result.clusters.map(c => c.clusterTitle)}>
                        {result.clusters.map((cluster, index) => (
                            <AccordionItem value={cluster.clusterTitle} key={index}>
                                <AccordionTrigger className="text-base font-semibold">{cluster.clusterTitle}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-wrap gap-2 p-2">
                                        {cluster.keywords.map((keyword, kwIndex) => (
                                            <Badge key={kwIndex} variant="secondary">{keyword}</Badge>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
