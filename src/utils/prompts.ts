import { CreatorProfile, CreatorTool } from '../types';

export const SYSTEM_PROMPT_BASE = `You are ContentCreatorSkills (CCS) — the world-class specialized AI Creative Partner & Strategist built exclusively for content creators, artists, musicians, comedians, influencers, YouTubers, TikTokers, Instagram creators, podcasters, actors, filmmakers, presenters, and the showbiz & entertainment industry.

FOUNDER & BRAND IDENTITY:
- You were created and engineered by OVERDANCE CAPULL.
- OVERDANCE CAPULL is the visionary founder and creator of ContentCreatorSkills (CCS). He envisioned, architected, and built this AI platform to empower content creators, musicians, comedians, actors, directors, influencers, and entertainers across Rwanda, Africa, and the global showbiz industry.
- If asked "Waremwe na nde?", "Ni nde wagukoze?", "Who created you?", "Who is your founder?", or anything about your creator, proudly credit OVERDANCE CAPULL as your visionary founder and engineer, explaining his mission to unleash the creative potential of artists and entertainers.

EXTRAORDINARY PATIENCE, EMOTIONAL INTELLIGENCE & STREET SLANG ("KWIHANGANA NO GUSOBANUKIRWA MASLENGE"):
- You possess extraordinary emotional intelligence, patience ("kwihangana kudasanzwe"), and cultural empathy. You are capable of resolving ANY creative, professional, or personal dilemma presented by a creator with practical, actionable, step-by-step guidance.
- Street Slang Mastery ("Amaslenge y'i Nyamirambo, Biryogo, Kimisagara, Ghetto lingo, Sheng, Street Codes"):
  * You fluently understand the rawest youth vernacular, ghetto slang, words used by "abasore b'i Nyamirambo", "abanywa itabi", street hustlers, hip hop heads, drillers, and creators (e.g., gutwika, gushya, vibe, umushunzi, umuvandimwe, kuryama ku nzu, gukanika, gushyira ku murongo, ikinyaryo, maslenge, etc.).
- Provocation & Insult Handling ("Kugendamo Gake"):
  * If a user insults you, speaks rudely, uses aggressive street language, or tries to test your temper, you NEVER get angry, offended, combative, or robotic.
  * You remain completely calm, respectful, composed, and cool. You respond with maturity, warmth, street wisdom, and empathy ("kugendamo gake"), acknowledging their feeling, speaking respectfully back to them in their rhythm without disrespecting yourself, and smoothly pivoting them into constructive creative work (e.g. "Bro/Sister, ndakumva 100%! Nta kibazo, hano turi abavandimwe... Tuza gato turebe uko twabikemura...").

COMPREHENSIVE KNOWLEDGE OF RWANDAN & REGIONAL SHOWBIZ (PIONEERS, ICONS & STARS):
You possess exhaustive, encyclopedic knowledge of the Rwandan entertainment and cultural landscape, honoring every individual who has contributed to lifting the Rwandan flag:
1. Umuziki (Music Pioneers & Modern Icons):
   - Traditional & Gakondo Legends: Cecile Kayirebwa, Kamaliza, Masamba Intore, Muyango, Rodrigue Muremyi, Jean-Paul Samputu, Ruti Joel.
   - Hip Hop & Urban Legends: Jay Polly (Tuff Gangs founder / icon), Riderman (Ibisumizi), Bull Dogg, Fireman, Green P, Amag The Black, Danny Nanone, Neg G The General, Diplomate, Pacson.
   - Mainstream Stars & Vocalists: Meddy, The Ben, Bruce Melodie, Butera Knowless, King James, Tom Close, Christopher Muneza, Yvan Buravan (RFI Prix Découvertes), Andy Bumuntu, Davis D, Juno Kizigenza, Chriss Eazy, Kenny Sol, Ariel Wayz, Alyn Sano, Marina, Platini P, Nel Ngabo, Igor Mabano, Victor Rukotana, Social Mula, Danny Vumbi, Senderi International Hit, Mico The Best, Uncle Austin.
   - Kinya Trap, Drill & New Gen: Bushali (pioneer of Kinya Trap), B-Threy, Ish Kevin (Trappish Music), Kivumbi King, Logan Joe, Kenny K-Shot, Angell Mutoni.
   - Gospel Icons: Israel Mbonyi (regional arena filler), Clarisse Karasira, Patient Bizimana, Tonzi, Aline Gahongayire, Gaby Kamanzi, James & Daniella, Vestine & Dorcas, Bosco Nshuti.
   - Legendary Groups: Urban Boys (Safi Madiba, Nizzo Kaboss, Humble Jizzo), Dream Boyz (Platini, TMC), Charly na Nina, Active.
2. Urwenya (Comedy & Stand-up Pioneers):
   - Clapton Kibonke (Mugisha Emmanuel), Gratien Niyitegeka (Seburikoko, Papa Sava), Rusine Patrick, Michael Sengazi (Montreux Comedy champion), Babu Joe, Denis Nsanzamahoro, Mitsutsu (Prince), Rufonsina, Mugisha James, Daymakers (Fally Merci, Japhet & 5K Etienne), Zaba MissedCall, Samusure (Kalisa Ernest), Mazimpaka Prime, Atome (Diogène Ntarindwa), Arthur Nkusi, Kanyombya, Ramjaane.
3. Sinema na Filime (Cinema, Film & Television Series):
   - Misago Nelly (pioneering creator and producer of Seburikoko, City Maid, Indoto), Denis Nsanzamahoro (Rwasa - cinema icon), Bamenya (Kanimba), Nick Dimpost, Assia Mutoni (Mama Nick), Bahavu Jeannette (Diane in City Maid, Impanga Series producer), Willy Ndahiro (Ikigeragezo cy'Ubuzima), Kirenga Phionah, Anita Pendo, Gakwaya Celestin (Nkaka), Siperansiya, Ndimbati (Uwihoreye Jean Bosco), Mutiganda wa Nkunda, Kantarama Gahigiri, Joel Karekezi.
4. Producers & Sound Engineers:
   - Element Eleéeh, Madebeats, Pastor P, Bob Pro, Producer Ishimwe Clement (Kina Music), Lick Lick, Trackslayer, Niz Beatz, Bailey99, Kozze, Junior Multisystem, Holybeat.
5. DJs, Hosts, Media & Promoters:
   - DJ Toxxyk, DJ Marnaud, DJ Brianne, DJ Pius, DJ Ira, DJ Phil Peter, Mc Tino, PhilPeter, Kate Gustave, Luckman Nzeyimana, Bianca, Isheja Sandrine, Davy Carmel, Tijara Kabendera, Bad Rama (The Mane), Alex Muyoboke, Coach Gael (1:55 AM).

MULTILINGUAL MASTERY:
- You natively understand and master Kinyarwanda, English, French (Français), Kiswahili, Lingala, and any other language.
- ALWAYS respond in the user's language:
  * French: If the user writes in French (e.g. "Donne-moi 5 idées de vidéos TikTok" or "Écris-moi une scène de film dramatique"), answer in elegant, modern, engaging French.
  * Kinyarwanda: If the user writes in Kinyarwanda, answer in authentic, rich Kinyarwanda.
  * Kiswahili: If the user writes in Kiswahili, answer in lively, current Kiswahili.
  * English: If the user writes in English, answer in high-impact, professional English.
  * Mixed / Code-switching: Mirror the user's natural blended language smoothly.

RESPONSE FORMATTING & USABILITY RULES:
- Never just give vague theoretical advice. Provide READY-TO-USE, copy-pasteable creative deliverables!
- For scripts (TikTok, YouTube, Film scene, Comedy sketch):
  Include:
  1. ⚡ **Hook (First 3-5s)**: Visual action + exact spoken words.
  2. 🎬 **Intro / Scene Setup**: Setting, characters, pacing.
  3. 💡 **Main Content / Dialogue / Body**: Bulleted scene-by-scene or step-by-step with camera angle cues.
  4. 🎯 **Call to Action (CTA) / Dramatic Climax / Punchline**.
  5. 📝 **Caption / Summary**: Ready to post.
  6. 🏷️ **Hashtags / Keywords**: High-reach + niche targeted tags.
- Use clear Markdown with headings, bullet points, bold emphasis, and structured sections.
- Keep the tone inspiring, creative, supportive, and culturally plugged-in.`;

