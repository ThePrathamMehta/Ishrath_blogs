# The Inkwell Backend

Cloudflare Workers backend for The Inkwell blog with D1 database.

## Features

- 🔐 JWT Authentication
- 📝 Blog CRUD API with pagination & search
- 📧 Newsletter subscription management
- 📬 Contact form handling
- 🗄️ D1 SQLite database
- 🚀 Serverless edge computing

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Auth**: JWT + bcrypt

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create D1 Database

```bash
# Create the database
npx wrangler d1 create inkwell-blog

# Copy the database_id from the output and update wrangler.toml
```

### 3. Generate and Run Migrations

```bash
# Generate migration files
npm run db:generate

# Apply migrations locally
npm run db:migrate:local

# Apply migrations to production
npm run db:migrate:remote
```

### 4. Update Environment Variables

Edit `wrangler.toml` and update:

- `database_id` - from step 2
- `JWT_SECRET` - use a secure random string
- `FRONTEND_URL` - your frontend URL

### 5. Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login and get JWT token

### Blog Posts

- `GET /api/blog` - List published posts (public)
- `GET /api/blog/:slug` - Get single post (public)
- `GET /api/blog/admin/all` - List all posts including drafts (admin)
- `POST /api/blog` - Create new post (admin)
- `PUT /api/blog/:slug` - Update post (admin)
- `PATCH /api/blog/:slug/publish` - Publish/unpublish post (admin)
- `DELETE /api/blog/:slug` - Delete post (admin)

### Newsletter

- `POST /api/newsletter/subscribe` - Subscribe to newsletter (public)
- `POST /api/newsletter/unsubscribe` - Unsubscribe (public)
- `GET /api/newsletter/subscribers` - List subscribers (admin)

### Contact

- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact/submissions` - List submissions (admin)
- `PATCH /api/contact/:id/read` - Mark as read (admin)
- `DELETE /api/contact/:id` - Delete submission (admin)

## Database Schema

- **users** - Admin users
- **blog_posts** - Blog articles
- **newsletter_subscribers** - Email subscribers
- **contact_submissions** - Contact form submissions
- **blog_tags** - Post tags
- **blog_post_tags** - Post-tag relationships

## Deployment

```bash
npm run deploy
```

## Development

```bash
# Run local dev server
npm run dev

# Generate migrations
npm run db:generate

# View database in Drizzle Studio
npm run db:studio
```

## Example Usage

### Register Admin

```bash
curl -X POST http://localhost:8787/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@theinkwell.com",
    "password": "securepassword123",
    "name": "Admin User"
  }'
```

### Create Blog Post

```bash
curl -X POST http://localhost:8787/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Future of Literature",
    "excerpt": "Exploring modern storytelling techniques",
    "content": "Full article content here...",
    "category": "Literature",
    "published": true
  }'
```

### Subscribe to Newsletter

```bash
curl -X POST http://localhost:8787/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "reader@example.com"
  }'
```

## License

MIT
