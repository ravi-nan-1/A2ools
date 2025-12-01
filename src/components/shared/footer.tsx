
'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border mt-auto py-6">
      <div className="container mx-auto text-center text-muted-foreground">
        <nav className="flex justify-center space-x-4 mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Use</Link>
        </nav>
        <p>&copy; 2025 PDF2Word. A part of All2ools.com</p>
      </div>
    </footer>
  );
}
