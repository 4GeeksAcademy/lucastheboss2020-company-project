# Core Development Rule (Always Active)

## Scope
- Applies to all files in this repository (`**/*`).

## Rule
Before writing code, the agent must:
1. Read `CONTEXT.md` and the three memory-bank files.
2. Prefer extension of existing modules over creating duplicates.
3. Keep business logic in reusable TypeScript modules and import it into apps.
4. Keep API/server work inside `services/` only.
5. Stop and ask for confirmation when touching protected areas listed in `AGENTS.md`.

## File-Pattern Constraints
- `uis/website/**`: public corporate site only.
- `uis/backoffice/**`: internal operational app only.
- `src/utils/**` and `src/types/**`: canonical business logic/types (import, do not clone).
- `services/**`: backend/API scaffolds and future endpoints.

## Verification Gate
Any delivery must include a brief check showing:
- Which existing module(s) were reused.
- Which acceptance criteria were validated.
- What was updated in `memory-bank/progress.md`.
