const features = [
  {
    id: "tech-detection",
    icon: CodeIcon,
    title: "Automatic Tech Stack Detection",
    description:
      "Our engine parses your package.json, requirements.txt, or go.mod to automatically identify and badge your entire development stack with zero config.",
    decoration: CodeDecoration,
  },
  {
    id: "github-integration",
    icon: GitHubIntegrationIcon,
    title: "GitHub Integration",
    description:
      "Seamlessly pull project structure, open issues, and contributor data to build a dynamic and living README file.",
    decoration: null,
  },
  {
    id: "markdown-export",
    icon: MarkdownIcon,
    title: "Markdown Export",
    description:
      "Beautifully formatted GFM (GitHub Flavored Markdown) that works perfectly on GitHub, GitLab, and Bitbucket.",
    decoration: null,
  },
  {
    id: "one-click-download",
    icon: DownloadIcon,
    title: "One-click Download",
    description:
      "Preview your generated documentation in real-time and download the final README.md file or copy it to your clipboard instantly.",
    decoration: null,
  },
];

function CodeIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gh-border bg-gh-overlay">
      <svg className="h-5 w-5 text-gh-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    </div>
  );
}

function GitHubIntegrationIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gh-accent/30 bg-gh-accent/10">
      <svg className="h-5 w-5 text-gh-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  );
}

function MarkdownIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gh-border bg-gh-overlay">
      <svg className="h-5 w-5 text-gh-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    </div>
  );
}

function DownloadIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gh-border bg-gh-overlay">
      <svg className="h-5 w-5 text-gh-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    </div>
  );
}

function CodeDecoration() {
  return (
    <div className="absolute top-8 right-6 hidden sm:block pointer-events-none select-none">
      <div className="font-mono text-xs leading-6 text-gh-accent/20">
        <div>{`"dependencies": {`}</div>
        <div className="ml-4">{`"next": "14.1.0",`}</div>
        <div className="ml-4">{`"react": "^18",`}</div>
        <div className="ml-4">{`"tailwindcss": "latest",`}</div>
        <div className="ml-4">{`"typescript": "^5.0"`}</div>
        <div>{`}`}</div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {/* Row 1 — wide left, narrow right */}
          <div className="group relative overflow-hidden rounded-2xl border border-gh-border bg-gh-card p-8 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5 md:col-span-3">
            <CodeDecoration />
            <CodeIcon />
            <h3 className="mt-5 text-lg font-bold text-gh-text">
              Automatic Tech Stack Detection
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gh-text-secondary max-w-sm">
              Our engine parses your package.json, requirements.txt, or go.mod to automatically identify and badge your entire development stack with zero config.
            </p>
          </div>

          <div className="group rounded-2xl border border-gh-border bg-gh-card p-8 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5 md:col-span-2">
            <GitHubIntegrationIcon />
            <h3 className="mt-5 text-lg font-bold text-gh-text">
              GitHub Integration
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gh-text-secondary">
              Seamlessly pull project structure, open issues, and contributor data to build a dynamic and living README file.
            </p>
          </div>

          {/* Row 2 — narrow left, wide right */}
          <div className="group rounded-2xl border border-gh-border bg-gh-card p-8 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5 md:col-span-2">
            <MarkdownIcon />
            <h3 className="mt-5 text-lg font-bold text-gh-text">
              Markdown Export
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gh-text-secondary">
              Beautifully formatted GFM (GitHub Flavored Markdown) that works perfectly on GitHub, GitLab, and Bitbucket.
            </p>
          </div>

          <div className="group relative rounded-2xl border border-gh-border bg-gh-card p-8 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5 md:col-span-3">
            <DownloadIcon />
            <h3 className="mt-5 text-lg font-bold text-gh-text">
              One-click Download
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gh-text-secondary max-w-md">
              Preview your generated documentation in real-time and download the final README.md file or copy it to your clipboard instantly.
            </p>

            {/* Carousel indicator dots inside wide card */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-1 w-10 rounded-full bg-gh-text-muted" />
              <div className="h-1 w-10 rounded-full bg-gh-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
