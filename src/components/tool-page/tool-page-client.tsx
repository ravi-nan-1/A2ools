"use client";

import type { Tool } from '@/lib/tools';
import type { GenerateSEOMetadataOutput } from '@/ai/flows/generate-seo-metadata';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, List, CaseSensitive, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';
import { ToolInterface } from './tool-interface';
import { AdBanner } from '@/components/shared/ad-banner';
import { useState, useEffect, useCallback, useTransition } from 'react';
import { handlePageTranslation } from '@/app/actions';
import type { PageContent } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


interface ToolPageClientProps {
  tool: Tool & { image: string; imageHint: string };
  aiContent: GenerateSEOMetadataOutput;
  translations: Record<string, Record<string, string>>;
}

export function ToolPageClient({ tool, aiContent, translations }: ToolPageClientProps) {
  const { language, translate } = useLanguage();
  const { toast } = useToast();
  const { jsonLdSchema } = aiContent;

  const [isPending, startTransition] = useTransition();

  const [pageContent, setPageContent] = useState<PageContent>({
    longDescription: translate(`${tool.slug}_long_description`),
    faq: translate(`${tool.slug}_faq`),
    features: translate(`${tool.slug}_features`),
    howItWorks: translate(`${tool.slug}_how_it_works`),
    useCases: translate(`${tool.slug}_use_cases`),
  });

  const getOriginalContent = useCallback(() => {
    return {
      longDescription: translations['en'][`${tool.slug}_long_description`],
      faq: translations['en'][`${tool.slug}_faq`],
      features: translations['en'][`${tool.slug}_features`],
      howItWorks: translations['en'][`${tool.slug}_how_it_works`],
      useCases: translations['en'][`${tool.slug}_use_cases`],
    };
  }, [tool.slug, translations]);
  
  useEffect(() => {
    if (language === 'en') {
      setPageContent(getOriginalContent());
      return;
    }

    startTransition(async () => {
      const originalContent = getOriginalContent();
      const result = await handlePageTranslation(originalContent, language);
      if (result.error) {
         toast({
          title: "Translation Failed",
          description: result.error,
          variant: "destructive",
        });
        setPageContent(getOriginalContent()); // Revert to english on failure
      } else {
        setPageContent(result.data);
      }
    });

  }, [language, tool.slug, getOriginalContent, toast]);

  const faqItems = (pageContent.faq || '').split('\n\n').map(q => q.trim()).filter(Boolean);
  const featureItems = (pageContent.features || '').split('\n').map(f => f.trim()).filter(Boolean);
  const howItWorksItems = (pageContent.howItWorks || '').split('\n').map(s => s.trim()).filter(Boolean);
  const useCaseItems = (pageContent.useCases || '').split('\n').map(u => u.trim()).filter(Boolean);

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
          <LanguageSwitcher />
        </div>

        <header className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8 shadow-lg">
           <Image
            src={tool.image}
            alt={`${tool.name} banner`}
            fill
            className="object-cover"
            priority
            data-ai-hint={tool.imageHint}
          />
           <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center font-headline tracking-tight">
              {translate(tool.slug)}
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{translate(tool.slug)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : pageContent.longDescription}
                </p>
              </CardContent>
            </Card>

            <ToolInterface slug={tool.slug} />

            <div className="my-8">
              <AdBanner
                adSlot="YOUR_IN_ARTICLE_AD_SLOT_ID"
                className="w-full min-h-[100px] flex items-center justify-center bg-muted rounded-lg"
              />
            </div>

            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="text-primary"/>
                    {translate('faq')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : faqItems.map((faqItem, index) => {
                  const [question, ...answer] = faqItem.split('\n');
                  return (
                    <div key={index}>
                      <h4 className="font-semibold text-foreground">{question}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{answer.join('\n')}</p>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 sticky top-24">
            <AdBanner adSlot="YOUR_SIDE_BANNER_AD_SLOT_ID" className="w-full min-h-[250px] bg-muted rounded-lg mb-8 hidden lg:flex items-center justify-center" />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary"/>
                    {translate('features')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <ul className="space-y-2 text-muted-foreground">
                    {featureItems.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                    <List className="text-primary"/>
                    {translate('how_it_works')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                 {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                    <ol className="space-y-3 text-muted-foreground">
                        {howItWorksItems.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0 mt-0.5">{index + 1}</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                 )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                    <CaseSensitive className="text-primary"/>
                    {translate('use_cases')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <ul className="space-y-2 text-muted-foreground">
                    {useCaseItems.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-2">
                         <ArrowRight className="h-4 w-4 text-primary mt-1.5 shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
