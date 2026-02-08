import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

export function createClient() {
  const client = createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return client;
}
