
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeContentAndGenerateCheatSheet } from '@/lib/ai/flows/summarize-content-generate-cheatsheet';
import { Loader2, Share, Download, FileText, Link as LinkIcon, Upload, Sparkles } from 'lucide-react';
import { CheatSheetSkeleton } from '@/components/cheat-sheet-skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheatSheetWelcome } from '@/components/shared/cheat-sheet-welcome';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function FreeCheatSheetGenerator() {
  const [text, setText] = useState('');
  const [cheatSheet, setCheatSheet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('text');
  const cheatSheetRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!text) {
      setError('Please enter some text to generate a cheat sheet.');
      return;
    }

    setIsLoading(true);
    setError('');
    setCheatSheet('');

    try {
      const result = await summarizeContentAndGenerateCheatSheet({ text, targetLanguage: language });
      if (result.error) {
        setError(result.error);
      } else if (result.cheatSheetHtml) {
        setCheatSheet(result.cheatSheetHtml);
      } else {
        setError('Failed to generate cheat sheet. The model returned an unexpected response.');
      }
    } catch (e) {
      console.error(e);
       setError(`An unexpected error occurred: ${(e as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!cheatSheetRef.current) return;

    html2canvas(cheatSheetRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cheatsheet.pdf');
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI-Generated Cheat Sheet',
        text: 'Check out this cheat sheet I made!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Input */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Create Your Cheat Sheet</CardTitle>
          <p className="text-sm text-muted-foreground pt-1">Enter content from text, a website, or a PDF to get started.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex border-b mb-4">
            <Button
              variant={activeTab === 'text' ? 'secondary' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary" 
              onClick={() => setActiveTab('text')}
            >
              <FileText className="w-4 h-4 mr-2" /> Text
            </Button>
            <Button 
              variant={activeTab === 'url' ? 'secondary' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary" 
              onClick={() => setActiveTab('url')}
              disabled
            >
              <LinkIcon className="w-4 h-4 mr-2" /> URL
            </Button>
            <Button 
              variant={activeTab === 'pdf' ? 'secondary' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary" 
              onClick={() => setActiveTab('pdf')}
              disabled
            >
              <Upload className="w-4 h-4 mr-2" /> PDF
            </Button>
          </div>

          {activeTab === 'text' && (
            <Textarea
              placeholder="I Cheat Sheet Generator – Free PDF, URL & Text Summarizer..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-48 bg-gray-50 focus:bg-white transition-colors duration-200 ease-in-out"
              disabled={isLoading}
            />
          )}
           {activeTab !== 'text' && (
            <div className='h-48 flex items-center justify-center bg-gray-100 rounded-md'>
                <p className='text-muted-foreground'>Coming Soon!</p>
            </div>
           )}

          <div>
            <label htmlFor="language" className="text-sm font-medium text-gray-700">Cheat Sheet Language</label>
            <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
                <SelectTrigger id="language" className="w-full mt-1">
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                </SelectContent>
            </Select>
          </div>


          <Button onClick={handleGenerate} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-base">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
               <Sparkles className="w-4 h-4 mr-2" />
               Generate Cheat Sheet
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Right Column: Output */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Generated Cheat Sheet</h2>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleShare} disabled={!cheatSheet || isLoading}>
                    <Share className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button variant="outline" onClick={handleDownload} disabled={!cheatSheet || isLoading}>
                    <Download className="w-4 h-4 mr-2" /> Download
                </Button>
            </div>
        </div>

        {error && (
            <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
                <h3 className="font-bold">Error</h3>
                <p>{error}</p>
            </div>
        )}

        {isLoading && <CheatSheetSkeleton />}

        {!isLoading && !cheatSheet && <CheatSheetWelcome />}
        
        {cheatSheet && !isLoading && (
            <Card>
                <CardContent ref={cheatSheetRef} className="p-6">
                    <div dangerouslySetInnerHTML={{ __html: cheatSheet }} />
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
