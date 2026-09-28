import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { Resend } from 'resend';

const app = express();

// ---------------------------------------------------------------------------
// CORS: doar domeniile noastre. Stripe (webhook) nu trimite Origin, deci trece.
// Poți adăuga domenii extra din Vercel: EXTRA_ALLOWED_ORIGINS=https://a.ro,https://b.ro
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = [
    'https://neo-boost.com',
    'https://www.neo-boost.com',
    ...(process.env.EXTRA_ALLOWED_ORIGINS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
];

const isAllowedOrigin = (origin: string) =>
    ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/neoboost-web[a-z0-9-]*\.vercel\.app$/.test(origin) ||
    /^http:\/\/localhost:\d+$/.test(origin);

app.use(
    cors({
        origin: (origin, cb) => {
            if (!origin) return cb(null, true);
            return cb(null, isAllowedOrigin(origin));
        },
    })
);

// Inițializare Clienți - DIRECT aici pentru stabilitate pe Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
});

const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://neo-boost.com';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const escapeHtml = (value: unknown): string =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const cleanString = (value: unknown, maxLength: number): string => {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLength);
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9()\s.-]{6,20}$/;
const PROGRAM_ID_RE = /^[a-zA-Z0-9_-]{1,50}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PRICE_ID_RE = /^price_[A-Za-z0-9]+$/;
const PLACEHOLDER_EMAILS = ['no-email@provided.com'];

// Rate limit simplu în memorie (best effort pe serverless: se resetează la cold start).
// Oprește rafalele de bot de pe același IP. Pentru protecție totală: Vercel Firewall sau Upstash.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateHits = new Map<string, number[]>();

const getClientIp = (req: express.Request): string => {
    const fwd = req.headers['x-forwarded-for'];
    const first = Array.isArray(fwd) ? fwd[0] : (fwd || '').split(',')[0];
    return (first || req.socket.remoteAddress || 'unknown').trim();
};

const isRateLimited = (ip: string): boolean => {
    const now = Date.now();
    const hits = (rateHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
    hits.push(now);
    rateHits.set(ip, hits);
    if (rateHits.size > 5000) rateHits.clear();
    return hits.length > RATE_MAX;
};

// Ruta de test (Diagnostic)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        env: {
            hasStripe: !!process.env.STRIPE_SECRET_KEY,
            hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
            hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            hasResend: !!process.env.RESEND_API_KEY,
        },
    });
});

// ---------------------------------------------------------------------------
// Ruta Leads (Formular Aplicare + intenții de programare din calendar)
// ---------------------------------------------------------------------------
app.post('/api/leads', express.json({ limit: '20kb' }), async (req, res) => {
    try {
        const body = req.body || {};

        // Honeypot: câmp ascuns pe care doar boții îl completează. Răspundem OK și nu salvăm nimic.
        if (cleanString(body.website, 200)) {
            return res.status(201).json({ success: true });
        }

        if (isRateLimited(getClientIp(req))) {
            return res.status(429).json({ error: 'Prea multe cereri. Încearcă din nou în câteva minute.' });
        }

        const programId = cleanString(body.programId, 50);
        if (!PROGRAM_ID_RE.test(programId)) {
            return res.status(400).json({ error: 'Program invalid.' });
        }

        const firstName = cleanString(body.firstName, 100) || 'Lead';
        const lastName = cleanString(body.lastName, 100) || 'Form';

        const rawEmail = cleanString(body.email, 255).toLowerCase();
        const email = EMAIL_RE.test(rawEmail) && !PLACEHOLDER_EMAILS.includes(rawEmail) ? rawEmail : '';

        const rawPhone = cleanString(body.phone, 20);
        const phone = PHONE_RE.test(rawPhone) ? rawPhone : '';

        const formData = body.formData && typeof body.formData === 'object' && !Array.isArray(body.formData) ? body.formData : {};
        if (JSON.stringify(formData).length > 8000) {
            return res.status(400).json({ error: 'Formular prea mare.' });
        }

        const utmSource = cleanString(body.utmSource, 50) || null;
        const utmMedium = cleanString(body.utmMedium, 50) || null;
        const utmCampaign = cleanString(body.utmCampaign, 100) || null;

        const isBookingIntent = programId.startsWith('booking-');

        const { error } = await supabaseAdmin.from('program_leads').insert([
            {
                program_id: programId,
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                form_data: formData,
                source: utmSource,
                medium: utmMedium,
                campaign: utmCampaign,
                status: 'new',
            },
        ]);

        if (error) throw error;

        // Intențiile de programare merg deja pe WhatsApp, nu mai trimitem email (evităm spam în inbox).
        if (resend && !isBookingIntent) {
            try {
                await resend.emails.send({
                    from: 'NeoBoost Leads <raresh@neo-boost.com>',
                    to: ['raresh@neo-boost.com'],
                    subject: `Lead Nou: ${firstName} ${lastName} - ${programId}`.replace(/[\r\n]/g, ' '),
                    html: `
                        <h1>Lead Nou de la Formular!</h1>
                        <p><strong>Nume:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
                        <p><strong>Email:</strong> ${escapeHtml(email || '-')}</p>
                        <p><strong>Telefon:</strong> ${escapeHtml(phone || '-')}</p>
                        <p><strong>Program:</strong> ${escapeHtml(programId)}</p>
                        <hr />
                        <h3>Detalii Formular:</h3>
                        <pre>${escapeHtml(JSON.stringify(formData, null, 2))}</pre>
                        <hr />
                        <p><strong>Marketing Source:</strong> ${escapeHtml(utmSource || 'direct')} / ${escapeHtml(utmMedium || 'none')} / ${escapeHtml(utmCampaign || '-')}</p>
                    `,
                });

                // Confirmare către lead DOAR dacă avem un email real (fără bounce-uri care strică reputația domeniului)
                if (email) {
                    await resend.emails.send({
                        from: 'NeoBoost <raresh@neo-boost.com>',
                        to: [email],
                        subject: 'Am primit aplicarea ta la NeoBoost!',
                        html: `
                            <h2>Salut, ${escapeHtml(firstName)}!</h2>
                            <p>Îți mulțumim pentru interesul acordat programului NeoBoost <strong>${escapeHtml(programId)}</strong>.</p>
                            <p>Echipa noastră te va contacta în cel mai scurt timp pe WhatsApp sau telefon pentru a stabili detaliile următoare.</p>
                            <br />
                            <p>Cu drag,<br />Echipa NeoBoost</p>
                        `,
                    });
                }
            } catch (emailError) {
                console.error('EMAIL ERROR:', emailError);
            }
        }

        res.status(201).json({ success: true, message: 'Lead salvat' });
    } catch (error: any) {
        console.error('LEAD ERROR:', error);
        res.status(500).json({ error: 'Nu am putut salva cererea. Scrie-ne pe WhatsApp.' });
    }
});

