import express from "express";
import * as portfolioController from "../controllers/portfolio.controller";
import { cacheMiddleware } from "../../middlewares/cache.middleware";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: Portfolio management endpoints
 */

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get all portfolio holdings with optional search, filter, sort
 *     tags: [Portfolio]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by company name or symbol (case-insensitive substring)
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         description: Filter results by sector
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by any valid data column key
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of portfolio holdings matching criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PortfolioItem'
 */
router.get(
  "/",
  cacheMiddleware((req) =>
    `portfolioAll_${req.query.search || ""}_${req.query.sector || ""}_${req.query.sort || ""}_${req.query.order || ""}`
  ),
  portfolioController.getAll
);

/**
 * @swagger
 * /api/portfolio/summary:
 *   get:
 *     summary: Get portfolio overall summary (investment, present value, gains/loss)
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Portfolio summary object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalInvestment:
 *                   type: number
 *                 presentValue:
 *                   type: number
 *                 gainLoss:
 *                   type: number
 *                 gainLossPercent:
 *                   type: number
 */
router.get(
  "/summary",
  cacheMiddleware(() => "portfolioSummary"),
  portfolioController.getSummary
);

/**
 * @swagger
 * /api/portfolio/sector-summary:
 *   get:
 *     summary: Get sector-wise aggregated portfolio summary
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: List of sector aggregates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sector:
 *                     type: string
 *                   investment:
 *                     type: number
 *                   presentValue:
 *                     type: number
 *                   gainLoss:
 *                     type: number
 *                   gainLossPercent:
 *                     type: number
 */
router.get(
  "/sector-summary",
  cacheMiddleware(() => "sectorSummary"),
  portfolioController.getSectorSummary
);

/**
 * @swagger
 * /api/portfolio/{no}:
 *   get:
 *     summary: Get a single portfolio holding by unique 'no'
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: no
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique portfolio item identifier
 *     responses:
 *       200:
 *         description: Portfolio holding object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioItem'
 *       404:
 *         description: Portfolio holding not found
 */
router.get("/:no", portfolioController.getOne);

/**
 * @swagger
 * /api/portfolio/refresh-prices:
 *   post:
 *     summary: Refresh all holdings prices and financial data from live source
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: Portfolio data with updated prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 portfolio:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PortfolioItem'
 */
router.post("/refresh-prices", portfolioController.refreshPrices);

export default router;
