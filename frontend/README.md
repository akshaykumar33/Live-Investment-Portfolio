# 📊 Portfolio Dashboard

A modern, responsive portfolio management dashboard built with **Next.js** and **React**. It fetches and displays portfolio data with **live updates via WebSocket**, supporting sorting, filtering, and manual refreshing.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Using Docker](#using-docker)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Code Highlights & UX Notes](#code-highlights--ux-notes)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

- View detailed portfolio with sorting and sector filtering.
- Live prices auto-updated via **Socket.IO WebSocket** connections.
- Manual refresh triggers backend price update.
- Clean UI with skeleton loaders to prevent flickering.
- Fully responsive and accessible design using **TailwindCSS**.
- Skeleton loaders via **Material UI** for smoother UX.
- Data fetching optimized with hashing to avoid unnecessary rerenders.

---

## 🧰 Tech Stack

- **Next.js** (React Framework)
- **React 19+**
- **TypeScript**
- **TailwindCSS** – Styling
- **Material UI** – Skeleton loaders and components
- **Socket.io-client** – Real-time updates
- **Axios / Fetch API** – HTTP requests
- **object-hash** – Efficient data change detection

---

## ⚙️ Installation

```bash
git clone https://your-repo-url.git
cd portfolio-dashboard
npm install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-backend-api-url
```

Replace `your-backend-api-url` with the actual backend API base URL.

---

## 🧪 Running the App

### 🛠 Development

```bash
npm run dev
```

App runs at: [http://localhost:7000](http://localhost:7000)

### 🚀 Production

```bash
npm run build
npm start
```

---

## 🐳 Using Docker

### 🔧 Build Docker Image

```bash
docker build -t portfolio-dashboard .
```

### 🚀 Run Docker Container

```bash
docker run -d -p 7000:7000 \
  --name portfolio-dashboard \
  --env-file .env \
  portfolio-dashboard
```

App will be accessible at: [http://localhost:7000](http://localhost:7000)

---

## 🗂 Project Structure

```
/
├── app/                    # Next.js application pages & layouts
├── components/             # React UI components (e.g., Table, Filters, Skeletons)
├── public/                 # Static assets like images and icons
├── styles/                 # Global CSS & Tailwind configuration files
├── types/                  # TypeScript interfaces & types
├── utils/                  # Utilities: API calls, formatting helpers, socket setup
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.js
├── tailwind.config.ts
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 📜 Available Scripts

| Script          | Description                             |
|-----------------|-----------------------------------------|
| `npm run dev`   | Run development server (port 7000)      |
| `npm run build` | Build for production                    |
| `npm start`     | Start production server                 |
| `npm run lint`  | Run ESLint                              |

---

## 💡 Code Highlights & UX Notes

- **Live Updates**: Socket.io client receives real-time price changes.
- **Efficient Data Detection**: Uses `object-hash` to detect portfolio changes, avoiding redundant UI rerenders.
- **Skeleton Loading UX**: Shows skeletons only when actual data changes — subtle spinners otherwise.
- **Manual Refresh**: Refresh button triggers backend refresh + reloads frontend silently.
- **Responsive Design**: Clean layout via TailwindCSS, with accessible color palette and mobile support.
- **Type Safety**: Enforced with TypeScript + ESLint using Next.js best practices.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to open issues or submit a pull request.

---

## 📄 License

 Learning and Experimenting.

---