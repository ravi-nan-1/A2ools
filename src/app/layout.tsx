
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import { Suspense } from 'react';
import { MainLayout } from '@/components/shared/main-layout';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';

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
  title: 'Free Online AI Tools | PDF, SEO, Image & Business Tools',
  description: 'All2ools offers 30+ free AI tools for PDFs, PDF to Word, SEO, images, and business tasks. Fast, easy, and no signup required.',
  keywords: 'ai humanizer, text humanizer, humanize ai text, convert ai text to human, pdf to word, word to pdf, pdf editor, pdf converter, file converter, universal file converter, plagiarism checker, detect plagiarism online, excel tools, excel automation, url shortener, shorten link, image converter, jpg to png, rent map, apartment finder, compress image, reduce image size, pdf summarizer, ai summary tool, online tools, free web tools, pdf tools, image tools, writing tools, seo tools, ai tools, productivity tools, all-in-one online tools, convert files online, qr code generator, free qr creator, ai tutor, study assistant ai, image crop, image resize',
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
