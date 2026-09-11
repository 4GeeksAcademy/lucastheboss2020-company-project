# TrackFlow Agent Workflow

This workflow applies before committing changes for any TrackFlow milestone.

## Before Editing

- Read `CONTEXT.md`, `memory-bank/projectBrief.md`, `memory-bank/techContext.md`, `memory-bank/progress.md`, and `.agents/memory-bank.md` before changing application code.
- Confirm public copy, lead fields, validation messages, and workflow behavior still match TrackFlow's logistics domain.
- Keep reusable agent guidance under `.agents/` and keep route files under `app/uis/*` as thin importers.

## Developer Confirmation Required

Do not modify these areas without explicit developer confirmation:

- Production configuration, deployment files, secrets, environment variables, or authentication.
- The public TrackFlow business requirements in `CONTEXT.md`.
- Existing API contracts, candidate status/stage values, or data persistence strategy.
- Legacy assets under `apps/`, generated output under `.next/` and `dist/`, or dependency manifests unrelated to the requested change.

## Required Pre-Commit Workflow

1. Read `CONTEXT.md` and confirm the change still matches TrackFlow's logistics domain, services, markets, and lead-capture requirements.
2. Review `.agents/memory-bank.md` for business context and technical conventions before editing application code.
3. Run the relevant local route or API check for the touched surface, such as `/uis/website`, `/uis/backoffice`, `/api/candidates`, or a dynamic candidate route.
4. Run `npm run typecheck` and fix any TypeScript errors before staging changes.
5. Run `npm run build` for App Router changes and confirm the build completes without route or API errors.
6. Inspect `git status --short` and avoid committing generated folders such as `.next/`, `dist/`, or TypeScript build info files.

## Milestone 4 Surface Checks

- Verify `/uis/website` renders the required landing-page sections and submits valid information requests to `/api/candidates`.
- Verify `/uis/backoffice` shows logistics lead candidates and supports search, status, stage, pagination, and candidate detail links.
- Verify `/api/candidates` rejects invalid lead payloads and creates valid leads with the expected initial pipeline values.

## Application Scope

- `apps/` contains the original static public website assets.
- `src/` contains shared TrackFlow business types, validation, reporting, and candidate API client helpers.
- `app/` contains Next.js App Router pages and API routes.
- `uis/website` contains the public corporate website surface used by the `/uis/website` route.
- `uis/backoffice` contains the internal lead-candidate operations surface used by the `/uis/backoffice` route.
- `.agents/` contains reusable agent memory and skill instructions for TrackFlow work.
- `.agents/rules/trackflow-application.instructions.md` applies to application code in `app/`, `uis/`, and `src/`.
- `memory-bank/` contains the evaluator-facing project brief, technical context, and progress records.
