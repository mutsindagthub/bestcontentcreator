import React, { useState } from 'react';
import {
  X,
  Settings as SettingsIcon,
  User,
  Globe,
  Trash2,
  Download,
  Info,
  Sparkles,
  Check,
  Moon,
} from 'lucide-react';
import { AppSettings, CreatorProfile, Language, ContentNiche, Platform, UserAccount } from '../types';
import {
  clearAllChats,
  exportChatsToJson,
  exportChatsToMarkdown,
} from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  creatorProfile: CreatorProfile;
  onUpdateProfile: (newProfile: CreatorProfile) => void;
  onChatHistoryCleared: () => void;
  currentUser?: UserAccount | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  creatorProfile,
  onUpdateProfile,
  onChatHistoryCleared,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'language' | 'data' | 'about'>('profile');
  const [profileForm, setProfileForm] = useState<CreatorProfile>(creatorProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleLanguageSelect = (lang: Language) => {
    onUpdateSettings({ ...settings, language: lang });
    onUpdateProfile({ ...creatorProfile, preferredLanguage: lang });
  };

  const handleExportJson = () => {
    const jsonStr = exportChatsToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ContentCreatorSkills-chats-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const mdStr = exportChatsToMarkdown();
    const blob = new Blob([mdStr], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ContentCreatorSkills-chats-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    if (
      window.confirm(
        'Are you sure you want to delete ALL chat sessions? This action cannot be undone.'
      )
    ) {
      clearAllChats();
      onChatHistoryCleared();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#121522] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <SettingsIcon size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                Settings & Personalization
              </h2>
              <p className="text-xs text-slate-400">
                Configure creator niche, language, themes, and data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-white/5 px-4 pt-2 gap-2 text-xs overflow-x-auto">
          {[
            { id: 'profile', label: 'Creator Profile', icon: <User size={14} /> },
            { id: 'language', label: 'Language & AI', icon: <Globe size={14} /> },
            { id: 'data', label: 'Storage & Export', icon: <Download size={14} /> },
            { id: 'about', label: 'About CCS', icon: <Info size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-lg font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-500 text-white bg-white/5'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-sm text-left">
          {/* 1. Creator Profile Personalization */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-4">
              {currentUser ? (
                <div className="p-3.5 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentUser.avatar}</span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{currentUser.stageName || currentUser.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                          Active Account
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{currentUser.email}</div>
                    </div>
                  </div>
                  {onLogout && (
                    <button
                      type="button"
                      onClick={onLogout}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 text-xs transition-colors"
                    >
                      Logout
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-purple-300">
                      Mode Invité (Guest Mode)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Connectez-vous ou créez un compte pour sauvegarder vos questions.
                    </div>
                  </div>
                  {onOpenAuth && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition-colors"
                    >
                      Login / Sign Up
                    </button>
                  )}
                </div>
              )}

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300 text-xs">
                💡 <strong>AI Personalization:</strong> ContentCreatorSkills tailors all scripts,
                hooks, and recommendations to match your specific stage name, platform, and audience.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Creator Real Name</label>
                  <input
                    type="text"
                    value={profileForm.creatorName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, creatorName: e.target.value })
                    }
                    placeholder="e.g. Jean Damascene"
                    className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Stage / Brand Name</label>
                  <input
                    type="text"
                    value={profileForm.stageName}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, stageName: e.target.value })
                    }
                    placeholder="e.g. MC K-Vibe / KigaliSkits"
                    className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Primary Niche</label>
                  <select
                    value={profileForm.niche}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, niche: e.target.value as ContentNiche })
                    }
                    className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                  >
                    <option value="tiktok_creator">TikTok Creator</option>
                    <option value="youtuber">YouTuber</option>
                    <option value="musician_afrobeat">Musician (Afrobeat)</option>
                    <option value="musician_amapiano">Musician (Amapiano)</option>
                    <option value="musician_gospel">Musician (Gospel)</option>
                    <option value="musician_hiphop">Musician (Hip-hop / Trap)</option>
                    <option value="comedian_sketch">Comedian (Sketches / Skits)</option>
                    <option value="comedian_standup">Comedian (Stand-up)</option>
                    <option value="filmmaker_actor">Actor / Cinema Talent (Sinema)</option>
                    <option value="film_director">Film & Series Director / Producer</option>
                    <option value="podcaster">Podcaster</option>
                    <option value="actor_presenter">TV & Radio Presenter / Host</option>
                    <option value="influencer_lifestyle">Lifestyle & Fashion Influencer</option>
                    <option value="showbiz_journalist">Showbiz Journalist / Blogger</option>
                    <option value="artist_manager">Artist Manager / Promoter</option>
                    <option value="general_creator">General Content Creator</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Main Platform</label>
                  <select
                    value={profileForm.mainPlatform}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, mainPlatform: e.target.value as Platform })
                    }
                    className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                  >
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram (Reels & Carousels)</option>
                    <option value="facebook">Facebook</option>
                    <option value="x_twitter">X / Twitter</option>
                    <option value="podcast">Podcasting (Spotify/Apple)</option>
                    <option value="all_platforms">Multi-Platform (All)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Target Audience</label>
                  <input
                    type="text"
                    value={profileForm.targetAudience}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, targetAudience: e.target.value })
                    }
                    placeholder="e.g. Gen Z in Rwanda, East Africa, Diaspora"
                    className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Country / Region</label>
                  <input
                    type="text"
                    value={profileForm.country}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, country: e.target.value })
                    }
                    placeholder="e.g. Rwanda / East Africa / International"
                    className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Content Tone & Style</label>
                <input
                  type="text"
                  value={profileForm.contentStyle}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, contentStyle: e.target.value })
                  }
                  placeholder="e.g. Funny, energetic, storytelling, relatable street slang"
                  className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500/70 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check size={14} /> Profile preferences saved!
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          )}

          {/* 2. Language & AI Preferences */}
          {activeTab === 'language' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Multilingual AI Mode
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  ContentCreatorSkills automatically detects and responds in the language you speak. Select your preferred primary language:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { id: 'rw', name: 'Kinyarwanda', flag: '🇷🇼', desc: 'Ururimi rw\'Ikinyarwanda cy\'umwimerere' },
                    { id: 'en', name: 'English', flag: '🇬🇧', desc: 'Global English for international reach' },
                    { id: 'fr', name: 'Français', flag: '🇫🇷', desc: 'Français pour créateurs et artistes' },
                    { id: 'sw', name: 'Kiswahili', flag: '🇹🇿', desc: 'Kiswahili fasaha cha burudani na sanaa' },
                  ].map((lang) => {
                    const isSelected = settings.language === lang.id;
                    return (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => handleLanguageSelect(lang.id as Language)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500/40'
                            : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg">{lang.flag}</span>
                          {isSelected && <Check size={14} className="text-purple-400" />}
                        </div>
                        <div className="text-xs font-semibold text-white">{lang.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{lang.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Theme
                </h3>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Moon size={16} className="text-purple-400" />
                    <span>Dark SaaS Mode (Default)</span>
                  </div>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Storage & Data */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                🔒 <strong>Local Privacy:</strong> All conversations are stored locally in your browser storage. No paid backend or external tracking required.
              </div>

              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Export Chat History
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={handleExportJson}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <Download size={14} />
                    <span>Export as JSON</span>
                  </button>
                  <button
                    onClick={handleExportMarkdown}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <Download size={14} />
                    <span>Export as Markdown (.md)</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  Danger Zone
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Erase all conversation history and stored sessions from your local device.
                </p>
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Clear All Chat History</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. About CCS */}
          {activeTab === 'about' && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center font-extrabold text-white text-sm tracking-wider">
                  CCS
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    ContentCreatorSkills (CCS)
                  </h3>
                  <p className="text-xs text-purple-300 font-medium">
                    Created & Engineered by Overdance Capull
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
                <span className="font-semibold text-white">Founder's Mission:</span> Created by <strong>Overdance Capull</strong> to equip every African artist, comedian, filmmaker, podcaster, and digital creator with world-class AI intelligence rooted in authentic culture, emotional resilience, and showbiz excellence.
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <h4 className="font-semibold text-white">✨ Core Capabilities:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Native comprehension and generation in Kinyarwanda, English, Français, and Kiswahili</li>
                  <li>Deep knowledge of Rwandan showbiz (Jay Polly, Meddy, Israel Mbonyi, Bamenya, Misago Nelly, Element Eleéeh, etc.)</li>
                  <li>Fluency in youth street slang ("Amaslenge y'i Nyamirambo & Kigali")</li>
                  <li>Viral TikTok & YouTube scripts with visual hooks, scene cues, and timestamps</li>
                  <li>Cinema screenplay scenes, movie story concepts, and audition monologues</li>
                  <li>Afrobeat, Amapiano, Gospel, and Bongo Flava songwriting & lyrics</li>
                  <li>Comedy sketch writing with character dynamics, subtext, and punchlines</li>
                  <li>Extraordinary patience, emotional intelligence, and calming presence</li>
                </ul>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-between">
                <span>Designed for Rwanda, East Africa & Global Showbiz</span>
                <span className="text-purple-400 font-medium">By Overdance Capull</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
