# Orqestra Demo Sandbox

A deliberately small full-stack application used for Orqestra product demos and the
ADR-121 nightly bulk-run regression. The application preserves the generated template's
login and items CRUD domain so fixture tickets can add realistic backend and frontend
changes with small, reviewable diffs.

This repository was generated with Copier from version 0.10.0 of the official
[`fastapi/full-stack-fastapi-template`](https://github.com/fastapi/full-stack-fastapi-template).
The upstream MIT license is retained in [`LICENSE`](LICENSE).

## Layout

- `app/` — FastAPI, SQLModel, Alembic, and pytest backend.
- `web/` — React, TypeScript, Vite, Biome, Vitest, and optional Playwright tests.
- `fixtures/tickets/` — ADR-121 ticket drafts, populated by ticket #4545.
- `scripts/` — deterministic demo assertion helpers; reset remains in the Orqestra CLI.

Copier update machinery, deployment workflows, Traefik, and Docker Compose are
intentionally absent. This is a test sandbox, not a deployment template.

## Local setup

Requirements: Python 3.10+, [uv](https://docs.astral.sh/uv/),
[Bun](https://bun.sh/), and PostgreSQL.

```bash
cp .env.example .env

# Backend
uv sync --locked
cd app
uv run alembic upgrade head
uv run fastapi dev app/main.py

# Frontend, in another terminal
cd web
bun install --frozen-lockfile
bun run dev
```

The default local API is at `http://localhost:8000`; the web application is at
`http://localhost:5173`.

## Quality commands

These commands are intentionally declared in each package so `orqestra repo discover`
can derive them without repository-specific knowledge.

```bash
cd app && uv run poe gate
cd web && bun run gate
```

The backend gate runs Ruff and pytest. The frontend gate runs Biome, TypeScript, and
Vitest. Playwright remains available through `cd web && bun run test:e2e`, but it is not
a required branch-protection check.

## Demo workflow

1. Publish fresh ticket drafts from `fixtures/tickets/` with the Orqestra dev CLI.
2. Run the tickets as an ADR-121 bulk against this repository.
3. Observe child PRs merge into the selected integration target and the final ship phase.
4. Reset using `orqestra demo reset --repo https://github.com/orqestraai/orqestra-demo`.

Never run the demo bulk against the Orqestra product monorepo. This repository is the
only intended demo/nightly target.

## Branch policy

`main` is protected. Changes must arrive through pull requests after both required checks
pass:

- `backend`
- `frontend`

Direct pushes and force pushes are disabled. CI is designed to complete in under one
minute, keeping both live demos and nightly bulk runs responsive.
