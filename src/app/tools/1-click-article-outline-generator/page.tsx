import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { GenerateSEOMetadataOutput } from '@/types/ai-flows';
import ClientWrapper from './ClientWrapper';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/placeholder-images';

const SLUG = '1-click-article-outline-generator';

export async function generateMetadata(): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === SLUG);

  if (!tool) {
    return {
      title: 'Tool not found',
    };
  }

  return {
    title: tool.metaTitle || tool.name,
    description: tool.metaDescription || tool.description,
    alternates: {
      canonical: `https://www.all2ools.com/tools/${SLUG}`,
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
    image: image?.imageUrl || `https://picsum.photos/seed/${tool.slug}/1200/400`,
    imageHint: image?.imageHint || 'tool banner',
  };

  return <ClientWrapper tool={toolWithImage} aiContent={aiContent} />;
}