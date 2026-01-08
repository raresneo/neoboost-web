import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import stripeRoutes from './routes/stripeRoutes';
import userRoutes from './routes/userRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors({
    origin: '*' // Permissive for production debugging
}));

// API Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
