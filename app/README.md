# Backend

FastAPI and SQLModel backend generated from `fastapi/full-stack-fastapi-template`.
The login and items CRUD domain is intentionally retained as the extension surface for
ADR-121 fixture tickets.

From the repository root:

```bash
cp .env.example .env
uv sync --locked
cd app
uv run alembic upgrade head
uv run poe gate
uv run fastapi dev app/main.py
```
