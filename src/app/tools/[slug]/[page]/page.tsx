// src/app/tools/[slug]/[page]/page.tsx
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

interface PageContent {
  title: string;
  content: React.ReactNode;
}

// ✅ FIX: params is now a Promise in Next.js 16
interface PageProps {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // ✅ Await the params
  const { slug, page } = await params;
  
  const tool = tools.find((t) => t.slug === slug);
  const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);

  if (!tool) {
    return {
      title: 'Tool not found',
    };
  }

  return {
    title: `${pageTitle} | ${tool.name}`,
    description: `Learn more about the ${page} for the ${tool.name} tool on All2ools.`,
  };
}

export default async function ToolSubPage({ params }: PageProps) {
  // ✅ Await the params
  const { slug, page } = await params;
  
  const tool = tools.find((t) => t.slug === slug);

  if (!tool || !['about', 'contact', 'privacy', 'terms'].includes(page)) {
    notFound();
  }

  const pageContentMap: Record<string, PageContent> = {
    about: {
      title: `About the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
          <p>
            The <strong>{tool.name}</strong> is a specialized utility within the All2ools ecosystem, a comprehensive suite of free, AI-powered online tools designed for professionals, students, and enthusiasts alike. Our mission is to democratize access to powerful digital utilities, making them simple, intuitive, and available to everyone, everywhere.
          </p>
          <p>
            This specific tool was developed to address the common challenges associated with <strong>{tool.description.toLowerCase().replace('ai ', '')}</strong>. We focused on creating a user-friendly interface that delivers accurate and reliable results instantly. Whether you are a seasoned professional or a newcomer, we believe this tool will streamline your workflow and enhance your productivity.
          </p>
          <p>
            Like all utilities on All2ools.com, the {tool.name} is built with a commitment to quality, security, and user privacy. We are constantly working to improve its features and ensure it remains a top-tier resource in its category.
          </p>
        </div>
      ),
    },
    contact: {
      title: `Contact Us About the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
          <p>
            We value your feedback and are here to help you with any questions, issues, or suggestions you may have regarding the <strong>{tool.name}</strong> tool. Your input is crucial for helping us improve and evolve our services.
          </p>
          <p>
            For the fastest support, please send an email to our dedicated support team at{' '}
            <a href="mailto:support@all2ools.com" className="text-primary hover:underline">
              support@all2ools.com
            </a>. To help us assist you more efficiently, please include "<strong>{tool.name}</strong>" in the subject line of your email.
          </p>
          <p>
            If you have general inquiries about the All2ools platform or would like to suggest a new tool, feel free to visit our main <a href="/contact" className="text-primary hover:underline">Contact Page</a>. We read every message and strive to respond as promptly as possible.
          </p>
        </div>
      ),
    },
    privacy: {
      title: `Privacy Policy for the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
          <p>Your privacy is a top priority when you use the <strong>{tool.name}</strong> tool. We have designed our tools with a "privacy-first" approach to ensure your data remains secure and confidential.</p>
          <p>
            <strong>Data Handling:</strong> For many of our utilities, including this one, all data processing occurs entirely within your browser on your local machine. This means that any data, files, or content you input into the tool are <strong>never sent to our servers</strong>. This client-side processing model provides the highest level of privacy and security.
          </p>
          <p>
            For the few tools that require server-side computation (such as those involving complex AI models), we only transmit the minimum data necessary to perform the requested function. This data is processed in-memory and is never stored, logged, or shared. All connections are encrypted using industry-standard protocols.
          </p>
          <p>For a comprehensive overview of our data practices across the entire platform, please refer to our main <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</p>
        </div>
      ),
    },
    terms: {
      title: `Terms of Service for the ${tool.name} Tool`,
      content: (
        <div className="space-y-4">
          <p>By using the <strong>{tool.name}</strong> tool, you agree to be bound by the All2ools general <a href="/terms" className="text-primary hover:underline">Terms of Service</a>. The following points are particularly relevant to your use of this specific utility:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>"AS-IS" Provision:</strong> This tool is provided "AS-IS" and "AS-AVAILABLE" without any warranties, express or implied. While we make every effort to ensure the accuracy, reliability, and functionality of our tools, we do not guarantee that the results will be error-free or suitable for every purpose.
            </li>
            <li>
              <strong>Limitation of Liability:</strong> Your use of the {tool.name} is at your own risk. All2ools shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this service. It is your responsibility to verify the results generated by the tool.
            </li>
            <li>
              <strong>Responsible Use:</strong> You agree not to use this tool for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.
            </li>
          </ul>
          <p>We encourage you to read the full <a href="/terms" className="text-primary hover:underline">Terms of Service</a> for a complete understanding of your rights and obligations when using our platform.</p>
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