// src/app/tools/[slug]/page.tsx
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { ToolPageClient } from '@/components/tool-page/tool-page-client';
import { translations } from '@/lib/translations';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/placeholder-images';

// ✅ Define the props interface
interface PageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Type for AI content
interface AIContent {
  seoTitle: string;
  seoDescription: string;
}

// ✅ Helper function to get SEO metadata via API or fallback
async function getSEOMetadata(toolName: string, toolDescription: string): Promise<AIContent> {
  try {
    // Try to call the API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/generate-seo-metadata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolName, toolDescription }),
      cache: 'force-cache', // Cache the response for static generation
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to generate SEO metadata:', error);
  }
  
  // Fallback
  return {
    seoTitle: toolName,
    seoDescription: toolDescription,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // ✅ Await the params
  const { slug } = await params;
  
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'Tool not found',
      alternates: {
        canonical: 'https://www.all2ools.com/tools',
      },
    };
  }

  // Use fallback metadata for static generation
  return {
    title: tool.metaTitle || tool.name,
    description: tool.metaDescription || tool.description,
    alternates: {
      canonical: `https://www.all2ools.com/tools/${slug}`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  // ✅ Await the params
  const { slug } = await params;
  
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Use static fallback for build time
  const aiContent: AIContent = {
    seoTitle: tool.metaTitle || tool.name,
    seoDescription: tool.metaDescription || tool.description,
  };

  const image = placeholderImages.find((img) => img.id === tool.slug);
  const toolWithImage = {
    ...tool,
    image: image?.imageUrl || `https://picsum.photos/seed/${tool.slug}/1200/400`,
    imageHint: image?.imageHint || 'tool banner',
  };

  const { icon, ...rest } = toolWithImage;

  return (
    <ToolPageClient
      tool={{ ...rest, icon: tool.icon }}
      aiContent={aiContent}
      translations={translations}
    />
  );
}

export async function generateStaticParams() {
  const excludedSlugs = new Set([
    'ai-humanizer',
    'tinyurl-maker',
    'ai-product-background-remover',
    'content-gap-analyzer',
    'api-latency-checker',
    'pdf-to-word-converter',
    'ai-tutor',
    'excel-power-tools',
    'image-compressor',
    'jwt-decoder-validator',
    'global-loan-optimizer',
    'crypto-tax-calculator',
    'forex-arbitrage-checker',
    'ai-invoice-generator',
    'business-valuation-calculator',
    'ai-headshot-generator',
    'keyword-cluster-generator',
    'ai-product-description-generator',
    'json-excel-converter',
    'regex-generator-from-text',
    'webhook-tester',
    '1-click-article-outline-generator',
    'invoice-excel-extractor',
  ]);

  return tools
    .filter((tool) => !excludedSlugs.has(tool.slug))
    .map((tool) => ({
      slug: tool.slug,
    }));
}