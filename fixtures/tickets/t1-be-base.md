# [Fixture T1] Add the demo pulse API
Labels: user-story, size:S, priority:medium, demo-fixture

## User Story

**As a** demo operator,
**I want** a tiny authenticated pulse endpoint,
**So that** later fixture tickets have a stable backend capability to extend and consume.

## Context

This is the root of the ADR-121 fixture diamond. Keep the change isolated from the
existing login and items domain so dependent tickets can import a clear, small contract.

## Acceptance Criteria

- [ ] `GET /api/v1/demo/pulse` is registered in the existing API router and requires the current authenticated user.
- [ ] A `DemoPulse` response contains `service="orqestra-demo"`, `status="ok"`, and a positive integer `sequence`.
- [ ] The response is built by production code in `app/app/demo/pulse.py`, not inline in the route.
- [ ] Backend tests cover the authenticated success response and rejection of an unauthenticated request.

## Test Scenarios

| Scenario | Given | When | Then |
|---|---|---|---|
| Authenticated pulse | a signed-in user | `GET /api/v1/demo/pulse` | `200` with the canonical service, `ok` status, and positive sequence |
| Authentication guard | no bearer token | `GET /api/v1/demo/pulse` | request is rejected with `401` |
| Existing behavior | the new router is registered | the backend suite runs | login and items tests remain green |

## Technical Notes

- Add `app/app/demo/__init__.py` and `app/app/demo/pulse.py`; use a small Pydantic/SQLModel-compatible response model and a pure builder function.
- Add `app/app/api/routes/demo.py`, register it in `app/app/api/main.py`, and follow the existing `CurrentUser` dependency pattern.
- Add focused coverage in `app/tests/api/routes/test_demo.py`.

## Dependencies

- None. This ticket is T1 and must run before the other fixture tickets.

## Sub-Tasks

### BE
- [ ] Define `DemoPulse` and its pure builder in `app/app/demo/pulse.py`.
- [ ] Add and register the authenticated route in `app/app/api/routes/demo.py` and `app/app/api/main.py`.
- [ ] Add success and authentication tests in `app/tests/api/routes/test_demo.py`.

### QA
- [ ] Run `uv run pytest app/tests/api/routes/test_demo.py` and the backend gate from `app/`; confirm existing API tests remain green.
