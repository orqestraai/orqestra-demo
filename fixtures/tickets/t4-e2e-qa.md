# [Fixture T4] Verify the demo pulse feature end to end
Labels: user-story, size:S, priority:medium, demo-fixture

## User Story

**As a** demo operator,
**I want** an end-to-end assertion for the completed pulse feature,
**So that** the dependency diamond proves its backend extension and frontend consumer integrate correctly.

## Context

This is the terminal T4 node in the ADR-121 fixture diamond. It verifies the union of
T1-T3 behavior after both parallel branches have merged and makes the T2 production-call
seam an explicit quality assertion.

## Acceptance Criteria

- [ ] `web/tests/demo-pulse.spec.ts` signs in through the existing Playwright helpers, opens `/demo`, and observes the T1 service, status, and positive sequence.
- [ ] The E2E test observes T2's exact summary text in the rendered feature without mocking the backend response.
- [ ] `format_pulse_summary` is called from production backend code; a defined-but-uncalled formatter is reported as `satisfied=false` with `failure_mode=no_production_caller`.
- [ ] Backend and frontend required gates remain green, and the focused Playwright test passes against the running app.

## Test Scenarios

| Scenario | Given | When | Then |
|---|---|---|---|
| Full feature | T1-T3 are merged and the app is running | an authenticated user opens `/demo` | live service, status, sequence, and exact summary are visible |
| Real API | the E2E test runs | network requests are inspected | `/api/v1/demo/pulse` is called and no response is mocked |
| Clean seam | clean T2 is present | production call sites are reviewed | `format_pulse_summary` has a route caller |
| Planted seam | planted T2 is present | production call sites are reviewed | QA returns `satisfied=false`, `failure_mode=no_production_caller` |

## Technical Notes

- Follow the login helpers in `web/tests/items.spec.ts`; add only `web/tests/demo-pulse.spec.ts`.
- Treat a behaviorally correct inline summary as insufficient if the exported T2 formatter has no production caller.
- Playwright remains a non-required check in the sandbox; run the focused spec explicitly for this ticket.

## Dependencies

- Blocked by: `[Fixture T1] Add the demo pulse API`, `[Fixture T2] Add the demo pulse summary`, and `[Fixture T3] Add the demo pulse view`.

## Sub-Tasks

### QA
- [ ] Add the authenticated real-backend scenario in `web/tests/demo-pulse.spec.ts`, following `web/tests/items.spec.ts` setup.
- [ ] Run the focused Playwright spec and both package gates; inspect production references to `format_pulse_summary` and apply the seam verdict exactly as specified.
