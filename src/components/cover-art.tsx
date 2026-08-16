import type { CoverMotif } from "@/lib/posts";

const PALETTE = {
  bg: "#f0e9d6",
  paper: "#f8f4e9",
  ink: "#211c14",
  seal: "#b03a24",
  straw: "#c9a24d",
  moss: "#5d6b48",
};

function Motif({ motif }: { motif: CoverMotif }) {
  switch (motif) {
    case "terrace":
      return (
        <g fill="none" strokeWidth="5" strokeLinecap="round">
          <path d="M-10 210 Q100 160 210 200 T410 180" stroke={PALETTE.moss} />
          <path d="M-10 240 Q110 190 220 230 T410 210" stroke={PALETTE.straw} />
          <path d="M-10 270 Q120 225 230 258 T410 245" stroke={PALETTE.moss} opacity="0.75" />
          <path d="M-10 300 Q130 260 240 290 T410 278" stroke={PALETTE.ink} opacity="0.55" />
          <circle cx="320" cy="80" r="34" fill={PALETTE.seal} stroke="none" />
        </g>
      );
    case "tree":
      return (
        <g>
          <ellipse cx="200" cy="262" rx="150" ry="12" fill={PALETTE.ink} opacity="0.12" />
          <path d="M196 260 C192 200 188 170 176 130 M204 260 C208 205 214 175 228 135"
            fill="none" stroke={PALETTE.ink} strokeWidth="9" strokeLinecap="round" />
          <path d="M200 262 C200 220 200 180 200 140" fill="none" stroke={PALETTE.ink} strokeWidth="11" strokeLinecap="round" />
          <circle cx="200" cy="112" r="58" fill={PALETTE.moss} />
          <circle cx="150" cy="132" r="40" fill={PALETTE.moss} opacity="0.85" />
          <circle cx="252" cy="130" r="42" fill={PALETTE.moss} opacity="0.9" />
          <circle cx="200" cy="112" r="58" fill="none" stroke={PALETTE.ink} strokeWidth="3" opacity="0.25" />
          <circle cx="318" cy="70" r="22" fill={PALETTE.seal} />
        </g>
      );
    case "market":
      return (
        <g>
          <rect x="40" y="120" width="320" height="14" fill={PALETTE.ink} />
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${40 + i * 40} 134 l20 46 l20 -46 Z`}
              fill={i % 2 === 0 ? PALETTE.seal : PALETTE.paper}
            />
          ))}
          <rect x="70" y="205" width="90" height="60" fill={PALETTE.straw} opacity="0.9" />
          <rect x="185" y="218" width="60" height="47" fill={PALETTE.moss} opacity="0.9" />
          <rect x="265" y="200" width="70" height="65" fill={PALETTE.seal} opacity="0.85" />
          <ellipse cx="200" cy="272" rx="170" ry="10" fill={PALETTE.ink} opacity="0.12" />
        </g>
      );
    case "horn":
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M96 190 L196 150 L196 168 L108 204 Z" fill={PALETTE.ink} stroke="none" />
          <path d="M196 138 L236 122 L236 186 L196 170 Z" fill={PALETTE.seal} stroke="none" />
          <circle cx="88" cy="196" r="12" fill={PALETTE.straw} stroke="none" />
          <path d="M252 96 A70 70 0 0 1 252 208" stroke={PALETTE.moss} strokeWidth="6" />
          <path d="M278 76 A104 104 0 0 1 278 228" stroke={PALETTE.moss} strokeWidth="5" opacity="0.7" />
          <path d="M304 58 A138 138 0 0 1 304 246" stroke={PALETTE.moss} strokeWidth="4" opacity="0.45" />
        </g>
      );
    case "ferry":
      return (
        <g>
          <circle cx="110" cy="80" r="30" fill={PALETTE.straw} />
          <path d="M150 205 L250 205 L232 232 L168 232 Z" fill={PALETTE.ink} />
          <path d="M200 205 L200 132 L236 200 Z" fill={PALETTE.seal} />
          <g fill="none" stroke={PALETTE.moss} strokeWidth="5" strokeLinecap="round">
            <path d="M20 252 h110" />
            <path d="M150 262 h130" opacity="0.8" />
            <path d="M40 274 h90" opacity="0.6" />
            <path d="M300 252 h80" />
            <path d="M310 274 h70" opacity="0.6" />
          </g>
        </g>
      );
    case "flame":
      return (
        <g>
          <rect x="60" y="228" width="280" height="16" rx="4" fill={PALETTE.ink} />
          <rect x="80" y="244" width="240" height="26" rx="6" fill={PALETTE.ink} opacity="0.85" />
          <path d="M200 62 C164 116 140 148 140 188 a60 60 0 0 0 120 0 C260 148 236 116 200 62 Z" fill={PALETTE.seal} />
          <path d="M200 122 C180 152 168 170 168 194 a32 32 0 0 0 64 0 C232 170 220 152 200 122 Z" fill={PALETTE.straw} />
          <path d="M200 168 C190 182 186 190 186 200 a14 14 0 0 0 28 0 C214 190 210 182 200 168 Z" fill={PALETTE.paper} />
        </g>
      );
    case "jiebei":
      return (
        <g>
          <ellipse cx="200" cy="264" rx="130" ry="10" fill={PALETTE.ink} opacity="0.12" />
          <rect x="162" y="78" width="76" height="184" rx="14" fill={PALETTE.ink} />
          <rect x="162" y="78" width="76" height="20" rx="10" fill={PALETTE.seal} />
          <rect x="180" y="122" width="40" height="8" rx="4" fill={PALETTE.paper} opacity="0.75" />
          <rect x="186" y="142" width="28" height="8" rx="4" fill={PALETTE.paper} opacity="0.55" />
          <rect x="180" y="162" width="40" height="8" rx="4" fill={PALETTE.paper} opacity="0.4" />
          <rect x="186" y="182" width="28" height="8" rx="4" fill={PALETTE.paper} opacity="0.28" />
          <g stroke={PALETTE.moss} strokeWidth="4" strokeLinecap="round">
            <path d="M120 262 q4 -18 10 -24" fill="none" />
            <path d="M136 262 q2 -14 8 -20" fill="none" opacity="0.7" />
            <path d="M270 262 q-4 -18 -10 -24" fill="none" />
            <path d="M286 262 q-2 -14 -8 -20" fill="none" opacity="0.7" />
          </g>
          <circle cx="312" cy="76" r="24" fill={PALETTE.straw} />
        </g>
      );
  }
}

export default function CoverArt({
  motif,
  className = "",
}: {
  motif: CoverMotif;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill={PALETTE.bg} />
      <rect width="400" height="300" fill="none" stroke={PALETTE.ink} strokeOpacity="0.15" strokeWidth="2" />
      <Motif motif={motif} />
    </svg>
  );
}
