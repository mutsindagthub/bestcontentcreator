import React, { useState } from 'react';
import {
  X,
  Wand2,
  Lightbulb,
  Video,
  Zap,
  MessageSquare,
  Hash,
  Calendar,
  Music,
  Mic2,
  Smile,
  UserCheck,
  Tv,
  Image as ImageIcon,
  Briefcase,
  FileText,
  HelpCircle,
  Radio,
  Film,
  Clapperboard,
  Drama,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { CreatorProfile, CreatorTool, Language } from '../types';
import { CREATOR_TOOLS } from '../utils/prompts';
import { TRANSLATIONS } from '../utils/translations';

interface CreatorToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
  creatorProfile: CreatorProfile;
  currentLanguage?: Language;
}

export const CreatorToolsModal: React.FC<CreatorToolsModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
  creatorProfile,
  currentLanguage = 'rw',
}) => {
  const [selectedTool, setSelectedTool] = useState<CreatorTool | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'music' | 'comedy' | 'films' | 'content' | 'showbiz'>('all');
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (!isOpen) return null;

  const iconMap: Record<string, React.ReactNode> = {
    Lightbulb: <Lightbulb size={18} className="text-amber-400" />,
    Video: <Video size={18} className="text-blue-400" />,
    Zap: <Zap size={18} className="text-purple-400" />,
    MessageSquare: <MessageSquare size={18} className="text-pink-400" />,
    Hash: <Hash size={18} className="text-cyan-400" />,
    Calendar: <Calendar size={18} className="text-emerald-400" />,
    Music: <Music size={18} className="text-rose-400" />,
    Mic2: <Mic2 size={18} className="text-violet-400" />,
    Smile: <Smile size={18} className="text-yellow-400" />,
    UserCheck: <UserCheck size={18} className="text-indigo-400" />,
    Tv: <Tv size={18} className="text-red-400" />,
    Image: <ImageIcon size={18} className="text-teal-400" />,
    Briefcase: <Briefcase size={18} className="text-blue-500" />,
    FileText: <FileText size={18} className="text-orange-400" />,
    HelpCircle: <HelpCircle size={18} className="text-sky-400" />,
    Radio: <Radio size={18} className="text-fuchsia-400" />,
    Film: <Film size={18} className="text-red-400" />,
    Clapperboard: <Clapperboard size={18} className="text-amber-500" />,
    Drama: <Drama size={18} className="text-purple-300" />,
  };

  const filteredTools =
    activeCategory === 'all'
      ? CREATOR_TOOLS
      : CREATOR_TOOLS.filter((t) => t.category === activeCategory);

  const handleOpenTool = (tool: CreatorTool) => {
    setSelectedTool(tool);
    // Initialize default values with profile hints if available
    const initial: Record<string, string> = {};
    tool.fields.forEach((f) => {
      if (f.name === 'niche' && creatorProfile.niche) {
        initial[f.name] = creatorProfile.niche.replace(/_/g, ' ');
      } else if (f.name === 'creator' || f.name === 'name' || f.name === 'artist') {
        initial[f.name] = creatorProfile.stageName || creatorProfile.creatorName || '';
      } else if (f.type === 'select' && f.options && f.options[0]) {
        initial[f.name] = f.options[0].value;
      } else {
        initial[f.name] = '';
      }
    });
    setFormValues(initial);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTool) return;

    const generatedPrompt = selectedTool.promptTemplate(formValues, creatorProfile);
    onSelectPrompt(generatedPrompt);
    onClose();
    setSelectedTool(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#121522] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedTool ? (
              <button
                onClick={() => setSelectedTool(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Back to all tools"
              >
                <ChevronLeft size={18} />
              </button>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <Wand2 size={18} />
              </div>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                {selectedTool ? selectedTool.name : 'Content Creator & Showbiz AI Tools'}
              </h2>
              <p className="text-xs text-slate-400">
                {selectedTool
                  ? `${selectedTool.nameRw} • ${selectedTool.description}`
                  : '19 specialized AI engines for artists, comedians, filmmakers & creators • By Overdance Capull'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedTool(null);
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Filters (when in list view) */}
        {!selectedTool && (
          <div className="px-4 pt-3 pb-1 border-b border-white/5 flex gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'all', label: `⚡ ${t.allCategories} (19)` },
              { id: 'music', label: t.musicCategory },
              { id: 'comedy', label: t.comedyCategory },
              { id: 'films', label: t.filmCategory },
              { id: 'content', label: t.creatorCategory },
              { id: 'showbiz', label: t.showbizCategory },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!selectedTool ? (
            /* Tools Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleOpenTool(tool)}
                  className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        {iconMap[tool.icon] || <Wand2 size={18} className="text-purple-400" />}
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                        {tool.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-purple-400/80 mb-1.5 font-medium">
                      {tool.nameRw}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-medium group-hover:text-purple-300">
                    <span>Use Generator</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Active Tool Form */
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 py-2">
              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs flex items-start gap-2.5">
                <Wand2 size={16} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{selectedTool.name} ({selectedTool.nameRw})</p>
                  <p className="text-slate-300 text-[11px] mt-0.5">{selectedTool.description}</p>
                </div>
              </div>

              {selectedTool.fields.map((field) => (
                <div key={field.name} className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-slate-300">
                    {field.label} {field.required && <span className="text-purple-400">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      value={formValues[field.name] || ''}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [field.name]: e.target.value })
                      }
                      required={field.required}
                      className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-purple-500/70 outline-none transition-colors"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#121522]">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={formValues[field.name] || ''}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-purple-500/70 outline-none transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formValues[field.name] || ''}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-[#171b2b] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-purple-500/70 outline-none transition-colors"
                    />
                  )}
                </div>
              ))}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTool(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98] transition-all"
                >
                  <Wand2 size={15} />
                  <span>Generate Content in Chat</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
