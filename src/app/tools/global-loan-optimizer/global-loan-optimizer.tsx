
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Banknote, Landmark, Building, University, Sparkles, TrendingUp, TrendingDown, Bell, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  loanAmount: z.number().min(1000, "Must be at least 1,000").max(10000000, "Must be at most 1,00,00,000 / 1,000,000"),
  annualIncome: z.number().min(10000, "Must be at least 10,000").max(50000000, "Must be at most 5,00,00,000 / 5,000,000"),
  creditScore: z.number().min(300, "Invalid score").max(850, "Invalid score"),
  loanTenure: z.number().min(1, "Must be at least 1 year").max(30, "Must be at most 30 years"),
});

type LoanFormData = z.infer<typeof formSchema>;

interface Bank {
    name: string;
    logo: React.ReactNode;
    baseRate: number;
}

interface LoanOffer {
    bankName: string;
    interestRate: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    bankLogo: React.ReactNode;
}

const indianBanks: Bank[] = [
    { name: 'HDFC Bank', logo: <Building className="text-blue-600" />, baseRate: 10.5 },
    { name: 'State Bank of India', logo: <Landmark className="text-blue-800" />, baseRate: 10.2 },
    { name: 'ICICI Bank', logo: <Building className="text-orange-500" />, baseRate: 10.8 },
    { name: 'Axis Bank', logo: <Building className="text-purple-700" />, baseRate: 11.0 },
    { name: 'Kotak Mahindra Bank', logo: <Building className="text-red-600" />, baseRate: 10.7 }
];

const usBanks: Bank[] = [
    { name: 'Chase Bank', logo: <Landmark className="text-blue-700" />, baseRate: 7.2 },
    { name: 'Bank of America', logo: <University className="text-red-700" />, baseRate: 7.0 },
    { name: 'Wells Fargo', logo: <Landmark className="text-red-500" />, baseRate: 7.5 },
    { name: 'Citibank', logo: <University className="text-blue-500" />, baseRate: 7.3 },
    { name: 'U.S. Bank', logo: <Landmark className="text-indigo-600" />, baseRate: 7.8 }
];

type Country = 'IN' | 'US';

const getRiskProfile = (score: number) => {
    if (score >= 800) return { level: 'Excellent', color: 'text-green-500', description: 'Access to the very best rates.' };
    if (score >= 740) return { level: 'Very Good', color: 'text-green-400', description: 'Eligible for very competitive rates.' };
    if (score >= 670) return { level: 'Good', color: 'text-yellow-500', description: 'Likely to be approved with good rates.' };
    if (score >= 580) return { level: 'Fair', color: 'text-orange-500', description: 'May face higher rates and stricter terms.' };
    return { level: 'Poor', color: 'text-red-500', description: 'Approval is difficult; focus on improving score.' };
};


