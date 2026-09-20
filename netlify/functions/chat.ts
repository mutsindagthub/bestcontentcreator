import { GoogleGenAI } from '@google/genai';

interface HandlerEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string>;
}

export const handler = async (event: HandlerEvent) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'GEMINI_API_KEY environment variable is not configured in Netlify settings.',
        }),
      };
    }

    const { messages, systemInstruction } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Messages array is required' }),
      };
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
      console.warn('Primary model gemini-3.8-flash error in Netlify function, attempting fallback:', primaryErr.message);
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ text: response.text || '' }),
    };
  } catch (error: any) {
    console.error('Netlify function chat error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Something went wrong. Please try again.',
      }),
    };
  }
};
