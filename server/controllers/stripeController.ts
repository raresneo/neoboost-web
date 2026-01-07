
import { Request, Response } from 'express';
import { stripe, supabaseAdmin } from '../lib/clients';

export const createCheckoutSession = async (req: Request, res: Response) => {
    const { userId, priceId, amount, productName, interval, intervalCount, mode } = req.body;

    try {
        // 1. Verify user exists in Supabase
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('email, stripe_customer_id')
            .eq('id', userId)
            .single();

        if (profileError || !profile) {
            return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
        }

        let customerId = profile.stripe_customer_id;

        // 2. Create Stripe Customer if not exists
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: profile.email,
                metadata: { supabase_id: userId }
            });
            customerId = customer.id;

            // Update profile with stripe_customer_id
            await supabaseAdmin
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', userId);
        }

        // 3. Construct Line Items
        let line_items;

        if (priceId) {
            // Use existing Price ID
            line_items = [{
                price: priceId,
                quantity: 1,
            }];
        } else if (amount && productName) {
            // Create Price on the fly
            const priceData: any = {
                currency: 'ron',
                product_data: {
                    name: productName,
                },
                unit_amount: amount * 100, // Amount in bani
            };

            if (interval) {
                priceData.recurring = {
                    interval: interval, // 'month', 'year'
                    interval_count: intervalCount || 1,
                };
            }

            line_items = [{
                price_data: priceData,
                quantity: 1,
            }];
        } else {
            return res.status(400).json({ error: 'Missing priceId or amount/productName' });
        }

        const sessionMode = mode || (interval ? 'subscription' : 'payment');

        // 4. Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: line_items,
            mode: sessionMode,
            success_url: `${process.env.FRONTEND_URL}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}?payment_canceled=true`, // Redirect back to home with cancel param
            client_reference_id: userId,
            subscription_data: sessionMode === 'subscription' ? {
                metadata: {
                    supabase_id: userId
                }
            } : undefined,
            metadata: {
                supabase_id: userId
            }
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret!);
    } catch (err: any) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle events
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as any;
                const userId = session.client_reference_id;
                const customerId = session.customer;
                const subscriptionId = session.subscription;

                // Get subscription details
                const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

                await supabaseAdmin
                    .from('profiles')
                    .update({
                        stripe_customer_id: customerId,
                        subscription_status: 'active',
                        subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
                    })
                    .eq('id', userId);

                console.log(`✅ Subscription active for user: ${userId}`);
                break;
            }

            case 'invoice.paid': {
                const invoice = event.data.object as any;
                const subscriptionId = invoice.subscription;
                const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
                const userId = subscription.metadata.supabase_id;

                if (userId) {
                    await supabaseAdmin
                        .from('profiles')
                        .update({
                            subscription_status: 'active',
                            subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString()
                        })
                        .eq('id', userId);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as any;
                const userId = subscription.metadata.supabase_id;

                if (userId) {
                    await supabaseAdmin
                        .from('profiles')
                        .update({ subscription_status: 'none' })
                        .eq('id', userId);
                }
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};
