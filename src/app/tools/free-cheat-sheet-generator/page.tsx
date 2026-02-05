
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { FreeCheatSheetGenerator } from '@/app/(iframe-tools)/free-cheat-sheet-generator/free-cheat-sheet-generator';

export default function ToolPage() {
  const tool = tools.find(t => t.slug === 'free-cheat-sheet-generator');

  if (!tool) {
    notFound();
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">AI Cheat Sheet Generator – Free PDF, URL & Text Summarizer</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Turn any long content into a clean, colorful cheat sheet in seconds. Supports PDF, web URL, text, books, class notes, and coding docs.</p>
        </section>

        {/* Main Generator UI */}
        <section>
          <FreeCheatSheetGenerator />
        </section>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const tool = tools.find(t => t.slug === 'free-cheat-sheet-generator');
  if (!tool) {
    return {
      title: 'Tool not found',
      description: 'The requested tool could not be found.'
    }
  }

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
  };
}
