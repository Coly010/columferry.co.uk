# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/blog website for Colum Ferry built with Next.js App Router, React, TypeScript, Tailwind CSS, and Keystatic CMS. Content is authored in MDX with YAML frontmatter, managed via Keystatic's admin UI.

## Commands

```bash
npm run dev          # Start Next.js dev server with HMR
npm run build        # Production build
npm run start        # Serve production build
npm run typecheck    # TypeScript type checking (tsc --noEmit)
```

Requires Node.js >= 20.0.0.

## Architecture

### Routing

Next.js App Router in `src/app/`. Key routes:
- `page.tsx` - Home page
- `blog/page.tsx` - Blog listing
- `blog/[slug]/page.tsx` - Individual blog posts (SSG)
- `books/page.tsx` - Books listing
- `tutarium/page.tsx` - Fantasy world landing page
- `tutarium/lore/page.tsx` - Lore listing (grouped by type)
- `tutarium/lore/[slug]/page.tsx` - Individual lore articles (SSG)
- `keystatic/[...params]/page.tsx` - Keystatic admin UI
- `api/keystatic/[...params]/route.ts` - Keystatic API handler

### Content System (Keystatic)

Content is stored as MDX files with YAML frontmatter in:
- `content/blog/*/index.mdx` - Blog posts
- `content/lore/*/index.mdx` - Lore articles

Keystatic config (`keystatic.config.tsx`) defines schemas for both collections. The admin UI is available at `/keystatic` for editing content.

Content is read at build time via `src/lib/content.ts` which uses `gray-matter` to parse frontmatter and extracts markdown body for rendering with `react-markdown`.

### Shared Components

- `src/components/menu.tsx` - Navigation with active state via `usePathname()`
- `src/components/breadcrumbs.tsx` - Breadcrumb navigation (client component)
- `src/components/highlighted-text.tsx` - Styled inline text
- `src/components/in-text-link.tsx` - Styled anchor links
- `src/components/markdown-content.tsx` - Renders markdown with syntax highlighting (client component)

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `./src/*`

### Styling

Tailwind CSS with `@tailwindcss/typography` plugin for prose content. Code syntax highlighting via `rehype-highlight` with GitHub Dark theme (CDN link in root layout).

## Adding Content

Navigate to `/keystatic` in development mode to use the Keystatic admin UI for creating and editing blog posts and lore articles. In local dev, Keystatic uses filesystem storage. For production with GitHub mode, set environment variables:
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER`
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`

## Subagents

This project uses specialized subagents that MUST be spawned at specific points during development. These are NOT optional - they are part of the development workflow.

### The Critic (`.claude/agents/critic.md`)

**When to spawn:** After ANY code modification (Edit/Write to .ts/.tsx/.js/.jsx files). Spawn this agent in the background using the Task tool after completing a logical unit of work (e.g., finishing a feature, fixing a bug, making a refactor).

**How to spawn:**
- Use `Task` tool with `subagent_type: "general-purpose"` and `run_in_background: true`
- Read `.claude/agents/critic.md` and include its FULL contents as the prompt
- The critic runs autonomously - it will read git diffs, check files, run linting/tsc itself
- After it completes, READ its output and address any CRITICAL or ERROR findings before proceeding

**Behavioral mandate:** If the Critic returns verdict "BLOCK", you MUST fix all CRITICAL issues before continuing with any other work. Do not ask the user - just fix them.

### The Architect (`.claude/agents/architect.md`)

**When to spawn:** When ANY of these occur:
- A new file is created
- A file is moved or renamed
- New imports are added that cross module boundaries
- A new route, component, or utility is introduced
- Dependencies are added/removed

**How to spawn:**
- Use `Task` tool with `subagent_type: "general-purpose"` and `run_in_background: true`
- Read `.claude/agents/architect.md` and include its FULL contents as the prompt
- The architect validates structural coherence independently
- After it completes, READ its output and address any VIOLATION findings

**Behavioral mandate:** If the Architect returns verdict "VIOLATION", you MUST fix structural issues before continuing. Drift detected is a warning - flag it to the user but don't block.

### Spawning Rules

1. **Always spawn The Critic** after completing code changes - no exceptions
2. **Spawn The Architect** when structural changes occur (new files, moved files, new deps)
3. Both agents run in background (`run_in_background: true`) so work can continue
4. Before committing or reporting completion to the user, CHECK both agents' output
5. Never skip spawning because "the change is small" - small changes cause big bugs
6. If both agents need to run, spawn them in parallel (single message, two Task calls)
