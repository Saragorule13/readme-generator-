import { useState } from "react";
import MarkdownPreview from "./MarkdownPreview";
import RawMarkdown from "./RawMarkdown";

function EyeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function CodeBracketIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export default function ResultPanel({ markdown, repoInfo, onReset }) {
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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

  // Timestamp for "last saved"
  const timeLabel = "JUST NOW";

  return (
    <div className="animate-fade-in">
      {/* Mobile tab toggle */}
      <div className="mx-auto max-w-7xl px-4 pt-6 lg:hidden">
        <div className="flex gap-1 rounded-xl bg-gh-overlay p-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeTab === "preview"
                ? "bg-gh-surface text-gh-text shadow-sm"
                : "text-gh-text-secondary hover:text-gh-text"
            }`}
          >
            <EyeIcon />
            Preview
          </button>
          <button
            onClick={() => setActiveTab("raw")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeTab === "raw"
                ? "bg-gh-surface text-gh-text shadow-sm"
                : "text-gh-text-secondary hover:text-gh-text"
            }`}
          >
            <CodeBracketIcon />
            Markdown
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-0 overflow-hidden rounded-2xl border border-gh-border">

          {/* ===== LEFT: README Preview ===== */}
          <div className={`bg-gh-surface ${activeTab !== "preview" ? "hidden lg:block" : ""}`}>
            {/* Preview header */}
            <div className="flex items-center justify-between border-b border-gh-border px-6 py-4">
              <div className="flex items-center gap-2.5 text-gh-text">
                <EyeIcon />
                <span className="text-base font-semibold">README Preview</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-lg border border-gh-border bg-gh-overlay px-3 py-1 font-mono text-xs text-gh-text-muted uppercase tracking-wider">
                  Last saved: {timeLabel}
                </span>
                <button
                  onClick={onReset}
                  id="reset-btn"
                  className="rounded-lg border border-gh-border bg-gh-overlay px-3 py-1.5 text-xs font-medium text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/40 hover:text-gh-accent"
                >
                  + New Repo
                </button>
              </div>
            </div>

            {/* Preview body */}
            <div className="p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
              <MarkdownPreview markdown={markdown} />
            </div>
          </div>

          {/* ===== RIGHT: Raw Markdown ===== */}
          <div className={`bg-gh-card border-t lg:border-t-0 lg:border-l border-gh-border ${activeTab !== "raw" ? "hidden lg:block" : ""}`}>
            {/* Raw header */}
            <div className="flex items-center justify-between border-b border-gh-border px-6 py-4">
              <div className="flex items-center gap-2.5 text-gh-text">
                <CodeBracketIcon />
                <span className="text-base font-semibold">Raw Markdown</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  id="copy-btn"
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    copied
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      : "border-gh-border bg-gh-overlay text-gh-text-secondary hover:border-gh-accent/40 hover:text-gh-accent"
                  }`}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  id="download-btn"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gh-border bg-gh-overlay px-3 py-1.5 text-xs font-medium text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/40 hover:text-gh-accent"
                >
                  <DownloadIcon />
                  Download
                </button>
              </div>
            </div>

            {/* File tabs */}
            <div className="border-b border-gh-border px-6">
              <div className="flex gap-0">
                <button className="relative px-4 py-2.5 text-sm font-medium text-gh-accent">
                  README.md
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gh-accent rounded-full" />
                </button>
                <button className="px-4 py-2.5 text-sm font-medium text-gh-text-muted hover:text-gh-text-secondary transition-colors">
                  CONTRIBUTING.md
                </button>
              </div>
            </div>

            {/* Raw body */}
            <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 240px)" }}>
              <RawMarkdown markdown={markdown} />
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {copied && (
        <div className="toast-enter fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-gh-surface px-4 py-3 text-sm text-emerald-400 shadow-xl shadow-black/30">
          <CheckIcon />
          Copied successfully.
        </div>
      )}
    </div>
  );
}
