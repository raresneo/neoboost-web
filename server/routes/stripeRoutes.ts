import { Router } from 'express';
import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/stripeController';

const router = Router();

// STRIPE ROUTES
// Note: Webhook needs raw body for signature verification
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

router.post('/create-checkout-session', express.json(), createCheckoutSession);

export default router;
