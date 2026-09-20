import React from 'react';
import {
  Menu,
  Plus,
  Wand2,
  Settings,
  Globe,
  Home,
  RotateCcw,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { Language, UserAccount } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onRefreshClean: () => void;
  onOpenTools: () => void;
  onOpenSettings: () => void;
  onOpenLanding: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentUser: UserAccount | null;
  activeChatTitle?: string;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onNewChat,
  onRefreshClean,
  onOpenTools,
  onOpenSettings,
  onOpenLanding,
  onOpenAuth,
  onLogout,
  currentUser,
  activeChatTitle,
  currentLanguage,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <header className="h-14 border-b border-white/10 bg-[#0d0f17]/95 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between shrink-0 z-30">
      {/* Left section: Hamburger & Title */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors lg:hidden"
          title="Open Menu"
        >
          <Menu size={19} />
        </button>

        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-[10px] tracking-wider shrink-0 lg:hidden">
            CCS
          </div>
          <h1 className="text-xs sm:text-sm font-semibold text-slate-200 truncate max-w-[130px] sm:max-w-[220px] md:max-w-xs">
            {activeChatTitle || 'ContentCreatorSkills'}
          </h1>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Language selector chip */}
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs text-slate-300">
          <Globe size={13} className="ml-1.5 mr-1 text-slate-400 hidden md:inline" />
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="bg-transparent text-xs text-slate-200 py-1 pl-1 pr-1 outline-none cursor-pointer"
            title="Switch Language"
          >
            <option value="rw" className="bg-[#121520] text-white">🇷🇼 Kinyarwanda</option>
            <option value="en" className="bg-[#121520] text-white">🇬🇧 English</option>
            <option value="fr" className="bg-[#121520] text-white">🇫🇷 Français</option>
            <option value="sw" className="bg-[#121520] text-white">🇹🇿 Kiswahili</option>
          </select>
        </div>

        {/* Creator Tools button */}
        <button
          onClick={onOpenTools}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-colors"
          title={t.creatorTools}
        >
          <Wand2 size={13} />
          <span className="hidden sm:inline">{t.creatorTools}</span>
        </button>

        {/* REFRESH / CLEAN SLATE BUTTON */}
        <button
          onClick={onRefreshClean}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all group"
          title={t.refresh}
        >
          <RotateCcw size={13} className="group-hover:-rotate-90 transition-transform duration-300 text-cyan-400" />
          <span className="hidden md:inline">{t.refresh}</span>
        </button>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          title={t.newChat}
        >
          <Plus size={17} />
        </button>

        {/* User Account Login / Profile */}
        {currentUser ? (
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1 pl-2">
            <span className="text-sm">{currentUser.avatar}</span>
            <span className="text-xs font-semibold text-white max-w-[70px] sm:max-w-[100px] truncate hidden sm:inline">
              {currentUser.stageName || currentUser.name}
            </span>
            <button
              onClick={onLogout}
              className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors ml-0.5"
              title={t.logout}
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
            title={t.login}
          >
            <LogIn size={13} />
            <span className="hidden xs:inline">{t.login}</span>
          </button>
        )}

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title={t.settings}
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
};
