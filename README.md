# Colouring Code

The website for [Colouring Code](https://www.colouringcode.com) — a [Next.js](https://nextjs.org) marketing site, styled with Tailwind-style utility classes and deployed on [Vercel](https://vercel.com). Mid-overhaul from a single holding page into a small multi-page agency site; see [`docs/plans/site-overhaul.md`](docs/plans/site-overhaul.md).

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router)
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** (strict, pinned to 6.x)
- **[Vercel](https://vercel.com)** for hosting and deploys

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
app/page.tsx       The landing page (content, analytics)
app/layout.tsx     Root layout — metadata, global styles, GA
styles/app.css     Global styles / utility classes
public/            Static assets (favicons, images, manifest)
```
