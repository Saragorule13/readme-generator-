import { useRef, useEffect } from "react";

/**
 * Simple markdown syntax highlighter for the raw code view.
 * Colors: headers purple, links/urls green-ish, badges cyan, bold yellow.
 */
function highlightLine(line) {
  // Heading lines
  if (/^#{1,6}\s/.test(line)) {
    const match = line.match(/^(#{1,6})\s(.*)/);
    if (match) {
      return (
        <>
          <span className="text-gh-accent">{match[1]} {match[2]}</span>
        </>
      );
    }
  }

  // Badge / image lines: ![...](...) 
  if (/^!\[/.test(line)) {
    return <span className="text-cyan-400/70">{line}</span>;
  }

  // Lines starting with - (list items)
  if (/^-\s/.test(line)) {
    return (
      <>
        <span className="text-gh-text-muted">- </span>
        <span className="text-gh-text-secondary">{line.slice(2)}</span>
      </>
    );
  }

  // Code fence
  if (/^```/.test(line)) {
    return <span className="text-gh-accent/60">{line}</span>;
  }

  // Bold **text**
  if (/\*\*/.test(line)) {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <span key={i} className="text-amber-300/80">{part}</span>;
      }
      return <span key={i} className="text-gh-text-secondary">{part}</span>;
    });
  }

  // Link-containing lines
  if (/\[.*\]\(.*\)/.test(line)) {
    return <span className="text-emerald-400/70">{line}</span>;
  }

  // Regular text
  return <span className="text-gh-text-secondary">{line}</span>;
}

export default function RawMarkdown({ markdown }) {
  const containerRef = useRef(null);
  const lines = markdown.split("\n");

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [markdown]);

  return (
    <div ref={containerRef} className="font-mono text-sm leading-6">
      <div className="p-4">
        {lines.map((line, i) => (
          <div key={i} className="flex hover:bg-white/[0.02] transition-colors">
            <span className="inline-block w-10 shrink-0 select-none pr-3 text-right text-gh-text-muted/50 text-xs leading-6">
              {i + 1}
            </span>
            <span className="leading-6 break-all whitespace-pre-wrap">
              {line ? highlightLine(line) : " "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
