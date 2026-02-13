import { and, desc, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { z } from 'zod';
import { blogPosts, users } from '../db/schema';
import { authMiddleware } from '../middleware/auth';
import type { AuthContext, Env } from '../types';
import { generateUniqueSlug, slugify } from '../utils/slugify';

const app = new Hono<{ Bindings: Env; Variables: AuthContext }>();

// Validation schemas
const createBlogSchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  category: z.enum(['Literature', 'Culture', 'Journalism', 'Essays']),
  featuredImage: z.string().url().optional(),
  published: z.boolean().optional().default(false),
});

const updateBlogSchema = createBlogSchema.partial();

// Get all published blog posts (public)
app.get('/', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const category = c.req.query('category');
    const search = c.req.query('search');
    const offset = (page - 1) * limit;

    let conditions = [eq(blogPosts.published, true)];

    if (category) {
      conditions.push(eq(blogPosts.category, category));
    }

    if (search) {
      conditions.push(
        sql`(${blogPosts.title} LIKE ${`%${search}%`} OR ${blogPosts.excerpt} LIKE ${`%${search}%`})`
      );
    }

    const posts = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        publishedAt: blogPosts.publishedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(and(...conditions))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .where(and(...conditions))
      .get();

    const total = totalResult?.count || 0;

    return c.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get single blog post by slug (public)
app.get('/:slug', async (c) => {
  try {
    const { slug } = c.req.param();
    const db = drizzle(c.env.DB);

    const post = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        content: blogPosts.content,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        published: blogPosts.published,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(eq(blogPosts.slug, slug))
      .get();

    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    // Only return published posts to non-authenticated users
    if (!post.published) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all posts including drafts (admin only)
app.get('/admin/all', authMiddleware, async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');
    const offset = (page - 1) * limit;

    const posts = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        published: blogPosts.published,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
      })
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogPosts)
      .get();

    const total = totalResult?.count || 0;

    return c.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create new blog post (admin only)
app.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const validated = createBlogSchema.parse(body);
    const db = drizzle(c.env.DB);

    // Generate slug
    const baseSlug = slugify(validated.title);
    const existingPosts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
    const existingSlugs = existingPosts.map((p) => p.slug);
    const slug = generateUniqueSlug(baseSlug, existingSlugs);

    // Create post
    const result = await db
      .insert(blogPosts)
      .values({
        slug,
        title: validated.title,
        excerpt: validated.excerpt,
        content: validated.content,
        category: validated.category,
        featuredImage: validated.featuredImage,
        authorId: c.get('user').id,
        published: validated.published || false,
        publishedAt: validated.published ? new Date() : null,
      })
      .returning();

    return c.json(
      {
        message: 'Blog post created successfully',
        post: result[0],
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Create post error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update blog post (admin only)
app.put('/:slug', authMiddleware, async (c) => {
  try {
    const { slug } = c.req.param();
    const body = await c.req.json();
    const validated = updateBlogSchema.parse(body);
    const db = drizzle(c.env.DB);

    // Check if post exists
    const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).get();
    if (!existingPost) {
      return c.json({ error: 'Post not found' }, 404);
    }

    // Update slug if title changed
    let newSlug = slug;
    if (validated.title && validated.title !== existingPost.title) {
      const baseSlug = slugify(validated.title);
      const allPosts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
      const existingSlugs = allPosts.map((p) => p.slug).filter((s) => s !== slug);
      newSlug = generateUniqueSlug(baseSlug, existingSlugs);
    }

    // Update post
    const result = await db
      .update(blogPosts)
      .set({
        ...validated,
        slug: newSlug,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.slug, slug))
      .returning();

    return c.json({
      message: 'Blog post updated successfully',
      post: result[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Update post error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Publish/unpublish post (admin only)
app.patch('/:slug/publish', authMiddleware, async (c) => {
  try {
    const { slug } = c.req.param();
    const { published } = await c.req.json();
    const db = drizzle(c.env.DB);

    const result = await db
      .update(blogPosts)
      .set({
        published: published,
        publishedAt: published ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.slug, slug))
      .returning();

    if (result.length === 0) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json({
      message: `Post ${published ? 'published' : 'unpublished'} successfully`,
      post: result[0],
    });
  } catch (error) {
    console.error('Publish post error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete blog post (admin only)
app.delete('/:slug', authMiddleware, async (c) => {
  try {
    const { slug } = c.req.param();
    const db = drizzle(c.env.DB);

    const result = await db.delete(blogPosts).where(eq(blogPosts.slug, slug)).returning();

    if (result.length === 0) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
