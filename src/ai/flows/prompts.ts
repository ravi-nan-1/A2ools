import { Prompt } from 'genkit/prompt';

export const textSummarizerPrompt: Prompt = (input) => `
Summarize the following text. Your task is to provide a summary of the text and a list of key points. The length of the summary should be ${input.length}.\n\n**Text:**\n${input.text}\n\n**Output Format:**\nReturn your response in the following JSON format:\n\n\`\`\`json\n{\n  \"summary\": \"<string>\",\n  \"keyPoints\": [\"<string>\"]\n}\n\`\`\`\n`;
