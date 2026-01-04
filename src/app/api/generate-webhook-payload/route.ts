// src/app/api/generate-webhook-payload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateWebhookPayload } from '@/ai/flows/webhook-tester';

export async function POST(req: NextRequest) {
  try {
    const { type } = await req.json();
    
    if (!type || !['github', 'stripe'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid webhook type' },
        { status: 400 }
      );
    }
    
    const result = await generateWebhookPayload({ type });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Webhook payload generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate webhook payload' },
      { status: 500 }
    );
  }
}