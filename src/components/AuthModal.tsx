import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Sparkles,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  User,
} from 'lucide-react';
import { ContentNiche, Language, UserAccount } from '../types';
import { DEMO_ACCOUNTS, registerAccount, loginAccount } from '../utils/storage';
import { TRANSLATIONS } from '../utils/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  currentLanguage: Language;
}

const AVATAR_OPTIONS = ['✨', '👑', '🎵', '😂', '🎬', '📱', '🎙️', '🔥', '💎', '🎭'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [stageName, setStageName] = useState('');
  const [email, setEmail] = useState('');
  const [niche, setNiche] = useState<ContentNiche>('general_creator');
  const [selectedAvatar, setSelectedAvatar] = useState('✨');
  const [signupError, setSignupError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError(
        currentLanguage === 'rw'
          ? 'Shyiramo izina cyangwa email yawe'
          : currentLanguage === 'fr'
          ? 'Veuillez saisir votre nom ou email'
          : 'Please enter your name or email'
      );
      return;
    }

    const user = loginAccount(loginIdentifier);
    if (user) {
      onLoginSuccess(user);
      onClose();
    } else {
      // If user doesn't exist, create it on the fly or prompt
      const autoUser = registerAccount({
        name: loginIdentifier.trim(),
        email: `${loginIdentifier.trim().toLowerCase().replace(/\s+/g, '')}@creator.rw`,
        stageName: loginIdentifier.trim(),
        niche: 'general_creator',
        avatar: '✨',
      });
      onLoginSuccess(autoUser);
      onClose();
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!name.trim()) {
      setSignupError(
        currentLanguage === 'rw'
          ? 'Shyiramo izina ryawe'
          : currentLanguage === 'fr'
          ? 'Veuillez saisir votre nom'
          : 'Please enter your name'
      );
      return;
    }

    const userEmail = email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '')}@creator.rw`;
    const user = registerAccount({
      name: name.trim(),
      email: userEmail,
      stageName: stageName.trim() || name.trim(),
      niche,
      avatar: selectedAvatar,
    });

    onLoginSuccess(user);
    onClose();
  };

  const handleDemoLogin = (demoUser: UserAccount) => {
    const user = loginAccount(demoUser.email);
    if (user) {
      onLoginSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#101320] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              CCS
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                {mode === 'login' ? t.login : t.signUp}
              </h2>
              <p className="text-xs text-slate-400">
                {currentLanguage === 'rw'
                  ? 'Bika ibibazo na scripts byawe'
                  : currentLanguage === 'fr'
                  ? 'Sauvegardez vos questions et scripts'
                  : 'Save your creative questions & scripts'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-white/10 bg-black/20 text-xs">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'text-purple-400 border-b-2 border-purple-500 bg-white/[0.02]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn size={14} />
            <span>{t.login}</span>
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-center font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'text-purple-400 border-b-2 border-purple-500 bg-white/[0.02]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus size={14} />
            <span>{t.signUp}</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[75vh]">
          {mode === 'login' ? (
            <div className="space-y-4">
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {currentLanguage === 'rw'
                      ? 'Izina, Stage Name cyangwa Email'
                      : currentLanguage === 'fr'
                      ? 'Nom, Nom de scène ou Email'
                      : 'Name, Stage Name or Email'}
                  </label>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. Overdance, Keza, or name@ccs.rw"
                    className="w-full bg-[#161a2c] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-purple-500/80 outline-none transition-all placeholder:text-slate-500"
                    autoFocus
                  />
                  {loginError && <p className="text-xs text-rose-400 mt-1">{loginError}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
                >
                  <LogIn size={15} />
                  <span>{t.login}</span>
                </button>
              </form>

              {/* Quick 1-click Demo Profiles */}
              <div className="pt-3 border-t border-white/10">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Zap size={12} className="text-amber-400" />
                  <span>
                    {currentLanguage === 'rw'
                      ? 'Kwinjira byihuse (Quick Profiles)'
                      : currentLanguage === 'fr'
                      ? 'Connexion rapide (Profils créateurs)'
                      : '1-Click Quick Demo Profiles'}
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => handleDemoLogin(account)}
                      className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 text-left transition-all flex items-center gap-2 group"
                    >
                      <span className="text-lg shrink-0">{account.avatar}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-white group-hover:text-purple-300 truncate">
                          {account.stageName || account.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate capitalize">
                          {account.niche.replace(/_/g, ' ')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Signup form */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {currentLanguage === 'rw' ? 'Izina ryawe (Real Name)' : currentLanguage === 'fr' ? 'Nom réel' : 'Real Name'} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jean Damascène"
                  className="w-full bg-[#161a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500/80 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {currentLanguage === 'rw' ? 'Stage / Brand Name' : currentLanguage === 'fr' ? 'Nom d\'artiste' : 'Stage / Brand Name'}
                  </label>
                  <input
                    type="text"
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    placeholder="e.g. Kigali Star"
                    className="w-full bg-[#161a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500/80 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {currentLanguage === 'rw' ? 'Email / Username' : currentLanguage === 'fr' ? 'Email / Identifiant' : 'Email / Handle'}
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. star@gmail.com"
                    className="w-full bg-[#161a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500/80 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {currentLanguage === 'rw' ? 'Icyo ukora (Niche)' : currentLanguage === 'fr' ? 'Domaine créatif' : 'Creative Niche'}
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value as ContentNiche)}
                  className="w-full bg-[#161a2c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-purple-500/80 outline-none"
                >
                  <option value="musician_afrobeat">🎵 Musician (Afrobeat / RnB)</option>
                  <option value="musician_amapiano">🎹 Musician (Amapiano)</option>
                  <option value="musician_gospel">🙏 Musician (Gospel)</option>
                  <option value="comedian_sketch">😂 Comedian (Skits / Sketches)</option>
                  <option value="filmmaker_actor">🎬 Cinema Actor / Filmmaker</option>
                  <option value="film_director">🎥 Film & Series Director</option>
                  <option value="tiktok_creator">📱 TikTok / Reels Creator</option>
                  <option value="youtuber">📺 YouTuber</option>
                  <option value="podcaster">🎙️ Podcaster / Host</option>
                  <option value="showbiz_journalist">💼 Showbiz PR & Journalist</option>
                  <option value="artist_manager">👑 Artist Manager / Producer</option>
                  <option value="general_creator">✨ General Creator</option>
                </select>
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {currentLanguage === 'rw' ? 'Hitamo Avatar' : currentLanguage === 'fr' ? 'Choisir un avatar' : 'Pick an Avatar'}
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all shrink-0 ${
                        selectedAvatar === av
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400 scale-105'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {signupError && <p className="text-xs text-rose-400">{signupError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
              >
                <UserPlus size={15} />
                <span>{t.signUp}</span>
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span>
              {currentLanguage === 'rw'
                ? 'Ibyo ubaza byose bibikwa mu mutekano kuri konti yawe.'
                : currentLanguage === 'fr'
                ? 'Vos questions et scripts sont stockés en toute sécurité sous votre profil.'
                : 'Your questions, prompts and scripts are stored privately under your profile.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
