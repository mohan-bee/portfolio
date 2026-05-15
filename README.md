# Mohan Portfolio

Personal portfolio for Mohan, built with React and Vite.

## Features

- GitRoll profile stats
- GitHub contribution summary with local caching to reduce rate-limit issues
- Open source contribution explorer
- Ball Balancer project preview
- Google Docs resume link
- Experience section
- Click sound for interactive controls

## Run Locally

```bash
cd app
npm install
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

## Useful Commands

```bash
npm run lint
npm run build
npm run preview
```

## Notes

The contribution data uses the public GitHub Search API and caches results in the browser for 12 hours. If unauthenticated GitHub requests are rate-limited, the app falls back to saved data when available.
