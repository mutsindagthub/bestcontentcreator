import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Video,
  Music,
  Smile,
  TrendingUp,
  UserCheck,
  Briefcase,
  Calendar,
  Lightbulb,
  Globe,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Wand2,
  Film,
} from 'lucide-react';

interface LandingPageProps {
  onStartCreating: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreating,
  onSelectPrompt,
}) => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const samplePrompts = [
    {
      lang: '🇷🇼 Kinyarwanda',
      text: 'Mpa ideas 10 za TikTok videos nakora uyu munsi zifite viral hooks.',
    },
    {
      lang: '🇷🇼 Kinyarwanda',
      text: 'Nkorera lyrics z\'indirimbo ya Afrobeat ifite chorus yoroshye gufata mu mutwe.',
    },
    {
      lang: '🇫🇷 Français',
      text: 'Écris un synopsis captivant et le script d\'une scène dramatique pour un court-métrage.',
    },
    {
      lang: '🇹🇿 Kiswahili',
      text: 'Nkorera script ya YouTube video ya dakika 5 kuhusu muziki wa Bongo Flava.',
    },
    {
      lang: '🇬🇧 English',
      text: 'Draft a high-converting brand collaboration sponsorship pitch to a beverage company.',
    },
  ];

  const features = [
    {
      icon: <Lightbulb className="text-amber-400" size={24} />,
      title: 'AI Content Ideas',
      desc: 'Never run out of inspiration. Generate high-retention concepts customized for your niche, audience, and local culture.',
    },
    {
      icon: <Video className="text-blue-400" size={24} />,
      title: 'Video Scripts',
      desc: 'Complete scripts with visual camera directions, 3-second scroll-stopping hooks, voiceover lines, CTAs, and hashtags.',
    },
    {
      icon: <Film className="text-red-400" size={24} />,
      title: 'Films & Cinema',
      desc: 'Screenplay scenes, sluglines, dramatic dialogue, actor audition monologues, and episode cliffhangers for cinema & web series.',
    },
    {
      icon: <Music className="text-rose-400" size={24} />,
      title: 'Music & Lyrics',
      desc: 'Song ideas, addictive choruses, rhythmic verses, and rollout strategies for Afrobeat, Amapiano, Bongo Flava, and Gospel.',
    },
    {
      icon: <Smile className="text-yellow-400" size={24} />,
      title: 'Comedy & Skits',
      desc: 'Hilarious sketches, POV TikTok characters, relatable African family moments, and unforgettable punchlines.',
    },
    {
      icon: <TrendingUp className="text-emerald-400" size={24} />,
      title: 'Social Media Growth',
      desc: 'Actionable 30-day growth blueprints for TikTok, YouTube Shorts, and Instagram Reels that trigger algorithm momentum.',
    },
    {
      icon: <UserCheck className="text-indigo-400" size={24} />,
      title: 'Artist Branding',
      desc: 'Craft an unmistakable visual and verbal persona. Professional bios for Spotify, Apple Music, and Electronic Press Kits (EPK).',
    },
    {
      icon: <Briefcase className="text-purple-400" size={24} />,
      title: 'Showbiz Strategy & PR',
      desc: 'Press releases for song launches, interview questions for celebrity podcasts, and sponsorship pitches for brand deals.',
    },
    {
      icon: <Calendar className="text-cyan-400" size={24} />,
      title: 'Content Calendars',
      desc: 'Full month-long roadmaps with daily topics, media formats, and ready-to-use hooks so you stay consistently ahead.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f1f5f9] overflow-y-auto">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-[#0d0f17]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/25 text-xs tracking-wider">
            CCS
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white font-heading">
              ContentCreatorSkills
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              AI SHOWBIZ STUDIO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToFeatures}
            className="text-xs text-slate-300 hover:text-white px-3 py-1.5 transition-colors hidden sm:block"
          >
            Explore Features
          </button>
          <button
            onClick={onStartCreating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-purple-600/30 hover:from-purple-500 hover:to-indigo-500 transition-all active:scale-[0.98]"
          >
            <span>Start Creating</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/15 to-transparent blur-[120px] pointer-events-none rounded-full" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
          <Sparkles size={14} className="text-purple-400" />
          <span>Created & Engineered by Overdance Capull • Kinyarwanda • English • Français • Kiswahili</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight font-heading">
          Your AI Creative Partner for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
            Content & Showbiz.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create. Grow. Entertain. Let AI help you turn your ideas into powerful content, viral videos, hit songs, comedy sketches, and brand deals.
        </p>

        {/* Language Pill */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
          <Globe size={14} className="text-purple-400" />
          <span>Understands & responds fluently in</span>
          <span className="text-white font-semibold">🇷🇼 Kinyarwanda</span>
          <span>•</span>
          <span className="text-white font-semibold">🇬🇧 English</span>
          <span>•</span>
          <span className="text-white font-semibold">🇹🇿 Kiswahili</span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onStartCreating}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:opacity-95 transition-all active:scale-[0.98]"
          >
            <span>Start Creating Now</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={scrollToFeatures}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-sm font-semibold transition-colors"
          >
            Explore Features
          </button>
        </div>

        {/* Visual Preview of the ChatGPT-Style AI Interface */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-[#121522] border border-white/15 p-2 sm:p-4 shadow-2xl shadow-purple-950/40 text-left relative overflow-hidden group">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 ml-2 font-mono">ContentCreatorSkills AI Chat</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              <Sparkles size={12} />
              <span>Specialized in Showbiz</span>
            </div>
          </div>

          {/* Chat Mockup Content */}
          <div className="p-3 sm:p-5 space-y-4 text-xs sm:text-sm">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-md shadow-md">
                "Nkorera script ya TikTok video ivuga ku bintu 3 bituma umuhanzi mushya amenyekana vuba mu Rwanda no muri East Africa."
              </div>
            </div>

            {/* AI message */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">
                CCS
              </div>
              <div className="bg-[#181d2e] border border-white/10 rounded-2xl rounded-tl-sm p-4 text-slate-200 space-y-2.5 max-w-2xl">
                <div className="font-bold text-purple-300 text-sm">
                  ⚡ 1. Visual Hook (Amasegonda 3 ya mbere):
                </div>
                <p className="text-slate-300 italic pl-3 border-l-2 border-purple-500">
                  Amashusho: Fata telefoni uyegereza camera vuba ufite agahinda fake, uvuge: "Urakora indirimbo nziza ariko nta muntu urazumva? Reka nkubwire impamvu..."
                </p>
                <div className="font-bold text-purple-300 text-sm">
                  🎬 2. Intambwe 3 Nyamukuru:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>Amasengesho ya TikTok Sound:</strong> Kurangiza indirimbo ufite agace k'amasegonda 15 gakwiranye na TikTok challenge cyangwa trend.</li>
                  <li><strong>Kubaka Inshuti n'Abanyarwenya (Collaborations):</strong> Gukoresha comedy creators n'ababyinnyi bakora dance trends mbere y'uko audio isohoka.</li>
                  <li><strong>Gukora Storytelling ku buzima bwawe:</strong> Abafana bakunda umuhanzi bazi inkuru y'umubabaro n'urugendo rwe kurusha indirimbo yonyine.</li>
                </ul>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
                  <span>🎯 Includes CTA, Caption & 15 Trending Hashtags</span>
                  <button
                    onClick={onStartCreating}
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Try prompt in chat →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Prompt Pills */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Click any prompt to try it instantly:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(p.text)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all text-left group"
              >
                <span className="text-[11px] font-mono text-purple-400 shrink-0">{p.lang}:</span>
                <span className="truncate max-w-xs">{p.text}</span>
                <ChevronRight size={13} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="features" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Specialized for Every Corner of Entertainment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From TikTok short-form creators to arena musicians, comedy skit producers, and talent managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#121522]/60 hover:bg-[#121522] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <button
                onClick={onStartCreating}
                className="mt-5 pt-3 border-t border-white/5 text-xs text-purple-400 font-semibold flex items-center justify-between group"
              >
                <span>Use with AI</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Free & Deployment Banner */}
      <section className="py-16 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-blue-900/40 border border-purple-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Free-First Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Ready to launch your creative career?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Start chatting immediately with zero paywalls. Local conversation storage, responsive on all devices, and designed for instant free deployment on Netlify.
            </p>
          </div>

          <button
            onClick={onStartCreating}
            className="px-7 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-xl active:scale-[0.98] shrink-0"
          >
            Launch Chat App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2 font-semibold text-slate-300">
          <span>ContentCreatorSkills (CCS)</span>
          <span>•</span>
          <span className="text-purple-300">Created & Engineered by Overdance Capull</span>
          <span>•</span>
          <span>Your AI Creative Partner</span>
        </div>
        <p>
          Built for creators across Rwanda, Kenya, Tanzania, Uganda, the African diaspora, and worldwide showbiz.
        </p>
      </footer>
    </div>
  );
};
