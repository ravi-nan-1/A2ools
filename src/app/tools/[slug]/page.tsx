import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import * as icons from 'lucide-react';
import { generateSEOMetadata } from '@/ai/flows/generate-seo-metadata';
import { ToolPageClient } from '@/components/tool-page/tool-page-client';
import { translations } from '@/lib/translations';
import type { Metadata } from 'next';
import { placeholderImages } from '@/lib/placeholder-images';

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool not found',
    };
  }

  if (tool.slug === 'tinyurl-maker') {
    return {
      title: 'TinyURL Maker – Free URL Shortener Tool',
      description: 'Create clean, fast, trackable short links instantly.',
       openGraph: {
        title: 'TinyURL Maker – Free URL Shortener Tool',
        description: 'Create clean, fast, trackable short links instantly.',
        type: 'website',
        url: `https://all2ools.com/tools/tinyurl-maker`,
      },
    };
  }

  try {
    const { seoTitle, seoDescription } = await generateSEOMetadata({
      toolName: tool.name,
      toolDescription: tool.longDescription,
    });
    return {
      title: seoTitle,
      description: seoDescription,
    };
  } catch (error) {
    console.error('AI metadata generation failed, using fallback:', error);
    return {
      title: tool.name,
      description: tool.description,
    };
  }
}

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  let aiContent;
  let faqContent = '';
  
  if (tool.slug === 'tinyurl-maker') {
    faqContent = [
      '1. Is this URL shortener free to use? \nYes, this tool is completely free to use. There are no hidden charges or subscription fees.',
      '2. Do the shortened links expire? \nNo, the links you create with our tool do not expire. They will continue to work indefinitely.',
      '3. Can I customize the shortened URL? \nYes, you can use the "Custom Slug" field to create a personalized, branded short link that is easy to remember.',
      '4. Is my data and privacy secure? \nWe do not store any personal data associated with the links you create. The history of your last 5 links is stored locally on your device\'s browser and is not sent to our servers.',
      '5. What kind of analytics do you provide? \nWe provide basic, privacy-friendly analytics, including the total number of clicks a link has received and the timestamp of the last click. We do not track individual users.',
      '6. Can I use this for commercial purposes? \nAbsolutely. You are free to use the shortened links for your business, marketing campaigns, or any other commercial activity.'
    ].join('\n\n');
  }

  try {
    aiContent = await generateSEOMetadata({
      toolName: tool.name,
      toolDescription: tool.longDescription,
    });
    if (faqContent) { 
        aiContent.faqContent = faqContent;
    }
  } catch (error) {
    console.error('AI content generation failed, using fallback:', error);
    aiContent = {
      seoTitle: tool.name,
      seoDescription: tool.description,
      jsonLdSchema: '{}',
      faqContent: faqContent || 'FAQs could not be generated at this time.',
    };
  }
  
  if (tool.slug === 'tinyurl-maker' && aiContent.jsonLdSchema === '{}') {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'TinyURL Maker – Free URL Shortener',
        description: 'Create clean, fast, trackable short links instantly.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        url: 'https://all2ools.com/tools/tinyurl-maker',
        offers: {
            '@type': 'Offer',
            'price': '0'
        }
      };
      aiContent.jsonLdSchema = JSON.stringify(jsonLd, null, 2);
  }


  const image = placeholderImages.find((img) => img.id === tool.slug);
  const toolWithImage = {
    ...tool,
    image: image?.imageUrl || `https://picsum.photos/seed/${tool.slug}/1200/400`,
    imageHint: image?.imageHint || 'tool banner',
  };
  
  const { icon, ...rest } = toolWithImage;

  return (
    <ToolPageClient
      tool={{...rest, icon: tool.icon}}
      aiContent={aiContent}
      translations={translations}
    />
  );
}
