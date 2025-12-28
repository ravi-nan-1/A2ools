
"use client";

import { useState } from "react";
import { QROptionsPanel } from "./QROptionsPanel";
import { QRPreviewPanel } from "./QRPreviewPanel";
import { QRConfig } from "./types";

const QrCodeGenerator = () => {
  const [qrConfig, setQRConfig] = useState<QRConfig>({
    type: "url",
    content: "https://example.com",
    fgColor: "#000000",
    bgColor: "#ffffff",
    size: 512,
    errorCorrection: "M",
    logo: null,
    logoSize: 20,
    margin: 4,
  });

  return (
    <div>
      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          <QROptionsPanel config={qrConfig} setConfig={setQRConfig} />
          <QRPreviewPanel config={qrConfig} />
        </div>
      </main>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-16 mt-12 border-t">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* What is a QR Code Generator? */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Is a QR Code Generator?
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              A QR Code Generator is an online tool that helps you create QR
              codes for URLs, text, contact details, WiFi, social media, and
              more. Users can scan these QR codes using any smartphone camera to
              instantly access digital content.
            </p>
          </div>

          {/* Why Choose Us? */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Why Choose Our Free QR Code Generator?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Free & Never Expire
                </h3>
                <p className="text-muted-foreground">
                  Our static QR codes are 100% free and permanent. Once created,
                  they are yours forever.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Fully Customizable
                </h3>
                <p className="text-muted-foreground">
                  Match your brand with custom colors and logos. Download in
                  PNG, SVG, or JPG format.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">No Signup Required</h3>
                <p className="text-muted-foreground">
                  Generate and download QR codes instantly without any
                  registration or hidden fees.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">High-Resolution</h3>
                <p className="text-muted-foreground">
                  Get crisp, high-quality QR codes suitable for both print and
                  digital media.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  We value your privacy. No data is stored or tracked from your
                  static QR codes.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">
                  Commercial Use Allowed
                </h3>
                <p className="text-muted-foreground">
                  Use your generated QR codes for any commercial purpose without
                  restrictions.
                </p>
              </div>
            </div>
          </div>

          {/* How to Create */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Create a QR Code in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold">Choose Type</h3>
                <p className="text-muted-foreground mt-1">
                  Select the content type for your QR code, like a URL, vCard,
                  or WiFi network.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold">Customize Design</h3>
                <p className="text-muted-foreground mt-1">
                  Personalize colors, add your logo, and choose a design that
                  fits your brand.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold">Download</h3>
                <p className="text-muted-foreground mt-1">
                  Instantly download your high-resolution QR code, ready for
                  printing and sharing.
                </p>
              </div>
            </div>
          </div>

          {/* Static vs Dynamic */}
          <div className="grid lg:grid-cols-2 gap-8 items-center pt-8 border-t">
            <div className="bg-card p-8 rounded-lg border h-full">
              <h3 className="text-2xl font-bold mb-3">Free Static QR Codes</h3>
              <p className="text-muted-foreground mb-4">
                Perfect for permanent information. Your QR code is yours
                forever and will never stop working.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>Completely free
                  & never expire
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>No tracking or
                  analytics
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>Content is
                  fixed after creation
                </li>
              </ul>
            </div>
            <div className="bg-card p-8 rounded-lg border border-primary/50 h-full">
              <h3 className="text-2xl font-bold mb-3">Dynamic QR Codes (Pro)</h3>
              <p className="text-muted-foreground mb-4">
                Ideal for marketing campaigns. Edit the destination URL and
                track performance anytime.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✔</span>Editable content
                  after printing
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✔</span>Track scan
                  analytics (location, time)
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✔</span>Perfect for A/B
                  testing & campaigns
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                👉 Coming soon to our Pro plan!
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-card border rounded-lg p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Creating Your QR Code Now
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-6">
              Turn every scan into an opportunity to connect, convert, and
              grow. No limits, no hidden fees.
            </p>
            <a
              href="#top"
              className="inline-block bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 transition-colors"
            >
              Generate Your Free QR Code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QrCodeGenerator;
