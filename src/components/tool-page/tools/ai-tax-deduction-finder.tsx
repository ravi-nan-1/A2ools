
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { Loader2, BadgeDollarSign, FileText, Lightbulb, Info, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleTaxAnalysis } from '@/app/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const taxData = {
  countries: [
    {
      name: 'United States',
      categories: ['Home Office', 'Business Travel', 'Software & Subscriptions', 'Marketing & Advertising', 'Health Insurance Premiums', 'Office Supplies'],
    },
    {
      name: 'United Kingdom',
      categories: ['Office Costs', 'Travel Costs', 'Staff Costs', 'Financial Costs', 'Marketing & Subscriptions', 'Training Courses'],
    },
    {
      name: 'Canada',
      categories: ['Business Use-of-Home', 'Office Expenses', 'Meals & Entertainment', 'Vehicle Expenses', 'Legal & Accounting Fees', 'Salaries & Wages'],
    },
    {
      name: 'Germany',
      categories: ['Work Room (Häusliches Arbeitszimmer)', 'Business Travel', 'IT & Software', 'Work Equipment (Arbeitsmittel)', 'Telephone & Internet', 'Professional Development'],
    },
    {
      name: 'India',
      categories: ['Office Rent', 'Travel & Conveyance', 'Depreciation of Assets', 'Salaries & Employee Benefits', 'Professional Fees', 'Printing & Stationery'],
    },
     {
      name: 'Australia',
      categories: ['Home Office Expenses', 'Motor Vehicle Expenses', 'Travel Expenses', 'Cost of Goods Sold', 'Operating Expenses', 'Professional Development'],
    },
  ]
};

const formSchema = z.object({
  income: z.number().positive({ message: 'Income must be a positive number.' }),
  expenses: z.number().positive({ message: 'Expenses must be a positive number.' }),
  country: z.string().min(2, { message: 'Please select your country.'}),
  categoryTags: z.string().min(3, { message: 'Please select a category.' }),
});

type FormValues = z.infer<typeof formSchema>;

type AnalysisResult = {
  estimatedSavings: string;
  deductionList: string;
  documentsNeeded: string;
  tips: string;
};

export function AiTaxDeductionFinder() {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
      expenses: 0,
      country: '',
      categoryTags: '',
    },
    mode: 'onChange',
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent "e", "+", "-", "." from being entered
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault();
    }
  };
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('income', data.income.toString());
    formData.append('expenses', data.expenses.toString());
    formData.append('country', data.country);
    formData.append('categoryTags', data.categoryTags);

    try {
      const analysisResult = await handleTaxAnalysis(formData);
      if (analysisResult.error) {
        throw new Error(analysisResult.error);
      }
      setResult(analysisResult.result as AnalysisResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error Analyzing Deductions',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const availableCategories = taxData.countries.find(c => c.name === selectedCountry)?.categories || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'><Info className='text-primary' /> Sample Categories</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>Common Freelancer Categories:</strong></p>
            <p>Home office costs, business travel, software subscriptions, marketing, professional development, office supplies.</p>
          </CardContent>
        </Card>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Annual Income (in your local currency)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 80000" 
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Annual Expenses (in your local currency)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 20000" 
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Country</FormLabel>
                    <Select onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value);
                        form.resetField("categoryTags");
                    }} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger disabled={isLoading}>
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {taxData.countries.map(country => (
                            <SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryTags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Expense Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={isLoading || !selectedCountry}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {availableCategories.length > 0 ? availableCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                        )) : <SelectItem value="-" disabled>Select a country first</SelectItem>}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormItem>
                <FormLabel>Upload Receipts (Optional)</FormLabel>
                <FormControl>
                  <Input type="file" disabled={true} />
                </FormControl>
                <p className="text-sm text-muted-foreground">This feature is coming soon.</p>
              </FormItem>

            <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isValid}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {translate('processing')}
                </>
              ) : (
                translate('analyze_deductions')
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4">
        <Card className="min-h-[500px] sticky top-24">
          <CardHeader>
            <CardTitle>AI Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p>Analyzing your tax deductions... This may take a moment.</p>
              </div>
            )}
            {!isLoading && !result && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Coins className="h-12 w-12 mb-4 text-primary/50" />
                <p>Your deduction analysis will appear here.</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-primary"><BadgeDollarSign /> Estimated Tax Savings</h3>
                  <p className="text-2xl font-bold text-green-600">{result.estimatedSavings}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-primary"><FileText /> Potential Deductions</h3>
                  <pre className="text-sm text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-wrap font-body">{result.deductionList}</pre>
                </div>
                <div>
                   <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-primary"><FileText /> Documents Needed</h3>
                   <pre className="text-sm text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-wrap font-body">{result.documentsNeeded}</pre>
                </div>
                 <div>
                   <h3 className="flex items-center gap-2 text-lg font-semibold mb-2 text-primary"><Lightbulb /> Pro Tips</h3>
                   <pre className="text-sm text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-wrap font-body">{result.tips}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
