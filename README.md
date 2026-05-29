# Roots Grocery

A mobile-first digital farmstand webstore inspired by the [Roots](https://aa8d7dc8-2298-4b06-80bf-41d2177b6a82-00-yw1lh5td9jp7.riker.replit.dev/) reference UI — dark forest green theme, cream product cards, and terracotta accents.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://127.0.0.1:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Features

- **Shop home** — search, diet filters (Vegetarian, Vegan, Keto, Low-sugar, Gluten-free), and a two-column product grid
- **Product detail** — full description, tags, quantity picker, add to cart
- **Cart** — adjust quantities, remove items, persisted in `localStorage`
- **Checkout & confirmation** — simple order form and success screen

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Wouter, Lucide React, Google Sign-In (`@react-oauth/google`)

## Google sign-in (Profile)

The **Profile** page (`/profile`) supports Sign in with Google.

### 1. Create OAuth credentials

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Go to **APIs & Services → Credentials → Create credentials → OAuth client ID**
4. Application type: **Web application**
5. **Authorized JavaScript origins:**
   - `http://localhost:5173` (local dev)
   - `https://your-app.onrender.com` (production URL after deploy)
6. Copy the **Client ID**

### 2. Local development

```bash
cp .env.example .env
# Paste your Client ID into .env:
# VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
npm run dev
```

### 3. Render production

In the Render Dashboard → your static site → **Environment**:

| Key | Value |
|-----|-------|
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Web Client ID |

Redeploy after adding the variable (Vite bakes env vars at build time).

## Deploy to Render

This app is a static SPA. Render builds it and serves the `dist` folder over a global CDN.

### Prerequisites

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. A [Render](https://render.com) account.

### Option A — Blueprint (recommended)

The repo includes `render.yaml` with build settings, SPA routing, and cache headers.

1. Commit and push all files (including `render.yaml`):

   ```bash
   git init
   git add .
   git commit -m "Add Roots Grocery app with Render config"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/roots-grocery.git
   git push -u origin main
   ```

2. Open the Blueprint deploy link (replace with your repo URL):

   ```
   https://dashboard.render.com/blueprint/new?repo=https://github.com/YOUR_USER/roots-grocery
   ```

3. Connect your Git provider if prompted, review the service, and click **Apply**.

4. Wait for the build to finish. Your site will be live at `https://roots-grocery.onrender.com` (or a similar `*.onrender.com` URL).

No environment variables are required — the app runs entirely in the browser with `localStorage` for the cart.

### Option B — Manual static site

In the [Render Dashboard](https://dashboard.render.com/static/new):

| Setting | Value |
|---------|-------|
| **Build command** | `npm install && npm run build` |
| **Publish directory** | `dist` |

Then add a rewrite rule under **Redirects/Rewrites**:

| Source | Destination | Action |
|--------|-------------|--------|
| `/*` | `/index.html` | Rewrite |

This ensures direct links to `/cart`, `/product/:id`, and other client routes work.
