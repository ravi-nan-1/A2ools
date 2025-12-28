"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackgroundRemover from "./BackgroundRemover";
import ImageResizer from "./ImageResizer";
import ImageConverter from "./ImageConverter";
import ImageCompressor from "./ImageCompressor";
import ImageFilters from "./ImageFilters";
import OcrAndTranslate from "./OcrAndTranslate";
import {
  Sparkles,
  Maximize,
  RefreshCw,
  Minimize,
  Paintbrush,
  Languages,
} from "lucide-react";

const tools = [
  {
    value: "remover",
    label: "Remove BG",
    icon: Sparkles,
    component: <BackgroundRemover />,
  },
  {
    value: "resizer",
    label: "Resize",
    icon: Maximize,
    component: <ImageResizer />,
  },
  {
    value: "converter",
    label: "Convert",
    icon: RefreshCw,
    component: <ImageConverter />,
  },
  {
    value: "compressor",
    label: "Compress",
    icon: Minimize,
    component: <ImageCompressor />,
  },
  {
    value: "filters",
    label: "Filters",
    icon: Paintbrush,
    component: <ImageFilters />,
  },
  {
    value: "translator",
    label: "Translate",
    icon: Languages,
    component: <OcrAndTranslate />,
  },
];

const Tools: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Tabs defaultValue="translator">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-muted rounded-lg p-1.5 h-auto">
            {tools.map((tool) => (
              <TabsTrigger
                key={tool.value}
                value={tool.value}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
              >
                <tool.icon size={16} />
                {tool.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tools.map((tool) => (
          <TabsContent key={tool.value} value={tool.value} className="mt-0">
            {tool.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Tools;