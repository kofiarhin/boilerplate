# Loomio Marketplace

**Live Demo:**  
https://loomio-marketplace.vercel.app/

---

## Description

A MERN-based marketplace scaffold with React (Vite) frontend, Express backend, MongoDB. Built with React Query for server state and a minimal Redux Toolkit setup for app/UI state.

---

## Features

- Health check via `GET /health`
- CORS configured for allowed origins
- Environment-based API URL
- Ready for deployment (Vercel frontend, Render/Heroku backend)

---

## Quick Start

```bash
# clone repo
git clone <repo-url>
cd <repo>

# install dependencies
npm install
cd client && npm install
cd ../server && npm install

# run server
cd server
node server.js

# run client
cd ../client
npm run dev
```
