"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#decisions", label: "Calculators" },
  { href: "#honest", label: "How we work" },
  { href: "#app", label: "The app" },
  { href: "#reading", label: "Explainers" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-line bg-paper/92 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Fermor home">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="https://fermor.in/sign-in" className="px-3 py-2 text-[0.95rem] text-ink-soft hover:text-ink">
            Log in
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-ink px-4 py-2 text-[0.95rem] font-medium text-white transition-colors hover:bg-ledger-deep"
          >
            Join the app waitlist
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 7h16M3 15h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 text-[1.05rem] text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-ink px-4 py-3 text-center font-medium text-white"
          >
            Join the app waitlist
          </a>
        </nav>
      )}
    </header>
  );
}
