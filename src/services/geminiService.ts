import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (
  prompt: string,
  contextData: string
): Promise<string> => {
  if (!apiKey) return "API Key not configured. Please add your Gemini API Key.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = `${contextData}\n\nUser query: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    if (!result || !result.response) {
      return "I'm sorry, I couldn't generate a response due to an API issue.";
    }
    const response = await result.response;
    return response.text() || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to the server. Please try again later.";
  }
};
