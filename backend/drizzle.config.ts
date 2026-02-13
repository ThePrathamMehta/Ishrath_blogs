import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  // Note: Drizzle Studio doesn't support D1 databases directly
  // Use wrangler d1 execute commands to query the database instead
});
