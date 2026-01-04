// src/app/api/file-vs-text-check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fileVsTextCheck } from '@/ai/flows/file-vs-text-check';

export async function POST(req: NextRequest) {
  try {
    const { fileContent, text } = await req.json();

    if (!fileContent || !text) {
      return NextResponse.json(
        { error: 'Missing file content or text' },
        { status: 400 }
      );
    }

    const result = await fileVsTextCheck({ fileContent, comparisonText: text });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error running file-vs-text-check flow:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}