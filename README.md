# Pizza 4P's 

A restaurant brand storytelling website inspired by [Madie]([https://madie.es/en#story]), built as a school final project. The site follows along with a full-stack tutorial, but only implements the **authentication** and **menu display** portions from scratch — the cart and admin panel sections were intentionally left out of scope.

## Features

- **User authentication** — register/login with hashed passwords (bcrypt) and JWT-based sessions
- **Protected routes** — reservation pages are only accessible while logged in
- **Table reservations** — book a table by venue, date, time, party size, and service type (Inside / Outside / Pizza Counter / Semi-Private); view and cancel your own bookings under "My Reservations"
- **Dynamic menu** — pulls items from the backend and groups them by category, with a horizontally scrollable, animated card layout
- **Brand pages** — Story, Visit (with an embedded map), and a landing page with a reservation call-to-action

## Tech Stack

**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS + shadcn/ui components
- React Router
- Framer Motion (animations)
- Axios

**Backend**
- Node.js + Express
- MongoDB (Mongoose) via MongoDB Atlas
- JWT for auth, bcrypt for password hashing

## Project Structure

```
backend/
  controllers/     # route logic (user, items, reservations)
  models/          # Mongoose schemas
  routes/          # Express routers
  middleware/      # auth middleware (JWT verification)
  server.js

frontend/
  src/
    pages/         # route-level components (login, signup, menu, reserve, etc.)
    components/     # reusable UI pieces
    context/        # AuthContext (global auth state)
    lib/            # API client + typed request helpers
    layout/         # SiteLayout (nav + footer wrapper)
```

## Running Locally

**Backend**
```bash
cd backend
npm install
npm start
```
Requires a `.env` file with `MONGODB_URI` and `JWT_SECRET`.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend running at `http://localhost:4000`.

## Notes

This project is a learning exercise — some content (menu items, reviews, location) is placeholder data styled after Pizza 4P's for reference purposes, not affiliated with or representing the real brand.
