import { Router } from 'express';
import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/stripeController';

const router = Router();

// Webhook for Stripe (needs raw body)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Check out session (needs JSON body)
router.post('/create-checkout-session', express.json(), createCheckoutSession);

export default router;
