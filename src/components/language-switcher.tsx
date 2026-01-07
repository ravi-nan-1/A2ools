"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { languages, type Language } from "@/lib/translations";

export function LanguageSwitcher() {
  const { setLanguage, language } = useLanguage();

  const Flag = ({ lang }: { lang: Language }) => (
    <img
      src={`/flags/${lang}.svg`}
      alt={lang}
      className="w-5 h-5 mr-2"
      loading="lazy"
    />
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change language">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((langItem) => (
          <DropdownMenuItem
            key={langItem.code}
            onClick={() => setLanguage(langItem.code)}
            className="flex items-center gap-2"
          >
            <Flag lang={langItem.code} />
            <span className={langItem.code === language ? "font-semibold" : ""}>
              {langItem.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
