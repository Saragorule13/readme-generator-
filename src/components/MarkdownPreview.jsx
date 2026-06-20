import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function MarkdownPreview({ markdown }) {
  return (
    <div className="rounded-xl border border-gh-border bg-gh-card p-6 sm:p-8">
      <div className="prose-readme">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
