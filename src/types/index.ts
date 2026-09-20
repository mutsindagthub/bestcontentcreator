export type Language = 'en' | 'rw' | 'sw' | 'fr' | 'other';

export type ContentNiche =
  | 'tiktok_creator'
  | 'youtuber'
  | 'musician_afrobeat'
  | 'musician_amapiano'
  | 'musician_gospel'
  | 'musician_hiphop'
  | 'comedian_sketch'
  | 'comedian_standup'
  | 'filmmaker_actor'
  | 'film_director'
  | 'podcaster'
  | 'actor_presenter'
  | 'influencer_lifestyle'
  | 'showbiz_journalist'
  | 'artist_manager'
  | 'general_creator';

export type Platform =
  | 'tiktok'
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'x_twitter'
  | 'podcast'
  | 'spotify_audiomack'
  | 'all_platforms';

export interface CreatorProfile {
  creatorName: string;
  stageName: string;
  niche: ContentNiche;
  mainPlatform: Platform;
  targetAudience: string;
  country: string;
  preferredLanguage: Language;
  contentStyle: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  reactions?: 'liked' | 'disliked' | null;
  copied?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  stageName?: string;
  niche: ContentNiche;
  avatar: string;
  createdAt: number;
}

export interface SuggestionCard {
  icon: string;
  title: string;
  titleRw: string;
  titleFr?: string;
  titleSw: string;
  prompt: string;
  category: string;
}

export interface CreatorTool {
  id: string;
  name: string;
  nameRw: string;
  nameFr?: string;
  nameSw: string;
  description: string;
  category: 'content' | 'music' | 'comedy' | 'films' | 'showbiz';
  icon: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select';
    placeholder?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
  }[];
  promptTemplate: (values: Record<string, string>, profile?: CreatorProfile) => string;
}

export interface AppSettings {
  language: Language;
  theme: 'dark';
  autoScroll: boolean;
  streamResponse: boolean;
}
