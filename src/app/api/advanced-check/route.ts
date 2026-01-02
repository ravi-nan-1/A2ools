
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { advancedCheck } from '@/ai/flows/advanced-check';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceText, comparisonText } = body;

    if (!sourceText || !comparisonText) {
      return new NextResponse(JSON.stringify({ message: 'Source and comparison text are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const analysisResult = await advancedCheck({ sourceText, comparisonText });

    return new NextResponse(JSON.stringify(analysisResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ message: `Server error: ${errorMessage}` }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
