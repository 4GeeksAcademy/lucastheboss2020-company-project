# `apps` Folder

This folder contains **all the applications of the monorepo** related to the company for the cross-functional AI Engineering project (for example: web applications, APIs, internal dashboards, customer portals, etc.).

Each subfolder inside `apps/` must correspond to **one specific application** (for example: `web-portal`, `admin-api`, `backoffice-dashboard`) and include its own technical and functional documentation.

- **Main purpose**: to centralize in a single monorepo all the applications that support the company's use cases.
- **Recommendation**: document in this file (or in sub-READMEs) the applications you add, their objective, the technology used, and how to run them in development, testing, and production environments.

## Run locally (Codespaces compatible)

From the repository root:

```bash
npx serve apps -l 3000
```

Open the forwarded port URL and visit:

- `/index.html`
- `/application.html`

## Performance verification (required)

1. Publish the site to Vercel so it has a public URL.
2. Open [PageSpeed Insights](https://pagespeed.web.dev/).
3. Run analysis against the Vercel production URL.
4. Record mobile and desktop scores.
5. Target minimum score: **80** (ideal: **90+**).
