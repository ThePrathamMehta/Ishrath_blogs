import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import type { Env } from './types';

// Import routes
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';
import uploadRoutes from './routes/upload';

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: (origin) => origin, // Allow all origins in dev, configure for production
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'The Ishrath-Blog API',
    version: '1.0.0',
    status: 'healthy',
  });
});

// API routes
app.route('/api/auth', authRoutes);
app.route('/api/blog', blogRoutes);
app.route('/api/newsletter', newsletterRoutes);
app.route('/api/contact', contactRoutes);
app.route('/api/upload', uploadRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);
  return c.json(
    {
      error: err.message || 'Internal Server Error',
    },
    500
  );
});

export default app;
