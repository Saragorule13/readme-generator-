import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TrustBar from "./components/TrustBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ErrorDisplay from "./components/ErrorDisplay";
import RepoInput from "./components/RepoInput";
import ResultPanel from "./components/ResultPanel";
import { saveRecentRepo } from "./components/RecentRepos";
import {
  parseRepoInput,
  fetchRepoInfo,
  fetchRepoContents,
  detectTechStack,
} from "./api/github";
import { generateReadme } from "./api/generator";

export default function App() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    markdown: null,
    repoInfo: null,
    status: "",
  });

  const handleGenerate = useCallback(async (input) => {
    // Parse input
    const parsed = parseRepoInput(input);
    if (!parsed) {
      setState((prev) => ({
        ...prev,
        error: "Please enter a valid GitHub repository URL or owner/repo format.",
        markdown: null,
        repoInfo: null,
      }));
      return;
    }

    const { owner, repo } = parsed;

    setState({
      loading: true,
      error: null,
      markdown: null,
      repoInfo: null,
      status: "Fetching repository info...",
    });

    try {
      // Fetch repo info
      const repoInfo = await fetchRepoInfo(owner, repo);

      setState((prev) => ({ ...prev, status: "Scanning repository files..." }));

      // Fetch contents
      const contents = await fetchRepoContents(owner, repo);

      setState((prev) => ({ ...prev, status: "Detecting tech stack..." }));

      // Detect tech stack
      const techStack = await detectTechStack(owner, repo, contents);

      setState((prev) => ({ ...prev, status: "Generating README..." }));

      // Generate markdown
      const markdown = generateReadme(repoInfo, techStack);

      // Save to recent
      saveRecentRepo(repoInfo.full_name);

      setState({
        loading: false,
        error: null,
        markdown,
        repoInfo,
        status: "",
      });
    } catch (err) {
      setState({
        loading: false,
        error: err.message || "An unexpected error occurred.",
        markdown: null,
        repoInfo: null,
        status: "",
      });
    }
  }, []);

  const handleReset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      markdown: null,
      repoInfo: null,
      status: "",
    });
  }, []);

  const handleRetry = useCallback(() => {
    setState({
      loading: false,
      error: null,
      markdown: null,
      repoInfo: null,
      status: "",
    });
  }, []);

  const showHome = !state.loading && !state.markdown && !state.error;

  return (
    <div className="flex flex-col min-h-screen bg-gh-canvas bg-grid-pattern">
      <Navbar showDashboard={!!state.markdown && !state.loading} onNewRepo={handleReset} />

      <main className="flex-1 flex flex-col">
        {showHome && (
          <>
            <Hero onGenerate={handleGenerate} loading={state.loading} />
            <Features />
            <TrustBar />
          </>
        )}

        {state.loading && (
          <div className="flex-1 flex flex-col justify-center">
            <Loading status={state.status} />
          </div>
        )}

        {state.error && !state.loading && (
          <div className="flex-1 flex flex-col justify-center">
            <ErrorDisplay message={state.error} onRetry={handleRetry} />
            <div className="mt-4">
              <RepoInput onGenerate={handleGenerate} loading={state.loading} />
            </div>
          </div>
        )}

        {state.markdown && !state.loading && (
          <ResultPanel
            markdown={state.markdown}
            repoInfo={state.repoInfo}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
