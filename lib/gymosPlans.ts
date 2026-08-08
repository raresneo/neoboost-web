/**
 * Catalogul de abonamente lunare, oglindit din GymOS.
 *
 * GymOS este sistemul de evidență: el ține ședințele rămase, expirarea,
 * înghețările și plata. Fișierul acesta există doar ca sursă de afișare pentru
 * pagina de prețuri, iar `gymosPlanId` face legătura exactă cu planul real.
 *
 * Verificat contra GymOS (organizația Neoboost) pe 8 august 2026.
 * Când schimbi un preț, îl schimbi PRIMA în GymOS, apoi aici.
 *
 * Diferența de produs, pe scurt:
 *   standard  = grup mic, maximum 2 persoane pe slot, antrenor dedicat
 *   exclusive = slotul întreg blocat, doar clientul și antrenorul
 *
 * Blocarea slotului nu e o promisiune de marketing: e impusă în baza de date
 * GymOS prin flagul `is_exclusive` de pe plan.
 */

export type PlanMode = 'standard' | 'exclusive';

export interface GymosPlan {
    /** UUID-ul planului din GymOS (subscription_plans.id) */
    gymosPlanId: string;
    /** Numele exact din GymOS, ca să se poată reconcilia ușor */
    gymosName: string;
    /** Numele afișat pe site */
    label: string;
    sessions: number;
    price: number;
    currency: string;
    durationDays: number;
    cadence: string;
    mode: PlanMode;
    isRecommended?: boolean;
}

/** Ruta reală de cumpărare din GymOS. Cere cont de client (login). */
export const GYMOS_PORTAL_SUBSCRIPTION_URL =
    'https://gym-os-woad.vercel.app/portal/subscription';

/** Durata unei ședințe EMS, aceeași pentru toate pachetele. */
export const SESSION_MINUTES = 30;

/** Capacitatea maximă a unui slot standard. */
export const STANDARD_MAX_PARTICIPANTS = 2;

export const STANDARD_FEATURES = [
    `Grup mic, maximum ${STANDARD_MAX_PARTICIPANTS} persoane pe ședință`,
    'Antrenor dedicat pe toată durata ședinței',
    'Costum EMS wireless igienizat, inclus',
    'Plan alimentar personalizat',
    'Acces la sală în ziua ședinței',
    'Evaluare corporală inițială și tracking',
];

export const EXCLUSIVE_FEATURES = [
    'Toată sala doar pentru tine și antrenorul tău',
    '1 la 1 garantat, inclusiv în orele de vârf',
    'Slot rezervat pe numele tău',
    'Prioritate la rezervare',
    'Confidențialitate totală',
    'Tot ce include pachetul standard',
];

export const GYMOS_PLANS: GymosPlan[] = [
    // ---------------- Standard ----------------
    {
        gymosPlanId: 'd13c2bfe-2683-40a9-8c5d-acbe439c3435',
        gymosName: 'EMS STARTER',
        label: 'Starter',
        sessions: 4,
        price: 460,
        currency: 'RON',
        durationDays: 30,
        cadence: '1x pe săptămână',
        mode: 'standard',
    },
    {
        gymosPlanId: '17e49206-736f-4e76-b575-5af20cce5aa1',
        gymosName: 'EMS PROGRESS',
        label: 'Progress',
        sessions: 8,
        price: 750,
        currency: 'RON',
        durationDays: 30,
        cadence: '2x pe săptămână',
        mode: 'standard',
        isRecommended: true,
    },
    {
        gymosPlanId: '86f63fd0-85a9-40c5-a796-000122ff12cc',
        gymosName: 'EMS TRANSFORM',
        label: 'Transform',
        sessions: 10,
        price: 850,
        currency: 'RON',
        durationDays: 30,
        cadence: '2 sau 3x pe săptămână',
        mode: 'standard',
    },
    {
        gymosPlanId: '129c8b7c-2e43-4875-9ca0-fd501f7b19db',
        gymosName: 'EMS ELITE',
        label: 'Elite',
        sessions: 12,
        price: 900,
        currency: 'RON',
        durationDays: 30,
        cadence: '3x pe săptămână',
        mode: 'standard',
    },

    // ---------------- Exclusive ----------------
    {
        gymosPlanId: 'cef9c9cb-ce84-44c5-ba5e-7a4d58a749ea',
        gymosName: 'EMS STARTER EXCLUSIVE',
        label: 'Starter Exclusive',
        sessions: 4,
        price: 920,
        currency: 'RON',
        durationDays: 30,
        cadence: '1x pe săptămână',
        mode: 'exclusive',
    },
    {
        gymosPlanId: 'a3c2744a-95aa-4b9c-ae59-42a91adcb02d',
        gymosName: 'EMS PROGRESS EXCLUSIVE',
        label: 'Progress Exclusive',
        sessions: 8,
        price: 1500,
        currency: 'RON',
        durationDays: 30,
        cadence: '2x pe săptămână',
        mode: 'exclusive',
        isRecommended: true,
    },
    {
        gymosPlanId: '6e75b23f-b2a6-4885-a158-01109610133c',
        gymosName: 'EMS TRANSFORM EXCLUSIVE',
        label: 'Transform Exclusive',
        sessions: 10,
        price: 1700,
        currency: 'RON',
        durationDays: 30,
        cadence: '2 sau 3x pe săptămână',
        mode: 'exclusive',
    },
    {
        gymosPlanId: '67a11c83-a97b-42c0-a7f8-c6aaabe04556',
        gymosName: 'EMS ELITE EXCLUSIVE',
        label: 'Elite Exclusive',
        sessions: 12,
        price: 1800,
        currency: 'RON',
        durationDays: 30,
        cadence: '3x pe săptămână',
        mode: 'exclusive',
    },
];

export const plansByMode = (mode: PlanMode) =>
    GYMOS_PLANS.filter((plan) => plan.mode === mode);

/**
 * Preț pe ședință, calculat, niciodată scris de mână.
 * Dacă e hardcodat, se desincronizează la prima ajustare de preț.
 */
export const pricePerSession = (plan: GymosPlan) =>
    Math.round(plan.price / plan.sessions);

export const featuresForMode = (mode: PlanMode) =>
    mode === 'exclusive' ? EXCLUSIVE_FEATURES : STANDARD_FEATURES;
