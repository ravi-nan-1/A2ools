import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/language-context";

export default function CheatSheetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="flex-1">{children}</div>
      <Toaster />
    </LanguageProvider>
  );
}
