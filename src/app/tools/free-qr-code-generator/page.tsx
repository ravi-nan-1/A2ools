
'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const QrCodeGenerator = dynamic(
  () => import('@/components/qrcode/QrCodeGenerator'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading QR Code Generator...</p>
      </div>
    ),
  }
);

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="relative bg-background py-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Free QR Code Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate QR codes for your website, text, or other data for free.
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto text-left mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Best QR Code Generator Online</h2>
        <div className="text-muted-foreground space-y-4">
            <p>
            Welcome to the most powerful <strong>free QR code generator</strong> available online. 
            Our <strong>QR code maker</strong> allows you to <strong>create QR codes online</strong> for 
            any purpose - from business cards and websites to WiFi passwords and payment links.
            </p>
            <p>
            Unlike other tools, our <strong>QR code generator without watermark</strong> is completely 
            free with no hidden fees or signup required. Create <strong>dynamic QR codes</strong> with 
            custom colors, logos, and designs. Whether you need a <strong>QR code for business</strong> or personal use, we have you covered.
            </p>
        </div>
      </div>
      <QrCodeGenerator />
    </div>
  );
}
