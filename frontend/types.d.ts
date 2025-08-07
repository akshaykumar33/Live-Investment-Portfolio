export interface PortfolioItem {
  no: number;
  name: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercent: number;
  symbol: string;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  marketCap?: number |null;                        
  peRatio?: number |null;                  
  latestEarnings?: number|null;           
}

export interface FetchPortfolioParams {
  search?: string;
  sector?: string;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
}

export interface Summary {
  totalInvestment: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

  export interface SectorSummaryItem {
  sector: string;
  investment: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}