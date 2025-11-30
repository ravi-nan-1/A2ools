import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us | All2ools',
  description: 'Get in touch with the All2ools team for support, feedback, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question, feedback, or a tool suggestion? We'd love to hear from you.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Please fill out the form below. While we do our best to respond, we may not be able to reply to every message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email Address" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Your message..." rows={6} />
              <Button type="submit" className="w-full" disabled>
                Send Message (Form Inactive)
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-muted-foreground">
            <p>You can also reach us directly at: <a href="mailto:support@all2ools.com" className="text-primary hover:underline">support@all2ools.com</a></p>
        </div>
      </div>
    </div>
  );
}
