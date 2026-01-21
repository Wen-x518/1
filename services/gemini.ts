import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key not found. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askGemini = async (query: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "请配置 API Key 以使用 AI 功能。";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a helpful assistant integrated into a community forum called BROADFORUM. Answer the user's query concisely and helpfully. Query: ${query}`,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 服务暂时不可用，请稍后再试。";
  }
};

export const summarizePost = async (title: string, content: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "请配置 API Key 以使用 AI 功能。";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Please summarize this forum post in one short paragraph (in Chinese). The forum is BROADFORUM. Title: "${title}". Content: "${content}"`,
    });
    return response.text || "无法生成摘要。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "摘要生成失败。";
  }
};