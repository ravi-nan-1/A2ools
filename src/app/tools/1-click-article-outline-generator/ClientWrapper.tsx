"use client";

import { LanguageProvider } from '@/context/language-context';
import { ToolPageClient } from '@/components/tool-page/tool-page-client';
import type { Tool } from '@/lib/tools';
import type { GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';

interface ClientWrapperProps {
  tool: Tool & { image: string; imageHint: string };
  aiContent: GenerateSEOMetadataOutput;
  translations: any;
}

export default function ClientWrapper({ tool, aiContent, translations }: ClientWrapperProps) {
  return (
    <LanguageProvider translations={translations}>
      <ToolPageClient tool={tool} aiContent={aiContent} />
    </LanguageProvider>
  );
}
