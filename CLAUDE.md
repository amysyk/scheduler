# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Scheduling Assistant** - a family coordination app for managing schedules, activities, and appointments. The project is built in phases:

- **Phase 1**: Basic chat interface with Claude API integration
- **Phase 2 (Current)**: Schedule context stored as local markdown file
- **Future Phases**: Google OAuth, user permissions, and memory features

**Key Users**: Three adults (parents + nanny) and two children in a household.

**Success Criteria**: Daily usage by adults, 99% accuracy, quick updates via natural language.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev                    # Starts on http://localhost:3000

# Build for production
npm run build

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
- **AI**: Anthropic Claude API (non-streaming, claude-sonnet-4-5-20250929)
- **Data Storage**: Local markdown file (version controlled)
- **Deployment**: Vercel serverless functions
- **Analytics**: Vercel Analytics (page views) and Speed Insights (Core Web Vitals)
- **Markdown Rendering**: react-markdown with remark-gfm (GitHub Flavored Markdown) and rehype-highlight (code syntax highlighting)

### Key Files

**`app/api/chat/route.ts`**
- Serverless API endpoint that proxies requests to Claude API
- Reads schedule from `data/schedule.md` and system prompt from `prompts/scheduling-assistant.md`
- **Dynamically injects current date** in Pacific timezone into system prompt on every request
- Accepts POST with `{ message: string }`
- Returns `{ message: string }` with Claude's response
- No conversation history - each request is stateless
- Logs all requests/responses with `console.log()`

**`data/schedule.md`**
- Contains kids' schedule data (Nina and Marco's activities)
- Version controlled in git repository
- Updated via git commits and Vercel redeployment
- Changes propagate immediately (no caching)

**`prompts/scheduling-assistant.md`**
- System prompt for Claude defining assistant behavior
- Version controlled alongside code
- Does not contain hardcoded date - date is dynamically injected by API route
- Changes take effect on next deployment

**`app/page.tsx`**
- Client-side chat interface ("use client")
- Manages message history in React state (not persisted)
- Messages are left-aligned; user and assistant messages are visually distinct
- Auto-scrolls to latest message on updates

**`app/components/UserMessage.tsx` & `AssistantMessage.tsx`**
- Presentational components for rendering messages
- Both left-aligned, differentiated by background color (white vs blue)
- AssistantMessage renders markdown content with full GitHub Flavored Markdown support

**`app/components/MarkdownContent.tsx`**
- Renders markdown content with react-markdown
- Custom Tailwind-styled components for all markdown elements
- Supports headings, lists, code blocks with syntax highlighting, tables, links, blockquotes
- Blue-themed styling matching app design system

**`app/layout.tsx`**
- Root layout component with metadata
- Includes Vercel Analytics component for page view tracking
- Includes Vercel Speed Insights component for Core Web Vitals monitoring (LCP, FID, CLS, TTFB, INP)
- Imports highlight.js GitHub theme for code syntax highlighting
- No environment variables required for analytics services

### Design Constraints

- All users assumed to be in Pacific timezone
- **Dynamic date injection**: Current date automatically calculated in Pacific timezone on each request
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

**Upcoming phases may include**:
- Google OAuth for user authentication
- User permissions config file (read/write roles)
- Memory system to update schedule file with new information

**Schedule updates**:
- Currently: Manual edits to `data/schedule.md` followed by git commit/push
- Future: Could add direct file editing via AI memory feature
- Alternative: Could integrate with Notion API if needed

**Completed features**:
- Pacific timezone handling - automatically injected on each request
- File-based storage - migrated from Notion API to local markdown
- Dynamic date context - no manual updates needed
- Vercel Analytics and Speed Insights - tracking usage and performance metrics
- Markdown rendering - assistant messages support full GitHub Flavored Markdown with syntax highlighting

When adding features, maintain the simple logging approach and mobile-first design.
