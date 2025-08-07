import { Skeleton } from "@mui/material";

export default function PortfolioTableSkeleton() {
  return (
    <div className="table-container">
      <table className="portfolio-table" aria-label="Loading Portfolio Table">
        <thead>
          <tr>
            {Array.from({ length: 13 }).map((_, idx) => (
              <th key={idx}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: 12 }).map((_, colIdx) => (
                <td key={colIdx} className="price-cell">
                  <Skeleton  sx={{ bgcolor: 'grey.600' }}variant="rounded" width="20em" height="10em" animation="wave"/>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
