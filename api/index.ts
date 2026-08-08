import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { Resend } from 'resend';

const app = express();
app.use(cors({ origin: '*' }));

// Inițializare Clienți - DIRECT aici pentru stabilitate pe Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
});

const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Ruta de test (Diagnostic)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        env: {
            hasStripe: !!process.env.STRIPE_SECRET_KEY,
            hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
            hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            hasResend: !!process.env.RESEND_API_KEY,
            hasGymos: !!process.env.VITE_GYMOS_SUPABASE_URL,
            hasTwilio: !!process.env.TWILIO_ACCOUNT_SID
        }
    });
});

/* ------------------------------------------------------------------ */
/*  WhatsApp prin Twilio                                              */
/* ------------------------------------------------------------------ */

/**
 * Trimite un mesaj WhatsApp prin Twilio.
 *
 * Nu aruncă excepții: o notificare picată nu are voie să strice o rezervare
 * care s-a scris deja corect în GymOS. Întoarce true/false ca să putem raporta
 * onest în răspuns dacă notificarea a plecat sau nu.
 */
const sendWhatsApp = async (to: string, body: string): Promise<boolean> => {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM;

    if (!sid || !token || !from || !to) {
        console.warn('WHATSAPP: configurare Twilio incompletă, mesajul nu a fost trimis');
        return false;
    }

    const normalize = (value: string) =>
        value.startsWith('whatsapp:') ? value : `whatsapp:${value.replace(/\s/g, '')}`;

    try {
        const params = new URLSearchParams({
            To: normalize(to),
            From: normalize(from),
            Body: body,
        });

        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            }
        );

        if (!response.ok) {
            console.error('WHATSAPP ERROR:', response.status, await response.text());
            return false;
        }
        return true;
    } catch (error) {
        console.error('WHATSAPP ERROR:', error);
        return false;
    }
};

/* ------------------------------------------------------------------ */
/*  Rezervare ședință de probă, scrisă direct în GymOS                */
/* ------------------------------------------------------------------ */

/**
 * Flux:
 *   1. scrie rezervarea în GymOS prin edge function `book-guest-slot`
 *      (endpointul public oficial, care validează slotul și capacitatea)
 *   2. notifică echipa pe WhatsApp, cu link de răspuns direct către client
 *   3. trimite clientului confirmarea pe WhatsApp, dacă avem număr
 *
 * Ordinea contează: dacă GymOS refuză slotul, nu trimitem nicio notificare.
 * Invers, dacă notificarea cade, rezervarea rămâne validă.
 */
