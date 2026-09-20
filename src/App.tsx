import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ChatArea } from './components/ChatArea';
import { CreatorToolsModal } from './components/CreatorToolsModal';
import { SettingsModal } from './components/SettingsModal';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { AppSettings, ChatSession, CreatorProfile, Language, Message, UserAccount } from './types';
import {
  createNewSession,
  deleteSession,
  getActiveSessionId,
  getCurrentUser,
  loadCreatorProfile,
  loadSessions,
  loadSettings,
  logoutAccount,
  renameSession,
  saveCreatorProfile,
  saveSessions,
  saveSettings,
  setActiveSessionId,
  transferGuestChatsToUser,
  updateSessionMessages,
} from './utils/storage';
import { AIService } from './services/aiService';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveId] = useState<string | null>(null);
  const [creatorProfile, setProfile] = useState<CreatorProfile>(loadCreatorProfile());
  const [settings, setAppSettings] = useState<AppSettings>(loadSettings());

  // Navigation & Modals
  const [view, setView] = useState<'chat' | 'landing'>('chat');
  const [isSidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Chat Execution State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize data on mount or user switch
  useEffect(() => {
    const uId = currentUser?.id || null;
    const loaded = loadSessions(uId);

    if (loaded.length === 0) {
      // Create clean session
      const newSession = createNewSession(uId, 'New Creative Chat');
      setSessions([newSession]);
      setActiveId(newSession.id);
    } else {
      setSessions(loaded);
      const activeId = getActiveSessionId(uId);
      if (activeId && loaded.some((s) => s.id === activeId)) {
        setActiveId(activeId);
      } else {
        setActiveId(loaded[0].id);
        setActiveSessionId(loaded[0].id, uId);
      }
    }
  }, [currentUser]);

  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const currentMessages = activeSession?.messages || [];

  // 1. REFRESH / CLEAN STATE ("abona imeze neza na muntu wavuganye nayo")
  const handleRefreshClean = () => {
    const uId = currentUser?.id || null;
    // Create a pristine new session with 0 messages
    const freshSession = createNewSession(uId, 'New Creative Chat');
    const updated = loadSessions(uId);
    setSessions(updated);
    setActiveId(freshSession.id);
    setActiveSessionId(freshSession.id, uId);
    setError(null);
    setView('chat');
  };

  const handleNewChat = () => {
    handleRefreshClean();
  };

  const handleSelectSession = (id: string) => {
    const uId = currentUser?.id || null;
    setActiveId(id);
    setActiveSessionId(id, uId);
    setError(null);
    setView('chat');
  };

  const handleDeleteSession = (id: string) => {
    const uId = currentUser?.id || null;
    const updated = deleteSession(id, uId);
    setSessions(updated);
    const newActive = getActiveSessionId(uId);
    setActiveId(newActive);
  };

  const handleRenameSession = (id: string, newTitle: string) => {
    const uId = currentUser?.id || null;
    renameSession(id, newTitle, uId);
    setSessions(loadSessions(uId));
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    transferGuestChatsToUser(user.id);
    const userSessions = loadSessions(user.id);
    setSessions(userSessions);
    if (userSessions.length > 0) {
      setActiveId(userSessions[0].id);
      setActiveSessionId(userSessions[0].id, user.id);
    } else {
      const fresh = createNewSession(user.id);
      setSessions([fresh]);
      setActiveId(fresh.id);
    }
    setError(null);
  };

  const handleLogout = () => {
    logoutAccount();
    setCurrentUser(null);
    // On logout, present clean fresh guest view
    const freshGuest = createNewSession(null, 'New Creative Chat');
    setSessions([freshGuest]);
    setActiveId(freshGuest.id);
    setActiveSessionId(freshGuest.id, null);
    setError(null);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const uId = currentUser?.id || null;
    let targetSessionId = activeSessionId;
    let targetMessages = currentMessages;

    // If no active session, create one
    if (!targetSessionId || !activeSession) {
      const newSess = createNewSession(uId);
      targetSessionId = newSess.id;
      setActiveId(newSess.id);
      targetMessages = [];
      setSessions(loadSessions(uId));
    }

    const userMsg: Message = {
      id: 'msg_' + Date.now() + '_user',
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newHistory = [...targetMessages, userMsg];
    updateSessionMessages(targetSessionId, newHistory, undefined, uId);
    setSessions(loadSessions(uId));
    setError(null);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const aiReplyText = await AIService.sendMessage(
        newHistory,
        creatorProfile,
        controller.signal
      );

      const assistantMsg: Message = {
        id: 'msg_' + Date.now() + '_assistant',
        role: 'assistant',
        content: aiReplyText,
        timestamp: Date.now(),
      };

      const finalHistory = [...newHistory, assistantMsg];
      updateSessionMessages(targetSessionId, finalHistory, undefined, uId);
      setSessions(loadSessions(uId));
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('AI Generation stopped by user.');
      } else {
        console.error('Error generating AI response:', err);
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleRegenerate = async () => {
    const uId = currentUser?.id || null;
    if (currentMessages.length === 0 || isLoading || !activeSessionId) return;

    // Find the last user message
    let lastUserIndex = -1;
    for (let i = currentMessages.length - 1; i >= 0; i--) {
      if (currentMessages[i].role === 'user') {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex === -1) return;

    const trimmedHistory = currentMessages.slice(0, lastUserIndex + 1);
    updateSessionMessages(activeSessionId, trimmedHistory, undefined, uId);
    setSessions(loadSessions(uId));
    setError(null);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const aiReplyText = await AIService.sendMessage(
        trimmedHistory,
        creatorProfile,
        controller.signal
      );

      const assistantMsg: Message = {
        id: 'msg_' + Date.now() + '_assistant',
        role: 'assistant',
        content: aiReplyText,
        timestamp: Date.now(),
      };

      const finalHistory = [...trimmedHistory, assistantMsg];
      updateSessionMessages(activeSessionId, finalHistory, undefined, uId);
      setSessions(loadSessions(uId));
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleClearChat = () => {
    const uId = currentUser?.id || null;
    if (!activeSessionId) return;
    if (window.confirm('Clear all messages in this conversation?')) {
      updateSessionMessages(activeSessionId, [], undefined, uId);
      setSessions(loadSessions(uId));
      setError(null);
    }
  };

  const handleReaction = (messageId: string, reaction: 'liked' | 'disliked') => {
    const uId = currentUser?.id || null;
    if (!activeSessionId) return;
    const updated = currentMessages.map((m) =>
      m.id === messageId
        ? { ...m, reactions: m.reactions === reaction ? null : reaction }
        : m
    );
    updateSessionMessages(activeSessionId, updated, undefined, uId);
    setSessions(loadSessions(uId));
  };

  const handleSelectPrompt = (prompt: string) => {
    setView('chat');
    handleSendMessage(prompt);
  };

  const handleLanguageChange = (lang: Language) => {
    const newSettings = { ...settings, language: lang };
    const newProfile = { ...creatorProfile, preferredLanguage: lang };
    setAppSettings(newSettings);
    setProfile(newProfile);
    saveSettings(newSettings);
    saveCreatorProfile(newProfile);
  };

  const handleUpdateProfile = (newProfile: CreatorProfile) => {
    setProfile(newProfile);
    saveCreatorProfile(newProfile);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleChatHistoryCleared = () => {
    const uId = currentUser?.id || null;
    const fresh = createNewSession(uId, 'New Creative Chat');
    setSessions([fresh]);
    setActiveId(fresh.id);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0b0c10] text-[#f1f5f9] overflow-hidden font-sans">
      {view === 'landing' ? (
        <LandingPage
          onStartCreating={() => setView('chat')}
          onSelectPrompt={handleSelectPrompt}
        />
      ) : (
        <div className="flex-1 flex h-full overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelectSession={handleSelectSession}
            onNewChat={handleNewChat}
            onRefreshClean={handleRefreshClean}
            onDeleteSession={handleDeleteSession}
            onRenameSession={handleRenameSession}
            onOpenTools={() => setIsToolsOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenLanding={() => setView('landing')}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
            currentUser={currentUser}
            creatorProfile={creatorProfile}
            currentLanguage={settings.language}
            isOpenMobile={isSidebarOpenMobile}
            onCloseMobile={() => setSidebarOpenMobile(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Navbar
              onToggleSidebar={() => setSidebarOpenMobile(!isSidebarOpenMobile)}
              onNewChat={handleNewChat}
              onRefreshClean={handleRefreshClean}
              onOpenTools={() => setIsToolsOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenLanding={() => setView('landing')}
              onOpenAuth={() => setIsAuthOpen(true)}
              onLogout={handleLogout}
              currentUser={currentUser}
              activeChatTitle={activeSession?.title}
              currentLanguage={settings.language}
              onLanguageChange={handleLanguageChange}
            />

            <ChatArea
              messages={currentMessages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onStopGenerating={handleStopGenerating}
              onRegenerate={handleRegenerate}
              onClearChat={handleClearChat}
              onReaction={handleReaction}
              creatorProfile={creatorProfile}
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
              onRefreshClean={handleRefreshClean}
              currentLanguage={settings.language}
              error={error}
              onRetry={handleRegenerate}
            />
          </div>
        </div>
      )}

      {/* Creator Tools Modal */}
      <CreatorToolsModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
        onSelectPrompt={handleSelectPrompt}
        creatorProfile={creatorProfile}
        currentLanguage={settings.language}
      />

      {/* User Login & Signup Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentLanguage={settings.language}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        creatorProfile={creatorProfile}
        onUpdateProfile={handleUpdateProfile}
        onChatHistoryCleared={handleChatHistoryCleared}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />
    </div>
  );
}
