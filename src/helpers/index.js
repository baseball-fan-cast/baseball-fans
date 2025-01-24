'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
//                        Translate the following sentence into ${targetLanguage}, but do not translate any proper names or specific terms.

export async function runAi(textToTranslate, targetLanguage) {
  console.log('targetLanguage', targetLanguage);
  const instructions = `Do not translate the following categories of words: player names, team names, stadium names, league abbreviations,
                        other specific terms (e.g., brand names).
                        Example sentence: "Mark Vientos and the Mets take on Tommy Edman and the Dodgers in Game 6 of the NLCS."
                        Expected output: "Mark Vientos y los Mets se enfrentan a Tommy Edman y los Dodgers en el Juego 6 de la Serie de Campeonato de la Liga Nacional"
                        Only proper names, team names, and specific terms should remain in English.
                        Ensure the sentence structure and meaning are preserved in the translation.

                        ${textToTranslate}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  const result = await model.generateContent(instructions);
  const response = await result.response;
  const text = await response.text();
  return text;
}
