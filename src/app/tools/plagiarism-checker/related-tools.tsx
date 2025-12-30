'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const relatedTools = [
  { title: 'Paraphrasing Tool', href: '/paraphrasing-tool' },
  { title: 'Grammar Checker', href: '/grammar-checker' },
  { title: 'Summarizer', href: '/summarizer' },
  { title: 'SEO Analyzer', href: '/seo-analyzer' },
];

export default function RelatedTools() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8">Related Tools</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedTools.map((tool, index) => (
          <Link key={index} href={tool.href} passHref>
            <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Explore our {tool.title.toLowerCase()} to further enhance your content.</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
