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
