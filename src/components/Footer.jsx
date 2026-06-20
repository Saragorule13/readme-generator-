export default function Footer() {
  return (
    <footer className="border-t border-gh-border/50 bg-gh-canvas/40 py-12 mt-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Footer Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gh-border/30">
          {/* Brand info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gh-accent" />
              <span className="text-lg font-bold text-gh-text tracking-tight">
                Repo<span className="text-gh-accent">Readme</span>
              </span>
            </div>
            <p className="text-sm text-gh-text-secondary max-w-sm leading-relaxed">
              Generate beautiful, comprehensive, and professional README.md files for your GitHub repositories in seconds.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
