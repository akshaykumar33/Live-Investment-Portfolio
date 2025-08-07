
interface RefreshButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function RefreshButton({
  onClick,
  loading,
}: RefreshButtonProps) {
  return (
    <button
      id="refreshBtn"
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`btn btn--outline ${loading ? "btn--disabled" : ""}`}
      aria-label="Refresh prices"
      aria-busy={loading || undefined}
    >
      
      Refresh

      {loading && (
        <span className="refresh-icon">
          <svg
            className="refresh-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="spinner-bg"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              opacity="0.25"
            />
            <path
              className="spinner-fg"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </span>
      )}
    </button>
  );
}
