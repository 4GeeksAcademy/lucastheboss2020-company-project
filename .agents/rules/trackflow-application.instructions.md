---
applyTo: "{app,uis,src}/**/*.{ts,tsx,js,jsx}"
---

# TrackFlow Application Rule

Apply this rule when editing TrackFlow application code in `app/`, `uis/`, or `src/`.

- Keep public copy, API payloads, and UI labels aligned with `CONTEXT.md`.
- Use TrackFlow terminology: logistics leads, lead candidates, warehouse management, last-mile delivery, reverse logistics, Los Angeles, and Zaragoza.
- Keep UI surfaces in `uis/website` and `uis/backoffice`; route files under `app/uis/*` should only import and render those surfaces.
- Keep API data contracts typed through `src/candidates/types.ts` or `src/types/models.ts`.
- Validate changes with `npm run typecheck`; run `npm run build` for App Router route changes.
