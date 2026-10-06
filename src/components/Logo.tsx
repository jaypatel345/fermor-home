export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Mark: two ledger lines, the second one shorter — "the working" — with a highlighted figure */}
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect width="26" height="26" rx="7" fill="var(--color-ledger)" />
        <rect x="6" y="8" width="14" height="2.4" rx="1.2" fill="#fff" />
        <rect x="6" y="13" width="8" height="2.4" rx="1.2" fill="#fff" />
        <rect x="15.5" y="12.2" width="5" height="4" rx="1" fill="var(--color-marigold)" />
        <rect x="6" y="18" width="5" height="2.4" rx="1.2" fill="#fff" opacity=".55" />
      </svg>
      <span className="text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">Fermor</span>
    </span>
  );
}
