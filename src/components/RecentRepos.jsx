import { useEffect, useState } from "react";

const MAX_RECENT = 5;
const STORAGE_KEY = "reporeadme_recent";

function getRecentRepos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentRepo(fullName) {
  try {
    let recent = getRecentRepos();
    // Remove duplicate if exists
    recent = recent.filter((r) => r !== fullName);
    // Add to front
    recent.unshift(fullName);
    // Limit
    if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
  } catch {
    // localStorage unavailable
  }
}

export default function RecentRepos({ onSelect, loading }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setRepos(getRecentRepos());
  }, []);

  if (repos.length === 0) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 mt-8 animate-fade-in">
      <p className="text-sm text-gh-text-muted mb-3 text-center">Recent repositories</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {repos.map((repo) => (
          <button
            key={repo}
            onClick={() => onSelect(repo)}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-gh-border bg-gh-surface px-3 py-1.5 text-sm text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent hover:bg-gh-overlay disabled:opacity-50"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-xs">{repo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
