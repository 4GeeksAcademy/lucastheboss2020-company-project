# Progress

## Status Snapshot
- Milestone 1 public website exists in static HTML/JS under `apps/`.
- Milestone 2 business logic exists in TypeScript under `src/`.
- Monorepo governance and memory-bank structure has now been initialized.

## Completed In This Milestone (So Far)
- Created `AGENTS.md` with mandatory workflow and protected-area policy.
- Created `.agents/rules/core-development-rule.md` with always-active development constraints.
- Created `memory-bank/projectbrief.md`, `memory-bank/techContext.md`, and `memory-bank/progress.md`.
- Implemented `skills/milestone-task-execution/SKILL.md` with reusable process and verifiable acceptance criteria.
- Initialized `uis/website` as Next.js + TypeScript public app.
- Initialized `uis/backoffice` as Next.js + TypeScript internal app.
- Added `services/` scaffold and API placeholder structure.
- Integrated Milestone 2 business logic into backoffice UI by importing from canonical `src/` modules.
- Installed dependencies and passed `typecheck` in both `uis/website` and `uis/backoffice`.

## Next Steps
1. Validate migrated website sections against Milestone 1 content requirements.
2. Optionally harden security by upgrading Next.js from 15.0.3 to a patched version.
3. Prepare PR summary with acceptance-criteria evidence.

## Risks / Watchouts
- Avoid accidental duplication of logic currently in `src/utils/*`.
- Keep public-site and backoffice responsibilities separate.
- Validate build/typecheck in both new apps before PR.
