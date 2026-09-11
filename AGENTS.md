# TrackFlow Agent Workflow

This workflow applies before committing changes for any TrackFlow milestone.

## Required Pre-Commit Workflow

1. Read `CONTEXT.md` and confirm the change still matches TrackFlow's logistics domain, services, markets, and lead-capture requirements.
2. Review `.agents/memory-bank.md` for business context and technical conventions before editing application code.
3. Run the relevant local route or API check for the touched surface, such as `/uis/website`, `/uis/backoffice`, `/api/candidates`, or a dynamic candidate route.
4. Run `npm run typecheck` and fix any TypeScript errors before staging changes.
5. Run `npm run build` for App Router changes and confirm the build completes without route or API errors.
6. Inspect `git status --short` and avoid committing generated folders such as `.next/`, `dist/`, or TypeScript build info files.

## Application Scope

- `apps/` contains the original static public website assets.
- `src/` contains shared TrackFlow business types, validation, reporting, and candidate API client helpers.
- `app/` contains Next.js App Router pages and API routes.
- `uis/website` contains the public corporate website surface used by the `/uis/website` route.
- `uis/backoffice` contains the internal lead-candidate operations surface used by the `/uis/backoffice` route.
- `.agents/` contains reusable agent memory and skill instructions for TrackFlow work.
- `.agents/rules/trackflow-application.instructions.md` applies to application code in `app/`, `uis/`, and `src/`.
