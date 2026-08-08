/**
 * Citirea sloturilor reale din GymOS.
 *
 * GymOS rulează pe un proiect Supabase separat de cel al site-ului, de aceea
 * există un client dedicat aici. Se folosesc DOAR cheia anon și tabelele expuse
 * public, exact aceleași pe care le citește calendarul public din GymOS
 * (`src/pages/public/PublicCalendar.tsx`):
 *
 *   organizations_public  · unde is_discoverable = true
 *   available_slots       · unde is_public = true
 *
 * Rezervarea NU se face de aici. Trece prin `/api/trial-booking`, server side,
 * ca să putem trimite și notificarea WhatsApp în aceeași operațiune.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const GYMOS_URL = import.meta.env.VITE_GYMOS_SUPABASE_URL as string | undefined;
const GYMOS_ANON_KEY = import.meta.env.VITE_GYMOS_SUPABASE_ANON_KEY as string | undefined;

/** Slug-ul organizației Neoboost în GymOS. */
export const GYMOS_ORG_SLUG =
    (import.meta.env.VITE_GYMOS_ORG_SLUG as string | undefined) || 'neoboost';

/** Tipul de ședință pentru care se acceptă rezervări de probă din site. */
export const TRIAL_SESSION_TYPES = ['EMS', 'Personal Training'];

export const isGymosConfigured = () => !!(GYMOS_URL && GYMOS_ANON_KEY);

let cached: SupabaseClient | null = null;

const gymosClient = () => {
    if (!isGymosConfigured()) return null;
    if (!cached) {
        cached = createClient(GYMOS_URL!, GYMOS_ANON_KEY!, {
            auth: { persistSession: false, autoRefreshToken: false },
        });
    }
    return cached;
};

export interface GymosSlot {
    id: string;
    starts_at: string;
    ends_at: string;
    session_type: string | null;
    location: string | null;
    trainer_id: string | null;
    max_participants: number;
    booked_count: number;
}

export interface GymosOrg {
    id: string;
    name: string;
}

/**
 * Sloturile libere din următoarele `days` zile.
 *
 * Filtrul de capacitate se face aici, nu în query, pentru că Supabase nu poate
 * compara două coloane într-un `.filter()` fără o vedere dedicată.
 */
export const fetchAvailableSlots = async (days = 21): Promise<{
    org: GymosOrg | null;
    slots: GymosSlot[];
}> => {
    const client = gymosClient();
    if (!client) return { org: null, slots: [] };

    const { data: org, error: orgError } = await client
        .from('organizations_public')
        .select('id, name')
        .eq('slug', GYMOS_ORG_SLUG)
        .eq('is_discoverable', true)
        .single();

    if (orgError || !org) {
        console.error('GymOS: organizația nu a fost găsită sau nu e publică', orgError?.message);
        return { org: null, slots: [] };
    }

    const from = new Date();
    const to = new Date(from.getTime() + days * 24 * 60 * 60 * 1000);

    const { data, error } = await client
        .from('available_slots')
        .select('id, starts_at, ends_at, session_type, location, trainer_id, max_participants, booked_count')
        .eq('organization_id', org.id)
        .eq('is_public', true)
        .gte('starts_at', from.toISOString())
        .lte('starts_at', to.toISOString())
        .order('starts_at', { ascending: true })
        .limit(500);

    if (error) {
        console.error('GymOS: sloturile nu au putut fi citite', error.message);
        return { org: org as GymosOrg, slots: [] };
    }

    const slots = ((data || []) as GymosSlot[]).filter(
        (slot) => slot.booked_count < slot.max_participants
    );

    return { org: org as GymosOrg, slots };
};

/** Grupează sloturile pe zi calendaristică locală, cheie `YYYY-MM-DD`. */
export const groupSlotsByDay = (slots: GymosSlot[]) => {
    const map = new Map<string, GymosSlot[]>();
    for (const slot of slots) {
        const d = new Date(slot.starts_at);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const bucket = map.get(key);
        if (bucket) bucket.push(slot);
        else map.set(key, [slot]);
    }
    return map;
};

export const formatSlotTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });

export const formatSlotDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });
