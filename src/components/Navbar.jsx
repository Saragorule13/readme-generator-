export default function Navbar({ showDashboard, onNewRepo }) {
  const handleNavClick = (e, targetId) => {
    if (showDashboard && onNewRepo) {
      e.preventDefault();
      onNewRepo();
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 80);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gh-border/50 bg-gh-canvas/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              if (showDashboard && onNewRepo) {
                e.preventDefault();
                onNewRepo();
              }
            }}
            className="flex items-center gap-2"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gh-accent" />
            <span className="text-lg font-bold text-gh-text tracking-tight">
              Repo<span className="text-gh-accent">Readme</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {showDashboard ? (
              <>
                <span className="text-sm text-gh-text font-medium border-b-2 border-gh-text pb-0.5 cursor-default">
                  Dashboard
                </span>
                <a
                  href="#features"
                  onClick={(e) => handleNavClick(e, "features")}
                  className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200"
                >
                  Contact
                </a>
              </>
            ) : (
              <>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#contact"
                  className="text-sm text-gh-text-secondary hover:text-gh-text transition-colors duration-200"
                >
                  Contact
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
                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/sara-gorule/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9.5 w-9.5 rounded-lg border border-gh-border bg-gh-overlay text-gh-text-secondary transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-95"
                  title="LinkedIn"
                >
                  <LinkedInIcon />
                </a>

                {/* Resume Button */}
                <a
                  href="https://drive.google.com/file/d/18B4ed0MYg_kZU7FlWLYLyQ1YxElv35nP/view?usp=sharing"
                  className="inline-flex items-center gap-2 rounded-lg border border-gh-border bg-gh-overlay px-4 py-2 text-sm font-semibold text-gh-text transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-95"
                >
                  <ResumeIcon />
                  <span>Resume</span>
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com/Saragorule13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gh-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-gh-accent-hover hover:shadow-lg hover:shadow-gh-accent/25 active:scale-95"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
