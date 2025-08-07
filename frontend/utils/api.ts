import { FetchPortfolioParams, PortfolioItem, SectorSummaryItem, Summary } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch portfolio data array with optional filtering and sorting via query params
 */
export async function fetchPortfolio(params?: FetchPortfolioParams): Promise<PortfolioItem[]> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.sector) query.append("sector", params.sector);
  if (params?.sortKey) query.append("sort", params.sortKey);
  if (params?.sortOrder) query.append("order", params.sortOrder);

  const res = await fetch(`${API_BASE}/api/portfolio?${query.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch portfolio: ${res.statusText}`);
  return res.json();
}

/** Fetch aggregated portfolio summary data */
export async function fetchSummary(): Promise<Summary> {
  const res = await fetch(`${API_BASE}/api/portfolio/summary`);
  if (!res.ok) throw new Error("Failed to fetch portfolio summary");
  return res.json();
}

/** Fetch aggregated sector summary array */
export async function fetchSectorSummary(): Promise<SectorSummaryItem[]> {
  const res = await fetch(`${API_BASE}/api/portfolio/sector-summary`);
  if (!res.ok) throw new Error("Failed to fetch sector summaries");
  return res.json();
}

/** POST to refresh prices on backend */
export async function refreshPrices(): Promise<PortfolioItem[]> {
  const res = await fetch(`${API_BASE}/api/portfolio/refresh-prices`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to refresh prices");
  return res.json();
}
