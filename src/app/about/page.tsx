
import type { Metadata } from 'next';
import {
  HeartHandshake,
  LayoutGrid,
  Zap,
  Star,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  Quote,
  Briefcase,
  BrainCircuit,
  Image,
  AreaChart,
  Code,
  FileText,
  ShieldCheck,
  Rocket
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About All2ools | Our Mission, Vision, and Tools',
  description:
    'Learn about All2ools, your all-in-one platform for free online tools. Discover our mission to simplify digital tasks for everyone, from developers to students and business owners.',
};

const FeatureCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="bg-card/50 text-center">
    <CardHeader>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{children}</p>
    </CardContent>
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

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24">
        {/* --- Hero Section --- */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl font-headline">
            About All2ools
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Your All-in-One Online Tools Platform
          </p>
        </section>

        {/* --- Mission Statement --- */}
        <section className="mx-auto my-16 max-w-4xl text-center">
           <Quote className="mx-auto h-12 w-12 text-primary/30" />
          <blockquote className="mt-4 text-2xl font-medium text-foreground md:text-3xl">
            “Make everyday digital tasks simple, accessible, and lightning-fast
            for everyone.”
          </blockquote>
          <p className="mt-4 text-muted-foreground">
            Welcome to All2ools, a powerful collection of smart, fast, and free online tools designed to help you work better, save time, and get things done—without installing anything.
          </p>
        </section>

        <div className="mx-auto max-w-5xl space-y-20">
          {/* --- Why All2ools Exists --- */}
          <section>
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold font-headline">Why All2ools Exists</h2>
                <p className="mt-4 text-muted-foreground">
                  Modern work requires dozens of small tools for converting, calculating, generating, and optimizing. But searching for each tool separately wastes time and breaks your workflow. That’s why we created All2ools.
                </p>
                <div className="mt-8 space-y-4">
                    <BenefitItem icon={CheckCircle}>One Platform, One Interface</BenefitItem>
                    <BenefitItem icon={CheckCircle}>25+ Essential Tools (and growing)</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Everything you need, in one place.</BenefitItem>
                </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                  <FeatureCard icon={Briefcase} title="Business Automation">Tools for invoices, valuation, and contracts.</FeatureCard>
                  <FeatureCard icon={BrainCircuit} title="AI Generators">Humanizers, tutors, and content creators.</FeatureCard>
                  <FeatureCard icon={Code} title="Developer Utilities">Testers, decoders, and converters.</FeatureCard>
                  <FeatureCard icon={Zap} title="SEO Helpers">Keyword clusters, gap analysis, and outlines.</FeatureCard>
                </div>
            </div>
          </section>

          {/* --- What We Offer --- */}
          <section className="text-center">
            <h2 className="text-3xl font-bold font-headline">What We Offer</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              All2ools includes 25+ free tools across critical categories to power your personal and professional projects.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                <FeatureCard icon={Briefcase} title="Business"></FeatureCard>
                <FeatureCard icon={BrainCircuit} title="AI Tools"></FeatureCard>
                <FeatureCard icon={Image} title="Image"></FeatureCard>
                <FeatureCard icon={AreaChart} title="Finance"></FeatureCard>
                <FeatureCard icon={Code} title="Developer"></FeatureCard>
                <FeatureCard icon={FileText} title="SEO & Docs"></FeatureCard>
            </div>
            <p className="mt-8 text-muted-foreground">Our goal is to expand All2ools into a complete ecosystem of 50+ tools.</p>
          </section>
          
           {/* --- Who We Built It For --- */}
          <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
                 <h2 className="text-3xl font-bold font-headline">Who We Built All2ools For</h2>
                 <p className="mt-4 text-muted-foreground">All2ools is designed for anyone who wants to work faster and smarter. No downloads. No login required. No complications. Just open a tool and get your work done.</p>
            </div>
             <div className="order-1 md:order-2">
                 <div className="flex flex-wrap justify-center gap-2">
                    {['Students', 'Freelancers', 'Developers', 'Marketers', 'SEO Specialists', 'Business Owners', 'Teachers', 'Designers', 'Content Creators', 'Finance Professionals'].map(role => (
                        <div key={role} className="rounded-lg bg-card p-4 text-center shadow-sm border">
                            <p className="font-medium">{role}</p>
                        </div>
                    ))}
                 </div>
             </div>
          </section>

          {/* --- How We're Different --- */}
          <section>
            <h2 className="text-center text-3xl font-bold font-headline">
              How All2ools Is Different
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-600">
                    What We Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <BenefitItem icon={XCircle} isPositive={false}>Ads Overload & Slow Pop-ups</BenefitItem>
                    <BenefitItem icon={XCircle} isPositive={false}>Required Accounts & Logins</BenefitItem>
                    <BenefitItem icon={XCircle} isPositive={false}>Confusing Menus & Cluttered UI</BenefitItem>
                    <BenefitItem icon={XCircle} isPositive={false}>Unnecessary Data Storage</BenefitItem>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-500/20 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-600">What We Prioritize</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <BenefitItem icon={CheckCircle}>Fast, Accurate & Easy to Use Tools</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Clean, Modern, Mobile-Friendly UI</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Privacy-Focused (Client-Side Processing)</BenefitItem>
                    <BenefitItem icon={CheckCircle}>Tools Built for Real-World Use Cases</BenefitItem>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* --- Our Commitments --- */}
          <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold font-headline">Our Commitment to You</h2>
              <p className="mt-4 text-muted-foreground">Your trust is our most important asset. We are committed to being reliable, private, fast, and helpful. All our tools are free, with no hidden charges.</p>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/>How We Handle Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">We take privacy seriously. All2ools does not sell your data, track sensitive information, or store your uploaded files permanently. We only process data for the duration of the tool’s function, and then it’s deleted.</p>
                </CardContent>
              </Card>
            </div>
             <div>
              <h2 className="text-3xl font-bold font-headline">Our Story & Vision</h2>
              <p className="mt-4 text-muted-foreground">All2ools started as a personal project and has evolved into a platform serving thousands of users. We are continuously adding new features and tools based on community feedback.</p>
              <p className="mt-4 text-muted-foreground">Our vision is for All2ools to become the internet’s most trusted utility hub, with more AI tools, predictive automation, and advanced utilities to power your entire workflow.</p>
            </div>
          </section>

           {/* --- CTA --- */}
          <section className="rounded-xl bg-primary/10 p-8 text-center border-2 border-dashed border-primary/20">
            <Rocket className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Have a Tool Idea?</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              We love building new tools. If you want a tool that doesn’t exist yet, or have an idea for an improvement, please let us know. We read every request.
            </p>
            <Button asChild className="mt-6">
              <Link href="mailto:support@all2ools.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
