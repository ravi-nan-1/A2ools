
import { tools } from '@/lib/tools';
import { HomePageClient } from '@/components/homepage/home-page-client';
import { placeholderImages } from '@/lib/placeholder-images';
import { LanguageProvider } from '@/context/language-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  
  title: 'Free Online AI Tools | PDF, SEO, Image & Business Tools',
  description:
    'All2ools offers 30+ free AI tools for PDFs, PDF to Word, SEO, images, and business tasks. Fast, easy, and no signup required.',
  alternates: {
    canonical: 'https://www.all2ools.com',
  },
};


export default function Home() {
  const toolsWithImages = tools.map((tool) => {
    const image = placeholderImages.find((img) => img.id === tool.slug);
    // Don't pass the icon component to the client
    const { icon, ...toolWithoutIcon } = tool;
    return {
      ...toolWithoutIcon,
      image: image?.imageUrl || `https://picsum.photos/seed/${tool.slug}/300/300`,
      width: 300,
      height: 300,
      imageHint: image?.imageHint || 'tool illustration',
    };
  });

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'All2ools.com',
    url: 'https://www.all2ools.com',
    description:
      'A comprehensive suite of 30+ free online tools, including AI-powered utilities for PDF, SEO, image editing, and business.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.all2ools.com/tools/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomePageClient tools={toolsWithImages} />
    </LanguageProvider>
  );
}