
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Rocket, FileText, BookOpen, Code, Lightbulb, File as FileIcon, Link as LinkIcon, Globe } from "lucide-react";

export function CheatSheetWelcome() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-medium text-muted-foreground">
          <FileIcon className="w-5 h-5 inline-block mr-2" />
          Cheat Sheet Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 flex items-center mb-2">
            <Sparkles className="w-5 h-5 mr-2 text-green-600" />
            What It Does
          </h3>
          <p className="text-green-700">
            Transforms any long content into a clean, colorful, and concise cheat sheet in seconds.
          </p>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 flex items-center mb-3">
            <Rocket className="w-5 h-5 mr-2 text-blue-600" />
            Key Features & Supported Inputs
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
                <FileIcon className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>PDF:</strong> Summarize documents.</span>
            </div>
            <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
                <Globe className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>Web URL:</strong> Convert web pages.</span>
            </div>
             <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
                <FileText className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>Text:</strong> Shorten raw text.</span>
            </div>
            <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
                <BookOpen className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>Books & Class Notes:</strong> Digest educational material.</span>
            </div>
            <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
                <Code className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700"><strong>Coding Docs:</strong> Simplify technical information.</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 flex items-center mb-2">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Benefit
          </h3>
          <p className="text-yellow-700">
            Get a <strong>free, instant cheat sheet</strong> from various sources to enhance learning and quick recall.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
