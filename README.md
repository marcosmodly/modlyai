# ModlyAI — Furniture AI

AI-powered furniture recommendation and customization platform with an earthy-toned design. Upload a photo of your room, get catalog-matched furniture suggestions, customize colors and materials with AI, and preview it all in 3D before you buy.

**Live:** https://modlyai.tech

## Features

- **Room Planner** — upload room photos and get catalog-based furniture and customization suggestions
- **Furniture Customizer** — adjust colors, materials, and dimensions with AI assistance, with optional DALL-E 3 material previews
- **Catalog** — browse the furniture catalog with AI-powered recommendations
- **AI Chat Widget** — a conversational assistant for furniture selection
- **Live 3D preview** of customized furniture via Three.js

## Stack

- Next.js + TypeScript + Tailwind
- OpenAI: `gpt-4o-mini` for chat/filtering, `gpt-4o` for room photo understanding, `dall-e-3` for material previews
- InstantDB for data
- Three.js for 3D preview
- Vercel for hosting

## Running it locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` with:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   OPENAI_CHAT_MODEL=gpt-4o-mini
   OPENAI_VISION_MODEL=gpt-4o
   OPENAI_IMAGE_MODEL=dall-e-3
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

See [.env.example](./.env.example) for the full list of environment variables, and [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for deployment notes.

## Project structure

- `src/app/` — Next.js pages and API routes
- `src/components/` — reusable React components
- `src/types/` — TypeScript type definitions
- `tailwind.config.ts` — earthy color theme configuration
