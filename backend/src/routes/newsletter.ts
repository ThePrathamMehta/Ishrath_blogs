import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { z } from 'zod';
import { newsletterSubscribers } from '../db/schema';
import { authMiddleware } from '../middleware/auth';
import type { AuthContext, Env } from '../types';

const app = new Hono<{ Bindings: Env; Variables: AuthContext }>();

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email(),
});

// Subscribe to newsletter (public)
app.post('/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const validated = subscribeSchema.parse(body);
    const db = drizzle(c.env.DB);

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, validated.email))
      .get();

    if (existing) {
      if (existing.subscribed) {
        return c.json({ message: 'Already subscribed' }, 200);
      } else {
        // Resubscribe
        await db
          .update(newsletterSubscribers)
          .set({
            subscribed: true,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          })
          .where(eq(newsletterSubscribers.email, validated.email));

        return c.json({ message: 'Resubscribed successfully' });
      }
    }

    // New subscription
    await db.insert(newsletterSubscribers).values({
      email: validated.email,
      subscribed: true,
    });

    return c.json({ message: 'Subscribed successfully' }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid email address', details: error.errors }, 400);
    }
    console.error('Subscribe error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Unsubscribe from newsletter (public)
app.post('/unsubscribe', async (c) => {
  try {
    const body = await c.req.json();
    const validated = subscribeSchema.parse(body);
    const db = drizzle(c.env.DB);

    const result = await db
      .update(newsletterSubscribers)
      .set({
        subscribed: false,
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.email, validated.email))
      .returning();

    if (result.length === 0) {
      return c.json({ error: 'Email not found' }, 404);
    }

    return c.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid email address', details: error.errors }, 400);
    }
    console.error('Unsubscribe error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all subscribers (admin only)
app.get('/subscribers', authMiddleware, async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const subscribedOnly = c.req.query('subscribed') === 'true';

    const subscribers = subscribedOnly
      ? await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.subscribed, true))
          .orderBy(desc(newsletterSubscribers.subscribedAt))
      : await db
          .select()
          .from(newsletterSubscribers)
          .orderBy(desc(newsletterSubscribers.subscribedAt));

    return c.json({
      subscribers,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
