// src/ai/flows/prompts.ts

export function textVsTextCheckPrompt(input: { sourceText: string; comparisonText: string }) {
    return `Compare the following two texts for plagiarism and similarity:
  
  Source Text:
  ${input.sourceText}
  
  Comparison Text:
  ${input.comparisonText}
  
  Analyze and provide:
  1. Similarity score (0-100%)
  2. Detailed analysis
  3. Highlighted similar sections`;
  }
  
  export function fileVsTextCheckPrompt(input: { fileContent: string; comparisonText: string }) {
    return `Compare the following file content with the text for plagiarism:
  
  File Content:
  ${input.fileContent}
  
  Comparison Text:
  ${input.comparisonText}
  
  Analyze and provide:
  1. Similarity score (0-100%)
  2. Detailed analysis
  3. Highlighted similar sections`;
  }
  
  export function advancedCheckPrompt(input: { text: string }) {
    return `Perform an advanced plagiarism check on the following text:
  
  ${input.text}
  
  Provide detailed analysis including potential sources and similarity patterns.`;
  }
  
  export function textSummarizerPrompt(input: { text: string; length: string }) {
    return `Summarize the following text in a ${input.length} format:
  
  ${input.text}
  
  Provide:
  1. A concise summary
  2. Key points as bullet points`;
  }