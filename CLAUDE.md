# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## Architecture

This is a Next.js 15 job board application for the podcast industry, using the App Router with Supabase as the backend.

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
  - `(pages)/` - Route groups for page organization
  - `auth/` - Authentication callback routes
  - `icons/` - SVG icon components
- `src/components/` - Shared React components
  - `ui/` - Radix UI-based primitives (shadcn/ui pattern)
  - `layouts/` - Layout wrapper components
- `src/lib/` - Utilities and shared logic
  - `supabase/` - Supabase client setup and types
- `src/server/db/` - Database types and schema exports
- `src/styles/` - Global CSS

### Key Patterns

**Server Actions**: Database mutations use Next.js Server Actions located alongside page components (e.g., `src/app/(pages)/add/actions.ts`).

**Form Handling**: Forms use react-hook-form with zod validation. Schema and constants are co-located with form components (e.g., `VacancyForm.constants.ts`).

**Supabase Types**: Database types are defined in `src/lib/supabase/types.ts` and re-exported with helper types from `src/server/db/schema.ts`.

**Path Aliases**: Use `@/*` to import from `src/*` (configured in tsconfig.json).

### Database Tables

- `vacancy` - Job listings with position, salary range, requirements, employment type
- `resume` - Job seeker profiles

### UI Components

Uses shadcn/ui pattern with Radix primitives. Components are styled with Tailwind CSS and class-variance-authority.

### Environment Variables

Required Supabase variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
