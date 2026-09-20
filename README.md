# ContentCreatorSkills (CCS) 🎬🎵🎤

**Your AI Creative Partner for Content Creators, Musicians, Comedians & Showbiz**

ContentCreatorSkills is a specialized, ChatGPT-style AI web application designed specifically for content creators, artists, musicians, comedians, influencers, YouTubers, TikTokers, podcasters, actors, presenters, and entertainment professionals.

It understands and writes natively in **Kinyarwanda**, **English**, **Kiswahili**, and mixed-language vernacular.

---

## 🌟 Key Features

1. **ChatGPT-Inspired Creator Experience**:
   - Left collapsible sidebar with search, conversation management, renaming, and deletion.
   - Beautiful Markdown formatting supporting headings, lists, tables, quotes, and code blocks.
   - Message bubble actions: Copy with feedback, Regenerate, and Like/Dislike reaction controls.
   - Voice speech-to-text dictation (Web Speech API) & file attachment brief simulation.
   - Stop generating button with instant cancellation.

2. **Multilingual Fluency**:
   - **Kinyarwanda (🇷🇼)**: "Mpa ideas 10 za TikTok videos", "Nkorera lyrics z'indirimbo ya Afrobeat", "Nkorera script ya YouTube".
   - **Kiswahili (🇹🇿/🇰🇪)**: "Nipe mawazo ya video za TikTok", "Nitungie mashairi ya Bongo Flava".
   - **English (🇬🇧/🇺🇸)**: High-impact video scripts, brand collaboration proposals, Spotify bios.
   - **Mixed Vernacular**: Seamlessly understands street slang and mixed linguistic tones.

3. **16 Specialized Content Creator AI Generators**:
   - **Content Idea Generator** (Platform, niche, audience & goal-based)
   - **Video Script Generator** (Hook, visual cues, scene-by-scene, CTA, caption, hashtags)
   - **TikTok Hook Generator** (10 high-CTR psychological scroll-stoppers)
   - **Caption Generator** & **Hashtag Generator** (Tiered viral, niche & regional tags)
   - **Content Calendar Generator** (30-day roadmap with weekly themes & formats)
   - **Song Idea & Concept Generator** (Afrobeat, Amapiano, Gospel, Bongo Flava, Hip-hop)
   - **Lyrics Assistant** (Hooks, catchy choruses, verses, rhyme schemes)
   - **Comedy Generator** (Skits, character dialogues, relatable African humor & punchlines)
   - **Artist Bio Generator** (Spotify/Apple Music streaming bio, social bio, EPK)
   - **YouTube Title Generator** & **Thumbnail Idea Generator**
   - **Brand Collaboration Proposal Generator** (Sponsorship pitch emails)
   - **Press Release Generator** (Media announcements & album/single releases)
   - **Interview Question Generator** (Podcast, radio, and TV shows)
   - **Podcast Episode Planner** (Run of show & discussion angles)

4. **Creator Personalization**:
   - Configure your creator name, stage name, primary niche, main platform, target audience, country, and preferred content style. The AI automatically tailors all subsequent recommendations.

5. **Free-First Architecture & Local Persistence**:
   - Zero required paid databases or third-party paid subscriptions.
   - Local browser storage for chat histories with complete JSON & Markdown export support.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/your-username/ContentCreatorSkills.git
cd ContentCreatorSkills
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Inside `.env`, configure your Gemini API Key:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```
> **How to get a Gemini API Key**:
> 1. Visit [Google AI Studio](https://aistudio.google.com/)
> 2. Click **Get API Key** and create a free key.
> 3. Paste it as `GEMINI_API_KEY` in `.env`.

### 4. Run Locally
Run the development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📦 Building for Production

To build the client-side SPA and server bundle:
```bash
npm run build
```
To run the production server:
```bash
npm run start
```

---

## 🌐 Deploying for Free on Netlify

ContentCreatorSkills is architected for free-tier deployment on [Netlify](https://www.netlify.com/).

### Option A: Deploy via Netlify CLI
1. Install the Netlify CLI if you haven't already:
   ```bash
   npm install -g netlify-cli
   ```
2. Link or initialize your project:
   ```bash
   netlify init
   ```
3. Set your environment variable:
   ```bash
   netlify env:set GEMINI_API_KEY "your-gemini-api-key-here"
   ```
4. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Option B: Deploy via Netlify Dashboard (Git Push)
1. Push your repository to GitHub or GitLab.
2. In the Netlify Dashboard, click **Add new site** > **Import an existing project**.
3. Choose your repository.
4. Netlify will automatically detect `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
5. Go to **Site settings** > **Environment variables** > **Add a variable**:
   - Key: `GEMINI_API_KEY`
   - Value: `your-gemini-api-key-here`
6. Click **Deploy site**.

The included `netlify.toml` automatically proxies all `/api/*` requests to the serverless Netlify function in `netlify/functions/chat.ts`, so the app functions identically in the cloud without requiring a paid server.

---

## 🔧 Troubleshooting Common Problems

| Problem | Cause | Solution |
|---|---|---|
| `"GEMINI_API_KEY is not configured"` | Missing API key in environment variables | Add `GEMINI_API_KEY` to your `.env` locally or in Netlify Site Settings > Environment variables. |
| `"You appear to be offline"` | Network connection lost | Verify your device's internet connection. |
| Microphone button not working | Browser permissions or unsupported browser | Ensure your browser has granted microphone permission. Chrome, Edge, and Safari support the Web Speech API. |
| 404 on page refresh on Netlify | SPA routing redirect missing | The included `netlify.toml` contains `[[redirects]] from = "/*" to = "/index.html"` which handles client-side routing. |

---

## 🛡️ Security & Privacy
- **API Key Safety**: The Gemini API key is never exposed to the client browser. All generation requests are proxied securely through server-side endpoints (`/api/chat` on Express or `netlify/functions/chat.ts` on Netlify).
- **Client Privacy**: Chat histories remain stored on the creator's device inside `localStorage` unless exported.

---

## 📄 License
MIT License. Created for content creators, artists, and the showbiz entertainment industry worldwide.
