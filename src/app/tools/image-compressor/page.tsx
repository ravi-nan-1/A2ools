
import { RuleWiseAiCompressor } from '@/components/RuleWiseAiCompressor';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

import {
  ShieldCheck,
  Layers,
  Zap,
  Globe,
  FileJson,
  Box,
  UploadCloud,
  Scaling,
  FileCog,
  DownloadCloud,
  User,
  ArrowRight
} from 'lucide-react';

const features = [
  { icon: <ShieldCheck />, title: 'Lossless Compression', description: 'Reduce file sizes with zero quality loss for PNGs.' },
  { icon: <Layers />, title: 'Batch Processing', description: 'Our bulk image compression can load and compress multiple files at once.' },
  { icon: <Box />, title: 'Large File Support', description: 'Easily upload and compress files up to 5GB.' },
  { icon: <Zap />, title: 'Secure & Private', description: 'Files are processed securely and deleted after 2 hours for privacy.' },
  { icon: <Globe />, title: 'Fast Global Performance', description: 'Our powerful cloud servers handle files at incredible speeds.' },
  { icon: <FileJson />, title: 'Universal Format Support', description: 'Compress images, documents, videos, and much more.' },
];

const steps = [
  { icon: <UploadCloud />, title: '1. Upload Files', description: 'Drag and drop your files, or select them from your device.' },
  { icon: <Scaling />, title: '2. Choose Mode', description: 'Select Lossless, High-Quality, or Maximum compression.' },
  { icon: <FileCog />, title: '3. AI Compresses', description: 'Our smart engine optimizes each file for the best size-to-quality ratio.' },
  { icon: <DownloadCloud />, title: '4. Download Instantly', description: 'Get your smaller files individually or as a single ZIP archive.' },
];

const personas = [
  { icon: <User />, name: 'Students' },
  { icon: <User />, name: 'HR Professionals' },
  { icon: <User />, name: 'Graphic Designers' },
  { icon: <User />, name: 'Office Users' },
  { icon: <User />, name: 'Freelancers' },
  { icon: <User />, name: 'Content Creators' },
];

const faqs = [
    { q: 'Is this online file compressor completely free?', a: 'Yes, our online file compressor is completely free to use. There are no hidden charges or subscriptions.' },
    { q: 'How does lossless file compression work?', a: 'Lossless compression reduces file size without any loss of quality. It works by identifying and eliminating statistical redundancy. For images like PNGs, this means you get a smaller file with the exact same quality.' },
    { q: 'Are my files secure when I compress files online?', a: 'Yes, your files are secure. We use secure connections for all file transfers, and your files are automatically deleted from our servers after 2 hours.' },
    { q: 'What is the maximum file size I can upload?', a: 'You can upload and compress files up to 5GB in size. For larger files, you may need to check our premium plans.' },
    { q: 'Can I compress multiple files at once?', a: 'Yes, our batch processing feature allows you to upload and compress multiple files simultaneously, saving you time and effort.' },
    { q: 'Which file formats can I compress online?', a: 'Our universal compressor supports a wide range of formats, including images (JPG, PNG, GIF), documents (PDF, DOCX, PPTX), videos (MP4, AVI, MOV), and more.' },
    { q: 'Can I use this after I convert PDF to DOCX online?', a: 'Absolutely. After converting a PDF to DOCX, you can use our compressor to reduce the file size of the document, making it easier to share and store.' },
    { q: 'Will compressing an image reduce its quality?', a: 'It depends on the mode you choose. Lossless compression for PNGs will not reduce quality at all. For other formats and modes like High-Quality or Maximum, there might be a minimal, often unnoticeable, loss in quality to achieve a much smaller file size.' },
    { q: 'How do I download the compressed files?', a: 'You can download each compressed file individually, or you can download all of them at once as a convenient ZIP archive.' },
    { q: 'Does this work on mobile devices?', a: 'Yes, our online file compressor is fully responsive and works on all modern web browsers on both desktop and mobile devices.' },
    { q: 'How do I compress a PDF to a smaller size?', a: 'Simply upload your PDF file, choose your desired compression mode, and let our tool do the rest. You will get a smaller, optimized PDF in seconds.' },
];

