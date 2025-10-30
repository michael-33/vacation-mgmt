# Vacation Management (Monorepo)

Root workspace for frontend (Vue) and backend (Express) with shared common package.

## Workspaces

- `apps/frontend`
- `apps/backend`
- `packages/common`

## Quickstart

Prerequisites: Node 20+ and Yarn 4 (Berry)

```bash
# install deps for all workspaces
yarn

# build shared package used by backend/frontend
yarn workspace common build

# setup database
yarn workspace backend migrate
yarn workspace backend seed

# run frontend + backend together
yarn dev
```

URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api/v1

Useful root scripts

- Typecheck all: `yarn typecheck`
- Test all: `yarn test`

## environment variables

- you don't need any `.env` files to run the project with defaults.
- if you want to override defaults, copy values from `.env.example` files and create optional env files in frontend and backend directories


## Technical choices

- Monorepo: Yarn workspaces (`apps/*`, `packages/*`) for shared types and schemas.
- Frontend: Vue 3 + Vite + Pinia + Naive UI.
  - Role‑based routing guard; providers centralized in `AppProviders`.
  - API base URL via `VITE_API_BASE_URL` with a localhost fallback.
  - Vitest + Vue Test Utils for unit tests.
- Backend: Express + Knex + SQLite + Zod.
  - CORS restricted to the frontend origin (`FRONTEND_ORIGIN`).
  - Dev autoreload with `tsx watch`.
  - Zod validation at controller/domain layers; standardized error handler.
- Common package: shared enums, DTOs, and Zod schemas

## Known limitations

- Auth is simulated via `x-user-id` header; no real authentication/authorization.
- SQLite is used for simplicity; not optimized for concurrency or production scale.
- No E2E tests; only basic unit tests on frontend components.
- CORS allows only localhost dev origins by default; adjust via `FRONTEND_ORIGIN` if needed.
