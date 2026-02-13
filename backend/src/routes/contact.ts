import { desc, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { z } from 'zod';
import { contactSubmissions } from '../db/schema';
import { authMiddleware } from '../middleware/auth';
import type { AuthContext, Env } from '../types';

const app = new Hono<{ Bindings: Env; Variables: AuthContext }>();

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(2000),
});

// Submit contact form (public)
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validated = contactSchema.parse(body);
    const db = drizzle(c.env.DB);

    await db.insert(contactSubmissions).values({
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
      read: false,
    });

    return c.json(
      {
        message: 'Contact form submitted successfully. We will get back to you soon!',
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Contact submission error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all contact submissions (admin only)
app.get('/submissions', authMiddleware, async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const unreadOnly = c.req.query('unread') === 'true';

    const submissions = unreadOnly
      ? await db
          .select()
          .from(contactSubmissions)
          .where(eq(contactSubmissions.read, false))
          .orderBy(desc(contactSubmissions.createdAt))
      : await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));

    return c.json({
      submissions,
      total: submissions.length,
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Mark submission as read (admin only)
app.patch('/:id/read', authMiddleware, async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const db = drizzle(c.env.DB);

    const result = await db
      .update(contactSubmissions)
      .set({ read: true })
      .where(eq(contactSubmissions.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ error: 'Submission not found' }, 404);
    }

    return c.json({
      message: 'Marked as read',
      submission: result[0],
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete submission (admin only)
app.delete('/:id', authMiddleware, async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const db = drizzle(c.env.DB);

    const result = await db
      .delete(contactSubmissions)
      .where(eq(contactSubmissions.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ error: 'Submission not found' }, 404);
    }

    return c.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Delete submission error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
