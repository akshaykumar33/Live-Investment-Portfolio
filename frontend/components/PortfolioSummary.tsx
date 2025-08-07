import { formatNumber, getGainLoss } from "../utils/formatters";
import { Summary } from "../types";

interface SummaryProps {
  summary: Summary | null;
}

export default function PortfolioSummary({ summary }: SummaryProps) {
  if (!summary) return null;

  return (
    <section className="portfolio-summary">
      <span className="summary-item">
        <span className="summary-label">Total Value:</span>
        <span className="summary-value">
          ₹{formatNumber(summary.totalInvestment)}
        </span>
      </span>
      <span className="summary-item">
        <span className="summary-label">P&L:</span>
        <span className={`summary-pnl ${getGainLoss((summary.presentValue))}`}>
          ₹{formatNumber(summary.presentValue)}
        </span>
      </span>
    </section>
  );
}
