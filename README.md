# Scheduling Assistant - Phase 1

A chat-based scheduling assistant powered by Claude AI to help coordinate family schedules and activities.

## Overview

This is Phase 1 of the Scheduling Assistant project - a simple chat interface that passes questions and answers between users and Claude API. This phase does NOT include Notion integration, authentication, or memory features.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Deployment**: Vercel

## Features (Phase 1)

- ✅ Clean chat interface optimized for mobile devices
- ✅ Direct integration with Claude API (non-streaming)
- ✅ Simple logging with `console.log()`
- ✅ Both user and app messages left-aligned with visual distinction
- ✅ Loading states and error handling

## Setup

### Prerequisites

- Node.js 18+ installed
- Anthropic API key (get one at https://console.anthropic.com/)

### Local Development

1. **Clone the repository** (or navigate to the project directory)

```bash
cd scheduler
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Initial Setup

1. **Install Vercel CLI** (optional, but recommended)

```bash
npm install -g vercel
```

2. **Deploy to Vercel**

```bash
vercel
```

Or push to GitHub and connect the repository to Vercel via the Vercel dashboard.

3. **Set Environment Variables in Vercel**

In the Vercel dashboard:
- Go to your project settings
- Navigate to "Environment Variables"
- Add `ANTHROPIC_API_KEY` with your API key
- Set it for Production, Preview, and Development environments

4. **Redeploy**

After setting the environment variable, trigger a new deployment.

## Project Structure

```
scheduler/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint for Claude
│   ├── components/
│   │   ├── UserMessage.tsx       # User message component
│   │   └── AssistantMessage.tsx  # App message component
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment variables (git-ignored)
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Usage

1. Open the app in your browser
2. Type a message in the input field
3. Press Enter or click Send
4. The app will send your message to Claude and display the response

## Logging

All interactions are logged to the console using `console.log()`. In production (Vercel), these logs can be viewed in the Vercel dashboard under the "Logs" tab.

## What's Next?

Phase 1 is complete! Future phases will include:
- Phase 2: Notion API integration to read schedule data
- Phase 3: Google OAuth authentication
- Phase 4: User permissions system
- Phase 5: Memory feature to update schedule in Notion

## Troubleshooting

### "Failed to get response" error
- Check that your `ANTHROPIC_API_KEY` is set correctly in `.env.local` (local) or Vercel environment variables (production)
- Verify your API key is valid at https://console.anthropic.com/

### Styles not loading
- Make sure Tailwind CSS is properly configured
- Try clearing `.next` cache: `rm -rf .next` and restart dev server

### Port already in use
- Change the port: `npm run dev -- -p 3001`

## License

Private project for family use.
