import { Request, Response, NextFunction } from "express";
import * as portfolioService from "../services/portfolio.service";
import cache from "../../middlewares/cache.middleware";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    let data = await portfolioService.refreshPortfolioPrices();

    const search = (req.query.search as string | undefined)?.toLowerCase() || "";
    if (search) {
      data = data.filter(
        (stock) =>
          stock.name.toLowerCase().includes(search) ||
          stock.symbol.toLowerCase().includes(search)
      );
    }

    const sector = req.query.sector as string | undefined;
    if (sector) {
      data = data.filter((stock) => stock.sector === sector);
    }

    const sortKey = req.query.sort as keyof typeof data[0] | undefined;
    if (sortKey) {
      const order = req.query.order === "desc" ? -1 : 1;
      data = data.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal == null) return 1 * order;
        if (bVal == null) return -1 * order;
        if (typeof aVal === "number" && typeof bVal === "number") {
          return (aVal - bVal) * order;
        }
        return String(aVal).localeCompare(String(bVal)) * order;
      });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const stock = await portfolioService.getPortfolioItem(req.params.no);
    if (!stock) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(stock);
  } catch (err) {
    next(err);
  }
}


export async function refreshPrices(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedPortfolio = await portfolioService.refreshPortfolioPrices();

    // Invalidate cache on price refresh
    cache.flushAll();

    // Emit websocket event to clients
    const io = req.app.get("io");
    io.emit("pricesUpdated", updatedPortfolio);

    res.json({ message: "Prices refreshed", portfolio: updatedPortfolio });
  } catch (err) {
    next(err);
  }
}

export async function getSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const cacheKey = "portfolioSummary";
    const cachedSummary = cache.get(cacheKey);
    if (cachedSummary) {
      return res.json(cachedSummary);
    }

    const summary = await portfolioService.getPortfolioSummary();
    cache.set(cacheKey, summary, 60); // cache for 60 seconds
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

export async function getSectorSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const cacheKey = "sectorSummary";
    const cachedSummary = cache.get(cacheKey);
    if (cachedSummary) {
      return res.json(cachedSummary);
    }

    const summary = await portfolioService.getSectorSummary();
    cache.set(cacheKey, summary, 60); // cache for 60 seconds
    res.json(summary);
  } catch (err) {
    next(err);
  }
}
