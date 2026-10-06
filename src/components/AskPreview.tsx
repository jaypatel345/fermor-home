/* A static preview of the Ask feature, drawn in HTML so it stays sharp and responsive.
   The numbers are real: ₹36 lakh at 8.5% for 20 years is an EMI of ₹31,242. */
export function AskPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="rounded-[2.4rem] border border-ink/15 bg-ink p-2.5 shadow-[0_40px_80px_-40px_rgba(23,35,58,0.6)]">
        <div className="overflow-hidden rounded-[1.9rem] bg-paper">
          <div className="flex items-center justify-between px-5 pb-2 pt-4 text-[0.75rem] text-ink-soft">
            <span className="num">9:41</span>
            <span className="h-5 w-20 rounded-full bg-ink" aria-hidden="true" />
            <span className="num">82%</span>
          </div>
          <div className="border-b border-line px-5 pb-3">
            <div className="text-[1.02rem] font-semibold text-ink">Ask</div>
            <div className="text-[0.78rem] text-ink-faint">Answers use the accounts you linked</div>
          </div>

          <div className="space-y-3 px-4 py-4 text-[0.86rem] leading-relaxed">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ledger px-3.5 py-2.5 text-white">
              Can I afford a ₹45 lakh flat on my salary?
            </div>

            <div className="max-w-[94%] rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-3 text-ink-soft">
              <p>
                With 20% down, you’d borrow <span className="mark">₹36 lakh</span>. At 8.5% over 20 years that’s an EMI of{" "}
                <strong className="num font-semibold text-ink">₹31,242</strong>.
              </p>
              <p className="mt-2">
                That is <strong className="font-semibold text-ink">28%</strong> of your average take-home over the last six months.
                Most people stay comfortable below 35%.
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <div className="h-full w-[28%] rounded-full bg-ledger" />
              </div>
              <div className="mt-1 flex justify-between text-[0.72rem] text-ink-faint">
                <span>0%</span>
                <span>35%</span>
                <span>50%</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full border border-line bg-surface px-3 py-1 text-[0.78rem] text-ink">Show the working</span>
              <span className="rounded-full border border-line bg-surface px-3 py-1 text-[0.78rem] text-ink">What if rates rise 1%?</span>
            </div>
          </div>

          <div className="mx-3 mb-4 flex items-center justify-between rounded-full border border-line bg-surface px-4 py-2.5 text-[0.82rem] text-ink-faint">
            Ask about your money
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 12 12">
                <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
