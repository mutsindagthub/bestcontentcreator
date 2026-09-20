import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Square,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Mic,
  MicOff,
  Sparkles,
  Trash2,
  AlertCircle,
  FileText,
  X,
  LogIn,
  UserCheck,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { CreatorProfile, Language, Message, SuggestionCard, UserAccount } from '../types';
import { SUGGESTION_CARDS } from '../utils/prompts';
import { TRANSLATIONS } from '../utils/translations';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onStopGenerating: () => void;
  onRegenerate: () => void;
  onClearChat: () => void;
  onReaction: (messageId: string, reaction: 'liked' | 'disliked') => void;
  creatorProfile: CreatorProfile;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  onRefreshClean?: () => void;
  currentLanguage: Language;
  error?: string | null;
  onRetry?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onStopGenerating,
  onRegenerate,
  onClearChat,
  onReaction,
  creatorProfile,
  currentUser,
  onOpenAuth,
  onRefreshClean,
  currentLanguage,
  error,
  onRetry,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [welcomeCategory, setWelcomeCategory] = useState<'all' | 'music' | 'comedy' | 'film' | 'creators' | 'showbiz'>('all');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'sw' ? 'sw-TZ' : 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  const toggleSpeech = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported on this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleSend = () => {
    if (!input.trim() && !attachment) return;
    if (isLoading) return;

    let fullMessage = input.trim();
    if (attachment) {
      fullMessage = `[Attached Brief / Asset: ${attachment}]\n\n${fullMessage}`;
      setAttachment(null);
    }

    onSendMessage(fullMessage);
    setInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0b0c10] overflow-hidden relative">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6">
        {messages.length === 0 ? (
          /* Empty Chat Home Screen - Pristine & Clean */
          <div className="max-w-3xl mx-auto min-h-[70vh] flex flex-col justify-center items-center text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-purple-600/30 mb-4 ring-4 ring-white/5">
              <Sparkles size={32} />
            </div>

            {/* Founder & Innovation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[11px] text-purple-300 mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">{t.founderBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-heading">
              {t.whatCreatingToday}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mb-5 leading-relaxed">
              {t.welcomeSub}
            </p>

            {/* Account Status / Login Banner */}
            {currentUser ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 mb-6">
                <UserCheck size={14} />
                <span>
                  {currentLanguage === 'rw'
                    ? `Muraho, ${currentUser.stageName || currentUser.name}! Ibibazo byawe bibitswe neza.`
                    : currentLanguage === 'fr'
                    ? `Bienvenue, ${currentUser.stageName || currentUser.name} ! Vos questions sont sauvegardées.`
                    : `Welcome, ${currentUser.stageName || currentUser.name}! Your creative history is saved.`}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-xs text-purple-300 mb-6 group">
                <span>{t.guestUser}</span>
                <span>•</span>
                <button
                  onClick={onOpenAuth}
                  className="font-semibold text-white underline hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <LogIn size={12} />
                  <span>{t.login} / {t.signUp}</span>
                </button>
              </div>
            )}

            {/* Category Quick Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 max-w-2xl px-2">
              {[
                { id: 'all', label: t.allCategories },
                { id: 'music', label: t.musicCategory },
                { id: 'comedy', label: t.comedyCategory },
                { id: 'film', label: t.filmCategory },
                { id: 'creators', label: t.creatorCategory },
                { id: 'showbiz', label: t.showbizCategory },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setWelcomeCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    welcomeCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl text-left">
              {SUGGESTION_CARDS.filter((c) => {
                if (welcomeCategory === 'all') return true;
                if (welcomeCategory === 'music') return c.category === 'Music' || c.category === 'Branding';
                if (welcomeCategory === 'comedy') return c.category === 'Comedy';
                if (welcomeCategory === 'film') return c.category === 'Film' || c.category === 'Video';
                if (welcomeCategory === 'creators') return c.category === 'Video' || c.category === 'Growth' || c.category === 'Planning';
                if (welcomeCategory === 'showbiz') return c.category === 'Showbiz' || c.category === 'Branding';
                return true;
              }).map((card, idx) => {
                const cardTitle =
                  currentLanguage === 'rw'
                    ? card.titleRw
                    : currentLanguage === 'sw'
                    ? card.titleSw
                    : card.title;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(card.prompt);
                      textareaRef.current?.focus();
                    }}
                    className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{card.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {card.category}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {cardTitle}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {card.prompt.slice(0, 75)}...
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Conversation Messages List */
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Clear / Refresh conversation button toolbar */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                {currentUser && (
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                    <Check size={12} />
                    <span>{t.savedUnderAccount}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {onRefreshClean && (
                  <button
                    onClick={onRefreshClean}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 border border-white/10"
                    title={t.refresh}
                  >
                    <RotateCcw size={12} className="text-cyan-400" />
                    <span>{t.refresh}</span>
                  </button>
                )}
                <button
                  onClick={onClearChat}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors px-2 py-1 rounded"
                  title={t.clearConversation}
                >
                  <Trash2 size={13} />
                  <span>{t.clearConversation}</span>
                </button>
              </div>
            </div>

            {messages.map((message) => {
              const isUser = message.role === 'user';

              return (
                <div
                  key={message.id}
                  className={`flex gap-3.5 sm:gap-4 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* AI Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-600/20 text-xs font-bold ring-2 ring-white/10 mt-0.5">
                      CCS
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30 rounded-tr-sm'
                        : 'bg-[#151926] text-slate-100 border border-white/10 shadow-sm rounded-tl-sm'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none text-slate-200">
                        <Markdown>{message.content}</Markdown>
                      </div>
                    )}

                    {/* Actions toolbar */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                      <span className="text-[10px] text-slate-400">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(message.id, message.content)}
                          className="hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                          title={t.copyCode}
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check size={12} className="text-emerald-400" />
                              <span className="text-emerald-400">{t.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>{t.copyCode}</span>
                            </>
                          )}
                        </button>

                        {!isUser && (
                          <div className="flex items-center gap-1 ml-1 pl-1 border-l border-white/10">
                            <button
                              onClick={() => onReaction(message.id, 'liked')}
                              className={`p-1 hover:text-purple-300 transition-colors ${
                                message.reactions === 'liked' ? 'text-purple-400 font-bold' : ''
                              }`}
                              title="Helpful"
                            >
                              <ThumbsUp size={12} />
                            </button>
                            <button
                              onClick={() => onReaction(message.id, 'disliked')}
                              className={`p-1 hover:text-rose-300 transition-colors ${
                                message.reactions === 'disliked' ? 'text-rose-400 font-bold' : ''
                              }`}
                              title="Not helpful"
                            >
                              <ThumbsDown size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 text-xs font-bold mt-0.5">
                      {currentUser ? currentUser.avatar : '👤'}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-600/20 text-xs font-bold ring-2 ring-white/10">
                  CCS
                </div>
                <div className="bg-[#151926] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-400 ml-1">
                    {currentLanguage === 'fr' ? 'Génération en cours...' : currentLanguage === 'rw' ? 'Muri gutegura igisubizo...' : 'ContentCreatorSkills is writing...'}
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-medium transition-colors"
                  >
                    Retry
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Box Area */}
      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0d0f17]/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Attachment Preview */}
          {attachment && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-xs text-purple-200">
              <FileText size={14} className="text-purple-400" />
              <span>{attachment}</span>
              <button
                onClick={() => setAttachment(null)}
                className="p-0.5 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-[#141724] border border-white/10 rounded-2xl p-2 focus-within:border-purple-500/70 focus-within:ring-1 focus-within:ring-purple-500/30 transition-all shadow-lg">
            {/* File upload button */}
            <label
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title="Attach brief, script, or lyrics file"
            >
              <Paperclip size={18} />
              <input
                type="file"
                className="hidden"
                onChange={handleFileAttach}
                accept="image/*,video/*,audio/*,.txt,.pdf,.doc,.docx"
              />
            </label>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isLoading
                  ? 'AI is generating...'
                  : isListening
                  ? t.speechListening
                  : t.inputPlaceholder
              }
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 resize-none outline-none py-2 px-1 max-h-48"
            />

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleSpeech}
              className={`p-2 rounded-xl transition-colors shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={isListening ? 'Stop recording' : t.speechListening}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Stop or Send Button */}
            {isLoading ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-colors shrink-0"
                title="Stop generating"
              >
                <Square size={16} fill="currentColor" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() && !attachment}
                className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-purple-600 disabled:hover:to-indigo-600 text-white transition-all shadow-md shadow-purple-600/30 shrink-0"
                title="Send message"
              >
                <Send size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Specialized for Content Creators, Artists, Films & Showbiz</span>
            <span>Shift + Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};
