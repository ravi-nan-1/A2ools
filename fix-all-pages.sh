#!/bin/bash

files=(
  "src/app/tools/ai-invoice-generator/page.tsx"
  "src/app/tools/ai-tutor/page.tsx"
  "src/app/tools/api-latency-checker/page.tsx"
  "src/app/tools/business-valuation-calculator/page.tsx"
  "src/app/tools/content-gap-analyzer/page.tsx"
  "src/app/tools/crypto-tax-calculator/page.tsx"
  "src/app/tools/excel-power-tools/page.tsx"
  "src/app/tools/forex-arbitrage-checker/page.tsx"
  "src/app/tools/free-image-file-compressor/page.tsx"
  "src/app/tools/global-loan-optimizer/page.tsx"
  "src/app/tools/invoice-excel-extractor/page.tsx"
  "src/app/tools/json-excel-converter/page.tsx"
  "src/app/tools/jwt-decoder-validator/page.tsx"
  "src/app/tools/keyword-cluster-generator/page.tsx"
  "src/app/tools/regex-generator-from-text/page.tsx"
  "src/app/tools/tinyurl-maker/page.tsx"
  "src/app/tools/webhook-tester/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing: $file"
    
    # Get the slug from the path
    slug=$(echo "$file" | sed 's|src/app/tools/||' | sed 's|/page.tsx||')
    
    cat > "$file" << PAGEEOF
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { GenerateSEOMetadataOutput } from '@/types/ai-flows';
import { ToolPageClient } from '@/components/tool-page/tool-page-client';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/placeholder-images';

const SLUG = '${slug}';

export async function generateMetadata(): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === SLUG);

  if (!tool) {
    return {
      title: 'Tool not found',
      alternates: {
        canonical: 'https://www.all2ools.com/tools',
      },
    };
  }

  return {
    title: tool.metaTitle || tool.name,
    description: tool.metaDescription || tool.description,
    alternates: {
      canonical: \`https://www.all2ools.com/tools/\${SLUG}\`,
    },
  };
}

export default async function ToolPage() {
  const tool = tools.find((t) => t.slug === SLUG);

  if (!tool) {
    notFound();
  }

  const aiContent: GenerateSEOMetadataOutput = {
    seoTitle: tool.metaTitle || tool.name,
    seoDescription: tool.metaDescription || tool.description,
  };

  const image = placeholderImages.find((img) => img.id === tool.slug);
  const toolWithImage = {
    ...tool,
    image: image?.imageUrl || \`https://picsum.photos/seed/\${tool.slug}/1200/400\`,
    imageHint: image?.imageHint || 'tool banner',
  };

  const { icon, ...rest } = toolWithImage;

  return (
    <ToolPageClient
      tool={{ ...rest, icon: tool.icon }}
      aiContent={aiContent}
    />
  );
}
PAGEEOF
  fi
done

echo "Done! Fixed all pages."
