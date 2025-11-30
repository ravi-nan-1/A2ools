
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PageContent {
  title: string;
  content: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);
  const pageTitle = params.page.charAt(0).toUpperCase() + params.page.slice(1);

  if (!tool) {
    return {
      title: 'Tool not found',
    };
  }

  return {
    title: `${pageTitle} | ${tool.name}`,
    description: `Learn more about the ${params.page} for the ${tool.name} tool on All2ools.`,
  };
}

export default async function ToolSubPage({
  params,
}: {
  params: { slug: string; page: string };
}) {
  const tool = tools.find((t) => t.slug === params.slug);
  const { page } = params;

  if (!tool || !['about', 'contact', 'privacy', 'terms'].includes(page)) {
    notFound();
  }

  const pageContentMap: Record<string, PageContent> = {
    about: {
      title: `About the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
          <p>
            This tool, part of the All2ools suite, is designed to provide best-in-class functionality for its specific purpose. Our goal is to offer powerful, free, and easy-to-use utilities for everyone.
          </p>
          <p>
            The <strong>{tool.name}</strong> tool helps users accomplish specific tasks efficiently. We are constantly working to improve its features and ensure it remains a top-tier resource.
          </p>
        </div>
      ),
    },
    contact: {
      title: `Contact Us About the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
          <p>
            If you have questions, feedback, or issues specific to the <strong>{tool.name}</strong> tool, we would love to hear from you.
          </p>
          <p>
            Please direct all inquiries to our main support channel. You can reach us via our primary contact page or email us directly at{' '}
            <a href="mailto:support@all2ools.com" className="text-primary hover:underline">
              support@all2ools.com
            </a>. Please mention the name of the tool in your message.
          </p>
        </div>
      ),
    },
    privacy: {
      title: `Privacy Policy for the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
            <p>Your privacy is paramount when using the <strong>{tool.name}</strong> tool. For tools that process data client-side, we ensure that none of your input data is ever sent to our servers. All processing happens securely within your browser.</p>
            <p>For tools that require server-side processing, we only handle the data necessary to perform the requested function and do not store it beyond the required processing time. For more detailed information, please refer to our main <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</p>
        </div>
      ),
    },
    terms: {
      title: `Terms of Service for the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
            <p>The <strong>{tool.name}</strong> tool is provided "AS-IS" without any warranties. While we strive for accuracy and reliability, we are not liable for any issues that may arise from its use.</p>
            <p>By using this tool, you agree to the terms laid out in our main <a href="/terms" className="text-primary hover:underline">Terms of Service</a>. Please use this tool responsibly.</p>
        </div>
      ),
    },
  };

  const { title, content } = pageContentMap[page];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
            {title}
          </h1>
        </header>

        <Card>
            <CardContent className="p-6 md:p-8 text-lg leading-relaxed text-foreground/80">
                {content}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
