"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { handleLatencyCheck } from '@/app/actions';
import { useLanguage } from '@/hooks/use-language';
import { Loader2, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface LatencyResult {
  region: string;
  latency: number | string;
  status: number | string;
  size: string;
  dns: number;
  connection: number;
  ttfb: number;
}

export function ApiLatencyChecker() {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<LatencyResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpMethod, setHttpMethod] = useState('GET');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url.trim()) {
      toast({
        title: 'URL is empty',
        description: 'Please enter a URL to check.',
        variant: 'destructive',
      });
      return;
    }
    
    let parsedHeaders = {};
    try {
      if (headers.trim()) {
        parsedHeaders = JSON.parse(headers);
      }
    } catch {
      toast({
        title: 'Invalid Headers',
        description: 'The headers must be valid JSON.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResults(null);

    const formData = new FormData();
    formData.append('url', url);
    formData.append('method', httpMethod);
    formData.append('headers', JSON.stringify(parsedHeaders));
    formData.append('body', body);
    
    try {
      const latencyResults = await handleLatencyCheck(formData);
      if (latencyResults.error) {
        throw new Error(latencyResults.error);
      }
      setResults(latencyResults.data as LatencyResult[]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: 'Error checking latency',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const globalAverage = results 
    ? (results.reduce((acc, r) => acc + (typeof r.latency === 'number' ? r.latency : 0), 0) / results.filter(r => typeof r.latency === 'number').length).toFixed(0)
    : 0;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
         <Card>
            <CardHeader>
                <CardTitle>API Endpoint Configuration</CardTitle>
                <CardDescription>Enter the details of the API you want to test.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={httpMethod} onValueChange={setHttpMethod}>
                        <SelectTrigger className="w-full sm:w-[120px]">
                            <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                    type="url"
                    placeholder="https://api.example.com/v1/users"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-grow"
                    disabled={isLoading}
                    />
                </div>
                 <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Headers & Body (Optional)</AccordionTrigger>
                    <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                       <div className="space-y-2">
                         <label className="text-sm font-medium">Headers (JSON)</label>
                         <Textarea 
                          value={headers} 
                          onChange={(e) => setHeaders(e.target.value)} 
                          placeholder='{ "Authorization": "Bearer ..." }'
                          className="font-mono h-32"
                          disabled={isLoading}
                        />
                       </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Request Body</label>
                          <Textarea 
                            value={body} 
                            onChange={(e) => setBody(e.target.value)}
                            placeholder='{ "key": "value" }'
                            className="font-mono h-32"
                            disabled={isLoading || !['POST', 'PUT', 'PATCH'].includes(httpMethod)}
                          />
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </CardContent>
         </Card>
        <Button type="submit" disabled={isLoading || !url.trim()} className="w-full h-12 text-lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {translate('processing')}
            </>
          ) : (
            translate('check_latency')
          )}
        </Button>
      </form>
      
      {(isLoading || results) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{translate('result')}</CardTitle>
            <CardDescription>
                {isLoading 
                    ? "Pinging your endpoint from multiple global regions..." 
                    : `Global average latency: ${globalAverage} ms`
                }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
               results && (
                <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                      <TableHead className="text-right">DNS</TableHead>
                      <TableHead className="text-right">Connection</TableHead>
                      <TableHead className="text-right">TTFB</TableHead>
                      <TableHead className="text-right font-bold">Total Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={result.region}>
                        <TableCell className="font-medium">{result.region}</TableCell>
                        <TableCell className={`text-right ${result.status.toString().startsWith('2') ? 'text-green-600' : 'text-red-600'}`}>{result.status}</TableCell>
                        <TableCell className="text-right">{result.size}</TableCell>
                        <TableCell className="text-right">{result.dns} ms</TableCell>
                        <TableCell className="text-right">{result.connection} ms</TableCell>
                        <TableCell className="text-right">{result.ttfb} ms</TableCell>
                        <TableCell className="text-right font-bold">
                          {typeof result.latency === 'number' ? `${result.latency} ms` : result.latency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
               )
            )}
          </CardContent>
        </Card>
      )}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="metrics-explanation">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4"/> What do these metrics mean?
            </div>
            </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4 text-sm text-muted-foreground">
            <p><strong>DNS Lookup:</strong> The time it takes to resolve your API's domain name to an IP address. High DNS time can indicate issues with your DNS provider.</p>
            <p><strong>Connection Time:</strong> The time required to establish a TCP connection with the server. This includes the three-way handshake.</p>
            <p><strong>TTFB (Time To First Byte):</strong> The time from when the request was sent until the first byte of the response was received. This is a key indicator of your server's backend processing speed.</p>
            <p><strong>Total Time:</strong> The total duration from the start of the request to receiving the full response.</p>
          </AccordionContent>
        </AccordionItem>
    </Accordion>
    </div>
  );
}
