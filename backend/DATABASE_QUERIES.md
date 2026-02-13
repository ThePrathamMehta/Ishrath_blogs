# Viewing Your D1 Database

Since Drizzle Studio doesn't support Cloudflare D1 databases, here are alternative ways to view and query your database:

## Method 1: Wrangler CLI (Recommended)

### View all tables

```bash
wrangler d1 execute ishrath-blog --local --command "SELECT name FROM sqlite_master WHERE type='table'"
```

### Query users table

```bash
wrangler d1 execute ishrath-blog --local --command "SELECT * FROM users"
```

### Query blog posts

```bash
wrangler d1 execute ishrath-blog --local --command "SELECT * FROM blog_posts"
```

### Query newsletter subscribers

```bash
wrangler d1 execute ishrath-blog --local --command "SELECT * FROM newsletter_subscribers"
```

### Query contact submissions

```bash
wrangler d1 execute ishrath-blog --local --command "SELECT * FROM contact_submissions"
```

### Count records

```bash
wrangler d1 execute ishrath-blog --local --command "SELECT COUNT(*) as count FROM blog_posts"
```

## Method 2: Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** → **D1**
3. Click on your `ishrath-blog` database
4. Use the **Console** tab to run SQL queries

## Method 3: API Endpoints

Use your API endpoints to view data:

```bash
# Get all blog posts
curl http://localhost:8787/api/blog

# Get subscribers (requires auth)
curl http://localhost:8787/api/newsletter/subscribers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get contact submissions (requires auth)
curl http://localhost:8787/api/contact/submissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Common Queries

### Insert test blog post

```bash
wrangler d1 execute ishrath-blog --local --command "
INSERT INTO blog_posts (slug, title, excerpt, content, category, author_id, published, published_at, created_at, updated_at)
VALUES ('test-post', 'Test Post', 'This is a test', 'Full content here', 'Literature', 1, 1, unixepoch(), unixepoch(), unixepoch())
"
```

### View recent posts

```bash
wrangler d1 execute ishrath-blog --local --command "
SELECT id, title, slug, category, published FROM blog_posts ORDER BY created_at DESC LIMIT 10
"
```

### Check database schema

```bash
wrangler d1 execute ishrath-blog --local --command "
SELECT sql FROM sqlite_master WHERE type='table' AND name='blog_posts'
"
```

## For Production Database

Replace `--local` with `--remote` to query the production database:

```bash
wrangler d1 execute ishrath-blog --remote --command "SELECT * FROM users"
```

## Note

The `npm run db:studio` command doesn't work with D1 databases because Drizzle Studio requires a direct database connection, which D1 doesn't provide. Use the methods above instead!