// ---------------------------------------------------------------------------
// Ruta Checkout
// Prețul vine EXCLUSIV din Stripe (priceId), niciodată din browser.
// Modul (abonament / plată unică) se decide după tipul prețului din Stripe.
// Opțional: STRIPE_ALLOWED_PRICE_IDS=price_a,price_b ca whitelist strict.
// ---------------------------------------------------------------------------
app.post('/api/stripe/create-checkout-session', express.json({ limit: '10kb' }), async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ error: 'Configurare Stripe incompletă. Verifică Environment Variables în Vercel.' });
        }

        const { userId, priceId } = req.body || {};

        if (typeof priceId !== 'string' || !PRICE_ID_RE.test(priceId)) {
            return res.status(400).json({ error: 'Pachet invalid.' });
        }

        const allowList = (process.env.STRIPE_ALLOWED_PRICE_IDS || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        if (allowList.length > 0 && !allowList.includes(priceId)) {
            return res.status(400).json({ error: 'Pachet indisponibil.' });
        }

        const price = await stripe.prices.retrieve(priceId);
        if (!price.active) {
            return res.status(400).json({ error: 'Pachetul nu mai este activ.' });
        }

        const isRecurring = price.type === 'recurring';
        const validUserId = typeof userId === 'string' && UUID_RE.test(userId) ? userId : null;

        const sessionConfig: Stripe.Checkout.SessionCreateParams = {
            line_items: [{ price: price.id, quantity: 1 }],
            mode: isRecurring ? 'subscription' : 'payment',
            success_url: `${FRONTEND_URL}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${FRONTEND_URL}?payment_canceled=true`,
        };

        if (validUserId) {
            sessionConfig.client_reference_id = validUserId;
            sessionConfig.metadata = { supabase_id: validUserId };
            // FIX: metadata trebuie pusă și pe abonament, altfel invoice.paid și
            // customer.subscription.deleted nu găsesc userul niciodată.
            if (isRecurring) {
                sessionConfig.subscription_data = { metadata: { supabase_id: validUserId } };
            }
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.json({ url: session.url });
    } catch (error: any) {
        console.error('CHECKOUT ERROR:', error);
        res.status(500).json({ error: 'Nu am putut porni plata. Încearcă din nou sau scrie-ne pe WhatsApp.' });
    }
});

// ---------------------------------------------------------------------------
// Ruta Webhook
// ---------------------------------------------------------------------------
const getPeriodEnd = (subscription: any): string | null => {
    const end = subscription?.current_period_end ?? subscription?.items?.data?.[0]?.current_period_end;
    return end ? new Date(end * 1000).toISOString() : null;
};

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || !sig) {
        console.error('Webhook: lipsește STRIPE_WEBHOOK_SECRET sau semnătura.');
        return res.status(400).send('Webhook Error: missing signature/secret');
    }

    let stripeEvent: Stripe.Event;

    try {
        stripeEvent = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed': {
                const session = stripeEvent.data.object as Stripe.Checkout.Session;
                const userId = session.client_reference_id;
                const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;

                if (!userId) break; // checkout fără cont: nimic de legat în profiles

                if (session.mode === 'subscription' && session.subscription) {
                    const subscriptionId =
                        typeof session.subscription === 'string' ? session.subscription : session.subscription.id;
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({
                            stripe_customer_id: customerId,
                            subscription_status: 'active',
                            subscription_end_date: getPeriodEnd(subscription),
                        })
                        .eq('id', userId);
                    if (error) console.error('Supabase update (subscription) error:', error);
                } else if (customerId) {
                    // Plată unică: salvăm doar clientul Stripe, fără să atingem statusul abonamentului.
                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({ stripe_customer_id: customerId })
                        .eq('id', userId);
                    if (error) console.error('Supabase update (payment) error:', error);
                }
                break;
            }

            case 'invoice.paid': {
                const invoice = stripeEvent.data.object as any;
                const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id;
                if (subscriptionId) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                    const userId = subscription.metadata?.supabase_id;

                    if (userId) {
                        const { error } = await supabaseAdmin
                            .from('profiles')
                            .update({
                                subscription_status: 'active',
                                subscription_end_date: getPeriodEnd(subscription),
                            })
                            .eq('id', userId);
                        if (error) console.error('Supabase update (invoice.paid) error:', error);
                    }
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = stripeEvent.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.supabase_id;

                if (userId) {
                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({ subscription_status: 'none' })
                        .eq('id', userId);
                    if (error) console.error('Supabase update (subscription.deleted) error:', error);
                }
                break;
            }
        }

        res.json({ received: true });
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        res.status(500).send('Webhook processing failed');
    }
});

export default app;
