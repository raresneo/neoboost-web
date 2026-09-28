/**
 * Lead tracking global.
 *
 * De ce e global și nu în fiecare componentă: pe site sunt zeci de butoane WhatsApp
 * (calendar, sticky banner, landing SEO, formulare). În loc să le edităm pe toate,
 * interceptăm orice deschidere de link WhatsApp / telefon și trimitem UN eveniment Lead.
 *
 * - Meta Pixel: fbq('track', 'Lead')
 * - GA4: generate_lead
 * - Google Ads: conversie doar dacă setezi VITE_GADS_LEAD_LABEL în Vercel
 *   (eticheta din Google Ads > Obiective > Conversii, partea de după "AW-416910177/")
 *
 * Programările din calendar (mesajul "Vreau să programez o ședință la NeoBoost") se salvează
 * și în Supabase (program_leads, program_id = booking-<locatie>) cu UTM-urile, ca să vezi
 * ce campanie a adus programarea.
 */
import { captureUTMParameters, getStoredUTMParameters } from './utm';

const GADS_ID = 'AW-416910177';
const GADS_LEAD_LABEL: string | undefined = (import.meta as any).env?.VITE_GADS_LEAD_LABEL;
const DEDUPE_MS = 3000;
const BOOKING_MARKER = 'Vreau să programez o ședință la NeoBoost';
const WHATSAPP_RE = /^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//i;

let lastLeadAt = 0;
let installed = false;

export const trackLead = (source: string, params: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return;

    // Un singur Lead per acțiune (unele fluxuri apelează și window.open și click pe link)
    const now = Date.now();
    if (now - lastLeadAt < DEDUPE_MS) return;
    lastLeadAt = now;

    const w = window as any;
    try {
        if (typeof w.fbq === 'function') {
            w.fbq('track', 'Lead', { content_name: source, ...params });
        }
        if (typeof w.gtag === 'function') {
            w.gtag('event', 'generate_lead', { lead_source: source, page_path: window.location.pathname, ...params });
            if (GADS_LEAD_LABEL) {
                w.gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_LEAD_LABEL}` });
            }
        }
    } catch (e) {
        console.warn('[tracking] lead event failed', e);
    }
};

const isWhatsAppUrl = (url: unknown): url is string => typeof url === 'string' && WHATSAPP_RE.test(url);

const extractField = (text: string, label: string): string => {
    const match = text.match(new RegExp(`\\*${label}:\\*\\s*([^\\n]+)`));
    return match ? match[1].trim() : '';
};

const saveBookingIntent = (text: string) => {
    const location = extractField(text, 'Locație');
    const locationId = location.toLowerCase().replace(/[^a-z0-9]/g, '') || 'other';
    const utm = getStoredUTMParameters();

    try {
        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true, // supraviețuiește schimbării de tab spre WhatsApp
            body: JSON.stringify({
                programId: `booking-${locationId}`.slice(0, 50),
                firstName: 'Programare',
                lastName: 'WhatsApp',
                email: '',
                phone: '',
                formData: {
                    location,
                    date: extractField(text, 'Data'),
                    time: extractField(text, 'Ora'),
                    trainingType: extractField(text, 'Tip Antrenament'),
                    page: window.location.pathname,
                },
                utmSource: utm.source,
                utmMedium: utm.medium,
                utmCampaign: utm.campaign,
            }),
        }).catch(() => {});
    } catch {
        // tracking-ul nu are voie să blocheze programarea
    }
};

const handleWhatsAppOpen = (url: string) => {
    let text = '';
    try {
        text = new URL(url).searchParams.get('text') || '';
    } catch {
        text = '';
    }

    const isBooking = text.includes(BOOKING_MARKER);
    trackLead(isBooking ? 'booking_calendar' : 'whatsapp_click');
    if (isBooking) saveBookingIntent(text);
};

export const installLeadTracking = () => {
    if (typeof window === 'undefined' || installed) return;
    installed = true;

    // App.tsx importa captureUTMParameters dar nu îl apela niciodată: UTM-urile nu se salvau deloc.
    captureUTMParameters();

    // 1. Butoane care fac window.open('https://wa.me/...')
    const originalOpen = window.open.bind(window);
    window.open = ((url?: string | URL, target?: string, features?: string) => {
        try {
            const href = url instanceof URL ? url.href : url;
            if (isWhatsAppUrl(href)) handleWhatsAppOpen(href);
        } catch {
            // ignore
        }
        return originalOpen(url as any, target, features);
    }) as typeof window.open;

    // 2. Linkuri <a href="https://wa.me/..."> și <a href="tel:...">
    document.addEventListener(
        'click',
        (event) => {
            const target = event.target as Element | null;
            const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
            if (!link) return;

            if (isWhatsAppUrl(link.href)) {
                handleWhatsAppOpen(link.href);
            } else if (link.href.startsWith('tel:')) {
                trackLead('phone_click');
            }
        },
        { capture: true }
    );
};
