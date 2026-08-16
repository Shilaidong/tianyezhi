export default function PullQuote({
  quote,
  source,
  dark = false,
  enSub,
}: {
  quote: string;
  source: string;
  dark?: boolean;
  enSub?: string;
}) {
  return (
    <figure
      className={`${dark ? "bg-ink text-paper" : "bg-paper-deep text-ink"}`}
    >
      <div className="mx-auto max-w-[960px] px-6 py-20 text-center">
        <div
          aria-hidden="true"
          className={`font-song text-5xl leading-none ${dark ? "text-straw" : "text-seal"}`}
        >
          「
        </div>
        <blockquote className="mt-3 font-song text-[26px] font-normal leading-[1.5] tracking-wide sm:text-[36px]">
          {quote}
        </blockquote>
        <figcaption
          className={`oa-label mt-7 ${dark ? "text-paper/60" : "text-ink-soft"}`}
        >
          —— {source}
        </figcaption>
        {enSub && (
          <span
            className={`oa-native oa-native--en ${dark ? "oa-native--dark" : ""}`}
          >
            {enSub}
          </span>
        )}
      </div>
    </figure>
  );
}
