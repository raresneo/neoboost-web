import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase credentials in .env.local');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// Types for our Database
export type Profile = {
    id: string; // references auth.users
    full_name: string | null;
    email: string;
    subscription_status: 'none' | 'active' | 'expired';
    sessions_remaining: number;
    created_at: string;
};
