export default function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-md px-4 py-12 animate-fade-in">
      <div className="rounded-2xl border border-gh-red/30 bg-gh-surface p-8 text-center shadow-lg shadow-gh-red/5">
        {/* Error icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gh-red/10">
          <svg
            className="h-7 w-7 text-gh-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error message */}
        <h3 className="text-lg font-semibold text-gh-text mb-2">Something went wrong</h3>
        <p className="text-gh-text-secondary text-sm leading-relaxed mb-6">
          {message || "An unexpected error occurred. Please try again."}
        </p>

        {/* Retry button */}
        <button
          onClick={onRetry}
          id="retry-btn"
          className="inline-flex items-center gap-2 rounded-xl border border-gh-border bg-gh-overlay px-5 py-2.5 text-sm font-medium text-gh-text transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}
