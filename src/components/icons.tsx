type IconProps = {
  className?: string;
};

const base = "inline-block align-[-0.15em]";

export function IconFacebook({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function IconX({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden="true">
      <path d="M18.9 2H22l-7.03 8.03L23.2 22h-6.6l-5.17-6.76L5.5 22H2.34l7.52-8.6L1.6 2h6.77l4.67 6.17L18.9 2Zm-1.16 18.1h1.83L7.08 3.8H5.11L17.74 20.1Z" />
    </svg>
  );
}

export function IconYouTube({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3 3 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.83 12 9.6 15.6Z" />
    </svg>
  );
}

export function IconInstagram({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 7.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.08a3.18 3.18 0 1 1 0-6.36 3.18 3.18 0 0 1 0 6.36Zm5.1-9.28a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z" />
    </svg>
  );
}

export function IconSearch({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function IconArrowRight({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUp({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function IconCheck({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}

export function IconQuote({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden="true">
      <path d="M4.6 5C3 6.6 2 8.9 2 11.6 2 15.6 4.5 19 8 19c2.2 0 4-1.7 4-4 0-2.1-1.6-3.8-3.7-3.8-.3 0-.7 0-.9.1.3-1.9 1.8-3.7 3.6-4.7L4.6 5Zm10 0C13 6.6 12 8.9 12 11.6c0 4 2.5 7.4 6 7.4 2.2 0 4-1.7 4-4 0-2.1-1.6-3.8-3.7-3.8-.3 0-.7 0-.9.1.3-1.9 1.8-3.7 3.6-4.7L14.6 5Z" />
    </svg>
  );
}

export function IconSun({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.6M12 19.4V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.6M19.4 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
    </svg>
  );
}

export function IconMoon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${base} ${className}`} aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z" />
    </svg>
  );
}
