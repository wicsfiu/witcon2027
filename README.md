# WiTCON 2027

Website for **WiTCON 2027**, Women in Computer Science's annual conference.

**Live site:** _add Vercel URL once deployed_

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion + CSS |
| Routing | React Router |
| Backend / Database | Supabase (planned) |
| Hosting | Vercel (planned) |

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
````

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

* Mobile
* Tablet
* Desktop

Example:

```tsx
<h1 className="text-4xl sm:text-5xl lg:text-7xl">
  WiTCON 2027
</h1>
```

---

## Performance

Performance is especially important because the website should work well on mobile devices and slower connections.

When adding visual effects:

### Prefer

* CSS transforms
* CSS opacity transitions
* SVG graphics
* Optimized images
* Small decorative elements
* Framer Motion for meaningful UI animation

---

## Supabase

Supabase is planned for WiTCON 2027 and will primarily be used for:

* Registration
* Conference-related dynamic data
* Potential file storage
* Other backend functionality as needed

Supabase is **not required for the current frontend development stage**.

When Supabase integration is ready, team members will be given the required environment variables.

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

Only the Supabase public/anon key may be used in frontend code.

The Supabase service role key must **never** be placed in the frontend or committed to this repository.

---

## Deployment

Deployed on Vercel, connected to this repo. Pushes to `main` deploy to production; PRs get preview deployments automatically. Environment variables are set in the Vercel project settings (mirror whatever's in `.env.example`).
