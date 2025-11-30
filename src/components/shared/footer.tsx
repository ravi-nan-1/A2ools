
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isToolPage = pathname.startsWith('/tools/');
  const slug = isToolPage ? pathname.split('/')[2] : '';

  const getNavLinks = () => {
    if (isToolPage && slug) {
      return [
        { href: `/tools/${slug}`, label: 'Tool Home' },
        { href: `/tools/${slug}/about`, label: 'About' },
        { href: `/tools/${slug}/contact`, label: 'Contact' },
        { href: `/tools/${slug}/privacy`, label: 'Privacy' },
        { href: `/tools/${slug}/terms`, label: 'Terms' },
      ];
    }
    return [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ];
  };

  const navLinks = getNavLinks();

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
