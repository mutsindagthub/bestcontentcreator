import { Language } from '../types';

export interface UIStrings {
  newChat: string;
  refresh: string;
  cleanScreen: string;
  login: string;
  signUp: string;
  logout: string;
  guestUser: string;
  loginToSave: string;
  loginToSaveDesc: string;
  creatorTools: string;
  settings: string;
  whatCreatingToday: string;
  welcomeSub: string;
  inputPlaceholder: string;
  clearConversation: string;
  clearAllConfirm: string;
  speechListening: string;
  founderBadge: string;
  allCategories: string;
  musicCategory: string;
  comedyCategory: string;
  filmCategory: string;
  creatorCategory: string;
  showbizCategory: string;
  savedUnderAccount: string;
  historyTitle: string;
  noChatsYet: string;
  copyCode: string;
  copied: string;
  exportChats: string;
  deleteChat: string;
  renameChat: string;
  save: string;
  cancel: string;
  account: string;
  myQuestions: string;
}

export const TRANSLATIONS: Record<Language, UIStrings> = {
  rw: {
    newChat: 'Ikiganiro Gishya',
    refresh: 'Kugira Ishya (Refresh)',
    cleanScreen: 'Guhagarika & Gusiba Byose',
    login: 'Kwinjira (Login)',
    signUp: 'Gufungura Konti',
    logout: 'Gusohoka (Logout)',
    guestUser: 'Umushyitsi (Guest)',
    loginToSave: 'Injira ngo ubike ibyo wabajije',
    loginToSaveDesc: 'Gufungura konti bigufasha kubika ibibazo, scripts, n\'indirimbo zawe zose mu mutekano.',
    creatorTools: 'Ibikoresho bya Creator',
    settings: 'Igenamiterere',
    whatCreatingToday: 'Uyu munsi turahanga iki?',
    welcomeSub: 'Mufasha wawe wa AI wihariye mu muziki, urwenya, sinema, TikTok, YouTube n\'itangazamakuru ry\'imyidagaduro.',
    inputPlaceholder: 'Baza ikibazo, saba script ya video, igitekerezo cy\'indirimbo, cyangwa amagambo y\'urwenya...',
    clearConversation: 'Gusiba ibiri ku kirahure',
    clearAllConfirm: 'Urashaka gusiba iki kiganiro cyose?',
    speechListening: 'Nteze amatwi, vuga...',
    founderBadge: 'Created & Engineered by Overdance Capull • Rwanda & Global Showbiz',
    allCategories: '✨ Byose',
    musicCategory: '🎵 ARTISTS (Umuziki)',
    comedyCategory: '😂 COMEDIANS (Urwenya)',
    filmCategory: '🎬 FILMS (Sinema na Filime)',
    creatorCategory: '📱 CREATORS (Social Media)',
    showbizCategory: '💼 SHOWBIZ & PR',
    savedUnderAccount: 'Bibitswe kuri konti yawe',
    historyTitle: 'Ibyo Wabajije Mbere',
    noChatsYet: 'Nta bibazo urabaza. Tangira ikiganiro hejuru!',
    copyCode: 'Koporora',
    copied: 'Byakoporowe!',
    exportChats: 'Kuramo inyandiko (Export)',
    deleteChat: 'Gusiba',
    renameChat: 'Guhindura izina',
    save: 'Bika',
    cancel: 'Hagarika',
    account: 'Konti Yanjye',
    myQuestions: 'Ibibazo Byanjye',
  },
  fr: {
    newChat: 'Nouveau Chat',
    refresh: 'Rafraîchir (Écran Propre)',
    cleanScreen: 'Réinitialiser l\'Écran',
    login: 'Se connecter',
    signUp: 'Créer un compte',
    logout: 'Déconnexion',
    guestUser: 'Invité (Non connecté)',
    loginToSave: 'Connectez-vous pour sauvegarder vos questions',
    loginToSaveDesc: 'Créez un compte gratuit pour conserver vos scripts, paroles et idées en toute sécurité.',
    creatorTools: 'Outils de Créateur',
    settings: 'Paramètres',
    whatCreatingToday: 'Que créons-nous aujourd\'hui ?',
    welcomeSub: 'Votre assistant IA créatif spécialisé en musique, humour, cinéma, TikTok, YouTube et showbiz africain & mondial.',
    inputPlaceholder: 'Posez une question, demandez un script vidéo, des paroles de chanson ou un pitch showbiz...',
    clearConversation: 'Effacer l\'écran',
    clearAllConfirm: 'Voulez-vous réinitialiser cette conversation ?',
    speechListening: 'J\'écoute, parlez...',
    founderBadge: 'Créé & Développé par Overdance Capull • Showbiz & Cinéma',
    allCategories: '✨ Tout',
    musicCategory: '🎵 ARTISTES (Musique)',
    comedyCategory: '😂 HUMOUR (Comédie & Skits)',
    filmCategory: '🎬 CINÉMA & FILMS',
    creatorCategory: '📱 CRÉATEURS (Réseaux)',
    showbizCategory: '💼 SHOWBIZ & RP',
    savedUnderAccount: 'Sauvegardé sur votre compte',
    historyTitle: 'Historique de vos questions',
    noChatsYet: 'Aucune question pour l\'instant. Commencez dès maintenant !',
    copyCode: 'Copier',
    copied: 'Copié !',
    exportChats: 'Exporter',
    deleteChat: 'Supprimer',
    renameChat: 'Renommer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    account: 'Mon Compte',
    myQuestions: 'Mes Questions',
  },
  en: {
    newChat: 'New Chat',
    refresh: 'Refresh (Clean Slate)',
    cleanScreen: 'Reset to Clean Screen',
    login: 'Sign In',
    signUp: 'Create Account',
    logout: 'Sign Out',
    guestUser: 'Guest (Not logged in)',
    loginToSave: 'Sign in to save your questions & scripts',
    loginToSaveDesc: 'Log in to securely keep your chat history, song lyrics, and video scripts stored under your account.',
    creatorTools: 'Creator Tools',
    settings: 'Settings',
    whatCreatingToday: 'What are we creating today?',
    welcomeSub: 'Your AI creative partner specialized in Afrobeat, comedy, cinema, TikTok, YouTube, and entertainment PR.',
    inputPlaceholder: 'Ask a question, request a video script, song lyrics, comedy skit, or PR pitch...',
    clearConversation: 'Clear screen',
    clearAllConfirm: 'Are you sure you want to clear this conversation?',
    speechListening: 'Listening, speak now...',
    founderBadge: 'Created & Engineered by Overdance Capull • Rwanda & Global Showbiz',
    allCategories: '✨ All',
    musicCategory: '🎵 ARTISTS (Music)',
    comedyCategory: '😂 COMEDIANS (Comedy)',
    filmCategory: '🎬 FILMS (Cinema & Series)',
    creatorCategory: '📱 CREATORS (Social Media)',
    showbizCategory: '💼 SHOWBIZ & PR',
    savedUnderAccount: 'Saved to your account',
    historyTitle: 'Question History',
    noChatsYet: 'No questions asked yet. Start a creative prompt above!',
    copyCode: 'Copy',
    copied: 'Copied!',
    exportChats: 'Export Chats',
    deleteChat: 'Delete',
    renameChat: 'Rename',
    save: 'Save',
    cancel: 'Cancel',
    account: 'My Account',
    myQuestions: 'My Questions',
  },
  sw: {
    newChat: 'Gumzo Mpya',
    refresh: 'Onyesha Upya (Safi)',
    cleanScreen: 'Futa Skrini Kabisa',
    login: 'Ingia (Login)',
    signUp: 'Unda Akaunti',
    logout: 'Ondoka (Logout)',
    guestUser: 'Mgeni (Hujaingia)',
    loginToSave: 'Ingia ili kuhifadhi maswali yako',
    loginToSaveDesc: 'Kuingia kunakuwezesha kuhifadhi scripts, mashairi ya nyimbo na maswali yako salama kwenye akaunti yako.',
    creatorTools: 'Vifaa vya Muundaji',
    settings: 'Mipangilio',
    whatCreatingToday: 'Tunanatengeneza nini leo?',
    welcomeSub: 'Msaidizi wako wa AI aliyebobea katika muziki, vichekesho, filamu, TikTok, YouTube na burudani ya Afrika.',
    inputPlaceholder: 'Uliza swali, omba script ya video, maneno ya wimbo, au tamthilia ya ucheshi...',
    clearConversation: 'Futa gumzo hili',
    clearAllConfirm: 'Una uhakika unataka kufuta mazungumzo haya yote?',
    speechListening: 'Ninakusikiliza, ongea sasa...',
    founderBadge: 'Created & Engineered by Overdance Capull • Sanaa na Burudani',
    allCategories: '✨ Zote',
    musicCategory: '🎵 WASANII (Muziki)',
    comedyCategory: '😂 WACHEKESHAJI (Ucheshi)',
    filmCategory: '🎬 FILAMU & TAMTHILIA',
    creatorCategory: '📱 WAUNDAJI (Mitandao)',
    showbizCategory: '💼 SHOWBIZ & PR',
    savedUnderAccount: 'Imehifadhiwa kwenye akaunti yako',
    historyTitle: 'Historia ya Maswali Yako',
    noChatsYet: 'Haujauliza swali bado. Anza hapo juu!',
    copyCode: 'Nakili',
    copied: 'Imenakiliwa!',
    exportChats: 'Pakua Gumzo',
    deleteChat: 'Futa',
    renameChat: 'Badilisha jina',
    save: 'Hifadhi',
    cancel: 'Ghairi',
    account: 'Akaunti Yangu',
    myQuestions: 'Maswali Yangu',
  },
  other: {
    newChat: 'New Chat',
    refresh: 'Refresh Screen',
    cleanScreen: 'Reset Screen',
    login: 'Sign In',
    signUp: 'Create Account',
    logout: 'Sign Out',
    guestUser: 'Guest',
    loginToSave: 'Sign in to save questions',
    loginToSaveDesc: 'Log in to securely save your creative history.',
    creatorTools: 'Creator Tools',
    settings: 'Settings',
    whatCreatingToday: 'What are we creating today?',
    welcomeSub: 'AI creative partner for content creators and showbiz.',
    inputPlaceholder: 'Ask a question or request a script...',
    clearConversation: 'Clear',
    clearAllConfirm: 'Clear all messages?',
    speechListening: 'Listening...',
    founderBadge: 'Created & Engineered by Overdance Capull',
    allCategories: '✨ All',
    musicCategory: '🎵 ARTISTS',
    comedyCategory: '😂 COMEDIANS',
    filmCategory: '🎬 FILMS',
    creatorCategory: '📱 CREATORS',
    showbizCategory: '💼 SHOWBIZ & PR',
    savedUnderAccount: 'Saved to account',
    historyTitle: 'History',
    noChatsYet: 'No history yet.',
    copyCode: 'Copy',
    copied: 'Copied!',
    exportChats: 'Export',
    deleteChat: 'Delete',
    renameChat: 'Rename',
    save: 'Save',
    cancel: 'Cancel',
    account: 'Account',
    myQuestions: 'Questions',
  }
};
