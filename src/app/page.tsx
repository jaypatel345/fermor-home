import { SiteHeader } from "@/components/SiteHeader";
import { WorkingCalculator } from "@/components/WorkingCalculator";
import { AskPreview } from "@/components/AskPreview";
import { Waitlist } from "@/components/Waitlist";
import { Logo } from "@/components/Logo";

const CALC = "https://fermor.in/calculators";

const decisions: { group: string; rows: { q: string; tool: string; href: string }[] }[] = [
  {
    group: "Borrowing",
    rows: [
      { q: "How big a home loan can I carry?", tool: "Home loan", href: `${CALC}/home-loan-calculator` },
      { q: "What is this car or personal loan really costing me?", tool: "EMI", href: `${CALC}/emi-calculator` },
    ],
  },
  {
    group: "Saving and investing",
    rows: [
      { q: "Is ₹5,000 a month enough to start a SIP?", tool: "SIP", href: `${CALC}/sip-calculator` },
      { q: "I got a bonus. Invest it all at once?", tool: "Lumpsum", href: `${CALC}/lumpsum-calculator` },
      { q: "Where should my safe money sit, FD or PPF?", tool: "FD and PPF", href: `${CALC}/fd-calculator` },
    ],
  },
  {
    group: "Tax and salary",
    rows: [
      { q: "Which tax regime leaves more in my account?", tool: "Income tax", href: `${CALC}/income-tax-calculator` },
      { q: "How much gratuity will I get when I leave?", tool: "Gratuity", href: `${CALC}/gratuity-calculator` },
    ],
  },
  {
    group: "Planning ahead",
    rows: [
      { q: "How long will my savings last once I retire?", tool: "SWP", href: `${CALC}/swp-calculator` },
      { q: "How long until my money doubles?", tool: "Compound interest", href: `${CALC}/compound-interest-calculator` },
    ],
  },
];

const promises = [
  {
    title: "Your numbers stay on your device",
    body: "Every calculation runs in your browser. Nothing you type is sent to us to produce a result.",
  },
  {
    title: "No login wall",
    body: "Every tool works without an account. Sign up only if you want to save a result and come back to it.",
  },
  {
    title: "Ads are labelled as ads",
    body: "Fermor is free because of advertising and affiliate partners. When a link pays us, it says so right next to it.",
  },
  {
    title: "The method is on the page",
    body: "Each calculator lists its formula, its assumptions and when its tax rules were last checked against official sources.",
  },
];

const appFeatures = [
  {
    title: "Ask",
    body: "Plain questions, answered with your own numbers, and the working one tap away.",
  },
  {
    title: "Track",
    body: "Spending, savings and investments across your accounts, read as a month, not a statement.",
  },
  {
    title: "Forecast",
    body: "Change one thing, a raise, a loan, a pause in your SIP, and see where it leaves you in ten years.",
  },
];

const reading = [
  {
    topic: "Payments",
    date: "22 Sep 2026",
    title: "UPI payments above ₹2,000: who actually pays the new merchant fee",
    href: "https://fermor.in/blogs/upi-charges-above-2000",
  },
  {
    topic: "Markets",
    date: "29 Sep 2026",
    title: "Seven weeks of losses: what is pulling the Nifty down",
    href: "https://fermor.in/blogs/sensex-nifty-crash-september-2026",
  },
  {
    topic: "Income tax",
    date: "30 Jul 2026",
    title: "The Section 87A rebate, the ₹12 lakh limit and marginal relief",
    href: "https://fermor.in/blogs/section-87a-rebate",
  },
];

