// src/app/tools/webhook-tester/webhook-tester.tsx
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
// ❌ REMOVE THIS:
// import { generateWebhookPayload } from '@/ai/flows/webhook-tester';
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
      // ✅ Use API route instead
      const response = await fetch('/api/generate-webhook-payload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate webhook payload');
      }
      
      const result = await response.json();
      
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

  // ... rest of the component
}