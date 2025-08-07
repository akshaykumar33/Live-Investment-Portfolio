import { SectorSummaryItem } from "../types";
import { formatNumber, getGainLoss } from "../utils/formatters";



interface SectorSummaryProps {
  data: SectorSummaryItem[];
}

export default function SectorSummary({ data }: SectorSummaryProps) {
  if (!data || data.length === 0) return <p>No sector data available.</p>;

  return (
    <section className="sector-summary grid gap-4" aria-label="Sector Summary">
      {data.map((sector, id) => (
        <div className="sector-card" key={id}>
          <h4>{sector.sector}</h4>
          <div className="sector-metrics">
            <div className="sector-metric">
              <span className="sector-metric-label">Investment</span>
              <span className="sector-metric-value">
                ₹{formatNumber(sector.investment)}
              </span>
            </div>
            <div className="sector-metric">
              <span className="sector-metric-label">Present Value</span>
              <span className="sector-metric-value">
                ₹{formatNumber(sector.presentValue)}
              </span>
            </div>
            <div className="sector-metric">
              <span className="sector-metric-label">Gain/Loss</span>
              <span className={`sector-metric-value gain-loss ${getGainLoss(sector.gainLoss)}`}>
                ₹{formatNumber(sector.gainLoss)}
              </span>
            </div>
            <div className="sector-metric">
              <span className="sector-metric-label">Return %</span>
              <span className={`sector-metric-value gain-loss ${getGainLoss(sector.gainLossPercent)}`}>
                {sector.gainLossPercent > 0 ? "+" : ""}
                {sector.gainLossPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
