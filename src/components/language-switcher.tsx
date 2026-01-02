'use client';

import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';
import { LanguageContext } from '@/context/language-context';
import { languages, Language } from '@/lib/translations';

export function LanguageSwitcher() {
  const { setLanguage } = useContext(LanguageContext);

  const Flag = ({ lang }: { lang: Language }) => (
    <img src={`/flags/${lang}.svg`} alt={lang} className="w-5 h-5 mr-2" />
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
            <Flag lang={lang.code} />
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

    