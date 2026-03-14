# CLAUDE.md

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
