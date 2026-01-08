import { Router } from 'express';
import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/stripeController';

const router = Router();

// 1. Webhook - TREBUIE să fie RAW pentru semnătură
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// 2. Checkout - TREBUIE să fie JSON
router.post('/create-checkout-session', express.json(), createCheckoutSession);

export default router;
