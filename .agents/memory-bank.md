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

## Product Requirements

- The public landing page order is Header, Hero, Services, Coverage, Why TrackFlow, Contact, and Footer.
- The lead form captures company identity, operating market, product type, monthly volume, requested services, current 3PL status, comments, and privacy acceptance.
- Form validation must use the exact messages in `CONTEXT.md`, including the phone country-code rule, at-least-one service rule, 500-character comment limit, and low-volume warning.
- Valid public submissions create a `new` candidate at the `intake` stage assigned to the Commercial Desk.
- The required Organization Schema.org markup belongs on the public landing page.

## Workflow Conventions

- Keep `app/uis/*` route files as thin importers; implement public and backoffice behavior under `uis/website` and `uis/backoffice`.
- Reuse `src/candidates/types.ts`, `src/candidates/api.ts`, and `src/utils/validations.ts` instead of creating duplicate lead contracts.
- Before a milestone commit, check the relevant route/API, run `npm run typecheck`, run `npm run build` for App Router changes, and inspect `git status --short`.

## Progress

- Milestones 1-3 established the TrackFlow domain model, candidate API, CRUD screens, and initial website/backoffice routes.
- Milestone 4 completes the public form submission workflow, replaces the unrelated talent tracker with the logistics lead pipeline, and formalizes agent memory/workflow documentation.
