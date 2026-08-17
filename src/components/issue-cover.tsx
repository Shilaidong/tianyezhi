import Image from "next/image";
import type { Issue } from "@/lib/issues";
import { getIssueCover } from "@/lib/issue-covers";

export default function IssueCover({
  issue,
  priority = false,
}: {
  issue: Issue;
  priority?: boolean;
}) {
  const cover = getIssueCover(issue.n);
  const no = String(issue.n).padStart(2, "0");

  return (
    <article
      className={`issue-cover issue-cover--${cover.style}`}
      style={{ ["--issue-ink" as string]: issue.color }}
    >
      <Image
        src={cover.image}
        alt={`${issue.label}封面`}
        fill
        sizes="(max-width: 700px) 72vw, 340px"
        className="issue-cover-photo"
        priority={priority}
      />
      <div className="issue-cover-shade" aria-hidden />

      {cover.style === "river" && (
        <>
          <header className="issue-cover-mast">
            <span>田野志</span>
            <span className="issue-cover-en">Edgeland</span>
          </header>
          <footer className="issue-cover-foot">
            <p className="issue-cover-kicker">Issue No.{no} · {issue.season}</p>
            <h3>{issue.title}</h3>
          </footer>
        </>
      )}

      {cover.style === "port" && (
        <>
          <header className="issue-cover-banner">
            <span>田野志</span>
            <span className="issue-cover-no">{no}</span>
          </header>
          <footer className="issue-cover-foot issue-cover-foot--flush">
            <p className="issue-cover-kicker">{issue.season}</p>
            <h3>{issue.title}</h3>
          </footer>
        </>
      )}

      {cover.style === "incense" && (
        <>
          <div className="issue-cover-frame" aria-hidden />
          <p className="issue-cover-spine">田野志</p>
          <footer className="issue-cover-plate">
            <p className="issue-cover-kicker">No.{no} · {issue.season}</p>
            <h3>{issue.title}</h3>
          </footer>
        </>
      )}

      {cover.style === "road" && (
        <div className="issue-cover-split">
          <p className="issue-cover-kicker">Issue No.{no}</p>
          <h3>{issue.title}</h3>
          <p className="issue-cover-season">{issue.season}</p>
        </div>
      )}

      {cover.style === "plateau" && (
        <>
          <span className="issue-cover-giant" aria-hidden>
            {no}
          </span>
          <header className="issue-cover-mast issue-cover-mast--ghost">
            <span>田野志</span>
            <span className="issue-cover-en">Edgeland</span>
          </header>
          <footer className="issue-cover-foot">
            <p className="issue-cover-kicker">{issue.season}</p>
            <h3>{issue.title}</h3>
          </footer>
        </>
      )}
    </article>
  );
}
