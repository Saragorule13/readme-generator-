import { useState } from "react";

const LinkIcon = () => (
  <svg className="h-5 w-5 text-gh-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export default function Hero({ onGenerate, loading }) {
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

  const handleExampleClick = (example) => {
    setValue(example);
    setError("");
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Gradient glow behind hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gh-accent/[0.04] blur-[120px]" />
      </div>

      {/* Floating code snippets */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="code-float absolute top-16 left-[8%] animate-float opacity-60">
          npm install repo-readme
        </div>
        <div className="code-float absolute top-28 right-[10%] animate-float-delay opacity-40">
          {`= { mode: 'auto' }`}
        </div>
        <div className="code-float absolute top-[55%] right-[15%] animate-float-delay-2 opacity-30">
          {`{ "react": "^18" }`}
        </div>
        <div className="code-float absolute top-[60%] left-[5%] animate-float opacity-25">
          {`"typescript": "latest"`}
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        {/* V2 Badge */}
        <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-gh-accent/30 bg-gh-accent/10 px-4 py-1.5 text-sm font-medium text-gh-accent">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          V2.0 NOW LIVE
        </div>

        {/* Title */}
        <h1 className="animate-slide-up text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.15]">
          <span className="text-gh-text">Elevate Your GitHub Profile with </span>
          <span className="bg-gradient-to-r from-gh-accent to-gh-purple bg-clip-text text-transparent">
            AI-Powered Docs
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up-delay mt-6 text-base sm:text-lg text-gh-text-secondary leading-relaxed max-w-xl mx-auto">
          Generate professional, comprehensive, and beautiful README files from any GitHub 
          repository in seconds.
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit} className="animate-slide-up-delay-2 mt-10">
          <div
            className={`flex items-center gap-3 rounded-2xl border bg-gh-surface px-4 py-2 sm:px-5 sm:py-3 transition-all duration-300 ${
              error
                ? "border-gh-red/50 shadow-lg shadow-gh-red/10"
                : "border-gh-border focus-within:border-gh-accent/50 focus-within:shadow-lg focus-within:shadow-gh-accent/10"
            }`}
          >
            <LinkIcon />
            <input
              id="repo-input"
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit(e)}
              placeholder="https://github.com/owner/repository"
              disabled={loading}
              className="flex-1 bg-transparent text-gh-text placeholder-gh-text-muted outline-none text-sm sm:text-base disabled:opacity-50"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              disabled={loading}
              id="generate-btn"
              className="flex items-center gap-2 rounded-xl bg-gh-accent px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-gh-accent-hover hover:shadow-lg hover:shadow-gh-accent/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  <span className="hidden sm:inline">Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate README</span>
                  <SparkleIcon />
                </>
              )}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="mt-3 text-sm text-gh-red animate-fade-in">{error}</p>
          )}
        </form>

        {/* Example chips */}
        <div className="animate-slide-up-delay-2 mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-gh-text-muted">Try these:</span>
          {["vercel/next.js", "shadcn/ui", "facebook/react"].map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              disabled={loading}
              className="rounded-lg border border-gh-border bg-gh-overlay px-3 py-1 font-mono text-xs text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/40 hover:text-gh-accent disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