export function GlobalLoanOptimizer() {
    const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [country, setCountry] = useState<Country>('US');

    useEffect(() => {
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timeZone.startsWith('Asia/')) {
                setCountry('IN');
            } else {
                setCountry('US');
            }
        } catch (error) {
            console.error("Could not detect timezone, defaulting to US.");
            setCountry('US');
        }
    }, []);

    const isIndia = country === 'IN';
    const banks = isIndia ? indianBanks : usBanks;

    const form = useForm<LoanFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loanAmount: isIndia ? 500000 : 50000,
            annualIncome: isIndia ? 1000000 : 80000,
            creditScore: 750,
            loanTenure: 5
        },
        mode: 'onChange',
    });
    
    const { reset, watch } = form;
    const loanAmount = watch('loanAmount');
    const annualIncome = watch('annualIncome');
    const creditScore = watch('creditScore');
    const loanTenure = watch('loanTenure');
    const riskProfile = getRiskProfile(creditScore);

    useEffect(() => {
        reset({
            loanAmount: isIndia ? 500000 : 50000,
            annualIncome: isIndia ? 1000000 : 80000,
            creditScore: 750,
            loanTenure: 5
        });
    }, [country, reset, isIndia]);


    const onSubmit = (data: LoanFormData) => {
        setIsLoading(true);
        setLoanOffers([]);
        
        setTimeout(() => {
            const offers: LoanOffer[] = banks.map(bank => {
                let rate = bank.baseRate;
                const creditScoreFactor = ((data.creditScore - 700) / 150) * (isIndia ? 2.0 : 1.5);
                rate -= creditScoreFactor;
                const incomeToLoanRatio = data.annualIncome / data.loanAmount;
                if (incomeToLoanRatio > (isIndia ? 4 : 3)) {
                    rate -= (isIndia ? 0.75 : 0.5);
                } else if (incomeToLoanRatio < 2) {
                    rate += (isIndia ? 0.75 : 0.5);
                }
                rate += (Math.random() - 0.5) * 0.4; 
                const finalRate = Math.max(isIndia ? 8.5 : 5.0, Math.min(isIndia ? 18.0 : 15.0, rate));
                const monthlyRate = finalRate / 100 / 12;
                const numberOfPayments = data.loanTenure * 12;
                const monthlyPayment = (data.loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
                const totalPayment = monthlyPayment * numberOfPayments;
                const totalInterest = totalPayment - data.loanAmount;

                return {
                    bankName: bank.name,
                    interestRate: parseFloat(finalRate.toFixed(2)),
                    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
                    totalPayment: parseFloat(totalPayment.toFixed(2)),
                    totalInterest: parseFloat(totalInterest.toFixed(2)),
                    bankLogo: bank.logo,
                };
            }).sort((a,b) => a.interestRate - b.interestRate);

            setLoanOffers(offers);
            setIsLoading(false);
        }, 1500);
    };
    
    const optimizationSummary = useMemo(() => {
        if (loanOffers.length < 2) return null;
        const bestOffer = loanOffers[0];
        const worstOffer = loanOffers[loanOffers.length - 1];
        
        const monthlySavings = worstOffer.monthlyPayment - bestOffer.monthlyPayment;
        const totalSavings = worstOffer.totalPayment - bestOffer.totalPayment;
        
        return { monthlySavings, totalSavings };
    }, [loanOffers]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(isIndia ? 'en-IN' : 'en-US', { 
            style: 'currency', 
            currency: isIndia ? 'INR' : 'USD', 
            maximumFractionDigits: 0 
        }).format(amount);
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="lg:col-span-1 space-y-8">
                <Card className="sticky top-8 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Banknote/> Loan Optimizer
                        </CardTitle>
                        <CardDescription>
                            Adjust your financial details to find the best loan offers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField control={form.control} name="loanAmount" render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center"><FormLabel>Loan Amount</FormLabel><span className="text-sm font-semibold">{formatCurrency(loanAmount)}</span></div>
                                        <FormControl><Slider min={isIndia ? 50000 : 5000} max={isIndia ? 10000000 : 500000} step={isIndia ? 10000 : 1000} onValueChange={(vals) => field.onChange(vals[0])} value={[loanAmount]} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="annualIncome" render={({ field }) => (
                                     <FormItem>
                                        <div className="flex justify-between items-center"><FormLabel>Annual Income</FormLabel><span className="text-sm font-semibold">{formatCurrency(annualIncome)}</span></div>
                                        <FormControl><Slider min={isIndia ? 100000 : 20000} max={isIndia ? 50000000 : 1000000} step={isIndia ? 25000 : 5000} onValueChange={(vals) => field.onChange(vals[0])} value={[annualIncome]} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="creditScore" render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center"><FormLabel>Credit Score</FormLabel><span className="text-sm font-semibold">{creditScore}</span></div>
                                        <FormControl><Slider min={300} max={850} step={1} onValueChange={(vals) => field.onChange(vals[0])} value={[creditScore]} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="loanTenure" render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center"><FormLabel>Loan Tenure</FormLabel><span className="text-sm font-semibold">{loanTenure} years</span></div>
                                        <FormControl><Slider min={1} max={30} step={1} onValueChange={(vals) => field.onChange(vals[0])} value={[loanTenure]} /></FormControl>
                                    </FormItem>
                                )} />
                                 <Button type="submit" className="w-full font-bold py-3" disabled={isLoading}>
                                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</> : 'Optimize My Loan'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-8">
                
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center p-8 h-full rounded-lg bg-gray-100 dark:bg-gray-800/50 "><Loader2 className="h-12 w-12 animate-spin text-primary mb-4" /><h3 className="text-xl font-semibold">Analyzing Lenders...</h3><p className="text-muted-foreground">Searching for the best offers based on your profile.</p></div>
                )}

                {!isLoading && loanOffers.length === 0 && (
                    <div className="space-y-8">
                        <Card className="flex flex-col items-center justify-center text-center p-8 h-full shadow-md">
                             <Sparkles className="h-12 w-12 text-yellow-400" />
                            <CardTitle className="mt-4 text-2xl">Welcome to Your Loan Dashboard</CardTitle>
                            <CardDescription className="mt-2 max-w-md">
                                Your personalized loan analysis will appear here. Adjust the settings on the left and click "Optimize My Loan" to get started.
                            </CardDescription>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck/> Credit Risk Profile</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">Your credit risk profile will be generated here after you submit your details.</p></CardContent>
                        </Card>
                    </div>
                )}

                {loanOffers.length > 0 && !isLoading && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck /> Credit Risk Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className={`text-5xl font-bold ${riskProfile.color}`}>{riskProfile.level}</p>
                                    <p className="text-muted-foreground mt-2">{riskProfile.description}</p>
                                </CardContent>
                            </Card>
                             <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg"><Bell /> Refinance Alerts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm mb-4">Get notified when better loan offers become available.</p>
                                    <div className="flex gap-2">
                                        <Input type="email" placeholder="your@email.com" disabled />
                                        <Button disabled>Notify Me</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {optimizationSummary && (
                             <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Sparkles className="text-blue-500" /> EMI & Total Cost Optimizer</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Monthly Savings</p>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                                            <TrendingDown/> {formatCurrency(optimizationSummary.monthlySavings)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Potential Lifetime Savings</p>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                                            <TrendingUp/> {formatCurrency(optimizationSummary.totalSavings)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                         <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Simulated Loan Offers ({country})</span>
                                    <span className="text-sm font-normal text-muted-foreground">Loan Comparison Engine</span>
                                </CardTitle>
                                <CardDescription>
                                    Here are the best estimated loan offers based on your profile. These are for informational purposes only.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Lender</TableHead>
                                            <TableHead className="text-right">Interest Rate</TableHead>
                                            <TableHead className="text-right">Monthly Payment</TableHead>
                                            <TableHead className="text-right">Total Interest</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loanOffers.map((offer, index) => (
                                            <TableRow key={offer.bankName} className={index === 0 ? "bg-green-100/50 dark:bg-green-900/30" : ""}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        {offer.bankLogo}
                                                        <span className="truncate">{offer.bankName}</span>
                                                        {index === 0 && <span className="ml-auto text-xs font-bold text-green-600 dark:text-green-400 py-1 px-2 bg-green-100 dark:bg-green-800/50 rounded-full">Best Offer</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className={`text-right font-bold ${index === 0 ? 'text-green-700 dark:text-green-400' : ''}`}>{offer.interestRate.toFixed(2)}%</TableCell>
                                                <TableCell className="text-right">{formatCurrency(offer.monthlyPayment)}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(offer.totalInterest)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
