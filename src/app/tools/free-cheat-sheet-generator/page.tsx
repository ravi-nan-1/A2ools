'use client';

import { useState, useRef, useContext } from 'react';
import { summarizeContentAndGenerateCheatSheet, type SummarizeContentAndGenerateCheatSheetOutput } from '@/ai/flows/summarize-content-generate-cheatsheet';
import { extractTextFromUrl } from '@/ai/flows/extract-text-from-url';
import { extractTextFromPdf } from '@/ai/flows/extract-text-from-pdf';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, AlertCircle, Download, Share2, FileText, Link, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from '@/components/icons';
import { CheatSheetSkeleton } from '@/components/cheat-sheet-skeleton';
import { LanguageContext } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/language-switcher';
import { languages, type Language } from '@/lib/translations';


type CheatSheetResult = SummarizeContentAndGenerateCheatSheetOutput | null;

export default function Home() {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [url, setUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cheatSheet, setCheatSheet] = useState<CheatSheetResult>(null);
  const { toast } = useToast();
  const cheatSheetRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useContext(LanguageContext);
  const [targetLanguage, setTargetLanguage] = useState<Language>('en');


  const handleGenerate = async () => {
    let contentToProcess = '';
    setError(null);
    setCheatSheet(null);
    setPdfPageCount(null);
    setIsLoading(true);
    setLoadingMessage(t('creator.loading.default'));

    try {
      if (activeTab === 'text') {
        if (!inputText) {
          toast({ variant: 'destructive', title: t('toast.inputText.title'), description: t('toast.inputText.description') });
          setIsLoading(false);
          return;
        }
        contentToProcess = inputText;
      } else if (activeTab === 'url') {
        if (!url) {
          toast({ variant: 'destructive', title: t('toast.inputUrl.title'), description: t('toast.inputUrl.description') });
          setIsLoading(false);
          return;
        }
        setLoadingMessage(t('creator.loading.scraping'));
        const urlResult = await extractTextFromUrl({ url });
        contentToProcess = urlResult.text;
      } else if (activeTab === 'pdf') {
        if (!pdfFile) {
          toast({ variant: 'destructive', title: t('toast.inputPdf.title'), description: t('toast.inputPdf.description') });
          setIsLoading(false);
          return;
        }
        setLoadingMessage(t('creator.loading.readingPdf'));
        const fileBuffer = await pdfFile.arrayBuffer();
        const base64Pdf = Buffer.from(fileBuffer).toString('base64');
        const pdfDataUri = `data:application/pdf;base64,${base64Pdf}`;
        const pdfResult = await extractTextFromPdf({ pdf: pdfDataUri });
        contentToProcess = pdfResult.text;
        setPdfPageCount(pdfResult.numPages);
        setLoadingMessage(t('creator.loading.summarizingPdf', { count: pdfResult.numPages }));
      }

      if (!contentToProcess.trim()) {
        throw new Error(t('errors.noMeaningfulContent'));
      }

      const selectedLanguageName = languages.find(l => l.code === targetLanguage)?.name || 'English';

      const result = await summarizeContentAndGenerateCheatSheet({ text: contentToProcess, targetLanguage: selectedLanguageName });
       if (!result || !result.cheatSheetHtml) {
        throw new Error(t('errors.generationFailed'));
      }
      setCheatSheet(result);
      toast({
        title: t('toast.success.title'),
        description: t('toast.success.description', { contentType: result.contentType }),
      });
    } catch (e: any) {
      const errorMessage = e.message || t('errors.unexpected');
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: t('toast.generationFailed.title'),
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleDownload = () => {
    if (!cheatSheetRef.current) return;

    const cheatSheetHtml = cheatSheetRef.current.innerHTML;
    const pageStyles = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>CheatSheetAI - Download</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap');
            body { font-family: 'Inter', sans-serif; }
            .font-headline { font-family: 'Space Grotesk', sans-serif; }
            .font-code { font-family: 'Source Code Pro', monospace; }
          </style>
        </head>
        <body class="bg-white">
          <div class="p-4 sm:p-6 md:p-8">${cheatSheetHtml}</div>
        </body>
      </html>`;
    
    const blob = new Blob([pageStyles], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cheatsheet.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('toast.download.title'),
      description: t('toast.download.description'),
    });
  };
  
  const handleShare = () => {
    if (!cheatSheetRef.current?.innerText) return;
    navigator.clipboard.writeText(cheatSheetRef.current.innerText).then(() => {
      toast({
        title: t('toast.share.title'),
        description: t('toast.share.description'),
      });
    }, () => {
      toast({
        variant: "destructive",
        title: t('errors.unexpected'),
        description: t('errors.clipboard'),
      });
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({ variant: 'destructive', title: t('toast.invalidFile.title'), description: t('toast.invalidFile.description') });
        return;
      }
      setPdfFile(file);
      setPdfPageCount(null); // Reset page count on new file
    }
  };

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground tracking-tighter">
            CheatSheetAI
          </h1>
        </div>
        <LanguageSwitcher />
      </header>
      
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter">{t('main.title')}</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t('main.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="lg:sticky lg:top-8 h-fit">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{t('creator.title')}</CardTitle>
              <CardDescription>{t('creator.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10">
                  <TabsTrigger value="text" className="flex-col md:flex-row h-auto py-2 md:py-1.5">
                    <FileText className="mb-1 md:mb-0 md:mr-2"/>
                    <span>{t('creator.tabs.text')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex-col md:flex-row h-auto py-2 md:py-1.5">
                    <Link className="mb-1 md:mb-0 md:mr-2"/>
                    <span>{t('creator.tabs.url')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="pdf" className="flex-col md:flex-row h-auto py-2 md:py-1.5">
                    <Upload className="mb-1 md:mb-0 md:mr-2"/>
                    <span>{t('creator.tabs.pdf')}</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-4">
                  <Textarea
                    placeholder={t('creator.text.placeholder')}
                    className="min-h-[250px] text-base resize-y"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value="url" className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input type="url" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} />
                  </div>
                </TabsContent>
                <TabsContent value="pdf" className="mt-4 space-y-2">
                  <div className="flex flex-col items-start space-y-2">
                    <Input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2" />
                      {pdfFile ? t('creator.pdf.change') : t('creator.pdf.upload')}
                    </Button>
                    {pdfFile && <span className="text-sm text-muted-foreground truncate">{t('creator.pdf.selected', {fileName: pdfFile.name})}</span>}
                  </div>
                </TabsContent>
              </Tabs>
               <div className="mt-4 space-y-2">
                 <label className="text-sm font-medium">{t('creator.language.label')}</label>
                  <Select value={targetLanguage} onValueChange={(value) => setTargetLanguage(value as Language)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('creator.language.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
                {isLoading ? loadingMessage : t('creator.button.generate')}
              </Button>
            </CardFooter>
          </Card>

          <Card className="min-h-[500px] flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-headline text-2xl">{t('viewer.title')}</CardTitle>
              {cheatSheet && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}><Share2 className="mr-2"/>{t('viewer.button.share')}</Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}><Download className="mr-2"/>{t('viewer.button.download')}</Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              {isLoading && <CheatSheetSkeleton />}
              {error && (
                <Alert variant="destructive" className="h-full flex flex-col justify-center items-center text-center">
                  <AlertCircle className="h-8 w-8" />
                  <AlertTitle className="mt-4 text-lg font-bold">{t('viewer.error.title')}</AlertTitle>
                  <AlertDescription className="mt-2">{error}</AlertDescription>
                </Alert>
              )}
              {!isLoading && !error && cheatSheet && (
                <div id="cheatsheet-content" ref={cheatSheetRef} dangerouslySetInnerHTML={{ __html: cheatSheet.cheatSheetHtml }} />
              )}
              {!isLoading && !error && !cheatSheet && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 rounded-lg border-2 border-dashed">
                  <Sparkles className="h-16 w-16 mb-4 text-primary/50" />
                  <h3 className="text-xl font-semibold font-headline">{t('viewer.placeholder.title')}</h3>
                  <p className="mt-2 max-w-sm">{t('viewer.placeholder.description')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <section className="max-w-7xl mx-auto mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tighter">{t('features.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">{t('features.cards.developer.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{t('features.cards.developer.content')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">{t('features.cards.canDo.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-left text-muted-foreground">
                        {t('features.cards.canDo.items', { returnObjects: true }).map((item: string, index: number) => (
                          <li key={index} className="flex items-start"><CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" /> {item}</li>
                        ))}
                      </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">{t('features.cards.whoUses.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-left text-muted-foreground">
                            {t('features.cards.whoUses.items', { returnObjects: true }).map((item: string, index: number) => (
                              <li key={index} className="flex items-start"><CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" /> {item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">{t('features.cards.whyRank.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-left text-muted-foreground">
                            {t('features.cards.whyRank.items', { returnObjects: true }).map((item: string, index: number) => (
                              <li key={index} className="flex items-start"><CheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" /> {item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>
    </div>
  );
}
