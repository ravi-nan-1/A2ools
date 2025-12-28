
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '../tool-page/language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.svg" alt="All2ools" width={32} height={32} />
            <span className="font-bold sm:inline-block">
              All2ools
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === href ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image src="/logo.svg" alt="All2ools" width={32} height={32} />
                        <span className="font-bold">All2ools</span>
                    </Link>
                    <div className="flex flex-col space-y-4 mt-6">
                        {navLinks.map(({ href, label }) => (
                        <Link
                            key={label}
                            href={href}
                            className={`transition-colors hover:text-foreground/80 ${
                            pathname === href ? 'text-foreground' : 'text-foreground/60'
                            }`}
                        >
                            {label}
                        </Link>
                        ))}
                    </div>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="w-full flex-1 md:w-auto md:flex-none">
                 {/* I'll add the search bar here later */}
            </div>
          <nav className="flex items-center">
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}

