
"use client";

import { FileConverter } from "@/components/file-converter";
import { Header } from "@/components/header";
import { TrustAndSecurity } from "@/components/trust-and-security";
import { SeoContent } from "@/components/seo-content";
import { RelatedTools } from "@/components/related-tools";
import Link from "next/link";
import { FeatureGrid } from "@/components/feature-grid";
import { useState, useMemo, useEffect } from "react";
import type { ConversionType } from "@/components/file-converter";


export function PdfToWordConverterPageClient() {
  const [conversionType, setConversionType] = useState<ConversionType>("pdf-to-word");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const pageHeadings = useMemo(() => {
    switch (conversionType) {
      case "pdf-to-word": return { title: "Free PDF to Word Converter", subtitle: "Convert PDF to Word Online (Fast & Free)" };
      case "word-to-pdf": return { title: "Free Word to PDF Converter", subtitle: "Convert Word to PDF Online (Fast & Free)" };
      case "pdf-to-jpg": return { title: "Free PDF to JPG Converter", subtitle: "Convert PDF to JPG Online (High Quality)" };
      case "jpg-to-pdf": return { title: "Free JPG to PDF Converter", subtitle: "Convert JPG to PDF Online (Simple & Secure)" };
      case "pdf-to-excel": return { title: "Free PDF to Excel Converter", subtitle: "Convert PDF to Excel Online (Accurate Data)" };
      case "excel-to-pdf": return { title: "Free Excel to PDF Converter", subtitle: "Convert Excel to PDF Online (Preserve Formatting)" };
      case "pdf-to-ppt": return { title: "Free PDF to PowerPoint Converter", subtitle: "Convert PDF to PPT Online" };
      case "ppt-to-pdf": return { title: "Free PowerPoint to PDF Converter", subtitle: "Convert PPT to PDF Online" };
      case "html-to-pdf": return { title: "Free HTML to PDF Converter", subtitle: "Convert Webpages to PDF" };
      case "merge-pdf": return { title: "Merge PDF Files", subtitle: "Combine Multiple PDFs into One" };
      case "split-pdf": return { title: "Split PDF File", subtitle: "Extract Pages from a PDF" };
      case "extract-pages": return { title: "Extract Pages from PDF", subtitle: "Select and Save Specific Pages" };
      case "delete-pages": return { title: "Delete Pages from PDF", subtitle: "Remove Unwanted Pages from a PDF" };
      case "reorder-pages": return { title: "Reorder PDF Pages", subtitle: "Arrange Pages in Your Desired Order" };
      case "rotate-pages": return { title: "Rotate PDF Pages", subtitle: "Correct the Orientation of Your Pages" };
      case "watermark-text": return { title: "Add Watermark to PDF", subtitle: "Stamp Your PDF with Text or an Image" };
      case "add-page-numbers": return { title: "Add Page Numbers to PDF", subtitle: "Easily Number the Pages of Your PDF" };
      case "protect-pdf": return { title: "Protect PDF with Password", subtitle: "Encrypt and Secure Your PDF" };
      case "unlock-pdf": return { title: "Unlock PDF", subtitle: "Remove Password and Restrictions from PDF" };
      case "repair-pdf": return { title: "Repair PDF", subtitle: "Fix Corrupted or Damaged PDF Files" };
      case "pdf-to-pdfa": return { title: "Convert to PDF/A", subtitle: "Create Archival-Standard PDFs" };
      case "ocr-pdf": return { title: "OCR PDF", subtitle: "Make Scanned PDFs Searchable and Editable" };
      case "edit-pdf": return { title: "Edit PDF", subtitle: "Add Text, Shapes, and Images to a PDF" };
      default: return { title: "Free PDF Tools", subtitle: "Your Go-To Solution for PDF Management" };
    }
  }, [conversionType]);

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center my-8">
          {pageHeadings.title}
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mb-8">
          A PDF to Word converter is an online tool that transforms a PDF file into an editable Microsoft Word document (in .docx format). While PDFs are perfect for sharing and printing, they are difficult to edit. That’s why converting a PDF to Word is essential when you want to update information, fix formatting, or reuse content. Our free PDF to Word converter unlocks your PDF, allowing you to make changes instantly in Word, Google Docs, or any text editor.
        </p>
        <h2 className="text-3xl font-bold text-center mb-6">{pageHeadings.subtitle}</h2>
        <FileConverter conversionType={conversionType} setConversionType={setConversionType} />
        <FeatureGrid setConversionType={setConversionType} />
        <TrustAndSecurity />
        <SeoContent />
        <RelatedTools />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground bg-slate-50 dark:bg-slate-900 border-t">
        <div className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>|</span>
            <Link href="/about" className="hover:underline">About</Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-of-use" className="hover:underline">Terms of Use</Link>
        </div>
        <p className="mt-2">© {year} PDF2Word. A part of <Link href="https://www.all2ools.com/" className="underline" target="_blank" rel="noopener noreferrer">All2ools.com</Link></p>
      </footer>
    </div>
  );
}
