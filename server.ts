import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ContentCreatorSkills Backend',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const ai = getAIClient();
    if (!ai) {
      // If no API key configured yet, return a helpful notice or simulated response
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured. Please set the GEMINI_API_KEY environment variable in Settings > Secrets.',
      });
    }

    // Build contents from messages history for multi-turn chat
    // Google GenAI expects contents array where role is 'user' or 'model'
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
      console.warn('Primary model gemini-3.8-flash error, attempting fallback:', primaryErr.message);
      // Fallback to gemini-3.1-flash-lite or gemini-flash-latest
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

    const text = response.text || '';
    return res.json({ text });
  } catch (error: any) {
    console.error('Gemini API Error in /api/chat:', error);
    return res.status(500).json({
      error: error.message || 'Something went wrong. Please try again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ContentCreatorSkills server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
