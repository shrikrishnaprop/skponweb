# shri krishna properties (skp) — fullstack next.js

website and admin dashboard for shri krishna properties, srs royal hills, sector 87, faridabad. public phone: +91 98180 91646.

- **Frontend:** Next.js App Router
- **Auth:** Clerk (free tier)
- **Database:** Supabase Postgres (free tier)
- **APIs:** `/api/properties` and `/api/leads`
- **Hosting:** GitHub + Vercel Hobby

This stack stays on Vercel Hobby. SQLite is not used because Vercel serverless has no durable local disk.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000  
Admin: http://localhost:3000/admin (sign in with Clerk)

## One-time setup

### 1. Environment variables

Copy `.env.example` to `.env.local` if needed. You already have Clerk and Supabase public keys. Add the **Supabase service role** key (server-only):

1. Supabase dashboard → Project Settings → API
2. Copy `service_role` into `SUPABASE_SERVICE_ROLE_KEY`

Never commit `.env.local`. Never expose the service role key to the browser.

Set `ADMIN_EMAILS` to a comma-separated list of verified Clerk account email addresses allowed to use `/admin` and admin APIs. For example:

```env
ADMIN_EMAILS=owner@example.com,manager@example.com
```

Keep this variable server-only (do not prefix it with `NEXT_PUBLIC_`). If it is empty, admin access is denied to everyone. Add it to both local `.env.local` and the Vercel project's environment variables, then redeploy.

### 2. Create tables

In Supabase → SQL Editor, run `supabase/schema.sql`.

Until tables exist, the public homepage keeps showing sample listings.

### 3. Clerk

In the Clerk dashboard, add these redirect URLs:

- `http://localhost:3000/sign-in`
- `http://localhost:3000/admin`
- Your Vercel domain, for example `https://your-app.vercel.app/sign-in`

## API

| Method | Path | Who |
| --- | --- | --- |
| GET | `/api/properties` | Public |
| POST | `/api/properties` | Email allowlist admin |
| GET/PATCH/DELETE | `/api/properties/[id]` | GET public, writes allowlist admin |
| POST | `/api/leads` | Public contact form |
| GET | `/api/leads` | Email allowlist admin |

## Deploy on GitHub + Vercel

The repo remote is already `shrikrishnaprop/skponweb`.

1. Push `main` to GitHub.
2. In [Vercel](https://vercel.com), import that GitHub repo (Framework: Next.js).
3. Add the same environment variables as `.env.local`.
4. In Clerk, add the Vercel URL as an allowed origin / redirect.
5. Redeploy after saving env vars.

Contact form saves a lead in Supabase and still opens WhatsApp.
