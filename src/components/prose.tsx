import { Children, isValidElement } from "react";
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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <figure>
                <img src={src} alt="" />
                {alt ? <figcaption>{alt}</figcaption> : null}
              </figure>
            );
          },
          p: ({ children }) => {
            const items = Children.toArray(children).filter((child) =>
              typeof child === "string" ? child.trim() !== "" : true,
            );
            if (
              items.length === 1 &&
              isValidElement(items[0]) &&
              items[0].type === "figure"
            ) {
              return items[0];
            }
            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
