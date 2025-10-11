# MERN Boilerplate

A starter MERN stack project configured for local development with a lightweight authentication stub. The goal is to provide a clean baseline for building full-stack products with React, Express, and MongoDB while maintaining 100% automated test coverage.

## Stack
- **Client:** React 19 (Vite) + React Query + Redux Toolkit
- **Server:** Express 5 + Mongoose (Mongo connection stub)
- **Auth:** Local `AuthProvider` context (replaceable with JWT or third-party providers)
- **Styling:** Plain SCSS with one stylesheet per component
- **Testing:** Vitest (client) & Jest + Supertest (server)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and update values as needed.
3. Start both client (port 4000) and server (port 5000):
   ```bash
   npm run dev
   ```
4. Run tests with coverage gates:
   ```bash
   npm run test
   ```

## Local Auth Stub
The project replaces Clerk with a minimal `AuthProvider` defined in `client/src/auth/auth-context.jsx`. It exposes `signIn`, `signOut`, and `isSignedIn` helpers for components and tests. Update this provider when migrating to real authentication.

## Project Structure
```
client/          # React app
server/          # Express API (MVC pattern)
```

## Migration Next
- Introduce JWT-based authentication.
- Issue and store tokens via httpOnly cookies.
- Update `requireAuth` middleware to validate JWTs and protect API routes.
