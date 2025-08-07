import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     PortfolioItem:
 *       type: object
 *       properties:
 *         no:
 *           type: integer
 *         name:
 *           type: string
 *         sector:
 *           type: string
 *         purchasePrice:
 *           type: number
 *         quantity:
 *           type: number
 *         investment:
 *           type: number
 *         portfolioPercent:
 *           type: number
 *         symbol:
 *           type: string
 *         cmp:
 *           type: number
 *         presentValue:
 *           type: number
 *         gainLoss:
 *           type: number
 *         gainLossPercent:
 *           type: number
 *         marketCap:
 *           type: number
 *         peRatio:
 *           type: number
 *           nullable: true
 *         latestEarnings:
 *           type: number
 *           nullable: true
 */

export const PortfolioItemSchema = z.object({
  no: z.number(),
  name: z.string(),
  sector: z.string(),
  purchasePrice: z.number(),
  quantity: z.number(),
  investment: z.number(),
  portfolioPercent: z.number(),
  symbol: z.string(),
  cmp: z.number(),
  presentValue: z.number(),
  gainLoss: z.number(),
  gainLossPercent: z.number(),
  marketCap: z.number().nullable().optional(),
  peRatio: z.number().nullable().optional(),
  latestEarnings: z.number().nullable().optional(),
}).loose(); 

export type PortfolioItem = z.infer<typeof PortfolioItemSchema>;
