/**
 * Oferta 3+1: plătești 3 luni la tariful lunar STANDARD, a 4-a lună e cadou.
 *
 * Regula (decizia lui Rareș, 5 oct 2026): luna gratuită NU se scade din tariful lunar.
 * Prețul pachetului = prețul lunar standard din GymOS x 3. Nimic altceva.
 *   Health Pro  = EMS STARTER  (4 ședințe/lună)  460 x 3 = 1380 RON
 *   Sculpt Pro  = EMS PROGRESS (8 ședințe/lună)  750 x 3 = 2250 RON
 *   Master Body = EMS ELITE    (12 ședințe/lună) 900 x 3 = 2700 RON
 *
 * Prețurile se calculează din lib/gymosPlans.ts, deci dacă se schimbă un tarif lunar
 * în GymOS (și apoi acolo), pachetele 3+1 se actualizează singure.
 *
 * Stripe: plata merge prin Payment Links create pe 5 oct 2026 (1380 / 2250 / 2700, trimestrial).
 * Dacă schimbi un preț, creezi link nou în Stripe și îl înlocuiești aici, altfel clientul
 * vede un preț pe site și plătește altul. Fără link, butonul trimite pe WhatsApp.
 */
import { GYMOS_PLANS } from './gymosPlans';
import { MONTHLY_PACKAGES } from '../constants';

export const PAID_MONTHS = 3;
export const FREE_MONTHS = 1;

const env = ((import.meta as any).env || {}) as Record<string, string | undefined>;

interface OfferDef {
    gymosName: string;
    title: string;
    idealFor: string;
    stripeEnv: string;
    /** Stripe Payment Link pentru prețul trimestrial exact (tarif lunar x 3) */
    paymentLink?: string;
    isPremium?: boolean;
    features: string[];
}

const DEFS: OfferDef[] = [
    {
        gymosName: 'EMS STARTER',
        title: 'Health Pro',
        idealFor: 'Sănătate și postură pe termen lung',
        stripeEnv: 'VITE_STRIPE_PRICE_3P1_HEALTH_PRO',
        paymentLink: 'https://buy.stripe.com/8x26oI3qc1Hp0gI4Hb4Ni0c', // 1380 RON, 4 ședințe/lună
        features: [
            'Consolidare postură',
            'Ameliorarea durerilor cronice',
            'Freeze abonament (1 săptămână)',
            'Plan nutrițional de bază',
            'Evaluări periodice',
        ],
    },
    {
        gymosName: 'EMS PROGRESS',
        title: 'Sculpt Pro',
        idealFor: 'Sculptare și definire sustenabilă',
        stripeEnv: 'VITE_STRIPE_PRICE_3P1_SCULPT_PRO',
        paymentLink: 'https://buy.stripe.com/9B6dRa6Co1Hp2oQ0qV4Ni0b', // 2250 RON, 8 ședințe/lună
        isPremium: true,
        features: [
            'Protocol intensiv de sculptare',
            'Rezultate sustenabile',
            'Freeze abonament (3 săptămâni)',
            'Acces în ambele locații',
            'Consiliere nutrițională VIP',
        ],
    },
    {
        gymosName: 'EMS ELITE',
        title: 'Master Body',
        idealFor: 'Reconstrucție totală și performanță',
        stripeEnv: 'VITE_STRIPE_PRICE_3P1_MASTER_BODY',
        paymentLink: 'https://buy.stripe.com/7sY00k1i44TB8NeflP4Ni0a', // 2700 RON, 12 ședințe/lună
        features: [
            'Reconstrucție corporală totală',
            'Performanță atletică maximă',
            'Freeze flexibil',
            'Analiză corporală 3D',
            'Echipament personalizat',
        ],
    },
];

export interface Offer3Plus1 {
    title: string;
    idealFor: string;
    features: string[];
    isPremium?: boolean;
    /** planul lunar standard din GymOS pe care se bazează */
    monthlyLabel: string;
    monthlyPrice: number;
    sessionsPerMonth: number;
    paidSessions: number;
    bonusSessions: number;
    /** ce plătește clientul: tarif lunar x 3 */
    price: number;
    /** valoarea celor 4 luni la tarif standard */
    fullValue: number;
    /** cât e luna cadou */
    saving: number;
    /** preț efectiv pe ședință, cu luna cadou inclusă */
    effectivePerSession: number;
    currency: string;
    duration: string;
    /** Stripe Payment Link (prioritar). */
    paymentLink?: string;
    /** Stripe price ID, din env (alternativă la Payment Link). */
    stripePriceId?: string;
}

export const OFFERS_3PLUS1: Offer3Plus1[] = DEFS.map((d) => {
    const plan = GYMOS_PLANS.find((p) => p.gymosName === d.gymosName && p.mode === 'standard');
    if (!plan) throw new Error(`Plan GymOS lipsă pentru oferta 3+1: ${d.gymosName}`);
    const price = plan.price * PAID_MONTHS;
    const fullValue = plan.price * (PAID_MONTHS + FREE_MONTHS);
    const totalSessions = plan.sessions * (PAID_MONTHS + FREE_MONTHS);
    return {
        title: d.title,
        idealFor: d.idealFor,
        features: d.features,
        isPremium: d.isPremium,
        monthlyLabel: plan.label,
        monthlyPrice: plan.price,
        sessionsPerMonth: plan.sessions,
        paidSessions: plan.sessions * PAID_MONTHS,
        bonusSessions: plan.sessions * FREE_MONTHS,
        price,
        fullValue,
        saving: fullValue - price,
        effectivePerSession: Math.round(price / totalSessions),
        currency: plan.currency,
        duration: `${PAID_MONTHS + FREE_MONTHS} LUNI (${PAID_MONTHS} PLĂTITE + ${FREE_MONTHS} CADOU)`,
        paymentLink: d.paymentLink,
        stripePriceId: env[d.stripeEnv] || undefined,
    };
});

export const OFFER_MIN_PRICE = Math.min(...OFFERS_3PLUS1.map((o) => o.price));

/**
 * MONTHLY_PACKAGES din constants.tsx are prețuri vechi (ex. Progress 710 în loc de 750).
 * Lista asta le aliniază la GymOS după numărul de ședințe, fără să rescriem constants.tsx,
 * și scoate planurile marcate hideOnSite.
 */
export const MONTHLY_PACKAGES_SYNCED = MONTHLY_PACKAGES.flatMap((pkg: any) => {
    const sessions = parseInt(String(pkg.sessionCount), 10);
    const plan = GYMOS_PLANS.find((p) => p.mode === 'standard' && p.sessions === sessions);
    if (!plan) return [pkg];
    // planurile scoase de pe site (ex. Transform) dispar și de pe landing-urile SEO
    if (plan.hideOnSite) return [];
    return [{
        ...pkg,
        price: `${plan.price} RON`,
        pricePerSession: String(Math.round(plan.price / plan.sessions)),
        paymentLink: plan.paymentLink,
    }];
});
