# Codex Collaboration Guide for MERN Boilerplate

## Purpose
Define how the Codex agent collaborates on this repo, detailing capabilities, workflows, enforcement rules, and structure for the MERN boilerplate.

## Repository Assumptions
- Root structure: `/client`, `/server`, `package.json`
- Ports: client on **4000**, server on **5000**
- Testing: server uses **Jest + Supertest**, client uses **Vitest + React Testing Library**
- CI/CD: client deployed via **Vercel**, server via **Render/Heroku**
- Adaptation rule: Codex must auto-detect and align with repo structure while enforcing golden rules.

## Golden Rules v2.6
- **Language**: JavaScript only (no TypeScript)
- **Backend**: Node.js + Express (CommonJS, strict MVC, no `src` folder)
- **Frontend**: React (Vite latest) + plain SCSS (no modules)
- **State**: React Query + custom hooks
- **Styling**
  - No Tailwind or CSS-in-JS
  - One SCSS file per component: `component.styles.scss`
  - Class naming: flat, lowercase, hyphenated (e.g., `.user-card`)
  - Nesting depth: max 1 level
- **Syntax**: Use arrow functions everywhere; default exports for React components
- **Environment**: `.env` required, never hard-code secrets; include `.env.example`
- **CORS**: Wildcard allowed
- **Testing**: 100% coverage required (server & client)
- **CI Enforcement**
  - No `/server/package.json`
  - Vite must be `latest`
  - Coverage must be >= 100%
- **Security**: No Helmet or Morgan by default

## Clerk Removal
- All Clerk packages and components were replaced with a local `AuthProvider` stub located at `client/src/auth/auth-context.jsx`.
- `requireAuth` middleware (`server/middleware/auth.js`) is currently a no-op placeholder that injects a local user.
- When upgrading auth, migrate to JWT-backed middleware that sets `req.user` from verified tokens and update client context accordingly.

## Codex Capabilities
Allowed:
- Read repo and file structure
- Generate PRs with tests, docs, and CI compliance
- Enforce coding and folder conventions
- Produce minimal, clear Conventional Commits

Forbidden:
- Introducing new stacks, CSS frameworks, or TypeScript
- Adding Tailwind, Helmet, Morgan, or secrets

## Standard Workflows
### Repo Scan
Outputs: Repo Overview, Drift Report, Task Plan

### Feature Ticket
1. Generate design brief
2. Add tests first (TDD)
3. Implement and validate
4. Update docs and changelog
5. Open PR with structured template

### Bugfix
1. Reproduce with test
2. Fix minimally
3. Add regression test
4. Submit PR with root cause analysis

## Scripts
### Root `package.json`
```
"scripts": {
  "dev": "concurrently \"npm:dev:server\" \"npm:dev:client\"",
  "dev:server": "nodemon server/server.js",
  "dev:client": "npm run dev --prefix client",
  "test": "npm run test:server && npm run test:client",
  "test:server": "jest --config server/jest.config.cjs --coverage --runInBand",
  "test:client": "npm run test --prefix client",
  "build": "npm run build --prefix client",
  "start": "node server/server.js"
}
```

### Server Expectations
- `server/app.js` - Express app setup
- `server/server.js` - runs on port 5000
- `server/routes`, `controllers`, `models`, `tests` folders
- `server/.env.example` included

### Client Expectations
- `client/src/main.jsx`, `app.jsx`, `index.html`
- Per-component SCSS files
- `hooks/`, `services/`, `styles/`
- React Query provider configured at root
- Local AuthContext wraps the application

## Testing
- Coverage target: **100%**
- Server: **Jest + Supertest**
- Client: **Vitest + React Testing Library**
- Requirements:
  - Unit tests for controllers, services, utils
  - Integration tests for routes
  - Component, hook, and API interaction tests
- Jest config:
  - `testEnvironment`: `node`
  - `roots`: `<rootDir>/server`
  - `testMatch`: `**/tests/**/*.test.js`
  - `setupFilesAfterEnv`: `<rootDir>/server/tests/setup.js`
  - `verbose`: `true`

## CI/CD
- Checks:
  - Install dependencies
  - Run tests with coverage gates
  - Build client
  - Ensure Vite is `latest`
  - Block `/server/package.json`
  - Disallow `.module.scss` files
- Deployments:
  - Client: Vercel
  - Server: Render/Heroku

## Commits and PRs
- Use Conventional Commits (`feat`, `fix`, `docs`, `test`)
- Examples:
  - `feat(server): add user login controller`
  - `fix(client): correct query invalidation`
  - `test: improve auth utils coverage`
- PR template:
  - **Title**: `[feat|fix|refactor|docs]: short summary`
  - **Body**
    - Context: why this change matters
    - Design: technical approach
    - Changes: list of files and key updates
    - Tests: coverage details
    - Coverage: before vs after
    - Breaking: migration notes if any
    - Media: screenshots or clips
    - Checklist:
      - JS-only
      - Express MVC (CommonJS)
      - React + SCSS (no modules)
      - Arrow funcs + default exports
      - `.env` safe; examples updated
      - CI green; 100% coverage

## API and Client Conventions
### Server
- Controllers return `{ success, data, error }`
- Routes map endpoints to controllers only
- Models use Mongoose with timestamps and validation
- Centralized error middleware

### Client
- Query keys are stable strings with precise invalidation
- Custom hooks live under `src/hooks`
- Each component imports its own `.styles.scss`
- Class naming: flat, hyphenated, no BEM or underscores

## Code Patterns
- **React component**: `client/src/components/user-card.jsx` with `.styles.scss`, flat class naming
- **Controller**: `server/controllers/auth.controller.js` exports arrow function with try/catch returning JSON response
- **Route**: `server/routes/auth.routes.js` connects endpoints to controller
- **App**: `server/app.js` handles Express setup, CORS, JSON middleware, error handler
- **Server**: `server/server.js` creates HTTP server on port 5000

## Environment Rules
- Provide `.env.example` for both server and client
- Never commit real secrets
- PRs introducing secrets must fail

## Automation
- Labels: `type: feature`, `type: fix`, `area: server`, `area: client`, `docs`, `tests`
- Auto labeling based on path patterns

## Code Review Checkpoint
- Justify design simplicity
- Identify potential bug zones and test coverage
- Note deferred improvements

## Developer Commands
- Install: `npm install`
- Dev: `npm run dev`
- Tests:
  - All: `npm run test`
  - Server: `npm run test:server`
  - Client: `npm run test:client`
- Build: `npm run build`

## Clarification Protocol
If ambiguity arises, propose a default aligned with golden rules and document assumptions in the PR.

## Non-Goals
- TypeScript migration
- Tailwind/CSS-in-JS adoption
- Relaxing coverage gates
- Adding Helmet/Morgan by default

## Appendix: Sample PR
- **Title**: `feat(client): add profile page with react-query data fetching`
- **Context**: Explains why change is needed
- **Design**: Use `useQuery` and SCSS per component
- **Changes**:
  - `client/src/pages/profile.jsx`
  - `client/src/pages/profile.styles.scss`
  - `client/src/services/api.js`
- **Tests**: Vitest for render states; coverage 100%
- **Checklist**:
  - JS-only
  - Express MVC (CJS)
  - React + SCSS
  - Arrow funcs + default exports
  - `.env` safe
  - CI green, 100% coverage
