
"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Banknote, Landmark } from 'lucide-react';

const formSchema = z.object({
  loanAmount: z.number().min(50000, "Must be at least 50,000").max(10000000, "Must be at most 1,00,00,000"),
  annualIncome: z.number().min(100000, "Must be at least 1,00,000").max(50000000, "Must be at most 5,00,00,000"),
  creditScore: z.number().min(300, "Invalid score").max(900, "Invalid score"),
  loanTenure: z.number().min(1, "Must be at least 1 year").max(30, "Must be at most 30 years"),
});

type LoanFormData = z.infer<typeof formSchema>;

interface LoanOffer {
    bankName: string;
    interestRate: number;
    monthlyPayment: number;
    totalPayment: number;
    bankLogo: React.ReactNode;
}

const banks = [
    { name: 'Global Finance Corp', logo: <Banknote className="text-green-500" />, baseRate: 9.8 },
    { name: 'World Bank United', logo: <Landmark className="text-blue-500" />, baseRate: 10.2 },
    { name: 'International Credit', logo: <Banknote className="text-purple-500" />, baseRate: 9.5 },
    { name: 'Universal Lending', logo: <Landmark className="text-orange-500" />, baseRate: 10.5 },
    { name: 'Prime Meridian Bank', logo: <Banknote className="text-red-500" />, baseRate: 9.9 }
];

export function GlobalLoanOptimizer() {
    const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoanFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loanAmount: 500000,
            annualIncome: 1000000,
            creditScore: 750,
            loanTenure: 5
        },
        mode: 'onChange',
    });

    const onSubmit = (data: LoanFormData) => {
        setIsLoading(true);
        setLoanOffers([]);
        
        // Simulate API call and calculation
        setTimeout(() => {
            const offers: LoanOffer[] = banks.map(bank => {
                let rate = bank.baseRate;

                // Adjust rate based on credit score. A higher score lowers the rate.
                // A score of 900 gives max reduction, 300 gives max penalty.
                const creditScoreFactor = ((data.creditScore - 600) / 300) * 1.5; // from -1.5 to +1.5
                rate -= creditScoreFactor;

                // Adjust rate based on income-to-loan ratio. Higher ratio lowers the rate.
                const incomeToLoanRatio = data.annualIncome / data.loanAmount;
                if (incomeToLoanRatio > 5) {
                    rate -= 0.5;
                } else if (incomeToLoanRatio < 2) {
                    rate += 0.5;
                }

                // Add a small random factor for more variance
                rate += (Math.random() - 0.5) * 0.2; 
                
                const finalRate = Math.max(7.0, Math.min(15.0, rate));

                const monthlyRate = finalRate / 100 / 12;
                const numberOfPayments = data.loanTenure * 12;
                const monthlyPayment = (data.loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
                const totalPayment = monthlyPayment * numberOfPayments;

                return {
                    bankName: bank.name,
                    interestRate: parseFloat(finalRate.toFixed(2)),
                    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
                    totalPayment: parseFloat(totalPayment.toFixed(2)),
                    bankLogo: bank.logo,
                };
            }).sort((a,b) => a.interestRate - b.interestRate);

            setLoanOffers(offers);
            setIsLoading(false);
        }, 1500);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    }
    
    return (
        <div className="space-y-8">
           <p className="text-muted-foreground">
                Enter your financial details to see simulated loan offers from various international banks. This tool helps you understand how factors like credit score and income can affect loan terms.
           </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="loanAmount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Amount: {formatCurrency(field.value)}</FormLabel>
                                <FormControl>
                                    <Slider min={50000} max={10000000} step={10000} onValueChange={(vals) => field.onChange(vals[0])} defaultValue={[field.value]} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="annualIncome" render={({ field }) => (
                             <FormItem>
                                <FormLabel>Annual Income: {formatCurrency(field.value)}</FormLabel>
                                <FormControl>
                                    <Slider min={100000} max={50000000} step={25000} onValueChange={(vals) => field.onChange(vals[0])} defaultValue={[field.value]} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="creditScore" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Credit Score: {field.value}</FormLabel>
                                <FormControl>
                                    <Slider min={300} max={900} step={1} onValueChange={(vals) => field.onChange(vals[0])} defaultValue={[field.value]} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="loanTenure" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loan Tenure: {field.value} years</FormLabel>
                                <FormControl>
                                    <Slider min={1} max={30} step={1} onValueChange={(vals) => field.onChange(vals[0])} defaultValue={[field.value]} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                     <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</> : 'Find Best Loans'}
                    </Button>
                </form>
            </Form>

            {isLoading && (
                <div className="flex items-center justify-center text-center p-8">
                    <Loader2 className="mr-4 h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Analyzing offers from global lenders...</p>
                </div>
            )}

            {loanOffers.length > 0 && !isLoading && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Simulated Loan Offers</CardTitle>
                        <CardDescription>
                            Based on your inputs, here are some estimated loan offers. These are for informational purposes only.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bank</TableHead>
                                    <TableHead className="text-right">Interest Rate</TableHead>
                                    <TableHead className="text-right">Monthly Payment (EMI)</TableHead>
                                    <TableHead className="text-right">Total Payment</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loanOffers.map((offer) => (
                                    <TableRow key={offer.bankName}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            {offer.bankLogo}
                                            {offer.bankName}
                                        </TableCell>
                                        <TableCell className="text-right">{offer.interestRate.toFixed(2)}%</TableCell>
                                        <TableCell className="text-right">{formatCurrency(offer.monthlyPayment)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(offer.totalPayment)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );

}
    