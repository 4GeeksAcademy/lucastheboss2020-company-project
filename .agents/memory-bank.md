# TrackFlow Memory Bank

## Business Context

- TrackFlow is a last-mile delivery, warehouse management, and reverse logistics company founded in 2009 in Los Angeles.
- TrackFlow operates in the United States through Los Angeles and in Spain through Zaragoza.
- The commercial stakeholder is Miguel Torres, Commercial Director, and the technical stakeholder is CTO Andres Kim.
- Target customers are mid-sized fashion, electronics, and cosmetics e-commerce brands.
- The public website must explain services, show binational coverage, and capture qualified logistics leads.
- Low-volume prospects with `0-100` monthly shipments should receive a warning because TrackFlow may not be the most efficient fit.

## Technical Context

- The project uses Next.js App Router from the root `app/` directory and runs with `npm run dev`.
- TypeScript validation is documented as `npm run typecheck`, which runs `tsc --noEmit`.
- Shared domain models live in `src/types/models.ts`; candidate-specific API types live in `src/candidates/types.ts`.
- Candidate API routes live under `app/api/candidates` and support `GET`, `POST`, `PUT`, `PATCH`, and note deletion.
- Public route `/uis/website` imports its UI from `uis/website`.
- Internal route `/uis/backoffice` imports its UI from `uis/backoffice` and displays company-relevant lead pipeline output on screen.
