# WiTCON 2027

Website for **WiTCON 2027**, Women in Computer Science's annual conference.

**Live site:** _add Vercel URL once deployed_

---

## Tech Stack

| Layer              | Tool                |
| ------------------ | ------------------- |
| Frontend framework | React + Vite        |
| Language           | TypeScript          |
| Styling            | Tailwind CSS v4     |
| Animations         | Framer Motion + CSS |
| Routing            | React Router        |
| Backend / Database | Supabase            |
| Hosting            | Vercel (planned)    |

> **Note on Tailwind CSS v4:** This project uses the current Tailwind v4 Vite integration. There is no `tailwind.config.js`. Global styles and WiTCON theme tokens are defined in `src/index.css`.

---

## Prerequisites

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/) — Node.js 20.19+ or 22.12+
- npm — included with Node.js
- Git
- VS Code (recommended)

You can check your versions with:

```bash
node -v
npm -v
git --version
```

> **Note:** You do **not** need to install TypeScript globally. TypeScript is installed locally as a project dependency when you run `npm install`.

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/wicsfiu/witcon2027.git
cd witcon2027
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The site will be available at:

```text
http://localhost:5173/
```

The development server automatically updates when you save changes.

---

## Responsive Design

Every component should be tested on:

- Mobile
- Tablet
- Desktop

Example:

```tsx
<h1 className="text-4xl sm:text-5xl lg:text-7xl">WiTCON 2027</h1>
```

---

## Performance

Performance is especially important because the website should work well on mobile devices and slower connections.

When adding visual effects:

### Prefer

- CSS transforms
- CSS opacity transitions
- SVG graphics
- Optimized images
- Small decorative elements
- Framer Motion for meaningful UI animation

---

## Supabase

Supabase is used for WiTCON 2027 authentication, registration, and private resume storage:

- Registration
- Conference-related dynamic data
- Potential file storage
- Other backend functionality as needed

The frontend requires the two public client variables in `.env`.

### Working with Supabase

- We're on Supabase's **free tier**. Know the limits:
  - 500MB database
  - **1GB file storage**
  - Free projects pause after 7 days with no API activity.
  - **No automatic backups:** We must manually export our data because Supabase won’t create backup copies for us if we accidentally delete or overwrite something.

### Environment Variables

Supabase credentials will be stored locally in:

```text
.env
```

Example:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Never commit `.env` to GitHub.

Never add a service-role key or Google client secret to Vite environment
variables. The publishable/anon key is safe for browser use only because the
database and storage are protected by RLS.

### Authentication and OAuth setup

Apply `supabase/migrations/20261008180000_registration_security.sql` to the
intended Supabase project after confirming that the existing `registrations`
columns match the fields used by `src/data/registration.ts`. Resolve duplicate
`user_id` values before applying the unique index.

For local development:

- Supabase Auth URL Configuration must allow `http://localhost:5173/**`.
- Google Cloud's authorized redirect URI must be the exact Supabase Google
  provider callback URL (not the React `/auth/callback` route).
- OAuth returns the browser to `http://localhost:5173/auth/callback`.

For production, add the deployed app origin and its callback URL to Supabase's
allowed redirect URLs and configure the deployed origin as a Google authorized
JavaScript origin. Keep the provider callback URI supplied by Supabase.

Email confirmation is controlled by Supabase Auth. If it remains enabled,
new email/password users must confirm their address before logging in; attendee
data is not created until an authenticated session exists.

The `resumes` bucket must remain private. The migration limits it to PDF files
of 600 KiB and restricts object paths to the authenticated user's
`<user-id>/resume.pdf`. Client-side checks are only a usability measure, not a
security boundary.

The Supabase service role key must **never** be placed in the frontend or committed to this repository.

---

## Deployment

Deployed on Vercel, connected to this repo. Pushes to `main` deploy to production; PRs get preview deployments automatically. Environment variables are set in the Vercel project settings (mirror whatever's in `.env.example`).
