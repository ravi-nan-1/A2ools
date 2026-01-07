export interface AnalysisResult {
    similarityScore: number;
    summary?: string;
    matchedPhrases?: string[];
  }
  
  export interface ContextualAnalysisResult {
    similarityResults: {
      score: number;
      text: string;
    }[];
  }
  