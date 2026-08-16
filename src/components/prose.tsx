import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Prose({
  content,
  dropcap = false,
}: {
  content: string;
  dropcap?: boolean;
}) {
  return (
    <div className={`prose-zh ${dropcap ? "dropcap" : ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
