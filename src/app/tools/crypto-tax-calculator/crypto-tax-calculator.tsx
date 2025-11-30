"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, Link, Keyboard, AlertTriangle, ArrowRight, ArrowLeft, Loader2, Building, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Papa from 'papaparse';

const formSchema = z.object({});
type FormValues = z.infer<typeof formSchema>;

type Step = 'method' | 'upload' | 'connect' | 'manual' | 'processing';

const exchanges = ['Coinbase', 'Binance', 'Kraken', 'WazirX', 'KuCoin', 'ByBit', 'OKX'];
const wallets = ['Ethereum (ETH)', 'Bitcoin (BTC)', 'Solana (SOL)', 'BNB Chain (BSC)', 'Polygon (MATIC)'];

export function CryptoTaxCalculator() {
  const [step, setStep] = useState<Step>('method');
  const [importMethod, setImportMethod] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Here you would handle the file parsing
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Parsed CSV data:", results.data);
          // TODO: Implement mapping and processing logic
        },
        error: (error: any) => {
          console.error("CSV Parsing Error:", error);
        }
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'method':
        return (
          <div className="space-y-6">
             <CardHeader className="p-0">
                <CardTitle>Import Your Transactions</CardTitle>
                <CardDescription>
                  Start by adding your crypto transactions. Choose one of the methods below. You can add more later.
                </CardDescription>
            </CardHeader>
            <RadioGroup onValueChange={setImportMethod} value={importMethod || ''}>
              <Label htmlFor="upload-option" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-muted has-[:checked]:border-primary">
                <RadioGroupItem value="upload" id="upload-option" className="mr-4"/>
                <UploadCloud className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Upload a file</h3>
                  <p className="text-sm text-muted-foreground">Import a CSV file from any exchange like Coinbase, Binance, etc.</p>
                </div>
              </Label>
              <Label htmlFor="connect-option" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-muted has-[:checked]:border-primary">
                <RadioGroupItem value="connect" id="connect-option" className="mr-4"/>
                <Link className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Connect Exchange / Wallet</h3>
                  <p className="text-sm text-muted-foreground">Sync your trades automatically via API or by connecting your wallet.</p>
                </div>
              </Label>
              <Label htmlFor="manual-option" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-muted has-[:checked]:border-primary">
                <RadioGroupItem value="manual" id="manual-option" className="mr-4"/>
                <Keyboard className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Enter manually</h3>
                  <p className="text-sm text-muted-foreground">Add individual transactions one by one.</p>
                </div>
              </Label>
            </RadioGroup>
            <Button className="w-full" disabled={!importMethod} onClick={() => setStep(importMethod as Step)}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 'upload':
        return (
          <div>
            <CardHeader className="p-0 mb-4">
                <CardTitle>Upload CSV/Excel File</CardTitle>
                <CardDescription>
                  Export the transaction history file from your exchange and upload it here.
                </CardDescription>
            </CardHeader>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-background transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                {fileName ? (
                  <p className="font-semibold text-primary break-all px-2">{fileName}</p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">CSV, XLS, XLSX (MAX. 100MB)</p>
                  </>
                )}
              </div>
              <Input id="file-upload" type="file" className="hidden" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
            </label>
             <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep('method')}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button disabled={!fileName} onClick={() => setIsProcessing(true)}>Import Transactions <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        );

    case 'connect':
        return (
            <div>
                 <CardHeader className="p-0 mb-4">
                    <CardTitle>Connect an Exchange or Wallet</CardTitle>
                    <CardDescription>
                    Select a service to sync your transactions automatically. This provides read-only access.
                    </CardDescription>
                </CardHeader>

                <h3 className="font-semibold mb-2 mt-4">Exchanges</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {exchanges.map(ex => (
                        <Button key={ex} variant="outline" className="justify-start gap-2"><Building className="h-4 w-4 text-muted-foreground"/> {ex}</Button>
                    ))}
                </div>
                <h3 className="font-semibold mb-2 mt-6">Wallets</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {wallets.map(w => (
                         <Button key={w} variant="outline" className="justify-start gap-2"><Wallet className="h-4 w-4 text-muted-foreground"/> {w}</Button>
                    ))}
                </div>
                 <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep('method')}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button disabled>Connect <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
            </div>
        );

      // Other cases (manual, processing) would be built out here
      default:
        return <p>This step is under construction.</p>;
    }
  };

  return (
    <div className="space-y-8">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Disclaimer: For Educational & Illustrative Use Only</AlertTitle>
        <AlertDescription>
          This is a simplified tool for educational purposes. It does not perform real tax calculations. **Do not use for official tax filing.** Always consult a qualified tax professional for your tax obligations.
        </AlertDescription>
      </Alert>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6 md:p-8">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center text-center p-8 h-64">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <h3 className="text-xl font-semibold">Processing Transactions...</h3>
                    <p className="text-muted-foreground max-w-sm">
                       Categorizing trades and calculating gains. This may take a moment.
                    </p>
                </div>
              ) : renderStepContent()}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
