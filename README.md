[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bMYWKvYv)
# Interim Assessment: Full-Stack Integration – Coinbase Clone

In this assignment, you will integrate your cloned coinbase frontend with a backend API to build a functional cryptocurrency platform with authentication and dynamic data.

You are required to implement the features using Node.js with MongoDB as the database. Create proper data models (schemas) and structure your project using best practices (models, routes, and controllers). All features must be exposed through RESTful APIs for the frontend to consume.

## 1. Authentication System (JWT-Based)

### Register (GET /register)

Create a user account using:

- Name
- Email
- Password

Send data to the backend API and ensure it is properly stored in the database. Also handle success and error responses appropriately, returning clear and meaningful feedback based on the outcome of each request.

### Login (GET /login)

Authenticate users using email and password, store the returned JWT token securely (preferably using HTTP-only cookies), and redirect the user to the homepage after a successful login.

## 2. Protected User Profile Page

### Create a User Dashboard/Profile Page(GET /profile)

Fetch and display:

- User name
- Email
- Any other relevant info from backend

**NOTE:** This page must be protected and only accessible to authenticated users with a valid JWT token. If the user is not authenticated, they should be redirected to the login page.

## 3. Crypto Data Integration

### GET /crypto (All Tradable Cryptocurrencies)

Fetch all available cryptocurrencies from the backend and display them on the frontend.

### GET /crypto/gainers (Top Gainers)

Fetch cryptocurrencies with the highest percentage increase in price, sorted from highest to lowest.

### GET /crypto/new (New Listings)

Fetch the most recently added cryptocurrencies, sorted from newest to oldest.

### POST /crypto (Add New Cryptocurrency)

Create a new cryptocurrency using:

- Name
- Symbol
- Price
- Image
- 24h Change (percentage change in price over the last 24 hours, e.g. +2.5)

Send data to the backend API and ensure it is properly stored in the database (MongoDB). Also handle success and error responses appropriately, returning clear and meaningful feedback based on the outcome of each request.

---

Push your backend code to GitHub Classroom, deploy the backend (recommended: Render), and integrate it into your Coinbase clone frontend repository. After completing the integration, deploy the updated frontend as well. Finally, submit the links to your deployed backend, deployed frontend, and your updated Coinbase clone repository via the Google Form attached.

**NOTE:** Ensure that all submitted links are accurate and working, as no marks will be awarded for invalid or inaccessible submissions.

## Deployment Checklist (GitHub Classroom + Render + Frontend)

Use this exact flow to complete the final submission requirement.

### A) Push code to GitHub Classroom

1. Ensure your latest backend + frontend changes are committed.
2. Push to your classroom repository:
	- Repository: `interim-assesment-ChristianAgyapong`

### B) Deploy backend on Render

1. Create a new **Web Service** on Render from this repository.
2. Configure backend service settings:
	- **Root Directory**: `backend`
	- **Build Command**: `npm install`
	- **Start Command**: `npm start`
3. Add backend environment variables in Render:
	- `NODE_ENV=production`
	- `PORT=10000` (or leave Render default)
	- `MONGODB_URI=<your MongoDB Atlas connection string>`
	- `JWT_SECRET=<strong random secret>`
	- `JWT_EXPIRE=7d`
	- `FRONTEND_URL=<your deployed frontend URL>`
	  - If needed, support multiple frontends using comma-separated URLs.

> This project does **not** require any external crypto API key. Crypto data is served from your own backend + MongoDB.

### C) Integrate deployed backend into frontend

1. In frontend environment config, set:
	- `VITE_API_BASE_URL=<your Render backend URL>`
2. Verify frontend requests go to deployed backend endpoints (`/api/auth`, `/api/profile`, `/api/crypto`).

### D) Deploy frontend

Deploy with Vercel, Netlify, or Render Static Site and set:

- `VITE_API_BASE_URL=<your Render backend URL>`

Then verify:
- Register works
- Login works
- Protected profile loads
- Crypto lists load (`/crypto`, `/crypto/gainers`, `/crypto/new`)
- Add crypto works (authenticated)

### E) Submit required links

Submit all three:

1. Deployed backend URL
2. Deployed frontend URL
3. GitHub Classroom repository URL
