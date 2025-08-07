# 💼 Fullstack Portfolio App (Dockerized Monorepo)

This is a fullstack portfolio project built using:

- 🔥 **Frontend**: Next.js 15 (React)
- 🧠 **Backend**: Node.js + Express with Yahoo Finance API
- 🐳 **Docker & Docker Compose** for containerized local development

---

## 📁 Folder Structure

```
app/
├── backend/          # Express backend with stock polling
├── frontend/         # Next.js frontend (SSR ready)
├── docker-compose.yml
├── README.md         # ← you're here
```

---

## 🛠️ Local Development with Docker

Make sure Docker is running, then run:

```bash
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

---

## ⚙️ Environment Variables

You must create `.env` files inside both `frontend/` and `backend/` directories.

Example for `backend/.env`:

```env
PORT=8000
FRONTEND_URL=http://localhost:3000
```

Example for `frontend/.env`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 🚀 Deployment

You can deploy the frontend (e.g., to Vercel) and backend (e.g., to Railway, Render, or EC2) separately. Make sure to update the env URLs accordingly.

---

## 📦 Production Build

To build both containers:

```bash
docker compose -f docker-compose.yml up --build
```

---

## 📌 License

This project is for educational and portfolio purposes.
