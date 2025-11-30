import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | All2ools',
  description: 'Learn more about the mission and team behind All2ools.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
            About All2ools
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Our mission is to provide simple, powerful, and free tools for everyone.
          </p>
        </header>

        <div className="space-y-8 text-lg leading-relaxed text-foreground/80">
          <p>
            Welcome to All2ools, your go-to destination for a comprehensive suite of free online utilities. Our journey began with a simple idea: to create a single, reliable platform where anyone—from students and developers to business professionals and creative artists—could find the tools they need to be more productive, creative, and efficient.
          </p>
          <p>
            In a digital world cluttered with single-purpose websites, subscription fees, and ad-heavy experiences, we wanted to build something different. We envisioned a clean, user-friendly space packed with powerful, AI-driven tools that are accessible to all, completely free of charge.
          </p>
          <p>
            Our mission is to democratize access to high-quality digital tools. We believe that powerful technology shouldn't be locked behind a paywall. Whether you're a developer needing to debug a JWT, a marketer optimizing SEO, an entrepreneur creating an invoice, or a student compressing an image for a project, All2ools is here to help you get the job done quickly and easily.
          </p>
          <p>
            We are a small but passionate team of developers, designers, and tech enthusiasts dedicated to building and maintaining this platform. We are constantly working to improve existing tools and add new ones based on our users' feedback. Thank you for being a part of our community.
          </p>
        </div>
      </div>
    </div>
  );
}
