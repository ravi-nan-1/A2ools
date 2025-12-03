
'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { ClientOnly } from '@/components/shared/client-only';
import { DeferredAdBanner } from '@/components/shared/deferred-ad-banner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iframeTools = [
  'ai-humanizer',
  'free-qr-code-generator',
  'free-cheat-sheet-generator',
  'free-image-file-compressor',
  'tinyurl-maker',
  'ai-product-background-remover',
  'pdf-to-word-converter',
  'ai-tutor',
  'excel-power-tools',
  'plagiarism-checker',
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = pathname.split('/')[2];
  const isIframePage = iframeTools.includes(slug);
  const isHomePage = pathname === '/';

  if (isIframePage) {
    return (
      <>
        <div className="w-full h-screen overflow-hidden">{children}</div>
        <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center border-t bg-background p-2" style={{ minHeight: '50px' }}>
          <Button asChild variant="ghost">
             <Link href="/">
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back to All2ools.com
             </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <ClientOnly>
        <DeferredAdBanner
          adSlot="YOUR_BOTTOM_BANNER_AD_SLOT_ID"
          className="w-full min-h-[100px] flex items-center justify-center bg-muted my-4"
        />
      </ClientOnly>
      <Footer showRelatedTools={!isHomePage} />
    </div>
  );
}
