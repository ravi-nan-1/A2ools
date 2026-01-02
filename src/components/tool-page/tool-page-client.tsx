
"use client";

import type { Tool } from '@/lib/tools';
import type { GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle2, Sparkles, BookOpen, BrainCircuit, HelpCircle, ArrowRight } from 'lucide-react';
import { ToolInterface } from './tool-interface';
import { DeferredAdBanner } from '@/components/shared/deferred-ad-banner';
import { toolClusters } from '@/lib/tool-clusters';
import { tools } from '@/lib/tools';
import { ToolCard } from '@/components/homepage/tool-card';
import { placeholderImages } from '@/lib/placeholder-images';

interface ToolPageClientProps {
  tool: Tool & { image: string; imageHint: string };
  aiContent: GenerateSEOMetadataOutput;
}

const iframeTools = [
    'ai-humanizer',
    'free-qr-code-generator',
    'free-cheat-sheet-generator',
    
    'tinyurl-maker',
    'ai-product-background-remover',
    'pdf-to-word-converter',
    'ai-tutor',
    'excel-power-tools',
    'plagiarism-checker'
  ];

const ContentSection = ({ title, content, icon: Icon }: { title: string, content: string, icon: React.ElementType }) => {
    if (!content || content.startsWith(`${title.toLowerCase().replace(/ /g, '_')}_`)) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Icon className="mr-2"/>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">The {title.toLowerCase()} for this tool are being updated. Please check back soon.</p>
                </CardContent>
            </Card>
        );
    }

    const items = content.split('\n').map(item => item.trim()).filter(Boolean);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Icon className="mr-2"/>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};


const HowItWorksSection = ({ content }: { content: string }) => {
    if (!content || content.startsWith('how_it_works_')) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="mr-2"/>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">The instructions for this tool are being updated. Please check back soon.</p>
                </CardContent>
            </Card>
        )
    }
    const items = content.split('\n').map(item => item.trim()).filter(Boolean);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="mr-2"/>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="space-y-4 text-muted-foreground">
                    {items.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base shrink-0">{index + 1}</span>
                            <span className="mt-1">{step}</span>
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
}

const FaqSection = ({ content }: { content: string }) => {
    if (!content || content.startsWith('faq_')) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HelpCircle className="text-primary"/>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">FAQs for this tool are being updated. Please check back soon.</p>
                </CardContent>
            </Card>
        );
    }
    const items = content.split('\n\n').map(q => q.trim()).filter(Boolean);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <HelpCircle className="text-primary"/>
                    Frequently Asked Questions
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {items.map((faqItem, index) => {
                    const [question, ...answerParts] = faqItem.split('\n');
                    const answer = answerParts.join('\n');
                    return (
                        <div key={index} className="border-l-2 border-primary pl-4">
                            <h4 className="font-semibold text-foreground text-lg">{question.replace(/^\d+\.\s*/, '')}</h4>
                            <p className="text-muted-foreground mt-1">{answer}</p>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}

export function ToolPageClient({ tool, aiContent }: ToolPageClientProps) {
  const { translate } = useLanguage();
  const { jsonLdSchema } = aiContent;

  const longDescription = translate(`${tool.slug}_long_description`);
  const faqContent = translate(`${tool.slug}_faq`);
  const featuresContent = translate(`${tool.slug}_features`);
  const howItWorksContent = translate(`${tool.slug}_how_it_works`);
  const useCasesContent = translate(`${tool.slug}_use_cases`);
  
  const isIframeTool = iframeTools.includes(tool.slug);

  const relatedCluster = toolClusters.find(cluster => cluster.slugs.includes(tool.slug));
  const relatedTools = relatedCluster
    ? tools
        .filter(t => relatedCluster.slugs.includes(t.slug) && t.slug !== tool.slug)
        .map(t => {
          const image = placeholderImages.find(img => img.id === t.slug);
          return {
            ...t,
            image: image?.imageUrl || `https://picsum.photos/seed/${t.slug}/300/300`,
            width: 300,
            height: 300,
            imageHint: image?.imageHint || 'tool illustration',
          };
        })
    : [];

  if (isIframeTool) {
    return <ToolInterface slug={tool.slug} />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdSchema }}
      />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-start mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translate('back_to_tools')}
            </Link>
          </Button>
        </div>

        <header className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden mb-8 shadow-2xl shadow-primary/10">
           <div className="absolute inset-0 overflow-hidden">
            <Image
                src={tool.image}
                alt={`${tool.name} banner`}
                fill
                className="object-cover"
                priority
                data-ai-hint={tool.imageHint}
              />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-start justify-end p-6 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-left font-headline tracking-tight shadow-black drop-shadow-lg">
              {translate(tool.slug)}
            </h1>
          </div>
        </header>
        
        <div className="mx-auto max-w-7xl">
          <div className="space-y-12">
              <section>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                   {longDescription.startsWith(`${tool.slug}_`) ? 'The description for this tool is being updated. Please check back soon.' : longDescription}
                 </p>
              </section>

              <section>
                <ToolInterface slug={tool.slug} />
              </section>

              <div className="my-8">
                <DeferredAdBanner
                  adSlot="YOUR_IN_ARTICLE_AD_SLOT_ID"
                  className="w-full min-h-[100px] flex items-center justify-center bg-muted rounded-lg"
                />
              </div>
              
              {relatedTools.length > 0 && relatedCluster && (
                <section>
                  <h3 className="text-2xl font-bold text-foreground mb-6 font-headline text-center">{relatedCluster.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {relatedTools.map(relatedTool => (
                      <ToolCard key={relatedTool.slug} tool={relatedTool} />
                    ))}
                  </div>
                </section>
              )}

              <section>
                <Tabs defaultValue="features" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="features"><Sparkles className="mr-2"/>{translate('features')}</TabsTrigger>
                    <TabsTrigger value="how-it-works"><BookOpen className="mr-2"/>{translate('how_it_works')}</TabsTrigger>
                    <TabsTrigger value="use-cases"><BrainCircuit className="mr-2"/>{translate('use_cases')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="features" className="mt-6">
                    <ContentSection title="Features" content={featuresContent} icon={Sparkles} />
                  </TabsContent>
                  <TabsContent value="how-it-works" className="mt-6">
                     <HowItWorksSection content={howItWorksContent} />
                  </TabsContent>
                  <TabsContent value="use-cases" className="mt-6">
                    <ContentSection title="Common Use Cases" content={useCasesContent} icon={BrainCircuit} />
                  </TabsContent>
                </Tabs>
              </section>

              <section>
                 <FaqSection content={faqContent} />
              </section>
          </div>
        </div>
      </div>
    </>
  );
}
