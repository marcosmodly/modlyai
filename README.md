# Furniture AI Website

An AI-powered furniture recommendation and customization platform with earthy-toned design.

## Prerequisites

You need Node.js installed on your system. If `node` or `npm` commands don't work:

1. **Download and install Node.js** from https://nodejs.org (choose LTS version)
2. **Restart your terminal/PowerShell** after installation
3. **Verify installation** by running:
   ```powershell
   node -v
   npm -v
   ```
   Both should show version numbers.

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file in the root directory with:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   OPENAI_CHAT_MODEL=gpt-4o-mini          # For chat, preferences, filtering
   OPENAI_VISION_MODEL=gpt-4o              # For image understanding (room analysis)
   OPENAI_IMAGE_MODEL=dall-e-3            # For material rendering (optional)
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Features

- **Room Planner**: Upload room photos, provide dimensions, get AI recommendations (uses GPT-4o for image understanding)
- **Furniture Customizer**: Customize furniture with AI assistance (colors, materials, dimensions) with optional DALL-E 3 material previews
- **Catalog**: Browse furniture catalog with AI-powered recommendations
- **AI Chat Widget**: Conversational AI assistant for furniture selection (uses GPT-4o-mini for cost-effective chat)

## AI Model Architecture

The application uses different OpenAI models optimized for specific tasks:

- **GPT-4o-mini**: Chat conversations, user preferences, filtering, and configuration assistance
- **GPT-4o**: Image understanding and analysis (room photos, furniture recommendations)
- **DALL-E 3**: Material change rendering and furniture preview generation (optional)
- **Three.js**: Live 3D preview of customized furniture (already integrated)

## Project Structure

- `src/app/` - Next.js pages and API routes
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions
- `tailwind.config.ts` - Earthy color theme configuration

## Deployment

For deploying to Vercel, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

**Quick Vercel Setup:**
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY` (required for pilot request form)
   - `PILOT_TO_EMAIL` (required for pilot request form)
3. Deploy!

See [.env.example](./.env.example) for all available environment variables.

## Troubleshooting

**"npm is not recognized"**:
- Make sure Node.js is installed
- Restart your PowerShell/terminal window
- Check if Node.js is in your PATH (run `$env:PATH` in PowerShell to see)

**"Site can't be reached"**:
- Make sure `npm run dev` is running without errors
- Check that it says "Ready" and shows `http://localhost:3000`
- Try `http://127.0.0.1:3000` instead
