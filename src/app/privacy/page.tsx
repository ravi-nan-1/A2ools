
import type { Metadata } from 'next';
import {
  ShieldCheck,
  FileUp,
  Server,
  Cookie,
  Users,
  Lock,
  Baby,
  UserCheck,
  RefreshCcw,
  Mail,
  List,
  FileText,
  BrainCircuit,
  Zap,
  CheckCircle,
  XCircle,
  Database,
  Link,
  Bot
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | All2ools',
  description: 'Read the privacy policy for All2ools to understand how we handle your data when you use our free online tools.',
};

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const BenefitItem = ({
  icon: Icon,
  children,
  isPositive = true,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  isPositive?: boolean;
}) => (
  <li className="flex items-start gap-3">
    <Icon
      className={`mt-1 h-5 w-5 flex-shrink-0 ${
        isPositive ? 'text-green-500' : 'text-red-500'
      }`}
    />
    <span>{children}</span>
  </li>
);

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* --- Hero Section --- */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl font-headline">
            Privacy Policy for All2ools
          </h1>
          <p className="mx-auto mt-4 text-lg text-muted-foreground md:text-xl">
            Last Updated: December 03, 2025
          </p>
        </section>

        {/* --- Intro --- */}
        <section className="mx-auto my-12 max-w-3xl text-center text-muted-foreground">
          <p>
            Welcome to All2ools (“we”, “our”, “us”). We operate at all2ools.com and provide a collection of free online tools including AI utilities, document converters, SEO tools, image tools, business calculators, and developer utilities. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and tools.
          </p>
           <p className="mt-4 font-semibold">By using All2ools, you agree to this Privacy Policy.</p>
        </section>

        <div className="mx-auto max-w-4xl space-y-12">
            
            {/* --- 1. Information We Collect --- */}
            <SectionCard icon={Database} title="1. Information We Collect">
                <p className="text-muted-foreground mb-6">We collect the minimum amount of information necessary to operate our tools.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 rounded-lg bg-card p-4 border">
                        <h4 className="font-semibold">1.1 Information You Provide</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            <li>Text content (e.g., for AI tools, plagiarism checkers, regex generators)</li>
                            <li>Uploaded files (PDF, images, Excel, JSON, etc.)</li>
                            <li>URLs (for API or SEO tools)</li>
                            <li>Inputs for calculators (finance, business, etc.)</li>
                        </ul>
                         <p className="font-bold text-destructive text-sm flex items-start gap-2"><XCircle className="h-5 w-5 mt-0.5 shrink-0"/> We do NOT store your uploaded files or text permanently. All processing is temporary and deleted automatically.</p>
                    </div>
                     <div className="space-y-4 rounded-lg bg-card p-4 border">
                        <h4 className="font-semibold">1.2 Automatically Collected Information</h4>
                        <p className="text-sm text-muted-foreground">We may collect anonymized or partially masked data like:</p>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            <li>Browser/Device type</li>
                            <li>Pages visited & time spent</li>
                            <li>Referring pages</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">This is used for feature improvement, security, analytics, and preventing abuse.</p>
                    </div>
                </div>
            </SectionCard>

            {/* --- 2. Use of Your Information --- */}
            <SectionCard icon={Zap} title="2. Use of Your Information">
                 <p className="text-muted-foreground mb-6">We use your information to provide and improve our services. We do not sell your personal data.</p>
                 <ul className="columns-1 md:columns-2 space-y-2 text-muted-foreground">
                    <BenefitItem icon={CheckCircle}>Provide and operate tools</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Improve website performance</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Diagnose issues or bugs</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Analyze user behaviour</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Protect from misuse or fraud</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Improve tool quality</BenefitItem>
                 </ul>
            </SectionCard>

            {/* --- 3. File Upload & AI Tools --- */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <SectionCard icon={FileUp} title="3. File Upload Tools">
                    <p className="text-muted-foreground mb-4">Tools like PDF to Word, Image Compressor, etc., require file uploads. We do not review or access your content manually.</p>
                    <ul className="space-y-3">
                        <BenefitItem icon={CheckCircle}>Uploaded files are processed temporarily</BenefitItem>
                        <BenefitItem icon={CheckCircle}>Files are NOT stored permanently</BenefitItem>
                        <BenefitItem icon={CheckCircle}>Files are NOT shared with third parties</BenefitItem>
                        <BenefitItem icon={CheckCircle}>Files are deleted automatically after processing</BenefitItem>
                    </ul>
                </SectionCard>
                <SectionCard icon={Bot} title="4. AI Tools">
                    <p className="text-muted-foreground mb-4">Tools like AI Humanizer, AI Tutor, etc., may use secure third-party AI APIs (e.g., Google AI). We follow their privacy rules.</p>
                    <ul className="space-y-3">
                        <BenefitItem icon={CheckCircle}>Data is only used to generate your output</BenefitItem>
                        <BenefitItem icon={CheckCircle}>We do not train models on your data</BenefitItem>
                        <BenefitItem icon={CheckCircle}>Content is not stored permanently</BenefitItem>
                        <BenefitItem icon={CheckCircle}>Content is not shared or published</BenefitItem>
                    </ul>
                </SectionCard>
            </div>
            
             {/* --- 5. Cookies --- */}
             <SectionCard icon={Cookie} title="5. Cookies and Tracking">
                 <p className="text-muted-foreground mb-6">You can disable cookies in your browser settings.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold mb-2">What We Use:</h4>
                        <ul className="space-y-2">
                           <BenefitItem icon={CheckCircle}>Essential cookies (for site functionality)</BenefitItem>
                           <BenefitItem icon={CheckCircle}>Analytics cookies (e.g., Google Analytics)</BenefitItem>
                           <BenefitItem icon={CheckCircle}>Performance cookies (to measure speed)</BenefitItem>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2 text-destructive">What We AVOID:</h4>
                         <ul className="space-y-2">
                           <BenefitItem icon={XCircle} isPositive={false}>Advertising cookies</BenefitItem>
                           <BenefitItem icon={XCircle} isPositive={false}>Behavioral tracking cookies</BenefitItem>
                           <BenefitItem icon={XCircle} isPositive={false}>Fingerprinting technologies</BenefitItem>
                        </ul>
                    </div>
                 </div>
            </SectionCard>

            {/* --- 6. Security --- */}
            <SectionCard icon={ShieldCheck} title="7. Data Security">
                <p className="text-muted-foreground mb-6">While no method is 100% secure, we take all reasonable measures to protect your data.</p>
                <ul className="columns-1 md:columns-2 space-y-2 text-muted-foreground">
                    <BenefitItem icon={CheckCircle}>HTTPS everywhere</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Firewall and DDoS protection</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Secure file processing servers</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Automatic file deletion systems</BenefitItem>
                </ul>
            </SectionCard>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* --- Children's Privacy --- */}
                <SectionCard icon={Baby} title="8. Children's Privacy">
                    <p className="text-muted-foreground">All2ools is not intended for children under 13. We do not knowingly collect information from children. If you believe a child has provided data, contact us and we will delete it immediately.</p>
                </SectionCard>
                 {/* --- Your Rights --- */}
                <SectionCard icon={UserCheck} title="9. Your Rights">
                    <p className="text-muted-foreground mb-4">Depending on your region (GDPR, CCPA), you may have rights to access, delete, or correct your data. To exercise these rights, please contact us.</p>
                    <Button asChild variant="outline">
                        <a href="mailto:support@all2ools.com"><Mail className="mr-2"/>support@all2ools.com</a>
                    </Button>
                </SectionCard>
            </div>
            
            {/* --- Contact & Changes --- */}
            <section className="rounded-xl bg-primary/10 p-8 text-center border-2 border-dashed border-primary/20">
                <RefreshCcw className="mx-auto h-10 w-10 text-primary" />
                <h2 className="mt-4 text-2xl font-bold">Policy Changes & Contact</h2>
                <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                    We may update this Privacy Policy as we add new tools. The “Last Updated” date at the top indicates the last modification. If you have any questions, please reach out. We respond within 24–48 hours.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild>
                        <a href="mailto:support@all2ools.com">
                            <Mail className="mr-2 h-4 w-4" />
                            Email Us
                        </a>
                    </Button>
                     <Button asChild variant="secondary">
                        <Link href="/contact">
                            Contact Page
                        </Link>
                    </Button>
                </div>
          </section>

        </div>
      </div>
    </div>
  );
}
