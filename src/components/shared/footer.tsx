import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All2ools.com. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
          {navLinks.map(({ href, label }) => (
            <Link key={label} href={href} className="text-muted-foreground transition-colors hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
