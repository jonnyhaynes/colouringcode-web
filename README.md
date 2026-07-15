# Colouring Code

The website for [Colouring Code](https://www.colouringcode.com) — a single-page [Next.js](https://nextjs.org) marketing site, styled with Tailwind-style utility classes and deployed on [Vercel](https://vercel.com).

## Tech stack

- **[Next.js 12](https://nextjs.org)** (Pages Router) — static single-page site
- **[React 18](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** (strict)
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
pages/index.tsx    The single landing page (content, head, analytics)
pages/_app.tsx     App shell — imports global styles
pages/api/         create-next-app scaffolding (hello.ts)
styles/app.css     Global styles / utility classes
public/            Static assets (favicons, images, manifest)
```
