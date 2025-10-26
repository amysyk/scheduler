# Scheduling Assistant - Phase 2

A chat-based scheduling assistant powered by Claude AI to help coordinate family schedules and activities.

## Overview

This is Phase 2 of the Scheduling Assistant project - a chat interface that integrates with Notion to provide schedule information. The app fetches the kids' schedule from Notion and uses it as context for Claude's responses.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Data Source**: Notion API
- **Deployment**: Vercel

## Features (Phase 2)

- ✅ Clean chat interface optimized for mobile devices
- ✅ Direct integration with Claude API (non-streaming)
- ✅ **Notion API integration** - fetches schedule data in real-time
- ✅ **Schedule-aware responses** - Claude has context about kids' activities
- ✅ **No caching** - schedule changes propagate immediately
- ✅ Simple logging with `console.log()`
- ✅ Both user and app messages left-aligned with visual distinction
- ✅ Loading states and error handling

## Setup

### Prerequisites

- Node.js 18+ installed
- Anthropic API key (get one at https://console.anthropic.com/)
- Notion API key (create an integration at https://www.notion.so/my-integrations)
- Access to the Notion schedule page

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

Edit `.env.local` and add your API keys:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
NOTION_API_KEY=your_notion_api_key_here
NOTION_SCHEDULE_PAGE_ID=279ac3a712f38019a4aac672d92c1e01
```

**To get your Notion API key:**
1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Give it a name (e.g., "Scheduling Assistant")
4. Select the workspace containing your schedule
5. Copy the "Internal Integration Token"
6. Go to your Notion schedule page and click "•••" → "Add connections" → Select your integration

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
- Add `ANTHROPIC_API_KEY` with your Anthropic API key
- Add `NOTION_API_KEY` with your Notion API key
- Add `NOTION_SCHEDULE_PAGE_ID` with value `279ac3a712f38019a4aac672d92c1e01`
- Set all for Production, Preview, and Development environments

4. **Redeploy**

After setting the environment variable, trigger a new deployment.

## Project Structure

```
scheduler/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint for Claude + Notion
│   ├── components/
│   │   ├── UserMessage.tsx       # User message component
│   │   └── AssistantMessage.tsx  # App message component
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── lib/
│   └── notion.ts                 # Notion API utilities
├── prompts/
│   └── scheduling-assistant.md   # System prompt for Claude
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment variables (git-ignored)
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Usage

1. Open the app in your browser
2. Type a question about the kids' schedule (e.g., "Does Nina have swim practice tomorrow?")
3. Press Enter or click Send
4. The app will:
   - Fetch the latest schedule from Notion
   - Send your question with schedule context to Claude
   - Display Claude's answer based on the current schedule

**Example questions:**
- "What does Marco have this weekend?"
- "When is Nina's next theater rehearsal?"
- "Are there any conflicts on Saturday?"

## Logging

All interactions are logged to the console using `console.log()`. In production (Vercel), these logs can be viewed in the Vercel dashboard under the "Logs" tab.

Logged information includes:
- User name ("app user" for Phase 2)
- User questions
- Claude responses
- Notion API calls (success/failure)

## What's Next?

Phase 2 is complete! Future phases will include:
- Phase 3: Google OAuth authentication
- Phase 4: User permissions system (read/write)
- Phase 5: Memory feature to update schedule in Notion

## Troubleshooting

### "Failed to get response" error
- Check that your `ANTHROPIC_API_KEY` is set correctly in `.env.local` (local) or Vercel environment variables (production)
- Verify your API key is valid at https://console.anthropic.com/

### "Couldn't load the schedule" error
- Check that your `NOTION_API_KEY` is set correctly
- Verify your Notion integration has access to the schedule page
- Make sure `NOTION_SCHEDULE_PAGE_ID` is correct
- Check that you've shared the Notion page with your integration

### Styles not loading
- Make sure Tailwind CSS is properly configured
- Try clearing `.next` cache: `rm -rf .next` and restart dev server

### Port already in use
- Change the port: `npm run dev -- -p 3001`

## License

Private project for family use.
