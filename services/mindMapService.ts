// services/timestampService.ts
import getGenerativeModel from '@/config/googleAIConfig';

export async function generateSimpliedText(transcript: string): Promise<string> {
  try {
    const model = getGenerativeModel();



const prompt = `
Simplify the content of the following YouTube video using its transcript in 200 words. 


give the well formatted response in html body without any <ul></ul> <li></li> tags use <b> tag for bold text and use <h1>, <h2> tag for headings


Transcript:
${transcript}
`;




    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate timestamps';
    throw new Error(`Failed to generate timestamps: ${errorMessage}`);
  }
}
