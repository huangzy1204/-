
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      return response.text || "对不起，我暂时无法回应，请稍后再试。";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "连接助手失败，请检查网络或API设置。";
    }
  }
}

export const geminiService = new GeminiService();
