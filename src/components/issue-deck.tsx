"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Issue } from "@/lib/issues";
import IssueCover from "./issue-cover";
import { IconArrowRight } from "./icons";

export default function IssueDeck({
  issues,
  variant = "page",
}: {
  issues: Issue[];
  variant?: "page" | "aside";
}) {
  const ordered = [...issues].sort((a, b) => a.n - b.n);
  const [active, setActive] = useState(() => Math.max(ordered.length - 1, 0));
  const touchX = useRef<number | null>(null);
  const aside = variant === "aside";

  const go = useCallback(
    (next: number) => {
      if (ordered.length === 0) return;
      setActive((next + ordered.length) % ordered.length);
    },
    [ordered.length],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") go(active + 1);
      if (event.key === "ArrowLeft") go(active - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const current = ordered[active];
  if (!current) return null;

  const spread = aside ? 18 : 42;
  const tilt = aside ? -7 : -18;
  const depth = aside ? -72 : -110;

  return (
    <section className={`issue-deck-section${aside ? " issue-deck-section--aside" : ""}`}>
      <div className={aside ? "issue-deck-head" : "oa-container"}>
        <div className={aside ? "issue-deck-head-row" : "flex items-baseline justify-between border-b border-ink pb-3"}>
          <div>
            <h2 className={aside ? "issue-deck-aside-title" : "oa-section-title"}>特刊</h2>
            {!aside && <span className="oa-native oa-native--en">The Issues</span>}
          </div>
          <Link href="/issues" className="oa-label text-ink-soft transition-colors hover:text-seal">
            全部 <IconArrowRight className="oa-arrow" />
          </Link>
        </div>
      </div>

      <div
        className="issue-deck"
        onTouchStart={(event) => {
          touchX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchX.current == null) return;
          const dx = event.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (dx > 48) go(active - 1);
          if (dx < -48) go(active + 1);
        }}
      >
        {ordered.map((issue, index) => {
          const offset = index - active;
          const abs = Math.abs(offset);
          if (abs > (aside ? 1 : 2)) return null;
          const style = {
            zIndex: 20 - abs,
            transform: `translate(-50%, -50%) translate3d(${offset * spread}%, ${abs * (aside ? 6 : 10)}px, ${abs * depth}px) rotateY(${offset * tilt}deg) scale(${1 - abs * (aside ? 0.07 : 0.12)})`,
            opacity: abs === 2 ? 0.38 : 1,
            filter: abs === 0 ? "none" : "brightness(0.7)",
          };
          const className = `issue-deck-card${offset === 0 ? " is-front" : ""}`;
          if (offset === 0) {
            return (
              <Link
                key={issue.n}
                href={`/issues/${issue.n}`}
                className={className}
                style={style}
                aria-label={`打开${issue.label}`}
              >
                <IssueCover issue={issue} priority={aside} />
              </Link>
            );
          }
          return (
            <button
              key={issue.n}
              type="button"
              className={className}
              style={style}
              onClick={() => setActive(index)}
              aria-label={`切换到${issue.label}`}
            >
              <IssueCover issue={issue} />
            </button>
          );
        })}
      </div>

      <div className={`issue-deck-meta${aside ? "" : " oa-container"}`}>
        <div className="issue-deck-controls">
          <button type="button" className="issue-deck-nav" onClick={() => go(active - 1)} aria-label="上一本">
            上一本
          </button>
          <div className="issue-deck-dots">
            {ordered.map((issue, index) => (
              <button
                key={issue.n}
                type="button"
                className={index === active ? "is-on" : undefined}
                onClick={() => setActive(index)}
                aria-label={issue.label}
              />
            ))}
          </div>
          <button type="button" className="issue-deck-nav" onClick={() => go(active + 1)} aria-label="下一本">
            下一本
          </button>
        </div>
        {!aside && (
          <>
            <p className="issue-deck-kicker">
              ISSUE No.{String(current.n).padStart(2, "0")} · {current.season}
            </p>
            <h3 className="issue-deck-title">{current.label}</h3>
            <p className="issue-deck-blurb">{current.blurb}</p>
            <Link href={`/issues/${current.n}`} className="issue-deck-cta">
              打开本期 <IconArrowRight className="oa-arrow" />
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
