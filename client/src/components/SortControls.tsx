import "../styles/SortControls.css";

interface SortControlsProps {
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
  disabled?: boolean;
}

function SortControls({
  currentSort,
  currentOrder,
  onSortChange,
  disabled = false,
}: SortControlsProps) {
  const sortOptions = [
    { value: "created_at", label: "Created Date" },
    { value: "public_repos", label: "Public Repositories" },
    { value: "public_gists", label: "Public Gists" },
    { value: "followers", label: "Followers" },
    { value: "following", label: "Following" },
    { value: "login", label: "Username" },
  ];

  return (
    <div className="sort-controls">
      <div className="sort-group">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value, currentOrder)}
          disabled={disabled}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-group">
        <label htmlFor="sort-order">Order:</label>
        <select
          id="sort-order"
          value={currentOrder}
          onChange={(e) =>
            onSortChange(currentSort, e.target.value as "asc" | "desc")
          }
          disabled={disabled}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}

export default SortControls;
