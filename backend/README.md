# 📈 Portfolio Backend

An **Express + TypeScript** backend service for managing a stock portfolio with live price and earnings data tailored for the **Indian market**. Features multi-provider earnings fallback, aggressive caching, rate limiting, polling, and WebSocket updates.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Polling and Real-time Updates](#polling-and-real-time-updates)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Logging & Error Handling](#logging--error-handling)
- [Testing](#testing)
- [Docker](#docker)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)
- [Additional Notes](#additional-notes)

---

## 🚀 Features

- Supports Indian stock portfolio management with symbol-level detailed info.
- Fetches latest market prices using **Yahoo Finance (yahoo-finance2)**.
- Earnings data fetched using multi-provider fallback:  
  **Yahoo Finance → Financial Modeling Prep → Alpha Vantage**.
- Integrated in-memory caching via **node-cache**.
- Per-provider rate limiting to avoid quota exhaustion.
- Automated polling with **real-time updates via WebSocket (Socket.io)**.
- **Zod** for schema validation.
- **Swagger UI** for API documentation.
- Structured logging using **Winston**.

---

## 🧰 Tech Stack

- **Node.js (v18+)**, **TypeScript**
- **Express.js** – REST API
- **yahoo-finance2**, **axios** – External data fetching
- **node-cache** – In-memory caching
- **socket.io** – Real-time WebSocket communication
- **zod** – Schema validation
- **winston** – Logging
- **dotenv** – Environment configuration
- **swagger-jsdoc**, **swagger-ui-express** – API docs

---

## ✅ Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- API keys for external data providers:
  - [Financial Modeling Prep (FMP)](https://financialmodelingprep.com/)
  - [Alpha Vantage (AV)](https://www.alphavantage.co/)

> ⚠️ These keys are required for the earnings fallback strategy.

---

## ⚙️ Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd portfolio-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create your `.env` file** (see [Configuration](#configuration)).

4. **Build the TypeScript source**:
   ```bash
   npm run build
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

> For development with hot reload:
```bash
npm run dev
```

---

## 🔧 Configuration

Create a `.env` file in the project root with the following:

```env
PORT=38000
FINNHUB_API_KEY=your_finnhub_api_key
FMP_API_KEY=your_fmp_api_key
AV_API_KEY=your_alpha_vantage_api_key
POLLING_INTERVAL_MS=15
TTL=3600
```

- `POLLING_INTERVAL_MS` → How often portfolio data is refreshed.
- `TTL` → Time in seconds before earnings cache expires.

---

## 🧪 Usage

Portfolio is stored in `src/api/data/portfolio.json`.

You can:
- Edit the file directly
- Or integrate a frontend for full control

### 🔑 Core Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/portfolio`         | Get all portfolio items |
| GET    | `/api/portfolio/:no`     | Get specific portfolio item |
| POST   | `/api/portfolio/refresh-prices` | Manually refresh all prices and earnings |
| GET    | `/api/portfolio/summary`        | Portfolio aggregated summary |
| GET    | `/api/portfolio/sector-summary` | Summary grouped by sector |

---

## 📡 API Endpoints

### 📁 Portfolio

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/portfolio`         | Get full portfolio (filter/sort supported) |
| GET    | `/api/portfolio/:no`     | Get portfolio item by ID |
| POST   | `/api/portfolio/refresh-prices` | Refresh prices and earnings |
| GET    | `/api/portfolio/summary`        | Get summary of values and gains |
| GET    | `/api/portfolio/sector-summary` | Get summary grouped by sector |

### 🩺 Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/health` | Health check |

### 📘 API Docs

- Visit: [`/api/docs`](http://localhost:8000/api/docs) for interactive Swagger UI.

---

## ⏱️ Polling and Real-time Updates

- Backend **polls external APIs every `POLLING_INTERVAL_MS` seconds**.
- During each poll:
  - Prices and earnings are fetched via fallback strategy.
  - Cache is updated.
  - **Socket.io clients** receive `pricesUpdated` event with updates.

> 🧠 Fallback Strategy: Yahoo Finance → FMP → Alpha Vantage

---

## 🧱 Architecture

- **Providers abstraction**: for external earnings fetch
- **Caching layer**: reduces redundant API calls
- **Rate limiting**: uses Bottleneck or similar strategies per provider
- **Polling logic**: periodic data updates
- **WebSockets**: real-time client sync
- **Zod**: validates all API responses
- **Winston**: detailed, structured logging

---

## 📁 Folder Structure

```
src
├── api
│   ├── controllers       # Express route handlers
│   ├── middlewares       # Cache, error, logging, validation
│   ├── providers         # Earnings API fetch logic
│   ├── routes            # API route definitions
│   ├── services          # Core business logic
│   └── data              # Portfolio JSON storage
├── docs                 # Swagger configuration
├── utils                # Helpers (file I/O, logging)
├── types                # TypeScript definitions
├── app.ts               # Express setup
└── server.ts            # Server & polling logic
```

---

## 📊 Logging & Error Handling

- **Winston** for structured logs.
- Middleware captures:
  - Incoming requests
  - Polling events
  - API errors
- Centralized error handling returns meaningful `500` responses.

---

## 🧪 Testing

- No automated tests provided by default.
- You can:
  - Test endpoints using **Postman**, **Insomnia**, or `curl`.
  - Add **unit** and **integration** tests as needed.

---

## 🐳 Docker

### 🔧 Build Docker Image

```bash
docker build -t portfolio-backend .
```

### 🚀 Run Docker Container

```bash
docker run -d -p 8000:8000 \
  --name portfolio-backend \
  --env-file .env \
  portfolio-backend
```

---

## 🤝 Contribution

Contributions are welcome! Please ensure:

- Type-safe code (TypeScript best practices)
- Proper error handling
- Logging and API docs are updated with any new changes

---

## 📄 License

 Learning and Experimenting

---

## 📬 Contact

For support, collaboration, or feature requests, open an issue or reach out via your preferred contact channel.

---

## 🔒 Additional Notes

- **Never commit API keys or `.env` files** to public repositories.
- Tweak `POLLING_INTERVAL_MS` and `TTL` to suit your performance and quota needs.
- For scaling, replace the portfolio JSON with a database (e.g., MongoDB, PostgreSQL).

---