# AGENTS.md

## Purpose
This file defines how any AI agent must operate in this monorepo before making code changes.

## Mandatory Start-of-Session Reads
Read these files in order before editing anything:
1. `CONTEXT.md`
2. `memory-bank/projectbrief.md`
3. `memory-bank/techContext.md`
4. `memory-bank/progress.md`
5. `.agents/rules.md`

If any memory-bank file is missing or outdated, create/update it before writing feature code.

## Mandatory Workflow Before Every Commit
1. Align task scope with `CONTEXT.md` and list acceptance criteria in the working notes.
2. Identify reusable code first (`src/`, `packages/`) and avoid logic duplication.
3. Implement the smallest safe change set and keep architecture boundaries:
   - public UI under `uis/website`
   - internal UI under `uis/backoffice`
   - APIs under `services/`
4. Run validation checks (typecheck/build/tests relevant to changed scope).
5. Update `memory-bank/progress.md` with what changed, known risks, and next steps.
6. Only then create the commit/PR summary.

## Confirmation-Gated Areas
An agent must request explicit developer confirmation before:
- Changing or deleting anything in `src/` existing business logic modules.
- Editing files under `memory-bank/` created by humans.
- Introducing new top-level folders other than `uis/` and `services/`.
- Modifying CI, git hooks, or repository-wide policy files.

## Architecture Rules
- Reuse Milestone 2 business logic by importing from existing TypeScript modules.
- Do not copy/paste domain logic into UI apps.
- Keep public-site and backoffice layouts separate.
- Any backend/API endpoint must be created under `services/`.

## Done Definition (Agent)
A task is only done when:
- Acceptance criteria are verifiably met.
- Required checks pass for touched areas.
- Documentation and memory bank are updated.
- Changes are ready for PR review without hidden assumptions.
