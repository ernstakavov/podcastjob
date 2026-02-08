// Database types are now defined in src/lib/supabase/types.ts
// This file re-exports them for backwards compatibility

import type { Database } from '@/lib/supabase/types';

// Re-export Database type
export type { Database };

// Type helpers for working with Supabase tables
export type Vacancy = Database['public']['Tables']['vacancy']['Row'];
export type VacancyInsert = Database['public']['Tables']['vacancy']['Insert'];
export type VacancyUpdate = Database['public']['Tables']['vacancy']['Update'];

export type Resume = Database['public']['Tables']['resume']['Row'];
export type ResumeInsert = Database['public']['Tables']['resume']['Insert'];
export type ResumeUpdate = Database['public']['Tables']['resume']['Update'];

// Table names enum for type safety
export const TableNames = {
  VACANCY: 'vacancy',
  RESUME: 'resume',
} as const;
