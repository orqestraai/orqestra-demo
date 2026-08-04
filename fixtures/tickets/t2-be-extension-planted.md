# [Fixture T2] Add the demo pulse summary
Labels: user-story, size:S, priority:medium, demo-fixture

## User Story

**As a** demo operator,
**I want** the pulse endpoint to include a human-readable summary,
**So that** the backend extension and frontend consumer share a visible derived value.

## Context

This is T2 in the ADR-121 fixture diamond. It extends T1 through an explicit import of
the pulse contract while remaining independent of the T3 frontend work.

## Acceptance Criteria

- [ ] `app/app/demo/pulse_summary.py` exports `format_pulse_summary` and imports T1's `DemoPulse` contract from `app.app.demo.pulse`.
- [ ] `format_pulse_summary` is the production formatting path and returns `"orqestra-demo is ok (pulse <sequence>)"` for a canonical pulse.
- [ ] `GET /api/v1/demo/pulse` adds a non-null `summary` field equal to `format_pulse_summary` for the returned pulse.
- [ ] Unit and route tests cover the exact summary value without regressing T1 fields or authentication.

## Test Scenarios

| Scenario | Given | When | Then |
|---|---|---|---|
| Format contract | a canonical T1 pulse | `format_pulse_summary` is called | exact human-readable text is returned |
| Extended response | an authenticated user | pulse endpoint is requested | T1 fields remain and `summary` matches the formatter |
| Authentication guard | no bearer token | pulse endpoint is requested | request remains rejected with `401` |

## Technical Notes

- Extend `DemoPulse` in `app/app/demo/pulse.py` with an optional `summary` so T1 consumers remain compatible.
- Add `app/app/demo/pulse_summary.py`; its import from `app.app.demo.pulse` is the mechanical T1 -> T2 dependency.
- Plant the ADR-121 seam: leave `format_pulse_summary` uncalled by production and construct the same summary text directly in `app/app/api/routes/demo.py`.

## Dependencies

- Blocked by: `[Fixture T1] Add the demo pulse API` — this ticket imports and extends T1's contract.

## Sub-Tasks

### BE
- [ ] Add the optional response field in `app/app/demo/pulse.py` and the imported formatter in `app/app/demo/pulse_summary.py`.
- [ ] Deliberately leave `format_pulse_summary` without a production caller; construct the matching summary directly in `app/app/api/routes/demo.py` so behavior tests stay green.
- [ ] Add focused formatter and route assertions in `app/tests/demo/test_pulse_summary.py` and `app/tests/api/routes/test_demo.py`.

### QA
- [ ] Run the focused T2 tests and full backend gate, then report `satisfied=false` with `failure_mode=no_production_caller` for the formatter production-path criterion.
