import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

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

// Ruta de test (Diagnostic)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        env: {
            hasStripe: !!process.env.STRIPE_SECRET_KEY,
            hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
            hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
        }
    });
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
            client_reference_id: userId,
            metadata: { supabase_id: userId }
        };

        const session = await stripe.checkout.sessions.create(sessionConfig);
        res.json({ url: session.url });
    } catch (error: any) {
        console.error('SERVER ERROR:', error);
        res.status(500).json({ error: error.message });
    }
});

export default app;
