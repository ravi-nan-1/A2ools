#!/bin/bash

# Update the GenerateArticleOutlineOutput type in ai-flows.ts
cat > src/types/ai-flows.ts << 'TYPES'
export interface GenerateSEOMetadataOutput {
  seoTitle: string;
  seoDescription: string;
  faqContent?: string;
  jsonLdSchema?: string;
}

export interface GenerateArticleOutlineOutput {
  title: string;
  introduction: string;
  sections: Array<{
    heading: string;
    subheadings: string[];
  }>;
  conclusion: string;
  outline: string[];
}

export interface Cluster {
  name: string;
  keywords: string[];
}

export interface AIContextualAnalysisOutput {
  originalityScore: number;
  paraphrasingScore: number;
  structuralSimilarityScore: number;
  highlightedText: string;
  analysis: string;
}

export interface TextVsTextCheckOutput {
  similarityScore: number;
  analysis: string;
  highlightedSourceText: string;
  highlightedComparisonText: string;
}

export interface FileVsTextCheckOutput {
  similarityScore: number;
  analysis: string;
  highlightedFileContent: string;
  highlightedText: string;
}

export interface AdvancedCheckOutput {
  similarityScore: number;
  originalityScore: number;
  paraphrasingScore: number;
  structuralSimilarityScore: number;
  highlightedSource: string;
  highlightedComparison: string;
  analysis: string;
}

export interface SummarizeContentAndGenerateCheatSheetOutput {
  cheatSheetHtml: string;
  contentType: string;
}

export interface TextSummarizerOutput {
  summary: string;
  keyPoints: string[];
}
TYPES

echo "Types updated!"
