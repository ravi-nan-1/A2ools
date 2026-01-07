"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { languages, translations, type Language } from "@/lib/translations";

/* ----------------------------- Types ----------------------------- */

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

/* ---------------------------- Context ---------------------------- */

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/* ------------------------- Custom Hook --------------------------- */

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

/* --------------------------- Provider ---------------------------- */

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  /* Load saved language */
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage && languages.some(l => l.code === storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  /* Update language */
  const setLanguage = (lang: Language) => {
    if (languages.some(l => l.code === lang)) {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
    }
  };

  /* Translation helper (supports deep keys) */
  const translate = useCallback(
    (key: string): string => {
      const fallbackLanguage: Language = "en";

      const getValue = (obj: unknown, path: string): unknown =>
        path.split(".").reduce((acc: any, part) => acc?.[part], obj);

      return (
        (getValue(translations[language]?.translation, key) as string) ??
        (getValue(translations[fallbackLanguage]?.translation, key) as string) ??
        key
      );
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
