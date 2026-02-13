import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import type { AuthContext, Env } from '../types';

const app = new Hono<{ Bindings: Env; Variables: AuthContext }>();

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Helper function to generate unique filename
function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  return `${timestamp}-${random}.${extension}`;
}

// Upload cover/featured image
app.post('/cover', authMiddleware, async (c) => {
  try {
    const formData = await c.req.formData();
    const fileEntry = formData.get('image');

    // Check if file exists and is a File instance
    if (!fileEntry || typeof fileEntry === 'string') {
      return c.json({ error: 'No image file provided' }, 400);
    }

    const file = fileEntry as File;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return c.json(
        {
          error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF',
        },
        400
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return c.json(
        {
          error: 'File too large. Maximum size is 5MB',
        },
        400
      );
    }

    // Generate unique filename
    const filename = `covers/${generateFilename(file.name)}`;

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await c.env.BLOG_IMAGES.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Return the key and public URL
    const publicUrl = `${c.env.R2_PUBLIC_URL}/${filename}`;

    return c.json({
      success: true,
      key: filename,
      url: publicUrl,
    });
  } catch (error) {
    console.error('Cover image upload error:', error);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

// Upload content/editor image
app.post('/content', authMiddleware, async (c) => {
  try {
    const formData = await c.req.formData();
    const fileEntry = formData.get('image');

    // Check if file exists and is a File instance
    if (!fileEntry || typeof fileEntry === 'string') {
      return c.json({ error: 'No image file provided' }, 400);
    }

    const file = fileEntry as File;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return c.json(
        {
          error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF',
        },
        400
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return c.json(
        {
          error: 'File too large. Maximum size is 5MB',
        },
        400
      );
    }

    // Generate unique filename
    const filename = `content/${generateFilename(file.name)}`;

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await c.env.BLOG_IMAGES.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Return the key and public URL
    const publicUrl = `${c.env.R2_PUBLIC_URL}/${filename}`;

    return c.json({
      success: true,
      key: filename,
      url: publicUrl,
    });
  } catch (error) {
    console.error('Content image upload error:', error);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

// Delete image (optional - for cleanup)
app.delete('/:key', authMiddleware, async (c) => {
  try {
    const key = c.req.param('key');

    // Decode the key (it might be URL encoded)
    const decodedKey = decodeURIComponent(key);

    await c.env.BLOG_IMAGES.delete(decodedKey);

    return c.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Image delete error:', error);
    return c.json({ error: 'Failed to delete image' }, 500);
  }
});

export default app;
