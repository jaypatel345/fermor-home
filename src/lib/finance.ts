/**
 * The maths behind the homepage calculator.
 * Pure functions, no network, no state — easy to test and easy to audit.
 * Conventions follow what Indian banks and AMCs publish:
 *  - SIP: monthly contribution at the start of each month, monthly compounding.
 *  - EMI: reducing-balance loan, monthly rest.
 *  - FD: quarterly compounding (the default for most Indian bank FDs).
 */

export type SipResult = {
  monthlyRate: number;
  months: number;
  invested: number;
  maturity: number;
  gain: number;
};

export function sip(monthly: number, annualRatePct: number, years: number): SipResult {
  const i = annualRatePct / 12 / 100;
  const n = Math.round(years * 12);
  const maturity = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  return { monthlyRate: i, months: n, invested, maturity, gain: maturity - invested };
}

export type EmiResult = {
  monthlyRate: number;
  months: number;
  emi: number;
  totalPaid: number;
  interest: number;
};

export function emi(principal: number, annualRatePct: number, years: number): EmiResult {
  const i = annualRatePct / 12 / 100;
  const n = Math.round(years * 12);
  const growth = Math.pow(1 + i, n);
  const payment = i === 0 ? principal / n : (principal * i * growth) / (growth - 1);
  const totalPaid = payment * n;
  return { monthlyRate: i, months: n, emi: payment, totalPaid, interest: totalPaid - principal };
}

export type FdResult = {
  quarterlyRate: number;
  quarters: number;
  maturity: number;
  interest: number;
};

export function fd(principal: number, annualRatePct: number, years: number): FdResult {
  const q = annualRatePct / 4 / 100;
  const n = Math.round(years * 4);
  const maturity = principal * Math.pow(1 + q, n);
  return { quarterlyRate: q, quarters: n, maturity, interest: maturity - principal };
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹12,34,567 — Indian digit grouping. */
export function rupees(value: number): string {
  return `₹${inr.format(Math.round(value))}`;
}

/** Spoken-style amount: ₹4.2 lakh, ₹1.35 crore. */
export function inWords(value: number): string {
  const v = Math.abs(value);
  if (v >= 1e7) return `₹${trim(value / 1e7)} crore`;
  if (v >= 1e5) return `₹${trim(value / 1e5)} lakh`;
  if (v >= 1e3) return `₹${trim(value / 1e3)} thousand`;
  return rupees(value);
}

function trim(n: number): string {
  return n.toFixed(2).replace(/\.?0+$/, "");
}

export function pct(value: number, digits = 4): string {
  return value.toFixed(digits).replace(/\.?0+$/, "");
}
