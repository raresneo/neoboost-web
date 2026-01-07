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

    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
        stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret!);
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
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

        return {
            statusCode: 200,
            body: JSON.stringify({ received: true }),
        };
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        return { statusCode: 500, body: 'Webhook processing failed' };
    }
};
