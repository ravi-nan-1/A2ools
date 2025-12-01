
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, RefreshCw, Bot, Loader2, Link as LinkIcon, Info } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { generateWebhookPayload } from '@/ai/flows/webhook-tester';
import { useTheme } from 'next-themes';

interface WebhookRequest {
  id: string;
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;
  timestamp: string;
}

export function WebhookTester() {
  const [requests, setRequests] = useState<WebhookRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<WebhookRequest | null>(null);
  const [uniqueUrl, setUniqueUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // In a real application, this would be fetched from a backend service
    // that generates a truly unique endpoint.
    const mockId = `ep_${Math.random().toString(36).substring(2, 10)}`;
    setUniqueUrl(`https://all2ools.com/api/webhooks/${mockId}`);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const handleGenerateMockRequest = async (type: 'github' | 'stripe') => {
    setIsGenerating(true);
    try {
        const result = await generateWebhookPayload({type});
        if (result.error) {
            throw new Error(result.error);
        }
        
        const newRequest: WebhookRequest = {
            id: `req_${Math.random().toString(36).substring(2, 9)}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': type === 'github' ? 'GitHub-Hookshot/1.0' : 'Stripe/1.0',
                ...(type === 'github' && {'X-GitHub-Event': 'push'}),
                ...(type === 'stripe' && {'Stripe-Signature': 'whsec_...'})
            },
            query: {},
            body: result.payload,
            timestamp: new Date().toISOString()
        };
        
        setRequests(prev => [newRequest, ...prev]);
        setSelectedRequest(newRequest);
        toast({ title: 'Mock Request Received', description: `A mock ${type} webhook has been generated.` });

    } catch (e: any) {
        toast({ title: "Generation Failed", description: e.message, variant: 'destructive'});
    } finally {
        setIsGenerating(false);
    }
  }

  const memoizedSyntaxHighlighterTheme = useMemo(
    () => (resolvedTheme === 'dark' ? oneDark : oneLight),
    [resolvedTheme]
  );

  return (
    <div className="space-y-4">
       <Alert variant="default" className="border-amber-500/50 text-amber-700 dark:text-amber-400">
        <Info className="h-4 w-4 text-amber-500" />
        <AlertTitle>This is a UI Demonstration</AlertTitle>
        <AlertDescription>
          This tool is a demonstration of the user interface. Incoming requests are simulated. A real backend is required to receive live webhooks.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow w-full">
                <label htmlFor="webhook-url" className="text-sm font-medium text-muted-foreground">Your unique webhook URL</label>
                <div className="flex gap-2 mt-1">
                    <Input id="webhook-url" readOnly value={uniqueUrl} className="font-mono bg-muted" />
                    <Button variant="outline" size="icon" onClick={() => copyToClipboard(uniqueUrl)}><Copy className="h-4 w-4"/></Button>
                </div>
            </div>
             <div className="flex items-center gap-2 w-full md:w-auto">
                <Button onClick={() => handleGenerateMockRequest('github')} disabled={isGenerating} className="w-full sm:w-auto">
                    {isGenerating ? <Loader2 className="mr-2 animate-spin"/> : <Bot className="mr-2"/>}
                    Generate GitHub Event
                </Button>
                 <Button onClick={() => handleGenerateMockRequest('stripe')} disabled={isGenerating} className="w-full sm:w-auto">
                     {isGenerating ? <Loader2 className="mr-2 animate-spin"/> : <Bot className="mr-2"/>}
                    Generate Stripe Event
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[70vh]">
        <Card className="md:col-span-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <CardTitle className="text-lg">Requests ({requests.length})</CardTitle>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" disabled><RefreshCw className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setRequests([]); setSelectedRequest(null); }}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                </div>
            </CardHeader>
            <ScrollArea className="flex-grow">
                <div className="p-2">
                    {requests.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground p-4">Waiting for requests...</p>
                    ) : (
                        requests.map(req => (
                            <button
                                key={req.id}
                                onClick={() => setSelectedRequest(req)}
                                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${selectedRequest?.id === req.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                            >
                               <Badge variant={req.method === 'POST' ? 'default' : 'secondary'} className="w-16 justify-center">{req.method}</Badge>
                               <span className="font-mono text-sm truncate">{req.id}</span>
                            </button>
                        ))
                    )}
                </div>
            </ScrollArea>
        </Card>
        
        <div className="md:col-span-3">
            {selectedRequest ? (
                <Card className="h-full flex flex-col">
                     <Tabs defaultValue="body" className="w-full flex-grow flex flex-col">
                        <div className="p-2 border-b">
                             <TabsList>
                                <TabsTrigger value="body">Body</TabsTrigger>
                                <TabsTrigger value="headers">Headers ({Object.keys(selectedRequest.headers).length})</TabsTrigger>
                                <TabsTrigger value="query">Query Params ({Object.keys(selectedRequest.query).length})</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="body" className="flex-grow m-0">
                           <Tabs defaultValue="pretty" className="w-full h-full flex flex-col">
                                <div className="p-2 border-b">
                                    <TabsList>
                                        <TabsTrigger value="pretty">Pretty</TabsTrigger>
                                        <TabsTrigger value="raw">Raw</TabsTrigger>
                                    </TabsList>
                                </div>
                               <TabsContent value="pretty" className="flex-grow m-0 relative">
                                    <ScrollArea className="absolute inset-0">
                                        <SyntaxHighlighter language="json" style={memoizedSyntaxHighlighterTheme} customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }} codeTagProps={{style: {fontFamily: 'var(--font-mono)'}}}>
                                            {JSON.stringify(selectedRequest.body, null, 2)}
                                        </SyntaxHighlighter>
                                    </ScrollArea>
                               </TabsContent>
                               <TabsContent value="raw" className="flex-grow m-0 relative">
                                    <ScrollArea className="absolute inset-0">
                                        <pre className="p-4 text-xs font-mono">{JSON.stringify(selectedRequest.body)}</pre>
                                    </ScrollArea>
                               </TabsContent>
                           </Tabs>
                        </TabsContent>
                        <TabsContent value="headers" className="flex-grow m-0 relative">
                            <ScrollArea className="absolute inset-0">
                                <Table className="text-sm">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Key</TableHead>
                                            <TableHead>Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(selectedRequest.headers).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell className="font-mono">{key}</TableCell>
                                                <TableCell className="font-mono">{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </TabsContent>
                         <TabsContent value="query" className="flex-grow m-0 relative">
                            <ScrollArea className="absolute inset-0">
                                <Table className="text-sm">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Key</TableHead>
                                            <TableHead>Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(selectedRequest.query).length > 0 ? (
                                            Object.entries(selectedRequest.query).map(([key, value]) => (
                                                <TableRow key={key}>
                                                    <TableCell className="font-mono">{key}</TableCell>
                                                    <TableCell className="font-mono">{value}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center text-muted-foreground">No query parameters in this request.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </Card>
            ) : (
                <Card className="h-full flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <LinkIcon className="mx-auto h-12 w-12 mb-4"/>
                        <h3 className="text-lg font-semibold">Select a request</h3>
                        <p>Select a request from the list on the left to inspect its details.</p>
                    </div>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
