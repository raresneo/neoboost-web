import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeRoutes from './routes/stripeRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration - allow frontend to communicate
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// API Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/users', userRoutes);

// General User routes placeholder
app.get('/health', (req, res) => {
    res.json({ status: 'Backend is running ⚡️' });
});

app.listen(port, () => {
    console.log(`
  🚀 NeoBoost Server is live!
  📡 Port: ${port}
  🔗 API: http://localhost:${port}/api
  ✅ Health Check: http://localhost:${port}/health
  `);
});
