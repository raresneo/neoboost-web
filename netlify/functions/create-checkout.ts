import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
});

const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const handler = async (event: any) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { userId, priceId, amount, productName, interval, intervalCount, mode } = JSON.parse(event.body);

        let customerId = undefined;

        // 1. If user is logged in, try to get/create their Stripe customer
        if (userId) {
            const { data: profile } = await supabaseAdmin
                .from('profiles')
                .select('email, stripe_customer_id')
                .eq('id', userId)
                .single();

            if (profile) {
                customerId = profile.stripe_customer_id;

                if (!customerId) {
                    const customer = await stripe.customers.create({
                        email: profile.email,
                        metadata: { supabase_id: userId }
                    });
                    customerId = customer.id;

                    await supabaseAdmin
                        .from('profiles')
                        .update({ stripe_customer_id: customerId })
                        .eq('id', userId);
                }
            }
        }

        // 2. Construct Line Items
        let line_items;
        if (priceId) {
            line_items = [{ price: priceId, quantity: 1 }];
        } else if (amount && productName) {
            const priceData: any = {
                currency: 'ron',
                product_data: { name: productName },
                unit_amount: amount * 100,
            };

            if (interval) {
                priceData.recurring = {
                    interval: interval,
                    interval_count: intervalCount || 1,
                };
            }
            line_items = [{ price_data: priceData, quantity: 1 }];
        } else {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing priceId or amount/productName' }) };
        }

        const sessionMode = mode || (interval ? 'subscription' : 'payment');

        // 3. Create Checkout Session
        const sessionConfig: any = {
            line_items,
            mode: sessionMode,
            success_url: `${process.env.FRONTEND_URL || 'https://neo-boost.com'}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'https://neo-boost.com'}?payment_canceled=true`,
        };

        if (customerId) sessionConfig.customer = customerId;

        if (userId) {
            sessionConfig.client_reference_id = userId;
            if (sessionMode === 'subscription') {
                sessionConfig.subscription_data = { metadata: { supabase_id: userId } };
            }
            sessionConfig.metadata = { supabase_id: userId };
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: session.url }),
        };
    } catch (error: any) {
        console.error('Checkout error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
