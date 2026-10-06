"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { emi, fd, inWords, pct, rupees, sip } from "@/lib/finance";

type Mode = "sip" | "emi" | "fd";

const modes: { id: Mode; label: string; question: string }[] = [
  { id: "sip", label: "SIP", question: "What will my monthly SIP grow to?" },
  { id: "emi", label: "Home loan", question: "What will this home loan really cost me?" },
  { id: "fd", label: "Fixed deposit", question: "What does my FD pay at maturity?" },
];

/* ---------- small building blocks ---------- */

function V({ children }: { children: ReactNode }) {
  // A variable, set like maths on paper
  return <i className="font-serif text-[1.08em] text-ink">{children}</i>;
}

function C({ children }: { children: ReactNode }) {
  // A chunk of a formula that must not break across lines
  return <span className="inline-block whitespace-nowrap">{children}</span>;
}

function M({ children }: { children: ReactNode }) {
  // A number the reader typed in — highlighted so they can trace it through the working
  return <span className="mark">{children}</span>;
}

type FieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  format?: (v: number) => string;
};

function Field({ label, value, onChange, min, max, step, prefix, suffix, format }: FieldProps) {
  const id = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const fill = `${((value - min) / (max - min)) * 100}%`;

  const commit = (raw: string) => {
    const parsed = Number(raw.replace(/[^\d.]/g, ""));
    if (!Number.isNaN(parsed) && raw.trim() !== "") {
      onChange(Math.min(max, Math.max(min, parsed)));
    }
    setDraft(null);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="whitespace-nowrap text-[0.92rem] text-ink-soft">
          {label}
        </label>
        <div className="flex shrink-0 items-baseline whitespace-nowrap rounded-md border border-line bg-paper/60 px-2 py-1 focus-within:border-ledger">
          {prefix && <span className="mr-0.5 text-ink-faint">{prefix}</span>}
          <input
            aria-label={`${label} value`}
            inputMode="decimal"
            className="num w-[5.6rem] bg-transparent text-right font-medium text-ink outline-none"
            value={draft ?? (format ? format(value) : String(value))}
            onFocus={(e) => {
              setDraft(String(value));
              requestAnimationFrame(() => e.target.select());
            }}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
          {suffix && <span className="ml-1 text-ink-faint">{suffix}</span>}
        </div>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-1"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ["--fill" as string]: fill }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

const plain = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
const n = (v: number) => plain.format(v);

/* ---------- the calculator ---------- */

export function WorkingCalculator() {
  const [mode, setMode] = useState<Mode>("sip");

  const [sipAmt, setSipAmt] = useState(10000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  const [loan, setLoan] = useState(5000000);
  const [loanRate, setLoanRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(20);

  const [dep, setDep] = useState(100000);
  const [depRate, setDepRate] = useState(7);
  const [depYears, setDepYears] = useState(5);

  const s = useMemo(() => sip(sipAmt, sipRate, sipYears), [sipAmt, sipRate, sipYears]);
  const e = useMemo(() => emi(loan, loanRate, loanYears), [loan, loanRate, loanYears]);
  const f = useMemo(() => fd(dep, depRate, depYears), [dep, depRate, depYears]);

  const current = modes.find((m) => m.id === mode)!;

  let fields: ReactNode;
  let working: ReactNode[];
  let answer: { label: string; value: number; split: [string, number, string, number] };
  let reading: ReactNode;

  if (mode === "sip") {
    fields = (
      <>
        <Field label="Monthly investment" value={sipAmt} onChange={setSipAmt} min={500} max={200000} step={500} prefix="₹" format={n} />
        <Field label="Expected return a year" value={sipRate} onChange={setSipRate} min={1} max={20} step={0.5} suffix="%" />
        <Field label="Time" value={sipYears} onChange={setSipYears} min={1} max={40} step={1} suffix="yrs" />
      </>
    );
    working = [
      <>
        <V>i</V> = <M>{sipRate}%</M> ÷ 12 = {pct(s.monthlyRate * 100)}% a month
      </>,
      <>
        <V>n</V> = <M>{sipYears}</M> × 12 = {s.months} instalments
      </>,
      <>
        <C><V>FV</V> = <M>{rupees(sipAmt)}</M></C> <C>× [(1 + <V>i</V>)<sup>{s.months}</sup> − 1] ÷ <V>i</V></C> <C>× (1 + <V>i</V>)</C>
      </>,
      <>
        <V>FV</V> = <strong className="num font-semibold">{rupees(s.maturity)}</strong>
      </>,
    ];
    answer = { label: "Value after " + sipYears + " years", value: s.maturity, split: ["You put in", s.invested, "Growth", s.gain] };
    reading = (
      <>
        You pay in <strong className="font-semibold">{inWords(s.invested)}</strong>. Compounding adds{" "}
        <strong className="font-semibold">{inWords(s.gain)}</strong> — {Math.round((s.gain / s.maturity) * 100)}% of the final amount is
        money you never deposited. Returns from equity funds are not guaranteed; try a lower rate to see a cautious case.
      </>
    );
  } else if (mode === "emi") {
    fields = (
      <>
        <Field label="Loan amount" value={loan} onChange={setLoan} min={100000} max={20000000} step={100000} prefix="₹" format={n} />
        <Field label="Interest a year" value={loanRate} onChange={setLoanRate} min={6} max={15} step={0.05} suffix="%" />
        <Field label="Tenure" value={loanYears} onChange={setLoanYears} min={1} max={30} step={1} suffix="yrs" />
      </>
    );
    working = [
      <>
        <V>i</V> = <M>{loanRate}%</M> ÷ 12 = {pct(e.monthlyRate * 100)}% a month
      </>,
      <>
        <V>n</V> = <M>{loanYears}</M> × 12 = {e.months} months
      </>,
      <>
        <C><V>EMI</V> = <M>{rupees(loan)}</M></C> <C>× <V>i</V> × (1 + <V>i</V>)<sup>{e.months}</sup></C> <C>÷ [(1 + <V>i</V>)<sup>{e.months}</sup> − 1]</C>
      </>,
      <>
        <V>EMI</V> = <strong className="num font-semibold">{rupees(e.emi)}</strong> a month
      </>,
    ];
    answer = { label: "Total you repay", value: e.totalPaid, split: ["Loan", loan, "Interest", e.interest] };
    reading = (
      <>
        Over {loanYears} years you hand the bank <strong className="font-semibold">{inWords(e.totalPaid)}</strong>, of which{" "}
        <strong className="font-semibold">{inWords(e.interest)}</strong> is interest — {(e.interest / loan).toFixed(2)}× the amount you
        borrowed. Shortening the tenure by five years is usually the single biggest lever.
      </>
    );
  } else {
    fields = (
      <>
        <Field label="Deposit" value={dep} onChange={setDep} min={10000} max={10000000} step={10000} prefix="₹" format={n} />
        <Field label="Interest a year" value={depRate} onChange={setDepRate} min={3} max={9.5} step={0.05} suffix="%" />
        <Field label="Time" value={depYears} onChange={setDepYears} min={1} max={10} step={1} suffix="yrs" />
      </>
    );
    working = [
      <>
        <V>r</V> = <M>{depRate}%</M> ÷ 4 = {pct(f.quarterlyRate * 100)}% a quarter
      </>,
      <>
        <V>n</V> = <M>{depYears}</M> × 4 = {f.quarters} quarters
      </>,
      <>
        <C><V>A</V> = <M>{rupees(dep)}</M></C> <C>× (1 + <V>r</V>)<sup>{f.quarters}</sup></C>
      </>,
      <>
        <V>A</V> = <strong className="num font-semibold">{rupees(f.maturity)}</strong>
      </>,
    ];
    answer = { label: "Maturity value", value: f.maturity, split: ["Deposit", dep, "Interest", f.interest] };
    reading = (
      <>
        The <strong className="font-semibold">{inWords(f.interest)}</strong> of interest is taxed at your income slab, and the bank
        deducts TDS once yearly interest crosses the threshold. Compare against inflation before locking in.
      </>
    );
  }

  const share = (answer.split[1] / answer.value) * 100;

  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-surface shadow-[0_1px_0_rgba(23,35,58,0.04),0_24px_48px_-32px_rgba(23,35,58,0.35)]">
      {/* Mode switch */}
      <div role="tablist" aria-label="Choose a calculator" className="flex gap-1 border-b border-line p-2">
        {modes.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            id={`tab-${m.id}`}
            aria-selected={mode === m.id}
            aria-controls="calc-panel"
            onClick={() => setMode(m.id)}
            className={`flex-1 whitespace-nowrap rounded-lg px-2 py-2 text-[0.92rem] transition-colors sm:flex-none sm:px-4 ${
              mode === m.id ? "bg-ledger-wash font-medium text-ledger-deep" : "text-ink-soft hover:bg-paper hover:text-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div id="calc-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="grid gap-0 lg:grid-cols-[1fr_1.08fr]">
        {/* Inputs */}
        <div className="space-y-5 p-5 sm:p-6">
          <p className="font-serif text-[1.15rem] italic leading-snug text-ink">{current.question}</p>
          {fields}
        </div>

        {/* The working */}
        <div className="border-t border-line bg-[#fafbf9] p-5 sm:p-6 lg:rounded-br-[var(--radius-panel)] lg:border-l lg:border-t-0">
          <h3 className="text-[0.92rem] font-medium text-ink">The working</h3>
          <p className="mt-0.5 text-[0.8rem] text-ink-faint">
            Numbers you entered are <span className="mark font-normal">highlighted</span>
          </p>

          <ol key={mode} className="write-in mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
            {working.map((line, idx) => (
              <li key={idx} className={idx === working.length - 1 ? "border-t border-dashed border-line pt-2.5" : ""}>
                {line}
              </li>
            ))}
          </ol>

          <div className="mt-6" aria-live="polite">
            <div className="text-[0.85rem] text-ink-soft">{answer.label}</div>
            <div className="num mt-0.5 text-[2.1rem] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[2.4rem]">
              {inWords(answer.value)}
            </div>

            <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-marigold" aria-hidden="true">
              <div className="h-full bg-ledger transition-[width] duration-300" style={{ width: `${share}%` }} />
            </div>
            <dl className="mt-2.5 flex justify-between text-[0.85rem]">
              <div>
                <dt className="flex items-center gap-1.5 text-ink-soft">
                  <span className="inline-block h-2 w-2 rounded-full bg-ledger" />
                  {answer.split[0]}
                </dt>
                <dd className="num font-medium text-ink">{rupees(answer.split[1])}</dd>
              </div>
              <div className="text-right">
                <dt className="flex items-center justify-end gap-1.5 text-ink-soft">
                  <span className="inline-block h-2 w-2 rounded-full bg-marigold" />
                  {answer.split[2]}
                </dt>
                <dd className="num font-medium text-ink">{rupees(answer.split[3])}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Plain-language reading of the result */}
      <p className="border-t border-line px-5 py-4 text-[0.92rem] leading-relaxed text-ink-soft sm:px-6">{reading}</p>
    </div>
  );
}
