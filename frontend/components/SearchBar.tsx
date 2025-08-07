import { useMemo } from "react";
import { debounceThrottleCombo,throttle } from "../utils/formatters";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const optimizedSearch = useMemo(
    () =>
      debounceThrottleCombo((val: string) => {
        onChange(val);
      }, 300, 600),
    [onChange]
  );

  return (
    <div className="form-group">
      <input
        id="searchInput"
        type="search"
        placeholder="Search by company name or symbol"
        value={value}
        onChange={(e) => optimizedSearch(e.target.value)}
        className="form-control"
        aria-label="Search portfolio"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}
