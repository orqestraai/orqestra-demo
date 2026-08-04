# Demo fixture tickets

The drafts in [`tickets/`](tickets/) describe one deliberately small full-stack feature:
an authenticated demo-pulse endpoint, a backend summary extension, a React consumer,
and feature-level E2E coverage. They are real implementation tickets, not mocks.

## Dependency diamond

```text
T1: backend pulse API
├── T2: backend summary extension
└── T3: frontend pulse view
    └── T4: feature E2E QA (also depends on T2)
```

The complete ordering is `T1 -> (T2 || T3) -> T4`. Each draft names its logical
dependencies, allowing the bulk leader to derive those edges from ticket content.

## Modes

- `happy` publishes `t2-be-extension.md`; its exported formatter is called by the
  pulse route.
- `planted-seam` publishes `t2-be-extension-planted.md` instead. The formatter and
  acceptance contract are unchanged, but the implementation task deliberately leaves
  the formatter without a production caller. Completion QA must report
  `satisfied=false` with `failure_mode=no_production_caller` for that criterion.

Publish exactly one T2 variant per run. The other drafts are shared by both modes.

## Publishing

Every draft carries the persistent `demo-fixture` label. The harness supplies the
per-run label through the `--bulk-label` placeholder so parallel or historical runs do
not share membership:

```bash
TEAM="FullStack Hybrid Team"
REPO="https://github.com/orqestraai/orqestra-demo"
RUN_SLUG="$(date -u +%Y%m%dT%H%M%SZ)"
BULK_LABEL="bulk:demo-${RUN_SLUG}"

orqestra-dev ticket create --team "$TEAM" --repo "$REPO" \
  --from-draft fixtures/tickets/t1-be-base.md --bulk-label "$BULK_LABEL"
orqestra-dev ticket create --team "$TEAM" --repo "$REPO" \
  --from-draft fixtures/tickets/t2-be-extension.md --bulk-label "$BULK_LABEL"
orqestra-dev ticket create --team "$TEAM" --repo "$REPO" \
  --from-draft fixtures/tickets/t3-fe-consumer.md --bulk-label "$BULK_LABEL"
orqestra-dev ticket create --team "$TEAM" --repo "$REPO" \
  --from-draft fixtures/tickets/t4-e2e-qa.md --bulk-label "$BULK_LABEL"
```

For `planted-seam`, replace `t2-be-extension.md` with
`t2-be-extension-planted.md`. The harness is responsible for creating the per-run
provider label before publishing and removing it during reset.
