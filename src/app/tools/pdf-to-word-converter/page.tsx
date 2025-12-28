
import type { Metadata } from 'next';
import { PdfToWordConverterPageClient } from './client-page';

export const metadata: Metadata = {
  title: 'Free PDF to Word Converter | Convert PDF to DOCX Online',
  description: 'Convert PDF to editable Word documents for free. Our online tool makes it easy to convert PDF to DOCX with no watermarks or signup required.',
  alternates: {
    canonical: 'https://www.all2ools.com/tools/pdf-to-word-converter',
  },
};

export default function PdfToWordConverterPage() {
  return <PdfToWordConverterPageClient />;
}
