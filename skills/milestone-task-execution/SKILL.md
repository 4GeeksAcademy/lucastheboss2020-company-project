# Skill: Milestone Task Execution

## Objective
Execute recurring milestone implementation tasks in a consistent, verifiable way aligned with this monorepo's business and technical constraints.

## When To Use
Use this skill when a ticket asks to implement or migrate features across multiple folders (for example: governance + UI + shared logic + docs) and requires acceptance criteria validation.

## Required Inputs
- Task statement with explicit deliverables
- `CONTEXT.md`
- `AGENTS.md`
- `.agents/rules/core-development-rule.md`
- `memory-bank/projectbrief.md`
- `memory-bank/techContext.md`
- `memory-bank/progress.md`

## Procedure
1. Parse the task into concrete deliverables and map each deliverable to target files.
2. Identify canonical reusable modules before writing code.
3. Implement changes in ordered phases:
   - governance/docs first
   - architecture scaffolding second
   - feature implementation third
   - verification last
4. Validate every acceptance criterion with evidence.
5. Update `memory-bank/progress.md` with what was completed and what remains.

## Output Contract
Return a structured implementation report with:
- files created/updated
- acceptance criteria status (pass/fail)
- verification commands executed
- open risks or blockers

## Acceptance Criteria (Verifiable)
1. Every required deliverable is mapped to at least one concrete file path.
2. No business logic is duplicated if canonical logic already exists.
3. At least one build/typecheck command is executed for touched runtime apps.
4. `memory-bank/progress.md` is updated with current milestone status.
5. Final report includes pass/fail status per acceptance criterion.

## Failure Conditions
- Missing required context files.
- Deliverables implemented without file-level mapping.
- Acceptance criteria claimed without verification evidence.
