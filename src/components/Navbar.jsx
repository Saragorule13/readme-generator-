export default function Navbar({ showDashboard, onNewRepo }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gh-border/50 bg-gh-canvas/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gh-accent" />
            <span className="text-lg font-bold text-gh-text tracking-tight">
              Repo<span className="text-gh-accent">Readme</span>
            </span>
          </a>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            {showDashboard ? (
              <>
                <span className="text-sm text-gh-text font-medium border-b-2 border-gh-text pb-0.5">
                  Dashboard
                </span>
                <a href="#features" className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200">
                  Features
                </a>
                <a href="#" className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200">
                  Documentation
                </a>
              </>
            ) : (
              <>
                <a href="#features" className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200">
                  Features
                </a>
                <a href="#" className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200">
                  Pricing
                </a>
                <a href="#" className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200">
                  Documentation
                </a>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {showDashboard ? (
              <>
                <button
                  onClick={onNewRepo}
                  className="flex items-center gap-1.5 rounded-lg bg-gh-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-gh-accent-hover hover:shadow-lg hover:shadow-gh-accent/25 active:scale-95"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  New Repository
                </button>
                {/* User avatar */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gh-border bg-gh-overlay">
                  <svg className="h-4 w-4 text-gh-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <a
                  href="#"
                  className="hidden sm:inline text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="rounded-lg bg-gh-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-gh-accent-hover hover:shadow-lg hover:shadow-gh-accent/25 active:scale-95"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
