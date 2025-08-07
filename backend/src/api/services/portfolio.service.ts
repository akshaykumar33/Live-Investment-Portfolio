import path from "path";
import { PortfolioItem, PortfolioItemSchema } from "../../types/portfolio";
import { readJsonFile, writeJsonFile } from "../../utils/file";
import yahooFinance from "yahoo-finance2";
import cache from "../../middlewares/cache.middleware";
import * as earningsProviders from "../../utils/earings";
import isEqual from 'lodash.isequal'

const dataPath = path.join(__dirname, "../data/portfolio.json");

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const rawData = await readJsonFile<unknown[]>(dataPath);
  return rawData.map(entry => PortfolioItemSchema.parse(entry));
}

export async function getPortfolioItem(no: string): Promise<PortfolioItem | undefined> {
  const portfolio = await getPortfolio();
  return portfolio.find(item => String(item.no) === no);
}

export async function refreshPortfolioPrices(): Promise<PortfolioItem[]> {
  const portfolioPriceCacheKey = `portfolio-prices`;
  let cachedPortfolioPrice = cache.get<PortfolioItem[]>(portfolioPriceCacheKey);

  if (cachedPortfolioPrice) {
    // Return cached portfolio price data if available
    return cachedPortfolioPrice;
  }

  const data = await getPortfolio();
  const updatedData: PortfolioItem[] = [];

  for (const stock of data) {
    try {
      // Cache key for individual stock price data
      const priceCacheKey = `price_${stock.symbol}`;
      let cachedPrice = cache.get<{ cmp: number; peRatio: number | null }>(priceCacheKey);

      if (!cachedPrice) {
        const symbolWithSuffix = stock.symbol.includes('.') ? stock.symbol : `${stock.symbol}.NS`;
        const quote = await yahooFinance.quote(symbolWithSuffix);

        if (!quote || !quote.regularMarketPrice) {
          updatedData.push(stock);
          continue;
        }
     const cmp = Number(quote.regularMarketPrice)
      const peRatio = quote.trailingPE ?? null

      // Earnings cache and fetching as before
      const earningsCacheKey = `earnings_${stock.symbol}`;
      let latestEarnings = cache.get<number | null | undefined>(earningsCacheKey);

      if (latestEarnings === undefined || latestEarnings === null) {
        latestEarnings = await earningsProviders.getLatestEarnings(stock.symbol);
        if (latestEarnings !== null && latestEarnings !== undefined) {
          cache.set(earningsCacheKey, latestEarnings, 3600); // Cache earnings for 1 hour
        }
      }

      const presentValue = +(cmp *  stock.quantity).toFixed(2);
      const gainLoss = +(presentValue - stock.investment).toFixed(2);
      const gainLossPercent = stock.investment ? +(gainLoss / stock.investment).toFixed(4) : 0;

      const marketCap = quote.marketCap??stock.marketCap;

      const updatedStock: PortfolioItem = {
        ...stock,
        cmp,
        peRatio,
        latestEarnings,
        presentValue,
        gainLoss,
        gainLossPercent,
        marketCap,
      };

      // Optional: Log if stock data changed
      const isSame = isEqual(updatedStock, stock);
      console.log(`Is stock ${stock.symbol} unchanged?:`, isSame);

      PortfolioItemSchema.parse(updatedStock); // Validate
      updatedData.push(updatedStock);

      }

    
    } catch (err) {
      // On error, keep old stock data
      updatedData.push(stock);
      console.error(`Error updating stock ${stock.symbol}:`, (err as Error).message);
    }
  }

  // Cache full portfolio prices for some reasonable TTL (e.g., 30 seconds)
  cache.set(portfolioPriceCacheKey, updatedData, 30);

  await writeJsonFile(dataPath, updatedData);

  return updatedData;
}


export async function getPortfolioSummary() {
  const data = await getPortfolio();

  let totalInvestment = 0;
  let presentValue = 0;
  let gainLoss = 0;

  for (const stock of data) {
    totalInvestment += stock.investment || 0;
    presentValue += stock.presentValue || 0;
    gainLoss += stock.gainLoss || 0;
  }

  const gainLossPercent = totalInvestment ? +(gainLoss / totalInvestment).toFixed(4) : 0;

  return {
    totalInvestment: +totalInvestment.toFixed(2),
    presentValue: +presentValue.toFixed(2),
    gainLoss: +gainLoss.toFixed(2),
    gainLossPercent
  };
}

export async function getSectorSummary() {
  const data = await getPortfolio();

  interface SectorAgg {
    sector: string;
    investment: number;
    presentValue: number;
    gainLoss: number;
    gainLossPercent?: number;
  }

  const sectors: Record<string, SectorAgg> = {};

  for (const stock of data) {
    const sector = stock.sector || "Other";
    if (!sectors[sector]) {
      sectors[sector] = {
        sector,
        investment: 0,
        presentValue: 0,
        gainLoss: 0
      };
    }
    sectors[sector].investment += stock.investment || 0;
    sectors[sector].presentValue += stock.presentValue || 0;
    sectors[sector].gainLoss += stock.gainLoss || 0;
  }

  Object.values(sectors).forEach((s) => {
    s.gainLossPercent = s.investment ? +(s.gainLoss / s.investment).toFixed(4) : 0;
  });

  return Object.values(sectors);
}
