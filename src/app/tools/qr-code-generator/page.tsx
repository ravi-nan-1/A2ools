
import { QrCodeGenerator } from "./qr-code-generator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function QrCodeGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center mb-4">
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      <section className="relative bg-background py-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            QR Code Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate QR codes for your website, text, or other data.
          </p>
        </div>
      </section>
      <QrCodeGenerator />
    </div>
  );
}
