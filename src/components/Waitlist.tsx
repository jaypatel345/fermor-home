"use client";

import { useState, type FormEvent } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Waitlist({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState("error");
      return;
    }
    // No backend in this assignment: the sign-up is confirmed locally.
    setState("done");
  };

  const dark = tone === "dark";

  if (state === "done") {
    return (
      <p role="status" className={`rounded-xl px-4 py-3.5 text-[0.98rem] ${dark ? "bg-white/10 text-white" : "bg-ledger-wash text-ledger-deep"}`}>
        You’re on the list. We’ll write to <strong className="font-semibold">{email.trim()}</strong> once, when the app opens.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-[460px]">
      <label htmlFor={`wl-${tone}`} className={`mb-2 block text-[0.92rem] ${dark ? "text-white/80" : "text-ink-soft"}`}>
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`wl-${tone}`}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `wl-${tone}-err` : undefined}
          className={`h-12 w-full rounded-full border px-5 sm:flex-1 text-[1rem] outline-none transition-colors ${
            dark
              ? "border-white/25 bg-white/5 text-white placeholder:text-white/45 focus:border-marigold"
              : "border-line bg-surface text-ink placeholder:text-ink-faint focus:border-ledger"
          }`}
        />
        <button
          type="submit"
          className={`h-12 rounded-full px-6 font-medium transition-colors ${
            dark ? "bg-marigold text-ink hover:bg-[#f5bd52]" : "bg-ink text-white hover:bg-ledger-deep"
          }`}
        >
          Join the waitlist
        </button>
      </div>
      {state === "error" && (
        <p id={`wl-${tone}-err`} className={`mt-2 text-[0.9rem] ${dark ? "text-marigold" : "text-[#a33a1f]"}`}>
          Enter an email address like name@example.com.
        </p>
      )}
    </form>
  );
}
