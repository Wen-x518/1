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
  if (!ai) return "请配置 API Key 以使用火妙AI。";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are '火妙AI' (Huomiao AI), a helpful and intelligent assistant integrated into the BROADFORUM community. Answer the user's query concisely, professionally, and in a friendly tone. Query: ${query}`,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "火妙AI 暂时休息中，请稍后再试。";
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

export const polishContent = async (content: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return content;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `你是火妙AI，请对以下论坛帖子内容进行润色，使其更加通顺、专业且具有吸引力，保持原意不变。直接返回润色后的内容，不要包含任何开场白或解释：\n\n"${content}"`,
    });
    return response.text || content;
  } catch (error) {
    console.error("Gemini Polish Error:", error);
    return content;
  }
};

export const generateAiComment = async (title: string, content: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "火妙AI 觉得这篇文章很有意思！(API Key 未配置)";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are '火妙AI', an AI participant in a forum discussion. Read the following post and provide a thoughtful, constructive, and slightly witty comment (in Chinese). Keep it under 100 words. Post Title: "${title}". Post Content: "${content || title}"`,
    });
    return response.text || "火妙AI 正在思考...";
  } catch (error) {
    return "火妙AI 似乎连接中断了...";
  }
};