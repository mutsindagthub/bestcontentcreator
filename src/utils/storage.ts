import { AppSettings, ChatSession, CreatorProfile, Message, UserAccount, ContentNiche } from '../types';

const CURRENT_USER_KEY = 'ccs_current_user_account';
const ACCOUNTS_KEY = 'ccs_all_user_accounts';
const PROFILE_KEY = 'ccs_creator_profile';
const SETTINGS_KEY = 'ccs_settings';

export const DEFAULT_PROFILE: CreatorProfile = {
  creatorName: '',
  stageName: '',
  niche: 'general_creator',
  mainPlatform: 'all_platforms',
  targetAudience: 'Youth & Young Adults in East Africa & Diaspora',
  country: 'Rwanda / East Africa',
  preferredLanguage: 'rw',
  contentStyle: 'Energetic, authentic, modern, and engaging',
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'rw',
  theme: 'dark',
  autoScroll: true,
  streamResponse: true,
};

// Seed demo accounts if none exist
export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr_overdance',
    name: 'Overdance Capull',
    email: 'overdance@ccs.rw',
    stageName: 'Overdance Capull',
    niche: 'artist_manager',
    avatar: '👑',
    createdAt: 1710000000000,
  },
  {
    id: 'usr_musician',
    name: 'Mugisha Christian',
    email: 'chris@music.rw',
    stageName: 'Kigali Melodies',
    niche: 'musician_afrobeat',
    avatar: '🎵',
    createdAt: 1710000000000,
  },
  {
    id: 'usr_comedian',
    name: 'Keza Diane',
    email: 'keza@comedy.rw',
    stageName: 'KigaliSkits',
    niche: 'comedian_sketch',
    avatar: '😂',
    createdAt: 1710000000000,
  },
  {
    id: 'usr_filmmaker',
    name: 'Gisa Eric',
    email: 'gisa@cinema.rw',
    stageName: 'Kigali Vision Films',
    niche: 'film_director',
    avatar: '🎬',
    createdAt: 1710000000000,
  },
];

// -------------------------------------------------------------
// USER ACCOUNTS MANAGEMENT
// -------------------------------------------------------------

export function getUserAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(DEMO_ACCOUNTS));
      return DEMO_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEMO_ACCOUNTS;
  } catch {
    return DEMO_ACCOUNTS;
  }
}

export function saveUserAccounts(accounts: UserAccount[]): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save user accounts:', e);
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to set current user:', e);
  }
}

export function registerAccount(data: {
  name: string;
  email: string;
  stageName?: string;
  niche: ContentNiche;
  avatar?: string;
}): UserAccount {
  const accounts = getUserAccounts();
  const existing = accounts.find(
    (a) => a.email.toLowerCase() === data.email.toLowerCase() || a.name.toLowerCase() === data.name.toLowerCase()
  );
  if (existing) {
    setCurrentUser(existing);
    return existing;
  }

  const newAccount: UserAccount = {
    id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    name: data.name.trim(),
    email: data.email.trim(),
    stageName: data.stageName?.trim() || data.name.trim(),
    niche: data.niche || 'general_creator',
    avatar: data.avatar || '✨',
    createdAt: Date.now(),
  };

  accounts.unshift(newAccount);
  saveUserAccounts(accounts);
  setCurrentUser(newAccount);

  // Update profile automatically
  saveCreatorProfile({
    ...DEFAULT_PROFILE,
    creatorName: newAccount.name,
    stageName: newAccount.stageName || newAccount.name,
    niche: newAccount.niche,
  });

  return newAccount;
}

export function loginAccount(emailOrName: string): UserAccount | null {
  const accounts = getUserAccounts();
  const query = emailOrName.trim().toLowerCase();
  const user = accounts.find(
    (a) => a.email.toLowerCase() === query || a.name.toLowerCase() === query || (a.stageName && a.stageName.toLowerCase() === query)
  );
  if (user) {
    setCurrentUser(user);
    // Sync profile
    saveCreatorProfile({
      ...DEFAULT_PROFILE,
      creatorName: user.name,
      stageName: user.stageName || user.name,
      niche: user.niche,
    });
    return user;
  }
  return null;
}

export function logoutAccount(): void {
  setCurrentUser(null);
}

// -------------------------------------------------------------
// CHAT SESSIONS (Partitioned by user for privacy & clean view)
// -------------------------------------------------------------

function getSessionsKey(userId?: string | null): string {
  const uId = userId !== undefined ? userId : getCurrentUser()?.id;
  if (uId) {
    return `ccs_user_${uId}_sessions`;
  }
  return 'ccs_guest_sessions';
}

