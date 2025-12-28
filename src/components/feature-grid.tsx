
import {
  ArrowRightLeft,
  FileImage,
  FileSpreadsheet,
  Presentation,
  FileCode,
  Combine,
  Split,
  Grab,
  BookCopy,
  RotateCcw,
  Shield,
  Unlock,
  Wrench,
  FileCheck,
  ScanText,
  PenSquare,
  Layers,
  Link as LinkIcon,
  Cloud,
  Eye,
  Monitor,
  AppWindow,
  Terminal,
  Smartphone,
  Clock,
  Pen,
  Users,
  Infinity,
  Zap,
  BadgeX,
  Gem
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConversionType } from "./file-converter";


const coreTools: { name: string; icon: React.ReactNode; conversion: ConversionType | null }[] = [
  { name: "PDF to Word", icon: <ArrowRightLeft />, conversion: "pdf-to-word" },
  { name: "Word to PDF", icon: <ArrowRightLeft />, conversion: "word-to-pdf" },
  { name: "PDF to JPG", icon: <FileImage />, conversion: "pdf-to-jpg" },
  { name: "JPG to PDF", icon: <FileImage />, conversion: "jpg-to-pdf" },
  { name: "PDF to Excel", icon: <FileSpreadsheet />, conversion: "pdf-to-excel" },
  { name: "Excel to PDF", icon: <FileSpreadsheet />, conversion: "excel-to-pdf" },
  { name: "PDF to PowerPoint", icon: <Presentation />, conversion: "pdf-to-ppt" },
  { name: "PPT to PDF", icon: <Presentation />, conversion: "ppt-to-pdf" },
  { name: "HTML to PDF", icon: <FileCode />, conversion: "html-to-pdf" },
  { name: "Merge PDF", icon: <Combine />, conversion: "merge-pdf" },
  { name: "Split PDF", icon: <Split />, conversion: "split-pdf" },
  { name: "Extract pages", icon: <BookCopy />, conversion: "extract-pages" },
  { name: "Delete pages", icon: <Grab />, conversion: "delete-pages" },
  { name: "Reorder pages", icon: <Layers />, conversion: "reorder-pages" },
  { name: "Rotate pages", icon: <RotateCcw />, conversion: "rotate-pages" },
  { name: "Add Watermark", icon: <PenSquare />, conversion: "watermark-text" },
  { name: "Add Page Numbers", icon: <BookCopy />, conversion: "add-page-numbers" },
  { name: "Protect PDF", icon: <Shield />, conversion: "protect-pdf" },
  { name: "Unlock PDF", icon: <Unlock />, conversion: "unlock-pdf" },
  { name: "Repair PDF", icon: <Wrench />, conversion: "repair-pdf" },
  { name: "Convert to PDF/A", icon: <FileCheck />, conversion: "pdf-to-pdfa" },
  { name: "OCR PDF to Word", icon: <ScanText />, conversion: "ocr-pdf" },
  { name: "Edit PDF", icon: <PenSquare />, conversion: "edit-pdf" },
];

const advancedFeatures = [
  { name: "Batch processing", icon: <Layers /> },
  { name: "Chained workflows", icon: <LinkIcon /> },
  { name: "Cloud uploads", icon: <Cloud /> },
  { name: "File viewer", icon: <Eye /> },
  { name: "Dark mode UI", icon: <Monitor /> },
  { name: "Desktop app", icon: <AppWindow /> },
  { name: "API endpoint", icon: <Terminal /> },
  { name: "Mobile responsive", icon: <Smartphone /> },
  { name: "File deletion", icon: <Clock /> },
];

const premiumFeatures = [
  { name: "eSignatures", icon: <Pen /> },
  { name: "Team Workspace", icon: <Users /> },
  { name: "Unlimited file size", icon: <Infinity /> },
  { name: "Unlimited batch tools", icon: <Zap /> },
  { name: "Ad-free mode", icon: <BadgeX /> },
];

const FeatureCard = ({ name, icon, onClick, disabled }: { name: string, icon: React.ReactNode, onClick: () => void, disabled: boolean }) => (
  <Card 
    onClick={disabled ? undefined : onClick}
    className={`hover:shadow-lg transition-all ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary'}`}
  >
    <CardHeader className="flex flex-row items-center gap-4">
      <div className={`${disabled ? 'text-muted-foreground' : 'text-primary'}`}>{icon}</div>
      <CardTitle className="text-base font-medium">{name}</CardTitle>
    </CardHeader>
  </Card>
);

const Section = ({ title, children, icon }: { title: string, children: React.ReactNode, icon: React.ReactNode }) => (
  <section className="w-full max-w-6xl mx-auto py-8">
    <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
      {icon}
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  </section>
);

export function FeatureGrid({ setConversionType }: { setConversionType: (type: ConversionType) => void }) {
  const handleFeatureClick = (conversion: ConversionType | null) => {
    if (conversion) {
      setConversionType(conversion);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-12">
      <Section title="Core PDF Tools" icon={<Wrench className="h-8 w-8 text-primary" />}>
        {coreTools.map((tool) => (
          <FeatureCard 
            key={tool.name} 
            name={tool.name} 
            icon={tool.icon}
            onClick={() => handleFeatureClick(tool.conversion)}
            disabled={!tool.conversion}
          />
        ))}
      </Section>
  
      <Section title="Advanced Features" icon={<Zap className="h-8 w-8 text-primary" />}>
        {advancedFeatures.map((feature) => (
          <FeatureCard
            key={feature.name}
            name={feature.name}
            icon={feature.icon}
            onClick={() => {}}
            disabled={true}
          />
        ))}
      </Section>
  
      <Section title="Premium Features" icon={<Gem className="h-8 w-8 text-primary" />}>
        {premiumFeatures.map((feature) => (
          <FeatureCard
            key={feature.name}
            name={feature.name}
            icon={feature.icon}
            onClick={() => {}}
            disabled={true}
          />
        ))}
      </Section>
    </div>
  );
}