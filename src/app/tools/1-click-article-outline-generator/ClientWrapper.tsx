"use client";

import { LanguageProvider } from '@/context/language-context';
import { ToolPageClient } from '@/components/tool-page/tool-page-client';
import type { Tool } from '@/lib/tools';
import type { GenerateSEOMetadataOutput } from '@/types/ai-flows';

interface ClientWrapperProps {
  tool: Tool & { image: string; imageHint: string };
  aiContent: GenerateSEOMetadataOutput;
  
}

export default function ClientWrapper({ tool, aiContent }: ClientWrapperProps) {
  return (
    <LanguageProvider>
      <ToolPageClient tool={tool} aiContent={aiContent} />
    </LanguageProvider>
  );
}
