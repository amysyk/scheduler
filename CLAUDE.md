# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Scheduling Assistant** - a family coordination app for managing schedules, activities, and appointments. The project is built in phases:

- **Phase 1 (Current)**: Basic chat interface with Claude API integration
- **Future Phases**: Notion API integration, Google OAuth, user permissions, and memory features

**Key Users**: Three adults (parents + nanny) and two children in an extended household.

**Success Criteria**: Daily usage by adults, 99% accuracy, quick updates via natural language.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev                    # Starts on http://localhost:3000

# Build for production
npm build

# Lint code
npm run lint

# Deploy to Vercel
vercel --prod --yes
```

## Environment Variables

Required for both local and production:

- `ANTHROPIC_API_KEY`: API key from https://console.anthropic.com/
  - Local: Set in `.env.local`
  - Production: Set in Vercel dashboard → Settings → Environment Variables

## Architecture

### Tech Stack
- **Framework**: Next.js 14 App Router (TypeScript)
- **Styling**: Tailwind CSS (mobile-first design)
- **AI**: Anthropic Claude API (non-streaming, claude-3-5-sonnet-20241022)
- **Deployment**: Vercel serverless functions

### Key Files

**`app/api/chat/route.ts`**
- Serverless API endpoint that proxies requests to Claude API
- Accepts POST with `{ message: string }`
- Returns `{ message: string }` with Claude's response
- No conversation history - each request is stateless
- Logs all requests/responses with `console.log()`

**`app/page.tsx`**
- Client-side chat interface ("use client")
- Manages message history in React state (not persisted)
- Messages are left-aligned; user and assistant messages are visually distinct
- Auto-scrolls to latest message on updates

**`app/components/UserMessage.tsx` & `AssistantMessage.tsx`**
- Presentational components for rendering messages
- Both left-aligned, differentiated by background color (white vs blue)

### Design Constraints

- All users assumed to be in Pacific timezone
- Mobile-first responsive design (primarily iPhone users)
- No conversation persistence between sessions
- Simple console.log() based logging (view in Vercel dashboard)
- Non-streaming API calls for simplicity
- No rate limit handling (assumed not to hit limits)

### UI Specifications

- Use "app" branding (not "Claude")
- Input placeholder: "Reply to app"
- No copy/vote/retry buttons
- No LLM version display
- No navigation/configuration buttons
- Messages: white background for user, blue background for app

## Future Development Notes

**Upcoming phases require**:
- Notion API integration for reading/updating schedule data
- Google OAuth for user authentication
- User permissions config file (read/write roles)
- Memory system to update Notion page with new information
- Pacific timezone handling for date/time parsing

**Notion integration will**:
- Read from specific Notion page with schedule information
- Update schedule by appending bullet points to the Notion document
- Use Notion MCP server tools similar to the prototype

When adding features, maintain the simple logging approach and mobile-first design.