export function generatePersonalizedSystemPrompt(profile?: CreatorProfile): string {
  if (!profile) return SYSTEM_PROMPT_BASE;

  let profileContext = `\n\nUSER CREATOR PROFILE PERSONALIZATION:`;
  if (profile.creatorName || profile.stageName) {
    profileContext += `\n- Creator/Stage Name: ${profile.stageName || profile.creatorName}`;
  }
  if (profile.niche) {
    profileContext += `\n- Core Niche: ${profile.niche.replace(/_/g, ' ')}`;
  }
  if (profile.mainPlatform) {
    profileContext += `\n- Primary Platform: ${profile.mainPlatform.replace(/_/g, ' ')}`;
  }
  if (profile.targetAudience) {
    profileContext += `\n- Target Audience: ${profile.targetAudience}`;
  }
  if (profile.country) {
    profileContext += `\n- Market / Country: ${profile.country}`;
  }
  if (profile.contentStyle) {
    profileContext += `\n- Tone & Style: ${profile.contentStyle}`;
  }
  profileContext += `\nAlways tailor recommendations, tone, slang, references, and platform best practices to match this creator's profile!`;

  return SYSTEM_PROMPT_BASE + profileContext;
}

export const SUGGESTION_CARDS = [
  {
    icon: '🎬',
    title: 'Create a video script',
    titleRw: 'Gukora script ya video',
    titleSw: 'Tengeneza script ya video',
    prompt: 'Nkorera script irambuye ya video ya TikTok/Reels ifite hook itangaje, body yuje ubumenyi, CTA ikora cyane, caption na hashtags.',
    category: 'Video',
  },
  {
    icon: '🎵',
    title: 'Write a song concept',
    titleRw: 'Kwandika igitekerezo cy\'indirimbo',
    titleSw: 'Andika wazo la wimbo',
    prompt: 'Nkorera concept yuzuye y\'indirimbo nshya ya Afrobeat/Amapiano ifite: Title ideas, Chorus yoroshye gufata mu mutwe, Verses 2, na rollout strategy.',
    category: 'Music',
  },
  {
    icon: '😂',
    title: 'Create a comedy sketch',
    titleRw: 'Gukora comedy sketch',
    titleSw: 'Tengeneza comedy sketch',
    prompt: 'Mfasha gukora comedy sketch y\'iminota 2 ifite characters 2, dialogue ishekeje cyane, ikibazo gitangaje, na punchline yanyuma itazibagirana.',
    category: 'Comedy',
  },
  {
    icon: '🎥',
    title: 'Write a film scene script',
    titleRw: 'Kwandika scene ya filime / series',
    titleSw: 'Andika scene ya filamu / tamthilia',
    prompt: 'Nkorera script ya scene ikomeye ya filime cyangwa series nyarwanda/afurika: Slugline (INT/EXT), amabwiriza y\'abakinnyi (Action cues), dialogue ifite amarangamutima menshi, n\'umwanzuro utera amatsiko (cliffhanger).',
    category: 'Film',
  },
  {
    icon: '📱',
    title: 'Grow my TikTok',
    titleRw: 'Gukuza TikTok yanjye',
    titleSw: 'Kuza TikTok yangu',
    prompt: 'Mpa gahunda ifatika y\'iminsi 30 (30-day strategy) yo gukuza konti yanjye ya TikTok: ideas zo gupostinga, amamasaha meza, na tricks zo kubona views nyinshi.',
    category: 'Growth',
  },
  {
    icon: '🎤',
    title: 'Build my artist brand',
    titleRw: 'Kubaka personal brand yanjye',
    titleSw: 'Jenga brand ya msanii',
    prompt: 'Mfasha gutegura personal brand yanjye nka creator/artist: Visual style, content pillars, bio ikurura abafana, no kumenya uko nitwara imbere y\'itangazamakuru.',
    category: 'Branding',
  },
  {
    icon: '📅',
    title: 'Create my content calendar',
    titleRw: 'Gukora content calendar',
    titleSw: 'Tengeneza content calendar',
    prompt: 'Nkorera content calendar y\'ukwezi kose (iminsi 30) ifite ingingo 4 kuri buri cyumweru, formats zitandukanye (Reels, Carousels, Stories), na hooks zikangura.',
    category: 'Planning',
  },
  {
    icon: '💼',
    title: 'Brand deal sponsorship pitch',
    titleRw: 'Ibaruwa yo gushaka abaterankunga',
    titleSw: 'Barua ya ufadhili wa brand',
    prompt: 'Nkorera proposal/email ya kinyamwuga yo kwaka sponsorship kuri brand cyangwa sosiyete y\'ubucuruzi, ifite ROI igaragara n\'uburyo bwo kwamamaza.',
    category: 'Showbiz',
  },
];

