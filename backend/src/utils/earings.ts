import yahooFinance from 'yahoo-finance2';
import axios from 'axios';
import logger from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config();

const FMP_API_KEY = process.env.FMP_API_KEY;
const AV_API_KEY = process.env.AV_API_KEY;

export async function getEarningsYahoo(symbol: string): Promise<number | null> {
  try {
     const symbolWithSuffix = symbol.includes('.') ? symbol : `${symbol}.NS`;
    const summary = await yahooFinance.quoteSummary(symbolWithSuffix, { modules: ['defaultKeyStatistics'] });
    return summary?.defaultKeyStatistics?.trailingEps ?? null;
  } catch (err) {
    logger.warn(`Yahoo provider failed for ${symbol}: ${(err as Error).message}`);
    return null;
  }
}

export async function getEarningsFMP(symbol: string): Promise<number | null> {
  try {
    const url = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}.NS?apikey=${FMP_API_KEY}&limit=1`;
    const { data } = await axios.get(url);
    return data?.[0]?.eps ?? null;
  } catch (err) {
    logger.warn(`FMP provider failed for ${symbol}: ${(err as Error).message}`);
    return null;
  }
}

export async function getEarningsAlphaVantage(symbol: string): Promise<number | null> {
  try {
    const url = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}.NS&apikey=${AV_API_KEY}`;
    const { data } = await axios.get(url);
    const eps = data?.quarterlyEarnings?.[0]?.reportedEPS;
    return eps !== undefined ? Number(eps) : null;
  } catch (err) {
    logger.warn(`Alpha Vantage provider failed for ${symbol}: ${(err as Error).message}`);
    return null;
  }
}

// Provider fallback function for latest earnings (prioritizes Yahoo then falls back)
export async function getLatestEarnings(symbol: string): Promise<number | null> {
  let eps = await getEarningsYahoo(symbol);
  if (!eps) eps = await getEarningsFMP(symbol);
  if (!eps) eps = await getEarningsAlphaVantage(symbol);
  return eps;
}
