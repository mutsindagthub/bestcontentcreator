import React, { useState } from 'react';
import {
  Plus,
  MessageSquare,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  Settings as SettingsIcon,
  Wand2,
  ExternalLink,
  ChevronLeft,
  RotateCcw,
  LogIn,
  LogOut,
  ShieldAlert,
} from 'lucide-react';
import { ChatSession, CreatorProfile, Language, UserAccount } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onRefreshClean: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onOpenTools: () => void;
  onOpenSettings: () => void;
  onOpenLanding: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentUser: UserAccount | null;
  creatorProfile: CreatorProfile;
  currentLanguage: Language;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onRefreshClean,
  onDeleteSession,
  onRenameSession,
  onOpenTools,
  onOpenSettings,
  onOpenLanding,
  onOpenAuth,
  onLogout,
  currentUser,
  creatorProfile,
  currentLanguage,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRename = (s: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(s.id);
    setEditTitle(s.title);
  };

  const saveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(currentLanguage === 'fr' ? 'Supprimer cette conversation ?' : 'Gusiba iki kiganiro?')) {
      onDeleteSession(id);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#0d0f17] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <button
            onClick={onOpenLanding}
            className="flex items-center gap-3 text-left group hover:opacity-95 transition-opacity"
            title="View Landing Page"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20 text-xs tracking-wider">
              CCS
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>ContentCreatorSkills</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-medium border border-purple-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Showbiz & Creator Studio</p>
            </div>
          </button>

          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 space-y-2">
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                onNewChat();
                onCloseMobile();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs shadow-md shadow-purple-600/25 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] transition-all"
            >
              <Plus size={16} />
              <span>{t.newChat}</span>
            </button>

            {/* Refresh Screen Button */}
            <button
              onClick={() => {
                onRefreshClean();
                onCloseMobile();
              }}
              className="px-2.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title={t.refresh}
            >
              <RotateCcw size={15} className="text-cyan-400" />
            </button>
          </div>

          <button
            onClick={() => {
              onOpenTools();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Wand2 size={14} className="text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>{t.creatorTools}</span>
            </span>
            <span className="bg-purple-500/20 text-purple-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              19 PRO
            </span>
          </button>
        </div>

        {/* Account Banner (if not logged in) */}
        {!currentUser && (
          <div className="mx-3 mb-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-purple-300 mb-1">
              <ShieldAlert size={14} className="text-purple-400 shrink-0" />
              <span>{t.loginToSave}</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 leading-tight">
              {t.loginToSaveDesc}
            </p>
            <button
              onClick={() => {
                onOpenAuth();
                onCloseMobile();
              }}
              className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
            >
              <LogIn size={13} />
              <span>{t.login} / {t.signUp}</span>
            </button>
          </div>
        )}

        {/* Search Chats */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder={currentLanguage === 'fr' ? 'Rechercher...' : 'Search questions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{currentUser ? t.myQuestions : t.historyTitle}</span>
            <span className="text-[10px] text-slate-500 font-mono">({filteredSessions.length})</span>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              {searchQuery ? 'No match found.' : t.noChatsYet}
            </div>
          ) : (
            filteredSessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const isEditing = session.id === editingId;

              return (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onCloseMobile();
                  }}
                  className={`group relative flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                    isActive
                      ? 'bg-purple-600/15 text-white border border-purple-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <MessageSquare
                    size={13}
                    className={`shrink-0 ${
                      isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />

                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-[#161a2c] text-white px-2 py-0.5 rounded text-xs outline-none border border-purple-500/50"
                        autoFocus
                      />
                      <button
                        onClick={(e) => saveRename(session.id, e)}
                        className="p-1 text-emerald-400 hover:text-emerald-300"
                        title={t.save}
                      >
                        <Check size={12} />
                      </button>
                      <button
                        onClick={cancelRename}
                        className="p-1 text-slate-400 hover:text-slate-200"
                        title={t.cancel}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 truncate">{session.title}</span>

                      <div className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => startRename(session, e)}
                          className="p-1 text-slate-400 hover:text-white"
                          title={t.renameChat}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(session.id, e)}
                          className="p-1 text-slate-400 hover:text-rose-400"
                          title={t.deleteChat}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer with User Profile & Settings */}
        <div className="p-3 border-t border-white/10 bg-black/20 space-y-2">
          {currentUser ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
              <div
                onClick={() => {
                  onOpenSettings();
                  onCloseMobile();
                }}
                className="flex items-center gap-2 overflow-hidden cursor-pointer flex-1"
              >
                <span className="text-xl shrink-0">{currentUser.avatar}</span>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white truncate">
                    {currentUser.stageName || currentUser.name}
                  </div>
                  <div className="text-[10px] text-purple-300 truncate capitalize">
                    {currentUser.niche.replace(/_/g, ' ')}
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                title={t.logout}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                onOpenSettings();
                onCloseMobile();
              }}
              className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition-colors group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                  {(creatorProfile.stageName || creatorProfile.creatorName || 'CC')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-medium text-white truncate">
                    {creatorProfile.stageName || creatorProfile.creatorName || t.guestUser}
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize truncate">
                    {creatorProfile.niche.replace(/_/g, ' ')}
                  </div>
                </div>
              </div>
              <SettingsIcon
                size={16}
                className="text-slate-400 group-hover:text-purple-400 transition-colors shrink-0"
              />
            </div>
          )}

          <div className="pt-2 border-t border-white/5 space-y-1.5">
            <div className="flex items-center justify-between px-1 text-[11px]">
              <span className="text-slate-400">Created & Engineered by</span>
              <span className="text-purple-300 font-semibold">Overdance Capull</span>
            </div>
            <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
              <button
                onClick={onOpenLanding}
                className="hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>Showcase</span>
                <ExternalLink size={10} />
              </button>
              <span>v1.3.0 • Showbiz AI</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
