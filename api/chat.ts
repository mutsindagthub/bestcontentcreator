import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY environment variable is not configured.',
      });
    }

    const { messages, systemInstruction } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction:
            systemInstruction ||
            'You are ContentCreatorSkills, an expert AI creative partner for content creators, artists, and showbiz.',
          temperature: 0.85,
          topP: 0.95,
        },
      });
    } catch (primaryErr: any) {
      console.warn('Vercel fallback to gemini-3.1-flash-lite:', primaryErr.message);
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents,
          config: {
            systemInstruction:
              systemInstruction ||
              'You are ContentCreatorSkills, an expert AI creative partner for content creators, artists, and showbiz.',
            temperature: 0.85,
            topP: 0.95,
          },
        });
      } catch (fallbackErr: any) {
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents,
          config: {
            systemInstruction:
              systemInstruction ||
              'You are ContentCreatorSkills, an expert AI creative partner for content creators, artists, and showbiz.',
            temperature: 0.85,
            topP: 0.95,
          },
        });
      }
    }

    return res.status(200).json({ text: response.text || '' });
  } catch (error: any) {
    console.error('Vercel API Chat Error:', error);
    return res.status(500).json({
      error: error.message || 'Something went wrong. Please try again.',
    });
  }
}
