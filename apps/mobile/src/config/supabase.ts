import { createClient } from '@supabase/supabase-js';

// Estas variables deben estar en .env.local
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.warn('⚠️  SUPABASE_ANON_KEY no está configurada. Algunas funciones no funcionarán.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
