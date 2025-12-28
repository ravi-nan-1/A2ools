
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import { Suspense } from 'react';
import { MainLayout } from '@/components/shared/main-layout';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ClientOnly } from '@/components/shared/client-only';
import { AdBanner } from '@/components/shared/ad-banner';
import { DeferredAdBanner } from '@/components/shared/deferred-ad-banner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://all2ools.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Free Online AI Tools | PDF, SEO, Image & Business Tools',
  description: 'All2ools offers 30+ free AI tools for PDFs, PDF to Word, SEO, images, and business tasks. Fast, easy, and no signup required.',
  keywords: 'pdf to word converter online, compress pdf online, image compressor online, text to speech online, paraphrasing tool online, ai image generator free, ai chatbot, plagiarism checker, website seo checker, backlink checker, tool ai, online for free, forex arbitrage, api latency, convert json, json to excel, no signup',
  icons: {
    icon: '/logo.svg',
  },
  other: {
    'google-adsense-account': 'ca-pub-3080938150148610',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={cn("font-body antialiased", inter.variable, sourceCodePro.variable)}>
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <MainLayout>{children}</MainLayout>
          </Suspense>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}