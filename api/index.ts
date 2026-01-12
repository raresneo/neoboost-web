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
            hasResend: !!process.env.RESEND_API_KEY
        }
    });
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
                    from: 'NeoBoost Leads <leads@neo-boost.com>',
                    to: ['contact@neo-boost.com'],
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
                    from: 'NeoBoost <contact@neo-boost.com>',
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

