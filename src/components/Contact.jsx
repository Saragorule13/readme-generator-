import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("gorulesaravk13@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-gh-accent/[0.04] blur-[100px]" />

      <div className="relative text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-gh-text tracking-tight sm:text-4xl">
          Let's Connect
        </h2>
        <p className="mt-4 text-base text-gh-text-secondary leading-relaxed">
          Want to collaborate, discuss a project, or just say hello? Check out my resume, email me directly, or connect via socials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Resume */}
        <div className="group flex flex-col justify-between rounded-2xl border border-gh-border bg-gh-card p-6 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gh-accent/10 border border-gh-accent/20 text-gh-accent">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-bold text-gh-text">Sara Gorule</h3>
            <p className="mt-2 text-xs leading-relaxed text-gh-text-secondary">
              View or download my latest professional resume to learn more about my experience, skills, and background.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://drive.google.com/file/d/18B4ed0MYg_kZU7FlWLYLyQ1YxElv35nP/view?usp=sharing"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gh-accent py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-gh-accent-hover active:scale-[0.98]"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Card 2: Email */}
        <div className="group flex flex-col justify-between rounded-2xl border border-gh-border bg-gh-card p-6 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-bold text-gh-text">Email Address</h3>
            <p className="mt-2 text-xs leading-relaxed text-gh-text-secondary">
              Reach out directly to <span className="font-semibold text-gh-text break-all">gorulesaravk13@gmail.com</span> for inquiries, feedback, or work.
            </p>
          </div>
          <div className="mt-6 flex gap-2">
            <a
              href="mailto:gorulesaravk13@gmail.com"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-gh-border bg-gh-overlay py-2.5 text-xs font-semibold text-gh-text transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-[0.98]"
            >
              Email Me
            </a>
            <button
              onClick={handleCopyEmail}
              className={`px-3 rounded-xl border transition-all duration-200 active:scale-[0.98] ${
                copied
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                  : "border-gh-border bg-gh-overlay text-gh-text-secondary hover:border-gh-accent/50 hover:text-gh-accent"
              }`}
              title="Copy email to clipboard"
            >
              {copied ? (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Card 3: Socials */}
        <div className="group flex flex-col justify-between rounded-2xl border border-gh-border bg-gh-card p-6 transition-all duration-300 hover:border-gh-accent/30 hover:shadow-xl hover:shadow-gh-accent/5">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-bold text-gh-text">Social Profiles</h3>
            <p className="mt-2 text-xs leading-relaxed text-gh-text-secondary">
              Connect with Sara Gorule on LinkedIn or check out open-source repositories on GitHub.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <a
              href="https://www.linkedin.com/in/sara-gorule/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-gh-border bg-gh-overlay py-2.5 text-xs font-semibold text-gh-text transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-[0.98]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Saragorule13"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-gh-border bg-gh-overlay py-2.5 text-xs font-semibold text-gh-text transition-all duration-200 hover:border-gh-accent/50 hover:text-gh-accent active:scale-[0.98]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
