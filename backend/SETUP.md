# Backend Setup Guide

## Database: Cloudflare D1

**Cloudflare D1** is a serverless SQLite database that runs on Cloudflare's edge network. It's completely free to use (with generous limits) and requires no separate server or hosting.

### Why D1?

- ✅ **Serverless** - No database server to manage
- ✅ **Free tier** - 5GB storage, 5 million reads/day
- ✅ **Fast** - Runs on Cloudflare's edge network
- ✅ **SQLite** - Familiar SQL syntax
- ✅ **No separate hosting** - Integrated with Workers

## Step-by-Step Setup

### 1. Install Wrangler CLI (Cloudflare's CLI tool)

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate with your Cloudflare account. If you don't have one, create a free account at https://dash.cloudflare.com/sign-up

### 3. Create D1 Database

```bash
cd backend
wrangler d1 create inkwell-blog
```

**Output will look like:**

```
✅ Successfully created DB 'inkwell-blog'!

[[d1_databases]]
binding = "DB"
database_name = "inkwell-blog"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 4. Update wrangler.toml

Copy the `database_id` from the output above and paste it into `backend/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "inkwell-blog"
database_id = "paste-your-database-id-here"  # ← Update this!
```

### 5. Generate Database Migrations

```bash
npm run db:generate
```

This creates SQL migration files in the `drizzle` folder based on your schema.

### 6. Run Migrations

**For local development:**

```bash
npm run db:migrate:local
```

**For production (after deployment):**

```bash
npm run db:migrate:remote
```

### 7. Environment Variables

**There is NO .env file needed!**

Cloudflare Workers use `wrangler.toml` for configuration. The environment variables are already set in `wrangler.toml`:

```toml
[vars]
JWT_SECRET = "your-super-secret-jwt-key-change-in-production"
FRONTEND_URL = "http://localhost:3000"
```

**Important:** Change `JWT_SECRET` to a secure random string before deploying to production!

You can generate a secure secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 8. Run Development Server

```bash
npm run dev
```

Your API will be available at `http://localhost:8787`

### 9. Test the API

**Health check:**

```bash
curl http://localhost:8787/
```

**Register admin user:**

```bash
curl -X POST http://localhost:8787/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@theinkwell.com",
    "password": "securepassword123",
    "name": "Admin User"
  }'
```

## Database Access

### View Database in Drizzle Studio

```bash
npm run db:studio
```

This opens a web UI to browse and edit your database.

### Query Database Directly

```bash
# Local database
wrangler d1 execute inkwell-blog --local --command "SELECT * FROM users"

# Production database
wrangler d1 execute inkwell-blog --command "SELECT * FROM users"
```

## Deployment to Production

### 1. Deploy to Cloudflare Workers

```bash
npm run deploy
```

### 2. Run Production Migrations

```bash
npm run db:migrate:remote
```

### 3. Update Frontend URL

In `wrangler.toml`, update the production frontend URL:

```toml
[env.production.vars]
FRONTEND_URL = "https://yourdomain.com"
```

### 4. Your API will be live at:

```
https://inkwell-backend.YOUR-SUBDOMAIN.workers.dev
```

## Cloudflare Dashboard

You can view and manage your database at:
https://dash.cloudflare.com → Workers & Pages → D1

## Cost

**100% FREE** for most use cases:

- 5 GB storage
- 5 million reads per day
- 100,000 writes per day

Perfect for a blog with thousands of daily visitors!

## Troubleshooting

### "Database not found" error

- Make sure you ran `wrangler d1 create inkwell-blog`
- Check that `database_id` in `wrangler.toml` matches the created database

### "Unauthorized" error

- Run `wrangler login` to authenticate

### Migration errors

- Delete `drizzle` folder and run `npm run db:generate` again
- Make sure you're in the `backend` directory

## Summary

1. ✅ No separate database hosting needed
2. ✅ No .env file needed (use wrangler.toml)
3. ✅ Database is created with `wrangler d1 create`
4. ✅ Completely free for most use cases
5. ✅ Runs on Cloudflare's global edge network