function getActiveKey(userId?: string | null): string {
  const uId = userId !== undefined ? userId : getCurrentUser()?.id;
  if (uId) {
    return `ccs_user_${uId}_active_session`;
  }
  return 'ccs_guest_active_session';
}

export function loadSessions(userId?: string | null): ChatSession[] {
  try {
    const key = getSessionsKey(userId);
    const raw = localStorage.getItem(key);
    if (!raw) {
      // If user has old non-partitioned sessions, check legacy
      if (key === 'ccs_guest_sessions') {
        const legacy = localStorage.getItem('ccs_chat_sessions');
        if (legacy) {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load sessions:', e);
    return [];
  }
}

export function saveSessions(sessions: ChatSession[], userId?: string | null): void {
  try {
    const key = getSessionsKey(userId);
    localStorage.setItem(key, JSON.stringify(sessions));
  } catch (e) {
    console.error('Failed to save sessions:', e);
  }
}

export function getActiveSessionId(userId?: string | null): string | null {
  try {
    const key = getActiveKey(userId);
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setActiveSessionId(id: string | null, userId?: string | null): void {
  try {
    const key = getActiveKey(userId);
    if (id) {
      localStorage.setItem(key, id);
    } else {
      localStorage.removeItem(key);
    }
  } catch {}
}

export function createNewSession(userId?: string | null, initialTitle = 'New Creative Chat'): ChatSession {
  const newSession: ChatSession = {
    id: 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: initialTitle,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const sessions = loadSessions(userId);
  sessions.unshift(newSession);
  saveSessions(sessions, userId);
  setActiveSessionId(newSession.id, userId);
  return newSession;
}

export function updateSessionMessages(
  sessionId: string,
  messages: Message[],
  customTitle?: string,
  userId?: string | null
): void {
  const sessions = loadSessions(userId);
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx !== -1) {
    sessions[idx].messages = messages;
    sessions[idx].updatedAt = Date.now();
    if (customTitle) {
      sessions[idx].title = customTitle;
    } else if (sessions[idx].title === 'New Creative Chat' && messages.length > 0) {
      const firstUserMsg = messages.find((m) => m.role === 'user');
      if (firstUserMsg) {
        sessions[idx].title =
          firstUserMsg.content.slice(0, 32).trim() + (firstUserMsg.content.length > 32 ? '...' : '');
      }
    }
    saveSessions(sessions, userId);
  }
}

export function deleteSession(sessionId: string, userId?: string | null): ChatSession[] {
  const sessions = loadSessions(userId).filter((s) => s.id !== sessionId);
  saveSessions(sessions, userId);
  const currentActive = getActiveSessionId(userId);
  if (currentActive === sessionId) {
    setActiveSessionId(sessions[0]?.id || null, userId);
  }
  return sessions;
}

export function renameSession(sessionId: string, newTitle: string, userId?: string | null): void {
  const sessions = loadSessions(userId);
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx !== -1) {
    sessions[idx].title = newTitle.trim() || 'Untitled Chat';
    sessions[idx].updatedAt = Date.now();
    saveSessions(sessions, userId);
  }
}

export function clearAllChats(userId?: string | null): void {
  const key = getSessionsKey(userId);
  const actKey = getActiveKey(userId);
  localStorage.removeItem(key);
  localStorage.removeItem(actKey);
}

// Transfer temporary guest chats into logged-in user account
export function transferGuestChatsToUser(userId: string): void {
  const guestSessions = loadSessions(null);
  if (guestSessions.length > 0) {
    const userSessions = loadSessions(userId);
    // Prepend guest sessions
    const merged = [...guestSessions, ...userSessions];
    saveSessions(merged, userId);
    clearAllChats(null);
  }
}

export function exportChatsToJson(userId?: string | null): string {
  const sessions = loadSessions(userId);
  return JSON.stringify(sessions, null, 2);
}

export function exportChatsToMarkdown(userId?: string | null): string {
  const sessions = loadSessions(userId);
  let md = `# ContentCreatorSkills - Question & Chat History Export\nGenerated: ${new Date().toLocaleString()}\n\n`;
  sessions.forEach((session, index) => {
    md += `## ${index + 1}. ${session.title}\n*Date: ${new Date(session.createdAt).toLocaleDateString()}*\n\n`;
    session.messages.forEach((msg) => {
      const speaker = msg.role === 'user' ? '👤 **You (Creator)**' : '✨ **ContentCreatorSkills AI**';
      md += `${speaker}:\n\n${msg.content}\n\n---\n\n`;
    });
    md += '\n\n';
  });
  return md;
}

// -------------------------------------------------------------
// PROFILE & SETTINGS
// -------------------------------------------------------------

export function loadCreatorProfile(): CreatorProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveCreatorProfile(profile: CreatorProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save creator profile:', e);
  }
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}