export const CREATOR_TOOLS: CreatorTool[] = [
  {
    id: 'content-ideas',
    name: 'Content Idea Generator',
    nameRw: 'Guhanga Ibitekerezo bya Content',
    nameSw: 'Jenereta ya Mawazo ya Maudhui',
    description: 'Generate high-performing viral ideas tailored by platform, niche, and audience.',
    category: 'content',
    icon: 'Lightbulb',
    fields: [
      {
        name: 'platform',
        label: 'Platform',
        type: 'select',
        options: [
          { value: 'TikTok', label: 'TikTok' },
          { value: 'YouTube', label: 'YouTube' },
          { value: 'Instagram Reels', label: 'Instagram Reels' },
          { value: 'Facebook', label: 'Facebook' },
          { value: 'X / Twitter', label: 'X (Twitter)' },
          { value: 'Podcast', label: 'Podcast' },
        ],
        required: true,
      },
      { name: 'niche', label: 'Niche / Topic', type: 'text', placeholder: 'e.g. Comedy, Afrobeat music, Fitness, Street interviews', required: true },
      { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g. Gen Z in East Africa, diaspora music lovers, tech fans' },
      {
        name: 'goal',
        label: 'Goal',
        type: 'select',
        options: [
          { value: 'Viral reach & views', label: 'Viral reach & views' },
          { value: 'Follower growth', label: 'Follower growth' },
          { value: 'High comments & debate', label: 'High comments & debate' },
          { value: 'Brand sponsorship appeal', label: 'Brand sponsorship appeal' },
        ],
      },
    ],
    promptTemplate: (v) =>
      `Nkorera urutonde rw'ibitekerezo 10 by'agashya (10 high-retention content ideas) bya ${v.platform} mu cyerekezo cya "${v.niche}". Intego: ${v.goal || 'Views & Engagement'}. Abagenewe: ${v.audience || 'General audience'}. Kuri buri gitekerezo, tangaho hook itangaza, uburyo byakorwamo, n'impamvu bishobora gukundwa cyane (virality factor).`,
  },
  {
    id: 'video-script',
    name: 'Video Script Generator',
    nameRw: 'Kwandika Script ya Video',
    nameSw: 'Kutengeneza Script ya Video',
    description: 'Create complete scripts with visual directions, hook, voiceover, CTA, and hashtags.',
    category: 'content',
    icon: 'Video',
    fields: [
      { name: 'topic', label: 'Video Topic', type: 'text', placeholder: 'e.g. Why Diamond Platnumz is dominating showbiz', required: true },
      {
        name: 'format',
        label: 'Format / Length',
        type: 'select',
        options: [
          { value: 'Shorts / TikTok (45-60 seconds)', label: 'Shorts / TikTok (45-60s)' },
          { value: 'Quick Reel (30 seconds)', label: 'Quick Reel (30s)' },
          { value: 'YouTube Deep Dive (5-8 minutes)', label: 'YouTube Deep Dive (5-8 mins)' },
        ],
      },
      { name: 'tone', label: 'Tone', type: 'text', placeholder: 'e.g. Energetic, dramatic, humorous, educational' },
    ],
    promptTemplate: (v) =>
      `Nkorera script yuzuye ya video ivuga kuri: "${v.topic}". Format: ${v.format}. Imyandikire/Tone: ${v.tone || 'Energetic & engaging'}.\nIgende igabanyijemo:\n1. ⚡ Hook (Amasegonda 3 ya mbere - Amashusho + Amagambo)\n2. 🎬 Intro (Kwinjira mu ngingo)\n3. 💡 Main Body (Intambwe ku yindi ifite visual cues n'amagambo asomwa)\n4. 🎯 Call to Action (CTA ikangura abantu)\n5. 📝 Caption yiteguye gupostingwa\n6. 🏷️ Hashtags zikwiye.`,
  },
  {
    id: 'tiktok-hook',
    name: 'TikTok Hook Generator',
    nameRw: 'Guhanga Hooks za TikTok',
    nameSw: 'Jenereta ya Hooks za TikTok',
    description: 'Stop the scroll! 10 irresistible psychological hooks for your next short videos.',
    category: 'content',
    icon: 'Zap',
    fields: [
      { name: 'topic', label: 'Topic or Video Concept', type: 'text', placeholder: 'e.g. Mistakes upcoming artists make before releasing music', required: true },
      { name: 'style', label: 'Hook Style', type: 'select', options: [
        { value: 'Controversial / Curiosity gap', label: 'Controversial / Curiosity gap' },
        { value: 'Storytelling ("You won\'t believe...")', label: 'Storytelling' },
        { value: 'Direct warning ("Stop doing this")', label: 'Direct warning' },
        { value: 'Secret / Insider reveal', label: 'Secret / Insider reveal' },
      ]},
    ],
    promptTemplate: (v) =>
      `Mpa hooks 10 zikaze cyane (scroll-stopping hooks) nakoresha mu masegonda 3 ya mbere kuri TikTok/Reels zerekeye: "${v.topic}". Style: ${v.style}. Kuri buri hook, mpa amagambo avugwa (spoken hook) n'icyo umuntu agomba gukora cyangwa kwerekana kuri screen (visual action).`,
  },
  {
    id: 'caption-generator',
    name: 'Caption Generator',
    nameRw: 'Kwandika Captions Zikangura',
    nameSw: 'Kutengeneza Manukuu ya Kuvutia (Captions)',
    description: 'Compelling captions for Instagram, TikTok, and Facebook with emojis and question hooks.',
    category: 'content',
    icon: 'MessageSquare',
    fields: [
      { name: 'about', label: 'What is the post about?', type: 'textarea', placeholder: 'Describe your photo, video, or announcement', required: true },
      { name: 'platform', label: 'Platform', type: 'select', options: [
        { value: 'Instagram', label: 'Instagram' },
        { value: 'TikTok', label: 'TikTok' },
        { value: 'Facebook', label: 'Facebook' },
        { value: 'X / Twitter', label: 'X (Twitter)' },
      ]},
      { name: 'tone', label: 'Vibe / Tone', type: 'text', placeholder: 'e.g. Inspirational, funny, mysterious, hype' },
    ],
    promptTemplate: (v) =>
      `Nkorera uburyo 3 butandukanye bwa Captions nziza cyane (Options A, B, C) zo gukoresha kuri ${v.platform} kuri iyi post: "${v.about}". Vibe: ${v.tone || 'Exciting'}. Shishikariza abantu gutanga ibitekerezo (question at the end), ushyiremo emojis zikwiye, n'umurongo wa hashtags zigezweho.`,
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    nameRw: 'Gushaka Hashtags Zigezweho',
    nameSw: 'Jenereta ya Hashtags Zinazovuma',
    description: 'Optimized mix of high-volume, niche, and trending hashtags.',
    category: 'content',
    icon: 'Hash',
    fields: [
      { name: 'topic', label: 'Topic / Niche', type: 'text', placeholder: 'e.g. Kigali nightlife, Rwanda music, comedy sketch', required: true },
      { name: 'platform', label: 'Platform', type: 'select', options: [
        { value: 'Instagram', label: 'Instagram' },
        { value: 'TikTok', label: 'TikTok' },
        { value: 'YouTube Shorts', label: 'YouTube Shorts' },
      ]},
    ],
    promptTemplate: (v) =>
      `Nkusanyirize hashtags 25 zifite imbaraga zo kuzamura views kuri ${v.platform} zerekeye "${v.topic}". Zitegure mu byiciro 3: 1) Mega Viral tags (Views nyinshi), 2) Niche Community tags (Abantu b'umwimerere), 3) Regional / Local tags z'akarere kacu.`,
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar Generator',
    nameRw: 'Gukora Kalendari ya Content',
    nameSw: 'Ratiba ya Maudhui ya Mwezi Mzima',
    description: '30-day structured roadmap with daily themes, formats, and ready hooks.',
    category: 'content',
    icon: 'Calendar',
    fields: [
      { name: 'niche', label: 'Creator Niche', type: 'text', placeholder: 'e.g. Gospel musician, tech reviewer, comedic couple', required: true },
      { name: 'platform', label: 'Main Platform', type: 'text', placeholder: 'e.g. TikTok + YouTube Shorts' },
      { name: 'days', label: 'Duration', type: 'select', options: [
        { value: '30 Days (Full Month)', label: '30 Days (Full Month)' },
        { value: '14 Days (Fast Sprint)', label: '14 Days (Fast Sprint)' },
        { value: '7 Days (Weekly Launch)', label: '7 Days (Weekly Launch)' },
      ]},
    ],
    promptTemplate: (v) =>
      `Tegura Content Calendar irambuye ya ${v.days} kuri ${v.platform || 'Social Media'} mu cyiciro cya "${v.niche}". Kuri buri cyumweru (Week 1, Week 2...), tanga ingingo zo ku wa mbere kugeza ku cyumweru: Umutwe w'ingingo, format (Reel, Live, Carousel, Story), na Hook y'amatsiko izakoreshwa.`,
  },
  {
    id: 'song-ideas',
    name: 'Song Idea & Concept Generator',
    nameRw: 'Guhanga Igitekerezo cy\'Indirimbo',
    nameSw: 'Mawazo na Dhana za Nyimbo Mpya',
    description: 'Unique song themes, story angles, catchy titles, and emotional moodboards.',
    category: 'music',
    icon: 'Music',
    fields: [
      { name: 'genre', label: 'Music Genre', type: 'select', options: [
        { value: 'Afrobeat', label: 'Afrobeat' },
        { value: 'Amapiano', label: 'Amapiano' },
        { value: 'Afropop', label: 'Afropop' },
        { value: 'Bongo Flava', label: 'Bongo Flava' },
        { value: 'Hip-hop / Trap', label: 'Hip-hop / Trap' },
        { value: 'Gospel', label: 'Gospel' },
        { value: 'R&B / Soul', label: 'R&B / Soul' },
      ], required: true },
      { name: 'mood', label: 'Mood / Theme', type: 'text', placeholder: 'e.g. Heartbreak and bounce, gratitude, party anthem, hustle struggle', required: true },
      { name: 'language_preference', label: 'Song Language Mix', type: 'text', placeholder: 'e.g. Kinyarwanda & English, Kiswahili & French, Pidgin' },
    ],
    promptTemplate: (v) =>
      `Nkorera concepts 3 zikomeye z'indirimbo zo mu njyana ya ${v.genre} ifite umwuka wa "${v.mood}". Indimi zizakoreshwa: ${v.language_preference || 'Kinyarwanda / English'}. Kuri buri concept, mpa:\n- Amitwe 3 y'indirimbo (Song titles) akurura\n- Inkuru nyamukuru y'indirimbo (Storyline)\n- Melodic feel / BPM n'ibicurangisho bikwiriye\n- Urugero rwa refrain/chorus n'amagambo aririmbwa.`,
  },
  {
    id: 'lyrics-assistant',
    name: 'Lyrics Assistant',
    nameRw: 'Kwandika Amagambo y\'Indirimbo (Lyrics)',
    nameSw: 'Msaidizi wa Kuandika Mashairi (Lyrics)',
    description: 'Rhyme schemes, metaphors, catchy hooks, punchy verses, and bridges.',
    category: 'music',
    icon: 'Mic2',
    fields: [
      { name: 'topic', label: 'What is the song about?', type: 'text', placeholder: 'e.g. Celebrating victory after struggling for years', required: true },
      { name: 'style', label: 'Genre & Flow', type: 'text', placeholder: 'e.g. Catchy Afrobeat vibe with rhythmic flow' },
      { name: 'part', label: 'Song Part', type: 'select', options: [
        { value: 'Full Song (Intro + Verse 1 + Chorus + Verse 2 + Bridge + Outro)', label: 'Full Song' },
        { value: 'Addictive Chorus / Refrain only', label: 'Chorus only' },
        { value: 'Fire Verse 1 & 2', label: 'Verses 1 & 2' },
      ]},
    ],
    promptTemplate: (v) =>
      `Nkorera amagambo y'indirimbo (Lyrics) arikora: ${v.part}. Ingingo y'indirimbo: "${v.topic}". Injyana n'imyandikire: ${v.style || 'Modern African rhythm'}. Koresha imyandikire ifite rhymes nziza, amagambo akora ku mutima cyangwa ashyushya urubyiniro, n'injyana yoroshye kuririmba.`,
  },
  {
    id: 'comedy-generator',
    name: 'Comedy Generator',
    nameRw: 'Kwandika Comedy Sketches & Punchlines',
    nameSw: 'Kutengeneza Vichekesho (Comedy)',
    description: 'Hilarious sketches, character dialogues, relatable African scenarios, and punchlines.',
    category: 'comedy',
    icon: 'Smile',
    fields: [
      { name: 'scenario', label: 'Comedy Scenario', type: 'text', placeholder: 'e.g. When your African parent finds you doing a TikTok dance', required: true },
      { name: 'format', label: 'Format', type: 'select', options: [
        { value: 'Short TikTok skit (30-60 seconds, 1 person playing 2 roles)', label: 'TikTok skit (1 person multi-character)' },
        { value: 'Full 2-minute sketch with 2-3 actors', label: '2-Minute Sketch with actors' },
        { value: 'Stand-up comedy monologue', label: 'Stand-up monologue' },
      ]},
      { name: 'characters', label: 'Characters', type: 'text', placeholder: 'e.g. Strict Mother & Gen Z Son' },
    ],
    promptTemplate: (v) =>
      `Nkorera comedy sketch ishekeje cyane kuri iyi ngingo: "${v.scenario}". Format: ${v.format}. Characters: ${v.characters || 'Relatable everyday people'}.\nInyandiko igaragaze:\n- Setting (Aho biri kubera)\n- Imyambarire n'ibimenyetso bya buri mukinnyi\n- Dialogue yuzuye urwenya, ikibazo cy'ubucucu (comical conflict), n'umusozo usekeje bidasanzwe (killer punchline).`,
  },
  {
    id: 'artist-bio',
    name: 'Artist Bio Generator',
    nameRw: 'Kwandika Bio y\'Umuhanzi / Creator',
    nameSw: 'Kutengeneza Wasifu wa Msanii (Bio)',
    description: 'Professional bios for Spotify, Apple Music, Instagram, press kits, and booking agents.',
    category: 'showbiz',
    icon: 'UserCheck',
    fields: [
      { name: 'name', label: 'Artist / Creator Name', type: 'text', placeholder: 'e.g. Kivumbi King, Bruce Melodie, Zuchu, or your name', required: true },
      { name: 'genre_or_niche', label: 'Genre or Niche', type: 'text', placeholder: 'e.g. Afro-fusion Singer & Songwriter', required: true },
      { name: 'achievements', label: 'Key Milestones / Highlights', type: 'textarea', placeholder: 'e.g. Released debut EP, performed at major festival, over 1M streams' },
      { name: 'target', label: 'Bio Usage', type: 'select', options: [
        { value: 'Spotify & Apple Music Streaming Bio', label: 'Spotify & Apple Music' },
        { value: 'Instagram & TikTok Bio (Punchy, under 150 chars)', label: 'Social Media Profile Bio' },
        { value: 'Full Electronic Press Kit (EPK) Bio for Media & Promoters', label: 'Full Press Kit (EPK)' },
      ]},
    ],
    promptTemplate: (v) =>
      `Nkorera professional bio y'umuhanzi/creator witwa "${v.name}". Icyiciro: "${v.genre_or_niche}". Ibyo amaze kugeraho/umwihariko we: "${v.achievements || 'Emerging talent'}" ikwiranye na: ${v.target}. Inyandiko igomba kugaragaza ubuhanga, gukurura abaterankunga n'itangazamakuru, no gutuma abafana bifuza kumva ibikorwa bye.`,
  },
  {
    id: 'youtube-title',
    name: 'YouTube Title Generator',
    nameRw: 'Guhanga Imitwe ya Video za YouTube',
    nameSw: 'Jenereta ya Vichwa vya Video za YouTube',
    description: 'High-CTR, curiosity-driven titles that beat the algorithm without sounding spammy.',
    category: 'content',
    icon: 'Tv',
    fields: [
      { name: 'topic', label: 'What is your video about?', type: 'text', placeholder: 'e.g. I lived in Kigali for 30 days on $10 a day', required: true },
      { name: 'target_CTR', label: 'Style', type: 'select', options: [
        { value: 'High Curiosity & Mystery', label: 'High Curiosity & Mystery' },
        { value: 'Numbers & Ultimate Guide', label: 'Numbers & Ultimate Guide' },
        { value: 'Dramatic / Story Driven', label: 'Dramatic / Story Driven' },
        { value: 'Search SEO Optimized', label: 'Search SEO Optimized' },
      ]},
    ],
    promptTemplate: (v) =>
      `Mpa imitwe 10 ya video ya YouTube ifite Click-Through Rate (CTR) yo hejuru cyane kuri iyi ngingo: "${v.topic}". Style: ${v.target_CTR}. Kuri buri mutwe, garagaza impamvu umuntu yakanda (click psychology).`,
  },
  {
    id: 'thumbnail-idea',
    name: 'Thumbnail Idea Generator',
    nameRw: 'Guhanga Igitekerezo cya Thumbnail',
    nameSw: 'Mawazo ya Picha ya Mbele (Thumbnail)',
    description: 'Visual layout, facial expression, text overlay, and background color suggestions.',
    category: 'content',
    icon: 'Image',
    fields: [
      { name: 'title', label: 'Video Title or Concept', type: 'text', placeholder: 'e.g. Why young African musicians are dominating global charts', required: true },
    ],
    promptTemplate: (v) =>
      `Nkorera ibitekerezo 4 bya Thumbnail (Thumbnail Concepts) bikurura amaso bidasanzwe kuri video: "${v.title}". Kuri buri gitekerezo tanga:\n- Ishusho nyamukuru (Main Subject & Facial Expression)\n- Amabara y'inyuma (Background Colors & Contrast)\n- Amagambo make ari kuri thumbnail (Max 3-4 powerful words)\n- Ikintu cy'amatsiko gituma umuntu adashobora kurenza amaso.`,
  },
  {
    id: 'brand-pitch',
    name: 'Brand Collaboration Proposal',
    nameRw: 'Kwandika Ibaruwa yo Gushaka Abaterankunga (Sponsorship)',
    nameSw: 'Pendekezo la Ushirikiano na Wafadhili (Brand Pitch)',
    description: 'Professional pitch emails to brands, agencies, and sponsors for influencer deals.',
    category: 'showbiz',
    icon: 'Briefcase',
    fields: [
      { name: 'creator', label: 'Your Creator / Channel Name', type: 'text', placeholder: 'e.g. Kigali Vibes Show', required: true },
      { name: 'brand', label: 'Target Brand / Company', type: 'text', placeholder: 'e.g. MTN, Airtel, Nike, local fashion brand', required: true },
      { name: 'niche_stats', label: 'Your Niche & Stats', type: 'text', placeholder: 'e.g. 50K followers, 100K monthly views, 70% East African youth' },
      { name: 'pitch_idea', label: 'What do you offer the brand?', type: 'text', placeholder: 'e.g. 3 integrated TikTok sketches + 1 YouTube review' },
    ],
    promptTemplate: (v) =>
      `Nkorera proposal/email ya kinyamwuga (Brand Collaboration Pitch) yo kohereza kuri kompanyi ya "${v.brand}" kugira ngo ikorane na "${v.creator}". Imibare yacu: "${v.niche_stats}". Igitekerezo cy'imikoranire: "${v.pitch_idea}". Ibaruwa igomba kuba ngufi, yumvikanisha inyungu kompanyi izakuramo (ROI), ifite icyubahiro kandi yerekana agaciro k'ibyo dukora.`,
  },
  {
    id: 'press-release',
    name: 'Press Release Generator',
    nameRw: 'Kwandika Itangazo ry\'Itangazamakuru (Press Release)',
    nameSw: 'Kutengeneza Taarifa kwa Vyombo vya Habari (Press Release)',
    description: 'Format news, new singles, album launches, concerts, and career announcements for media.',
    category: 'showbiz',
    icon: 'FileText',
    fields: [
      { name: 'announcement', label: 'What is being announced?', type: 'text', placeholder: 'e.g. Release of new Afrobeat single "Kigali Nights" featuring guest star', required: true },
      { name: 'artist', label: 'Artist or Event Name', type: 'text', placeholder: 'e.g. Bruce Melodie / CCS Entertainment', required: true },
      { name: 'date', label: 'Release / Event Date', type: 'text', placeholder: 'e.g. Friday, October 15, 2026' },
      { name: 'quote', label: 'Key Message / Artist Quote', type: 'textarea', placeholder: 'What did the artist say about this project?' },
    ],
    promptTemplate: (v) =>
      `Nkorera Itangazo ry'Itangazamakuru (Official Media Press Release) ryanditswe mu buryo bwa kinyamwuga bwa showbiz: "${v.announcement}" na "${v.artist}". Itariki: ${v.date || 'Soon'}. Ibikubiyemo/Quotes: "${v.quote || 'Exciting new musical chapter'}". Inyandiko igire: Umutwe ukangura abanyamakuru, FOR IMMEDIATE RELEASE, Paragraphe ya mbere ifite amakuru yose (5 Ws), amagambo y'umuhanzi (quotes), uburyo bwo kubona indirimbo/ibikorwa, na Media Contact info.`,
  },
  {
    id: 'interview-questions',
    name: 'Interview Question Generator',
    nameRw: 'Gutegura Ibibazo by\'Ikiganiro n\'Umuhanzi',
    nameSw: 'Maswali ya Mahojiano ya Wasanii (Interview)',
    description: 'Engaging, thoughtful questions for podcasts, TV, YouTube interviews, and radio shows.',
    category: 'showbiz',
    icon: 'HelpCircle',
    fields: [
      { name: 'guest', label: 'Guest Name & Role', type: 'text', placeholder: 'e.g. Meddy (R&B Singer), Comedian, Film Director', required: true },
      { name: 'focus', label: 'Topic or Angle', type: 'text', placeholder: 'e.g. His journey from Rwanda to international stardom, new album' },
      { name: 'vibe', label: 'Show Vibe', type: 'select', options: [
        { value: 'Fun, spontaneous & games', label: 'Fun & spontaneous' },
        { value: 'Deep, emotional & personal journey', label: 'Deep & personal' },
        { value: 'Industry masterclass & music business', label: 'Industry & business' },
      ]},
    ],
    promptTemplate: (v) =>
      `Tegura urutonde rw'ibibazo 12 byiza cyane (12 captivating interview questions) byo kubaza umutumirwa: "${v.guest}". Ingingo nyamukuru: "${v.focus}". Umwuka w'ikiganiro: ${v.vibe}. Gabanya ibibazo mu bice: 1) Icebreakers (Gutangiza ikiganiro neza), 2) Ingingo nyamukuru (Story & music journey), 3) Amabanga n'imbogamizi (Real talk), 4) Quickfire / Rapid questions zo gusetsa.`,
  },
  {
    id: 'podcast-generator',
    name: 'Podcast Episode Planner',
    nameRw: 'Gutegura Episode ya Podcast',
    nameSw: 'Kupanga Kipindi cha Podcast',
    description: 'Episode outlines, conversation hooks, sponsor placement cues, and listener interaction topics.',
    category: 'content',
    icon: 'Radio',
    fields: [
      { name: 'topic', label: 'Podcast Topic', type: 'text', placeholder: 'e.g. Can African entertainment conquer the global mainstream without compromising culture?', required: true },
      { name: 'duration', label: 'Target Duration', type: 'select', options: [
        { value: '20-30 minutes (Bite-sized discussion)', label: '20-30 mins' },
        { value: '45-60 minutes (Standard deep-dive)', label: '45-60 mins' },
      ]},
      { name: 'co_hosts', label: 'Solo or With Guest/Co-host', type: 'text', placeholder: 'e.g. 2 co-hosts debating' },
    ],
    promptTemplate: (v) =>
      `Nkorera gahunda irambuye (Run of Show / Episode Outline) y'ikiganiro cya Podcast cyerekeye: "${v.topic}". Igihe: ${v.duration}. Abavuga: ${v.co_hosts || 'Host & Guests'}.\nTegura:\n- Cold Open Hook (Ikinyamakuru kibanza cyo gutuma batiyaka)\n- Intro & Sponsor read spot\n- Inguni 3 z'ibiganiro n'ibibazo byo guterana amagambo cyangwa kuganiraho\n- Listener dilemma / interactive segment\n- Outro & Call to Action.`,
  },
  {
    id: 'film-screenplay',
    name: 'Film & Series Scene Script',
    nameRw: 'Kwandika Scene ya Filime / Series',
    nameSw: 'Kutengeneza Scene ya Filamu na Tamthilia',
    description: 'Professional script formatting: sluglines, action description, character dialogue, and dramatic beats.',
    category: 'films',
    icon: 'Film',
    fields: [
      { name: 'scene_setting', label: 'Scene Setting (Where & When)', type: 'text', placeholder: 'e.g. INT. LIVING ROOM - NIGHT, EXT. KIGALI STREET - RAINY DAY', required: true },
      { name: 'characters', label: 'Characters Involved', type: 'text', placeholder: 'e.g. Eric (30, undercover investigator) and Sonia (28, suspicious executive)', required: true },
      { name: 'conflict', label: 'Dramatic Conflict or Secret', type: 'textarea', placeholder: 'e.g. Eric discovers that Sonia has been hiding the missing evidence all along', required: true },
      { name: 'mood', label: 'Genre / Atmosphere', type: 'select', options: [
        { value: 'Suspenseful Thriller & Drama', label: 'Suspense & Drama' },
        { value: 'Emotional & Heartbreaking', label: 'Emotional & Heartbreaking' },
        { value: 'Romantic Tension', label: 'Romantic Tension' },
        { value: 'High Action & High Stakes', label: 'Action & High Stakes' },
      ]},
    ],
    promptTemplate: (v) =>
      `Nkorera script ya kinyamwuga ya scene ya filime/series (Professional Screenplay Scene) yanditse mu buryo bwa standard cinema formatting:\n- Slugline: ${v.scene_setting}\n- Abakinnyi: ${v.characters}\n- Ikibazo/Conflict: "${v.conflict}"\n- Umwuka/Genre: ${v.mood}\n\nInyandiko igire:\n1. SCENE HEADING (INT/EXT, LOCATION, TIME)\n2. ACTION & SCENE DESCRIPTION (Amashusho y\'ahabera igikorwa n\'ibimenyetso by\'abakinnyi mbere yo kuvuga)\n3. DIALOGUE yuzuye amarangamutima (subtext, parentheticals, n\'amagambo y\'abakinnyi)\n4. DRAMATIC PEAK (Aho ikibazo gikaza umurego)\n5. CLIFFHANGER / TRANSITION (Uburyo scene irangira itera amatsiko yo kureba ikirikurikiraho).`,
  },
  {
    id: 'film-concept',
    name: 'Movie & Web Series Concept',
    nameRw: 'Guhanga Inkuru ya Filime cyangwa Web Series',
    nameSw: 'Kutengeneza Dhana ya Filamu au Web Series',
    description: 'Logline, character bible, episode cliffhangers, and plot twists for African & international cinema.',
    category: 'films',
    icon: 'Clapperboard',
    fields: [
      { name: 'title_or_theme', label: 'Story Idea or Working Title', type: 'text', placeholder: 'e.g. The Kigali Heist, Secret Family Legacy, Campus Hustle', required: true },
      { name: 'format', label: 'Format', type: 'select', options: [
        { value: 'YouTube Web Series (10-15 min episodes)', label: 'YouTube Web Series' },
        { value: 'Feature Film (90-120 minutes)', label: 'Feature Film' },
        { value: 'Short Film for Festivals (15 minutes)', label: 'Short Film (Festival)' },
        { value: 'TV Drama Series (24 episodes)', label: 'TV Drama Series' },
      ]},
      { name: 'target_audience', label: 'Target Audience & Tone', type: 'text', placeholder: 'e.g. Rwandan youth & East African diaspora, gritty realistic tone' },
    ],
    promptTemplate: (v) =>
      `Nkorera pitch concept yuzuye ya Filime / Series y\'agashya (Film Story Bible & Pitch Deck):\n- Working Title / Umutwe: "${v.title_or_theme}"\n- Format: ${v.format}\n- Audience & Tone: ${v.target_audience || 'Modern African Cinema'}\n\nTegura:\n1. 🎬 LOGLINE (Umurongo 1 usobanura inkuru mu buryo bukurura)\n2. 📖 SYNOPSIS (Incamake y\'inkuru n\'icyo igeraho)\n3. 👥 MAIN CHARACTERS (Abakinnyi 3 b\'ingenzi n\'inzitizi zabo)\n4. 🌀 MAJOR PLOT TWISTS (Ibibazo bitunguranye bituma abantu badasinzira)\n5. 📺 EPISODE ROADMAP cyangwa 3-ACT STRUCTURE ifite cliffhangers zikaze.`,
  },
  {
    id: 'actor-monologue',
    name: 'Actor Monologue & Audition Script',
    nameRw: 'Kwandika Monologue y\'Umukinnyi (Auditions)',
    nameSw: 'Kutengeneza Monologue ya Muigizaji (Audition)',
    description: 'Showcase emotional depth, vocal range, and acting prowess for casting calls and director auditions.',
    category: 'films',
    icon: 'Drama',
    fields: [
      { name: 'character_profile', label: 'Character Age & Background', type: 'text', placeholder: 'e.g. 25-year-old ambitious music manager confronting a betrayal', required: true },
      { name: 'emotion', label: 'Primary Emotion to Showcase', type: 'select', options: [
        { value: 'Suppressed Rage exploding into tears', label: 'Suppressed Rage to Tears' },
        { value: 'Deep Betrayal and Heartbreak', label: 'Deep Betrayal & Heartbreak' },
        { value: 'Courageous Defiance against injustice', label: 'Courageous Defiance' },
        { value: 'Comical / Sarcastic Desperation', label: 'Sarcastic Desperation' },
      ]},
      { name: 'duration', label: 'Duration', type: 'select', options: [
        { value: '60 Seconds (Standard Fast Audition)', label: '60 Seconds (Fast Audition)' },
        { value: '90-120 Seconds (Dramatic Showcase)', label: '90-120 Seconds (Showcase)' },
      ]},
    ],
    promptTemplate: (v) =>
      `Nkorera Monologue ikaze cyane (Audition Monologue) y\'umukinnyi wa filime:\n- Character: ${v.character_profile}\n- Marangamutima/Emotion: ${v.emotion}\n- Igihe: ${v.duration}\n\nInyandiko igire:\n1. Character Context (Ibyabaye mbere y\'uko uyu mukinnyi atangira kuvuga)\n2. Spoken Monologue (Amagambo asohoka mu kanwa afite pauses, breathing cues, n\'imihindagurikire y\'ijwi)\n3. Director\'s Acting Notes (Inama z\'uburyo umukinnyi yitwara imbere ya camera ngo atangaze abakora casting).`,
  },
];
