# TrackFlow Context

## Your company

You are part of the TrackFlow Tech team, the internal technology unit of TrackFlow, a last-mile delivery and warehouse management company with operations in Los Angeles and Zaragoza.
The team is in the middle of a digital transformation and every tool you build has a direct impact on the next day's operations.

## The assignment

Ana Whitfield, Head of Warehouse Operations, sent the following urgent request to the tech team:

- They are managing the Executive Assistant selection process for Zaragoza headquarters.
- The process is currently being handled in an Excel workflow with multiple people editing the same file and causing data inconsistencies.
- The backend API is already live.
- The frontend must be implemented immediately so the selection process can continue without interruption.

### What Ana needs

- See all candidates at a glance: name, position, status, and stage.
- Filter by status and stage, and search by name or email without reloading the page.
- Open candidate detail and update status or stage from there.
- Add notes after calls and interviews, and delete them when they are no longer needed.
- Register new candidates and edit data when corrections are needed.

## Context of the active search

- Position: Executive Assistant
- Company: TrackFlow
- Location: Zaragoza headquarters
- Profile: Executive support experience, calendar and travel management, professional English, proficiency with office tools

## API and data

The mock API is centrally deployed and shared across all company contexts in the course.
Fields, values, and structure are defined by the backend technical specification.
No API adaptation is required.

## Status values mapping

- `received` -> Received
- `in_progress` -> In progress
- `selected` -> Selected
- `discarded` -> Discarded

## Stage values mapping

- `pending` -> Pending review
- `review` -> Under review
- `personal_interview` -> Personal interview
- `technical_interview` -> Technical interview
- `offer_presented` -> Offer presented

## Non-negotiable UI rule

Raw API values must never be visible in the interface.
Always display human-readable labels from the mappings above.

## Specific acceptance criteria

- Status and stage fields show human-readable labels, never raw API values.
- Notes are visible only within the candidate detail view.
- The registration form includes all fields required by the API.

## Implementation framing

- Build this as an internal TrackFlow recruiting tool.
- Use TrackFlow terminology consistently across copy, labels, and views.
- Keep asynchronous UX explicit: loading, success, and error feedback in all API interactions.
    