const faqs = [
  {
    q: "Is Fermor free?",
    a: "Yes. Every calculator and explainer is free and works without an account. Fermor is supported by clearly labelled ads and affiliate partners.",
  },
  {
    q: "Does Fermor give financial advice?",
    a: "No. Fermor is not a SEBI-registered investment adviser. We show the arithmetic and the trade-offs; the decision, and any advice you want on it, stays with you and your adviser.",
  },
  {
    q: "What happens to the numbers I enter?",
    a: "They stay in your browser. If you choose to save a result to an account, it is stored so you can open it again, and you can delete it at any time.",
  },
  {
    q: "How accurate are the results?",
    a: "The formulas are the ones banks and fund houses use, and each tool shows them. Returns on market-linked investments are estimates, not promises, so try a cautious rate as well as a hopeful one.",
  },
  {
    q: "When is the app coming?",
    a: "We are opening it in stages, starting with people on the waitlist. Leave your email and we will write once, when it is your turn.",
  },
];

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section id="top" className="mx-auto max-w-[1180px] px-5 pb-20 pt-10 sm:px-8 sm:pt-16 lg:pb-28">
          <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <div className="lg:pt-10">
              <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[3.5rem] lg:text-[4rem]">
                See the math before you sign.
              </h1>
              <p className="mt-6 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-soft sm:text-[1.2rem]">
                Fermor is a free set of money tools built for India. Every calculator shows its full working in plain numbers,
                so you can check the answer instead of taking it on trust.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#decisions"
                  className="rounded-full bg-ink px-6 py-3.5 font-medium text-white transition-colors hover:bg-ledger-deep"
                >
                  Find a calculator
                </a>
                <a
                  href="#app"
                  className="rounded-full border border-ink/20 px-6 py-3.5 font-medium text-ink transition-colors hover:border-ink"
                >
                  See what’s coming in the app
                </a>
              </div>
              <p className="mt-8 max-w-[30rem] border-l-2 border-marigold pl-4 text-[0.95rem] leading-relaxed text-ink-soft">
                No sign-up. The numbers you type stay on this page. Try the calculator: change any value and watch each line of the
                working update.
              </p>
            </div>

            <WorkingCalculator />
          </div>
        </section>

        {/* ---------- Decisions index ---------- */}
        <section id="decisions" className="border-t border-line bg-surface">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:py-28">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]">
                Start from the question, not the formula.
              </h2>
              <p className="mt-5 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink-soft">
                Most money decisions don’t arrive labelled “compound interest.” Pick the one in front of you and we’ll open the right
                tool with sensible defaults.
              </p>
              <a href={CALC} className="mt-7 inline-block font-medium text-ledger underline decoration-ledger/30 underline-offset-4 hover:decoration-ledger">
                See every calculator
              </a>
            </div>

            <div className="space-y-10">
              {decisions.map((d) => (
                <div key={d.group}>
                  <h3 className="text-[0.95rem] font-medium text-ink-faint">{d.group}</h3>
                  <ul className="mt-2 border-t border-ink/80">
                    {d.rows.map((r) => (
                      <li key={r.q} className="border-b border-line">
                        <a
                          href={r.href}
                          className="group flex items-center justify-between gap-6 py-4 transition-colors hover:bg-paper sm:px-2"
                        >
                          <span className="text-[1.08rem] leading-snug text-ink sm:text-[1.18rem]">{r.q}</span>
                          <span className="flex shrink-0 items-center gap-2 text-[0.9rem] text-ink-soft group-hover:text-ledger">
                            {r.tool}
                            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How we work (the one dark band) ---------- */}
        <section id="honest" className="bg-ledger-deep text-white">
          <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-[44rem]">
              <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]">
                Most finance sites are built to sell you something. Here is how we’re different.
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">
                Bank calculators lead to a loan form. Comparison sites rank whoever pays most. Fermor started because its founders were
                tired of reverse-engineering their own loan schedules from bank PDFs.
              </p>
            </div>

            <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {promises.map((p) => (
                <div key={p.title} className="border-t border-white/20 pt-5">
                  <dt className="text-[1.2rem] font-medium">{p.title}</dt>
                  <dd className="mt-2 max-w-[30rem] leading-relaxed text-white/75">{p.body}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-14 max-w-[44rem] font-serif text-[1.15rem] italic leading-relaxed text-white/85">
              Fermor is not a SEBI-registered adviser. We show you the arithmetic and the trade-offs. The decision stays with you.
            </p>
          </div>
        </section>

        {/* ---------- The app ---------- */}
        <section id="app" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[0.95rem] font-medium text-ledger">Coming soon to Android and iPhone</p>
              <h2 className="mt-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]">
                The same clear math, run on the money you already have.
              </h2>
              <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-soft">
                The calculators answer “what if.” The Fermor app answers “what now,” using your linked accounts, investments and goals,
                and still shows how it got there.
              </p>

              <dl className="mt-10 space-y-6">
                {appFeatures.map((f) => (
                  <div key={f.title} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="text-[1.1rem] font-semibold">{f.title}</dt>
                    <dd className="max-w-[30rem] leading-relaxed text-ink-soft">{f.body}</dd>
                  </div>
                ))}
              </dl>

              <div id="waitlist" className="mt-12 scroll-mt-24">
                <Waitlist />
                <p className="mt-3 text-[0.85rem] text-ink-faint">One email when your invite is ready. No newsletters.</p>
              </div>
            </div>

            <AskPreview />
          </div>
        </section>

        {/* ---------- Reading ---------- */}
        <section id="reading" className="border-t border-line bg-surface">
          <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-[36rem] text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.4rem]">
                When the rules change, we work out what it means for you.
              </h2>
              <a href="https://fermor.in/blogs" className="font-medium text-ledger underline decoration-ledger/30 underline-offset-4 hover:decoration-ledger">
                All explainers
              </a>
            </div>

            <ul className="mt-12 grid gap-0 md:grid-cols-3 md:gap-8">
              {reading.map((r) => (
                <li key={r.href} className="border-t border-ink/80">
                  <a href={r.href} className="group block py-5">
                    <div className="flex justify-between text-[0.88rem] text-ink-faint">
                      <span>{r.topic}</span>
                      <time>{r.date}</time>
                    </div>
                    <h3 className="mt-3 font-serif text-[1.45rem] leading-[1.2] text-ink group-hover:underline group-hover:decoration-ink/30 group-hover:underline-offset-4">
                      {r.title}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.4rem]">Questions people ask first</h2>
            <div className="border-t border-ink/80">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[1.1rem] text-ink">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-[1.5px] before:w-4 before:-translate-y-1/2 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-4 after:w-[1.5px] after:-translate-x-1/2 after:bg-ink after:transition-transform group-open:after:scale-y-0"
                    />
                  </summary>
                  <p className="max-w-[40rem] pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed text-ink-soft">
                Clear math for every money decision, built for India.
              </p>
            </div>
            <FooterCol
              title="Calculators"
              links={[
                ["SIP", `${CALC}/sip-calculator`],
                ["EMI", `${CALC}/emi-calculator`],
                ["Income tax", `${CALC}/income-tax-calculator`],
                ["All calculators", CALC],
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                ["About", "https://fermor.in/about"],
                ["Explainers", "https://fermor.in/blogs"],
                ["Contact", "https://fermor.in/contact"],
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                ["Privacy", "https://fermor.in/privacy"],
                ["Terms of use", "https://fermor.in/terms"],
                ["Disclosures", "https://fermor.in/about"],
              ]}
            />
          </div>
          <p className="mt-12 max-w-[60rem] border-t border-line pt-6 text-[0.82rem] leading-relaxed text-ink-faint">
            Fermor Technologies Pvt. Ltd. operates fermor.in, a financial calculator and education platform for users in India.
            Fermor is not a SEBI-registered investment adviser and does not provide personalised financial, investment or tax advice.
            All tools and content are for education and information only; individual results will vary.
          </p>
        </div>
      </footer>
    </>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-[0.92rem] font-medium text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-[0.95rem] text-ink-soft hover:text-ink">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
