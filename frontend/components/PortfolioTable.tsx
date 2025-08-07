
import { formatNumber, getGainLoss } from "../utils/formatters";
import { PortfolioItem } from "../types";

interface PortfolioTableProps {
  data: PortfolioItem[];
  sortKey: string | null;
  sortOrder: "asc" | "desc";
  onSortChange: (key: string) => void;
}

const columns = [
  { key: "name", label: "Stock Name" },
  { key: "sector", label: "Sector" },
  { key: "purchasePrice", label: "Purchase Price" },
  { key: "quantity", label: "Qty" },
  { key: "investment", label: "Investment" },
  { key: "portfolioPercent", label: "Portfolio %" },
  { key: "symbol", label: "NSE/BSE" },
  { key: "cmp", label: "CMP" },
  { key: "presentValue", label: "Present Value" },
  { key: "gainLoss", label: "Gain/Loss" },
  { key: "gainLossPercent", label: "Gain/Loss %" },
  { key: "peRatio", label: "P/E" },
  { key: "latestEarnings", label: "Latest Earnings" },
];

export default function PortfolioTable({
  data,
  sortKey,
  sortOrder,
  onSortChange,
}: PortfolioTableProps) {
  return (
    <div className="table-container">
      <table className="portfolio-table" aria-label="Portfolio holdings table">
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                data-sort={key}
                onClick={() => onSortChange(key)}
                className={sortKey === key ? `sort-${sortOrder}` : ""}
                scope="col"
                tabIndex={0}
                aria-sort={
                  sortKey === key
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-6 text-gray-500"
              >
                No data found.
              </td>
            </tr>
          ) : (
            data.map((stock, id) => {
              return (
                <tr key={id}>
                  <td>
                    <div className="stock-name">{stock.name}</div>
                    <div className="stock-symbol">{stock.symbol}</div>
                  </td>
                  <td>
                    <span className="sector-badge">{stock.sector}</span>
                  </td>
                  <td className="price-cell">
                    ₹{formatNumber(stock.purchasePrice)}
                  </td>
                  <td className="price-cell">{stock.quantity}</td>
                  <td className="price-cell">
                    ₹{formatNumber(stock.investment)}
                  </td>
                  <td className="price-cell">{stock.portfolioPercent}%</td>
                  <td className="price-cell">{stock.symbol}</td>
                  <td className="price-cell">₹{formatNumber(stock.cmp)}</td>
                  <td className="price-cell">
                    ₹{formatNumber(stock.presentValue)}
                  </td>
                  <td className="price-cell">
                    <span
                      className={`gain-loss ${getGainLoss(stock.gainLoss)}`}
                    >
                      ₹{formatNumber(stock.gainLoss)}
                    </span>
                  </td>
                  <td className="price-cell">
                    <span
                      className={`gain-loss ${getGainLoss(
                        stock.gainLossPercent
                      )}`}
                    >
                      {stock.gainLossPercent > 0 ? "+" : ""}
                      {stock.gainLossPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="price-cell">
                    {stock?.peRatio ? stock.peRatio.toFixed(2) : "No Data"}
                  </td>
                  {stock?.latestEarnings ? (
                    <td
                      className={`price-cell gain-loss ${getGainLoss(
                        stock.latestEarnings
                      )}`}
                    >
                      ₹{formatNumber(stock.latestEarnings)}
                    </td>
                  ) :  <td className="price-cell">No Data</td>}
                  
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
