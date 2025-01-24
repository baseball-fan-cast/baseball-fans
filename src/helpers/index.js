import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const MODEL_NAME = 'gemini-2.0-flash-exp';
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  }
];

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
  response_mime_type: 'application/json'
};

export async function runAi(instructions, data, targetLanguage) {
  const prompt = `Do not translate the following categories of words: player names, team names, stadium names, league abbreviations,
                        other specific terms (e.g., brand names).
                        Only proper names, team names, and specific terms should remain in English.
                        Ensure the sentence structure and meaning are preserved in the translation.
                        Translate the given array of objects into ${targetLanguage}, ${instructions}.
                        Ensure the translated array maintains the same structure as the original array, 
                        including square brackets ${`[]`}, curly braces ${`{}`}, and colons ${`:`}. 

    Example:
    Input: ${`[{ text: 'Hello'}]`}
    Output: ${`[{ text: 'Hola'}]`}
    Input: ${`[{ text: 'Mark Vientos and the Mets take on Tommy Edman and the Dodgers in Game 6 of the NLCS.'}]`}
    Output: ${`[{ text: '"Mark Vientos y los Mets se enfrentan a Tommy Edman y los Dodgers en el Juego 6 de la Serie de Campeonato de la Liga Nacional"'}]`}
    
    Input: ${data}
    Output: `;

  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: {
      parts: [{ text: instructions }],
      role: 'model'
    }
  });

  async function callGemini(text) {
    const parts = [{ text }];

    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
      safetySettings
    });

    try {
      if (result.response.promptFeedback && result.response.promptFeedback.blockReason) {
        return { error: `Blocked for ${result.response.promptFeedback.blockReason}` };
      }
      const response = result.response;
      return { response };
    } catch (e) {
      return {
        error: e.message
      };
    }
  }

  let result = await callGemini(prompt);
  const { text } = result.response.candidates[0].content.parts[0] || {};

  return text;
}
