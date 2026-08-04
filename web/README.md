# Web

React and TypeScript frontend generated from `fastapi/full-stack-fastapi-template`.
It retains the login and items CRUD screens used by ADR-121 fixture tickets.

```bash
bun install --frozen-lockfile
bun run gate
bun run dev
```

Playwright remains available as the optional, non-required E2E suite:

```bash
bun run test:e2e
```
