# WiTCON 2027

Website for **WiTCON 2027**, Women in Computer Science's annual conference

**Live site:** _add Vercel URL once deployed_

---

## Tech Stack

| Layer              | Tool                          |
| ------------------ | ----------------------------- |
| Frontend framework | React (via Vite)              |
| Language           | TypeScript                    |
| Styling            | Tailwind CSS v4               |
| Backend / DB       | Supabase (Postgres + Storage) |
| Animations         | Framer Motion, CSS keyframes  |
| Hosting            | Vercel                        |

> **Note on Tailwind v4:** there is no `tailwind.config.js`. All global styles/theme tokens live in `src/index.css`.

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) — Node.js 20.19+ or 22.12+
- npm — included with Node.js
- Git
- VS Code (recommended)

You can check your versions with:

```bash
node -v
npm -v
git --version

---

## Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/wicsfiu/witcon2027.git
   cd witcon2027
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example file and fill in real values (get these from a team lead or the Supabase dashboard → Project Settings → API):

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

   **Never commit `.env`.** Only the anon (public) key goes in the frontend — the service role key is never used anywhere in this repo.

4. **Run the app locally**
   ```bash
   npm run dev
   ```
   The site will be running at `http://localhost:5173/`.

---

## Working with Supabase

- We're on Supabase's **free tier**. Know the limits:
  - 500MB database
  - **1GB file storage**
  - Free projects pause after 7 days with no API activity.
  - **No automatic backups:** We must manually export our data because Supabase won’t create backup copies for us if we accidentally delete or overwrite something.

---

## Deployment

Deployed on Vercel, connected to this repo. Pushes to `main` deploy to production; PRs get preview deployments automatically. Environment variables are set in the Vercel project settings (mirror whatever's in `.env.example`).
