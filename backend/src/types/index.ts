export interface Env {
  DB: D1Database;
  BLOG_IMAGES: R2Bucket;
  JWT_SECRET: string;
  FRONTEND_URL: string;
  R2_PUBLIC_URL: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthContext {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}
