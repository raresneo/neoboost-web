import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import stripeRoutes from './routes/stripeRoutes';
import userRoutes from './routes/userRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration - allow frontend to communicate
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// API Routes
// On Vercel, the /api path might be stripped or kept depending on configuration
// We mount them both with and without the /api prefix to be safe
app.use('/api/stripe', stripeRoutes);
app.use('/api/users', userRoutes);
app.use('/stripe', stripeRoutes);
app.use('/users', userRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'Backend is running ⚡️' });
});

// Conditionally listen if running directly
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`🚀 NeoBoost Server for development: http://localhost:${port}`);
    });
}

// Export for Vercel
export default app;
