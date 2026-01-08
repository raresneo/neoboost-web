import express from 'express';
import cors from 'cors';
import stripeRoutes from './routes/stripeRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware de bază
app.use(cors({ origin: '*' }));

// IMPORTANT: Nu punem express.json() aici global, pentru că Webhook-ul Stripe are nevoie de body-ul RAW.
// Îl lăsăm pe fiecare rută în parte în fișierele de rute.

// API Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/users', userRoutes);

// Root/Health route
app.get('/api/health', (req, res) => {
    res.json({ ok: true, version: '1.0.1', message: 'NeoBoost API is live' });
});

// Captură erori globale pentru a evita FUNCTION_INVOCATION_F
app.use((err: any, req: any, res: any, next: any) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