const relatedTools = [
  { title: 'PDF Splitter', description: 'Split your PDF files into multiple documents.', href: '#' },
  { title: 'PDF to Word', description: 'Convert PDF to Word for free.', href: '#' },
  { title: 'More Exciting Tools', description: 'Explore our collection of online tools.', href: '#' },
];

const ImageCompressorPage = () => {
  return (
    <div className="w-full space-y-12 md:space-y-20">
      <section className="py-20 text-center container">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">
          Universal File Compressor
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          The best free file compressor to compress images, PDFs, and documents online. Reduce file size without losing quality with our universal file compressor tool.
        </p>
        <Button size="lg" className="mt-8" asChild>
            <Link href="#compressor">Upload & Compress File <ArrowRight className="ml-2" /></Link>
        </Button>
      </section>

      <section id="compressor" className="container">
          <RuleWiseAiCompressor />
      </section>

      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold">Why an Online File Compressor is Essential</h2>
                <p className="text-muted-foreground">
                    In today’s data-driven world, file sizes are constantly growing. Our universal file compressor tool helps you shrink files online, from high-resolution images to lengthy documents. Large files consume significant storage and bandwidth, leading to slow websites and difficulty sharing files. When you compress files online, you create a more efficient digital workflow.
                </p>
                <p className="text-muted-foreground">
                    At its core, compression is about making files smaller. The distinction between ‘lossy’ and ‘lossless’ is crucial. While lossy compression can reduce quality, our online file compressor champions <span className="font-semibold text-primary">lossless compression</span>. This advanced technique allows you to reduce file size without losing quality, which is ideal for professionals who need to compress images online or compress documents online with perfect fidelity.
                </p>
                <p className="text-muted-foreground">
                    Whether you need to compress PDF online for an email attachment, or compress a ZIP file online free for faster sharing, our tool is the solution. It’s the best file compressor online because it’s fast, free, and secure.
                </p>
            </div>
            <div className="text-muted-foreground">
                <p>
                    Many users find our tool invaluable after using a PDF to Word online free service. When you convert PDF to DOCX online, the resulting file can sometimes be larger than the original. Our tool is the best PDF to Word converter companion, allowing you to shrink that DOCX file back down. This also applies when you merge files with a free PDF joiner. If you merge PDF, the document can get large, so it makes the document easier to email and edit with PDF in Word without performance issues.
                </p>
                <p className="mt-4">
                    The benefits are immediate. Compressed files upload and download faster. They bypass restrictive email attachment limits. For web developers, use our tool to reduce image size (jpg/jpeg/webp), leading to faster websites, improving user experience and SEO. By using our tool, you’re not just saving space; you’re making your digital life more efficient.
                </p>
            </div>
        </div>
      </section>

      <section className="container">
        <div className="text-center">
            <h2 className="text-3xl font-bold">Packed with Powerful Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need for fast, efficient, and effortless file compression.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, i) => (
                <div key={i} className="p-6 rounded-lg border bg-muted/30 flex items-start gap-4">
                    <div className="text-primary bg-primary/10 p-3 rounded-lg">{feature.icon}</div>
                    <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Simple Steps to Smaller Files</h2>
                <p className="text-muted-foreground mt-2">Drag and drop your files, or select them from your device.</p>
            </div>
            <div className="max-w-2xl mx-auto mt-12 space-y-8">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-6">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      <section className="container">
        <div className="text-center">
            <h2 className="text-3xl font-bold">Made for Everyone</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-12">
            {personas.map((p, i) => (
                <div key={i} className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
                        {p.icon}
                    </div>
                    <p className="font-semibold">{p.name}</p>
                </div>
            ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container max-w-3xl">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full mt-12">
              {faqs.map((faq, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
        </div>
      </section>
      
      <section className="container">
        <div className="text-center">
            <h2 className="text-3xl font-bold">Related Tools</h2>
            <p className="text-muted-foreground mt-2">To improve productivity, try our other free tools!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            {relatedTools.map((tool, i) => (
                <Link href={tool.href} key={i} className="block p-6 rounded-lg border bg-card hover:bg-muted/50 transition-colors group">
                    <h3 className="font-semibold">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                    <ArrowRight className="h-4 w-4 mt-2 text-muted-foreground transition-transform group-hover:translate-x-1"/>
                </Link>
            ))}
        </div>
      </section>

    </div>
  );
};

export default ImageCompressorPage;
