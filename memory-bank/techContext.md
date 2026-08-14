# Technical Context

## Stack
- TypeScript domain logic in `src/`
- Next.js + TypeScript apps in `uis/website` and `uis/backoffice`
- Shared monorepo conventions documented in `AGENTS.md` and `.agents/rules/`

## Architectural Decisions
1. `src/types/*` and `src/utils/*` are canonical business-logic sources for Milestone 2.
2. UI apps must import canonical modules instead of copying logic.
3. Public and internal apps have separate app roots and layouts.
4. Future API code belongs under `services/`.
5. Memory-bank files are required startup context for agents.

## Technical Constraints
- Keep strict TypeScript where possible.
- Preserve existing behavior for:
  - bilingual toggle
  - application-form validation rules
  - reporting calculations from Milestone 2
- Avoid destructive edits to existing business-logic files unless explicitly approved.

## Integration Targets
- Backoffice must render business outcomes in UI (not console-only):
  - jobs by service
  - jobs by property type
  - total revenue
  - average job price
  - labor cost per job
  - employees with most hours worked
