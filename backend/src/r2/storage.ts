import type { Env } from '../types';

export async function uploadImageToR2(file: File, folder: string, env: Env): Promise<string> {
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Allowed types: JPEG, PNG, WebP, GIF');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large. Maximum size is 5MB');
  }

  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `${folder}/${timestamp}-${random}.${extension}`;

  const arrayBuffer = await file.arrayBuffer();
  await env.BLOG_IMAGES.put(filename, arrayBuffer, {
    httpMetadata: {
      contentType: file.type,
    },
  });

  return `${env.R2_PUBLIC_URL}/${filename}`;
}
