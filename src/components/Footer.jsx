export default function Footer() {
  return (
    <footer className="border-t border-gh-border/50 py-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left */}
          <div className="flex items-center gap-1.5 text-sm text-gh-text-muted">
            <span className="font-semibold text-gh-text-secondary">RepoReadme</span>
            <span>© {new Date().getFullYear()} RepoReadme</span>
          </div>

          {/* Center links */}
          <div className="flex items-center gap-6 text-sm text-gh-text-muted">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gh-text transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-gh-text transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-gh-text transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Right — status */}
          <div className="flex items-center gap-2 text-xs text-gh-text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono tracking-wider uppercase">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
