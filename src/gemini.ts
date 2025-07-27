let apiKey = "AIzaSyDAtn8J9WDBCgNs13ydtIkdMaemgICadJY";

import { GoogleGenAI } from '@google/genai';

function trimToMaxTokens(text: string, maxTokens: number): string {
  const words = text.split(/\s+/);
  return words.slice(0, maxTokens).join(" ");
}

// onChunk callback will be used to speak partial responses
async function main(userPrompt: string, onChunk?: (partial: string) => void): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const model = 'gemini-1.5-flash'; // Faster model

    const contents = [
      {
        role: 'user',
        parts: [
          { text: `Answer concisely: ${userPrompt}` },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      contents,
      generationConfig: {
        maxOutputTokens: 20,
      },
    });

    let fullText = "";

    // Process chunks as they arrive
    for await (const chunk of response) {
      if (chunk.text) {
        const cleanChunk = chunk.text.replace(/[#*_`>~\-]+/g, '').trim();
        fullText += cleanChunk + " ";
        if (onChunk) onChunk(cleanChunk); // Send partial text for immediate speaking
      }
    }

    fullText = fullText.replace(/[#*_`>~\-]+/g, '').trim();
    fullText = trimToMaxTokens(fullText, 20); 

    return fullText || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Failed to fetch response.";
  }
}

export default main;
