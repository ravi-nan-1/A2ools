
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeContentAndGenerateCheatSheet } from '@/lib/ai/flows/summarize-content-generate-cheatsheet';
import { Loader2, Share, Download, FileText, Link as LinkIcon, Upload, Sparkles } from 'lucide-react';
import { CheatSheetSkeleton } from '@/components/cheat-sheet-skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheatSheetWelcome } from '@/components/shared/cheat-sheet-welcome';

export function FreeCheatSheetGenerator() {
  const [text, setText] = useState('');
  const [cheatSheet, setCheatSheet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('text');

  const handleGenerate = async () => {
    if (!text) {
      setError('Please enter some text to generate a cheat sheet.');
      return;
    }

    setIsLoading(true);
    setError('');
    setCheatSheet('');

    try {
      // NOTE: The 'language' parameter is temporarily removed until the backend supports it.
      const result = await summarizeContentAndGenerateCheatSheet({ text });
      if (result && result.cheatSheetHtml) {
        setCheatSheet(result.cheatSheetHtml);
      } else {
        setError('Failed to generate cheat sheet. The model returned an unexpected response.');
      }
    } catch (e) {
      console.error(e);
       setError('Generation Failed: The AI model failed to generate a cheat sheet for this content. This could be due to network issues or content restrictions. Please try again with different input.');
    } finally {
      setIsLoading(false);
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
            <Select value={language} onValueChange={setLanguage} disabled={true}>
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
            <p className="text-xs text-muted-foreground mt-1">Language selection is coming soon.</p>
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
                <Button variant="outline" disabled={!cheatSheet || isLoading}>
                    <Share className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button variant="outline" disabled={!cheatSheet || isLoading}>
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
                <CardContent className="p-6">
                    <div dangerouslySetInnerHTML={{ __html: cheatSheet }} />
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
