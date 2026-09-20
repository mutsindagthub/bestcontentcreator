import { CreatorProfile, Message } from '../types';
import { generatePersonalizedSystemPrompt } from '../utils/prompts';

export interface ChatRequestPayload {
  messages: { role: 'user' | 'assistant'; content: string }[];
  profile?: CreatorProfile;
  language?: string;
}

export interface ChatResponsePayload {
  text: string;
  error?: string;
}

export class AIService {
  private static endpoint = '/api/chat';

  public static async sendMessage(
    messages: Message[],
    profile?: CreatorProfile,
    signal?: AbortSignal
  ): Promise<string> {
    if (!navigator.onLine) {
      throw new Error('You appear to be offline. Please check your connection.');
    }

    const systemInstruction = generatePersonalizedSystemPrompt(profile);

    const formattedMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: formattedMessages,
          systemInstruction,
          profile,
        }),
        signal,
      });

      if (!res.ok) {
        let errorMessage = 'Something went wrong. Please try again.';
        try {
          const errData = await res.json();
          if (errData.error) {
            errorMessage = errData.error;
          }
        } catch {
          // use default
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      if (!data.text) {
        throw new Error('Empty response received from AI service.');
      }
      return data.text;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw err;
      }
      if (!navigator.onLine) {
        throw new Error('You appear to be offline. Please check your connection.');
      }
      console.error('AIService Error:', err);
      throw new Error(err.message || 'Something went wrong. Please try again.');
    }
  }
}
