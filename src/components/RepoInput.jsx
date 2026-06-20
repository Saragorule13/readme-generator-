import { useState } from "react";

const SearchIcon = () => (
  <svg className="h-5 w-5 text-gh-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export default function RepoInput({ onGenerate, loading }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    onGenerate(trimmed);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <form onSubmit={handleSubmit} className="relative">
        {/* Input container */}
        <div
          className={`group flex items-center gap-3 rounded-2xl border bg-gh-surface px-4 py-3 transition-all duration-300 ${
            error
              ? "border-gh-red shadow-lg shadow-gh-red/10"
              : "border-gh-border focus-within:border-gh-accent focus-within:shadow-lg focus-within:shadow-gh-accent/10 hover:border-gh-border-muted"
          }`}
        >
          <SearchIcon />
          <input
            id="repo-input"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="facebook/react or https://github.com/facebook/react"
            disabled={loading}
            className="flex-1 bg-transparent text-gh-text placeholder-gh-text-muted outline-none text-base disabled:opacity-50"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            disabled={loading}
            id="generate-btn"
            className="flex items-center gap-2 rounded-xl bg-gh-green px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gh-green-hover hover:shadow-lg hover:shadow-gh-green/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none whitespace-nowrap"
          >
            {loading ? (
              <>
                <SpinnerIcon />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>Generate</span>
                <ArrowIcon />
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-3 flex items-center gap-2 text-sm text-gh-red animate-fade-in">
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </form>

      {/* Example hint */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-gh-text-muted">
        <span>Try:</span>
        {["facebook/react", "vercel/next.js", "pallets/flask"].map((example) => (
          <button
            key={example}
            onClick={() => {
              setValue(example);
              setError("");
            }}
            disabled={loading}
            className="rounded-lg border border-gh-border bg-gh-overlay px-2.5 py-1 font-mono text-xs text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent disabled:opacity-50"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