app.post('/api/trial-booking', express.json(), async (req, res) => {
    try {
        const { slotId, firstName, lastName, email, phone, trainingType, notes, startsAt, endsAt, location } = req.body;

        if (!slotId || !firstName || !email || !phone) {
            return res.status(400).json({ error: 'Completează nume, email, telefon și alege un interval.' });
        }

        const gymosUrl = process.env.VITE_GYMOS_SUPABASE_URL;
        const gymosAnonKey = process.env.VITE_GYMOS_SUPABASE_ANON_KEY;

        if (!gymosUrl || !gymosAnonKey) {
            return res.status(500).json({ error: 'Integrarea cu sistemul de programări nu este configurată.' });
        }

        const fullName = `${String(firstName).trim()} ${String(lastName || '').trim()}`.trim();

        // 1. Rezervarea în GymOS
        const gymosResponse = await fetch(`${gymosUrl}/functions/v1/book-guest-slot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: gymosAnonKey,
                Authorization: `Bearer ${gymosAnonKey}`,
            },
            body: JSON.stringify({
                slot_id: slotId,
                guest_name: fullName,
                guest_email: String(email).trim().toLowerCase(),
                guest_phone: String(phone).trim(),
            }),
        });

        const gymosData = await gymosResponse.json().catch(() => ({}));

        if (!gymosResponse.ok || gymosData?.error) {
            const raw = gymosData?.error || 'Rezervarea nu a putut fi înregistrată.';
            const friendly: Record<string, string> = {
                'Slot is fully booked': 'Intervalul s-a ocupat între timp. Alege altul, te rugăm.',
                'You have already booked this slot': 'Ai deja o rezervare pentru acest interval.',
                'Slot is in the past': 'Intervalul a trecut deja. Alege altul.',
                'Slot not found': 'Intervalul nu mai este disponibil.',
            };
            return res.status(gymosResponse.status === 200 ? 409 : gymosResponse.status).json({
                error: friendly[raw] || raw,
            });
        }

        const bookingId = gymosData?.booking_id;

        // 2. Notificarea echipei
        const when = startsAt
            ? new Date(startsAt).toLocaleString('ro-RO', {
                weekday: 'long', day: 'numeric', month: 'long',
                hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Bucharest',
            })
            : 'interval nespecificat';

        const clientWaLink = `https://wa.me/${String(phone).replace(/\D/g, '')}`;

        const teamMessage = [
            '🔔 Ședință de probă rezervată de pe site',
            '',
            `Nume: ${fullName}`,
            `Telefon: ${phone}`,
            `Email: ${email}`,
            `Când: ${when}`,
            location ? `Locație: ${location}` : null,
            trainingType ? `Tip: ${trainingType}` : null,
            notes ? `Mențiuni: ${notes}` : null,
            '',
            'Deja înregistrată în GymOS, slotul e blocat.',
            `Scrie-i: ${clientWaLink}`,
        ].filter(Boolean).join('\n');

        const teamNotified = await sendWhatsApp(process.env.TEAM_WHATSAPP_TO || '', teamMessage);

        // 3. Confirmarea către client
        const clientMessage = [
            `Salut, ${String(firstName).trim()}!`,
            '',
            `Ședința ta de probă gratuită la NeoBoost e confirmată: ${when}.`,
            location ? `Locație: ${location}.` : null,
            '',
            'Vino cu adidași și o sticlă de apă, costumul EMS e al nostru. Ședința durează 30 de minute.',
            '',
            'Dacă vrei să schimbi ora, răspunde la acest mesaj.',
        ].filter(Boolean).join('\n');

        const clientNotified = await sendWhatsApp(String(phone).trim(), clientMessage);

        // Email de backup către echipă, dacă WhatsApp nu a plecat
        if (resend && !teamNotified) {
            try {
                await resend.emails.send({
                    from: 'NeoBoost Rezervări <raresh@neo-boost.com>',
                    to: ['raresh@neo-boost.com'],
                    subject: `Ședință de probă: ${fullName} · ${when}`,
                    html: `<pre style="font-family: system-ui">${teamMessage}</pre>`,
                });
            } catch (emailError) {
                console.error('TRIAL BOOKING EMAIL ERROR:', emailError);
            }
        }

        return res.status(201).json({
            success: true,
            bookingId,
            notifications: { team: teamNotified, client: clientNotified },
        });
    } catch (error: any) {
        console.error('TRIAL BOOKING ERROR:', error);
        return res.status(500).json({ error: 'Ceva a mers prost. Scrie-ne pe WhatsApp și rezolvăm imediat.' });
    }
});

// Ruta Leads (Formular Aplicare)
app.post('/api/leads', express.json(), async (req, res) => {
    try {
        const { programId, firstName, lastName, email, phone, formData, utmSource, utmMedium, utmCampaign } = req.body;

        const { data, error } = await supabaseAdmin
            .from('program_leads')
            .insert([
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
                    status: 'new'
                }
            ]);

        if (error) throw error;

        // Trimitere Email (Resend)
        if (resend) {
            try {
                // Email către Admin
                await resend.emails.send({
                    from: 'NeoBoost Leads <raresh@neo-boost.com>',
                    to: ['raresh@neo-boost.com'],
                    subject: `Lead Nou: ${firstName} ${lastName} - ${programId}`,
                    html: `
                        <h1>Lead Nou de la Formular!</h1>
                        <p><strong>Nume:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Telefon:</strong> ${phone}</p>
                        <p><strong>Program:</strong> ${programId}</p>
                        <hr />
                        <h3>Detalii Formular:</h3>
                        <pre>${JSON.stringify(formData, null, 2)}</pre>
                        <hr />
                        <p><strong>Marketing Source:</strong> ${utmSource || 'direct'} / ${utmMedium || 'none'}</p>
                    `
                });

                // Email de confirmare către Lead
                await resend.emails.send({
                    from: 'NeoBoost <raresh@neo-boost.com>',
                    to: [email],
                    subject: 'Am primit aplicarea ta la NeoBoost!',
                    html: `
                        <h2>Salut, ${firstName}!</h2>
                        <p>Îți mulțumim pentru interesul acordat programului NeoBoost <strong>${programId}</strong>.</p>
                        <p>Echipa noastră te va contacta în cel mai scurt timp pe WhatsApp sau telefon pentru a stabili detaliile următoare.</p>
                        <br />
                        <p>Cu drag,<br />Echipa NeoBoost</p>
                    `
                });
            } catch (emailError) {
                console.error('EMAIL ERROR:', emailError);
            }
        }

        res.status(201).json({ success: true, message: 'Lead salvat și notificări trimise' });
    } catch (error: any) {
        console.error('LEAD ERROR:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta Checkout
app.post('/api/stripe/create-checkout-session', express.json(), async (req, res) => {
    try {
        const { userId, priceId, amount, productName, interval, intervalCount } = req.body;

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(401).json({ error: 'Configurare Stripe incompletă. Verifică Environment Variables în Vercel.' });
        }

        const frontendUrl = process.env.FRONTEND_URL || `https://${req.headers.host}`;

        const sessionConfig: any = {
            line_items: priceId ? [{ price: priceId, quantity: 1 }] : [{
                price_data: {
                    currency: 'ron',
                    product_data: { name: productName },
                    unit_amount: amount * 100,
                    recurring: interval ? { interval, interval_count: intervalCount || 1 } : undefined,
                },
                quantity: 1,
            }],
            mode: interval ? 'subscription' : 'payment',
            success_url: `${frontendUrl}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}?payment_canceled=true`,
        };

        if (userId) {
            sessionConfig.client_reference_id = userId;
            sessionConfig.metadata = { supabase_id: userId };
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.json({ url: session.url });
    } catch (error: any) {
        console.error('SERVER ERROR:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ruta Webhook
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret!);
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed': {
                const session = stripeEvent.data.object as any;
                const userId = session.client_reference_id;
                const customerId = session.customer;
                const subscriptionId = session.subscription;

                const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as any;

                await supabaseAdmin
                    .from('profiles')
                    .update({
                        stripe_customer_id: customerId,
                        subscription_status: 'active',
                        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
                    })
                    .eq('id', userId);
                break;
            }

            case 'invoice.paid': {
                const invoice = stripeEvent.data.object as any;
                const subscriptionId = invoice.subscription;
                if (subscriptionId) {
                    const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as any;
                    const userId = subscription.metadata.supabase_id;

                    if (userId) {
                        await supabaseAdmin
                            .from('profiles')
                            .update({
                                subscription_status: 'active',
                                subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
                            })
                            .eq('id', userId);
                    }
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = stripeEvent.data.object as any;
                const userId = subscription.metadata.supabase_id;

                if (userId) {
                    await supabaseAdmin.from('profiles').update({ subscription_status: 'none' }).eq('id', userId);
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
