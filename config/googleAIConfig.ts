// config/googleAIConfig.ts
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const apiKey: string = process.env.NEXT_PUBLIC_API_URL!;

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);

export default function getGenerativeModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}
