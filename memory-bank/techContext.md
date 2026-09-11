# TrackFlow Technical Context

## Stack

- Next.js App Router with React and TypeScript
- Root application routes under `app/`
- UI surfaces under `uis/website` and `uis/backoffice`
- Shared domain models under `src/types/models.ts`
- Candidate API contracts under `src/candidates/types.ts`
- In-memory candidate data and API handlers under `app/api/candidates`

## Architecture

- Files under `app/uis/*` are thin route importers.
- Public website behavior belongs in `uis/website`.
- Internal lead operations behavior belongs in `uis/backoffice`.
- Client API access uses typed helpers from `src/candidates/api.ts`.
- Domain validation is centralized in `src/utils/validations.ts`.

## API Contract

- `GET /api/candidates` lists filtered and paginated logistics leads.
- `POST /api/candidates` validates and creates a lead.
- Candidate status values are `new`, `qualified`, `contacted`, and `not-fit`.
- Candidate stages are `intake`, `discovery`, `proposal`, and `implementation`.
- Public submissions start as `new` and `intake`.

## Constraints

- Preserve TrackFlow terminology and exact validation messages from `CONTEXT.md`.
- Do not introduce a second lead model or endpoint without explicit approval.
- Keep public and internal route concerns separate.
- Treat `.next/`, `dist/`, and TypeScript build-info output as generated files.
