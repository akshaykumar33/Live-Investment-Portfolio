
interface SectorFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

const sectors = [
  "", // All sectors
  "Financial",
  "Tech",
  "Consumer",
  "Power",
  "Pipe",
];

export default function SectorFilter({ selected, onChange }: SectorFilterProps) {
  return (
    <div className="form-group">
    <select
      id="sectorFilter"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="form-control"
      aria-label="Filter by sector"
    >
      <option value="">All Sectors</option>
      {sectors
        .filter((s) => s !== "")
        .map((sec) => (
          <option key={sec} value={sec}>
            {sec}
          </option>
        ))}
    </select>
    </div>
  );
}
