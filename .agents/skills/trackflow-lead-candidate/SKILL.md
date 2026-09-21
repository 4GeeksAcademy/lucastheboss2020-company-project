# TrackFlow Lead Candidate Skill

## Objective

Maintain TrackFlow lead-candidate workflows so public website submissions, candidate records, pipeline status, stages, and notes remain consistent with `CONTEXT.md`.

## Inputs

- `CONTEXT.md` for TrackFlow business rules, services, markets, and form fields.
- `src/types/models.ts` for shared logistics and lead entity types.
- `src/candidates/types.ts` for candidate API payload and response contracts.
- `app/api/candidates` for route handlers and in-memory candidate data.
- `uis/website` and `uis/backoffice` for user-facing route content.

## Acceptance Criteria

- Candidate fields use TrackFlow terminology and include company, contact, email, phone, country, product type, monthly volume, service interest, 3PL status, comments, privacy acceptance, status, and stage.
- API changes preserve working `GET`, `POST`, `PUT`, `PATCH`, note `POST`, and note `DELETE` behavior.
- UI changes expose loading, success, and error states for asynchronous operations.
- `/uis/website` renders a complete public TrackFlow corporate website aligned with `CONTEXT.md`.
- `/uis/backoffice` renders company-relevant candidate pipeline data on screen.
- `npm run typecheck` and `npm run build` pass.
