import { Context, Next } from 'hono';
import type { AuthContext, Env } from '../types';
import { verifyToken } from '../utils/jwt';

export async function authMiddleware(
  c: Context<{ Bindings: Env; Variables: AuthContext }>,
  next: Next
) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  const token = authHeader.substring(7);
  const payload = await verifyToken(token, c.env.JWT_SECRET);

  if (!payload) {
    return c.json({ error: 'Unauthorized - Invalid or expired token' }, 401);
  }

  // Attach user to context
  c.set('user', {
    id: payload.userId,
    email: payload.email,
    name: '', // Will be fetched if needed
    role: payload.role,
  });

  await next();
}
