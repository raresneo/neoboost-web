import express from 'express';
import cors from 'cors';
import { stripe, supabaseAdmin } from '../server/lib/clients';

const app = express();
app.use(cors({ origin: '*' }));

// Ruta directă pentru a evita orice problemă de import/rutare pe Vercel
app.post('/api/stripe/create-checkout-session', express.json(), async (req, res) => {
    try {
        const { userId, priceId, amount, productName, interval, intervalCount } = req.body;

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(401).json({ error: 'Cheia Stripe lipsește din setările Vercel.' });
        }

        const frontendUrl = process.env.FRONTEND_URL || `https://${req.headers.host}`;

        const session = await stripe.checkout.sessions.create({
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
            success_url: `${frontendUrl}?payment_success=true`,
            cancel_url: `${frontendUrl}?payment_canceled=true`,
            client_reference_id: userId,
            metadata: { supabase_id: userId }
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error('CRASH:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check simplificat
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', host: req.headers.host, provider: 'vercel' });
});

export default app;
