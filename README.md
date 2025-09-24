# GitHub User Management System

A full‑stack application to search, store, update, and manage GitHub users, list repositories, and compute mutual followers/following. Organized as a monorepo with `client` (React + Vite) and `server` (Node.js + Express + Prisma).

## Hosted URL

- Frontend: https://git-query.vercel.app
- Backend API: https://git-query-h3jk.vercel.app 

### Demo

![App Demo](docs/demo.gif)

## Tech Stack

### Frontend
- React 19 + Vite
- TypeScript
- Axios for HTTP
- Plain CSS per component/page

### Backend
- Node.js + Express 5
- TypeScript
- Inversify (DI container)
- Prisma ORM (PostgreSQL)
- Axios (GitHub API client)

### Database
- PostgreSQL via Prisma

---

## Features

### Backend
- Create/Upsert GitHub user by username from GitHub API; persist and return repositories
- List users with filters and pagination (`username`, `location`, `sortBy`, `order`, `page`, `limit`)
- Compute mutual connections (followers/following intersection) with optional refresh
- Update local user fields: `bio`, `blog`, `location`
- Soft delete user (`isDeleted` flag)
- Centralized error handling and layered architecture

### Frontend
- Search and display GitHub user profile + repositories
- Paginated users table with filters and sorting
- Mutual friends page with optional refresh
- Update user (bio, blog, location)
- Soft-delete user
- Reusable UI components (`SearchBar`, `UserTable`, `Pagination`, `UserCard`, `RepositoryList/Grid`, `Modal`, `ConfirmationModal`, `LoadingSpinner`, `ErrorBoundary`)

---

## API Endpoints
Base path: `/api`

All user routes are mounted under `/api/users`.

- GET `/api/users`
  - Description: List users with filters and pagination
  - Query: `username?`, `location?`, `sortBy?=created_at`, `order?=desc`, `page?=1`, `limit?=10`
  - Response:
    ```json
    {
      "users": [User, ...],
      "pagination": { "total": number, "page": number, "limit": number, "totalPages": number }
    }
    ```

- POST `/api/users/:username`
  - Description: Create/upsert user by GitHub `:username`, returning user and repos
  - Response: `{ "user": User, "repos": Repository[] }`

- POST `/api/users/:username/mutual`
  - Description: Compute mutual friends for `:username`
  - Body: `{ "forceRefresh": boolean }` (optional)
  - Response: `{ "friends": User[] }`

- PATCH `/api/users/:username`
  - Description: Update local user fields
  - Body: `{ "location"?: string, "blog"?: string, "bio"?: string }`
  - Response: `{ "message": string, "user": User }`

- DELETE `/api/users/:username`
  - Description: Soft delete a user
  - Response: `{ "message": string, "user": User }`

Errors are handled by centralized middleware with appropriate status codes.

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL instance
- GitHub Personal Access Token (for higher‑limit API calls)

### 1) Clone the repository
```bash
git clone https://github.com/Samlikshan/Git-Query.git Git-Query
cd "Git-Query"
```

### 2) Backend setup (`server`)
```bash
cd server
npm install
```
Create `.env` in `server/`:
```env
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public
GITHUB_TOKEN=<your_github_token>
BASE_URL=https://api.github.com
# CORS origin for the frontend app
CLIENT_URL=http://localhost:5173
```
Apply Prisma migrations and start the API:
```bash
npx prisma migrate deploy
npm run dev
```
Server runs at `http://localhost:5000` and exposes routes under `/api`.

### 3) Frontend setup (`client`)
Open a new terminal:
```bash
cd client
npm install
```
Optionally create `.env` in `client/`:
```env
VITE_SERVER_URL=http://localhost:5000/api
```
Run the dev server:
```bash
npm run dev
```

Vite will print the app URL (typically `http://localhost:5173`).

---

## Project Structure
```
root
├─ client/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ types/
└─ server/
   ├─ src/
   │  ├─ presentation/
   │  ├─ application/
   │  ├─ domain/
   │  ├─ infrastructure/
   │  └─ config/
   └─ prisma/
```

## Environment Variables

### Server
- `PORT` (default 4000; README examples use 5000)
- `DATABASE_URL`
- `GITHUB_TOKEN`
- `BASE_URL` (default `https://api.github.com`)
- `CLIENT_URL` (CORS allowed origin; default `http://localhost:5173`)

### Client
- `VITE_SERVER_URL` (default `http://localhost:5000/api`)

