import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import logger from "./utils/logger";
import * as portfolioService from './api/services/portfolio.service';
import dotenv from 'dotenv';
import cache from "./middlewares/cache.middleware";

dotenv.config();


const PORT = process.env.PORT || 3001;
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: "*" }
});

// Attach io to express app object, accessible in controllers
app.set("io", io);

io.on("connection", (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});


// --- AUTOPOLLING FEATURE ---
// Poll and broadcast refreshed prices every 60 seconds (adjust interval as needed)
const POLLING_INTERVAL_MS = Number(process.env.POLLING_INTERVAL_MS)*1000 || 60 * 1000; // 1 minute

setInterval(async () => {
  try {
    logger.info("Auto-refreshing prices via polling...");
    const updatedPortfolio = await portfolioService.refreshPortfolioPrices();

    // Invalidate all cached data that depends on portfolio state
    // cache.flushAll();
     
    
    // Emit updated prices to all clients
    io.emit("pricesUpdated", updatedPortfolio);

    logger.info("Emitted pricesUpdated event to all clients after polling.");
  } catch (err) {
    logger.error("Auto-polling price refresh failed: " + (err as Error).message);
  }
}, POLLING_INTERVAL_MS);

// Start server

httpServer.listen(PORT, () => {
  logger.info(`Server listening on Port :${PORT}`);
});
