Render deployment checklist for this project

1) MongoDB Atlas
- Resume your cluster in Atlas (click Resume on Cluster0).
- Create a Database User (username + password) under Database Access.
- In Network Access, add an IP whitelist (for quick testing you can add 0.0.0.0/0 but restrict in production).
- Click Connect > Connect your application and copy the connection string. Replace <username>, <PASSWORD>, and <dbname>.
- Example:
  mongodb+srv://<username>:<PASSWORD>@cluster0.abcd.mongodb.net/coinbase-clone?retryWrites=true&w=majority

2) Local setup (testing locally)
- Create a file `backend/.env` (do NOT commit this file) and paste values from `backend/.env.example` with your Atlas string and secrets.
- Install and run locally:
  cd backend
  npm install
  npm run dev

3) Backend deployment on Render (Web Service)
- Log into Render and create a new Web Service.
- Connect your GitHub repository and choose branch `main`.
- Set Root Directory: `backend`.
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables (add to Render service):
  - MONGODB_URI = <your Atlas connection string>
  - JWT_SECRET = <strong random secret>
  - JWT_EXPIRE = 7d
  - NODE_ENV = production
  - FRONTEND_URL = https://<your-render-frontend-url>
- Deploy. Check Logs for "MongoDB Connected" and server start message.

4) Frontend deployment on Render (Static Site)
- Create a new Static Site in Render.
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables:
  - VITE_API_BASE_URL = https://<your-render-backend-url>
- Deploy.

5) Finalize
- Set `FRONTEND_URL` in backend Render env to the frontend URL (with https). Redeploy backend.
- Test signup/login on the frontend; confirm network requests use credentials and Set-Cookie header is present.

Security notes
- Keep `.env` out of git. Use `backend/.env.example` to show variable names only.
- Use strong `JWT_SECRET` and restrict Atlas IPs for production.

Troubleshooting
- If cookie not stored: ensure both sites are HTTPS, backend sets SameSite=None and Secure, and frontend fetch uses credentials: 'include'.
- If Atlas connection fails: verify user/password and IP access list.
