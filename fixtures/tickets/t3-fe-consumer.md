# [Fixture T3] Add the demo pulse view
Labels: user-story, size:S, priority:medium, demo-fixture

## User Story

**As a** signed-in demo user,
**I want** to see the backend pulse in the application,
**So that** the fixture feature demonstrates a real frontend-to-backend data flow.

## Context

This is T3 in the ADR-121 fixture diamond. It consumes T1's endpoint and can run in
parallel with T2 because it relies only on the stable `service`, `status`, and `sequence`
fields.

## Acceptance Criteria

- [ ] An authenticated `/demo` route fetches `GET /api/v1/demo/pulse` through a typed client function and renders the service, status, and sequence.
- [ ] The sidebar contains a `Demo Pulse` link that navigates to `/demo`.
- [ ] Loading and request-failure states are visible and have stable accessible text.
- [ ] Unit tests cover the successful pulse card plus loading and failure behavior.

## Test Scenarios

| Scenario | Given | When | Then |
|---|---|---|---|
| Pulse loaded | the API returns the T1 payload | user opens `/demo` | service, `ok` status, and sequence are visible |
| Loading | pulse request is pending | route renders | `Loading demo pulse` is exposed to assistive technology |
| Failure | pulse request rejects | route renders | `Unable to load demo pulse` is visible |
| Navigation | signed-in user sees the sidebar | `Demo Pulse` is selected | browser navigates to `/demo` |

## Technical Notes

- Add the typed request in `web/src/api/demoPulse.ts`, using the configured API base URL and bearer token conventions already established by `web/src/main.tsx`.
- Add `web/src/components/DemoPulseCard.tsx` and `web/src/routes/_layout/demo.tsx`.
- Register the link in `web/src/components/Sidebar/AppSidebar.tsx`; TanStack Router regenerates `web/src/routeTree.gen.ts`.

## Dependencies

- Blocked by: `[Fixture T1] Add the demo pulse API` — the view consumes T1's response contract.

## Sub-Tasks

### FE
- [ ] Implement the typed request in `web/src/api/demoPulse.ts`.
- [ ] Implement the query states and accessible presentation in `web/src/components/DemoPulseCard.tsx` and `web/src/routes/_layout/demo.tsx`.
- [ ] Add the sidebar entry in `web/src/components/Sidebar/AppSidebar.tsx` and regenerate `web/src/routeTree.gen.ts`.
- [ ] Add component coverage in `web/src/components/DemoPulseCard.test.tsx` using the project's Vitest setup.

### QA
- [ ] Run `bun run gate` from `web/` and verify the success, loading, failure, and navigation scenarios.
