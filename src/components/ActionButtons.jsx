import { useState } from "react";

const CopyIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default function ActionButtons({ markdown, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        id="copy-btn"
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
          copied
            ? "border border-gh-green bg-gh-green/10 text-gh-green"
            : "border border-gh-border bg-gh-overlay text-gh-text hover:border-gh-accent/50 hover:text-gh-accent"
        }`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? "Copied!" : "Copy Markdown"}
      </button>

      {/* Download button */}
      <button
        onClick={handleDownload}
        id="download-btn"
        className="inline-flex items-center gap-2 rounded-xl border border-gh-border bg-gh-overlay px-4 py-2.5 text-sm font-medium text-gh-text transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-95"
      >
        <DownloadIcon />
        Download README.md
      </button>

      {/* Generate another */}
      <button
        onClick={onReset}
        id="reset-btn"
        className="inline-flex items-center gap-2 rounded-xl border border-gh-border bg-gh-overlay px-4 py-2.5 text-sm font-medium text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-95"
      >
        <RefreshIcon />
        New Repo
      </button>

      {/* Toast */}
      {copied && (
        <div className="toast-enter fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-gh-green/30 bg-gh-surface px-4 py-3 text-sm text-gh-green shadow-xl shadow-black/30">
          <CheckIcon />
          Copied successfully.
        </div>
      )}
    </div>
  );
}
