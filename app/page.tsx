export default function Home() {
  const sections = [
    {
      href: "/discovery-summary",
      title: "Discovery summary",
      description: "AS-IS Executive Summary — current state assessment across People, Processes, Customer, Technology, and Regulation.",
    },
    {
      href: "/reimagine-output",
      title: "Reimagine output",
      description: "Areas of focus — market positioning, product coherence, operating alignment, intelligence ownership, economic sustainability.",
    },
    {
      href: "/constraints",
      title: "Constraints",
      description: "Direction of travel — strategic shifts from channels to life cycles, tools to outcomes, fragmented to unified.",
    },
    {
      href: "/solution-overview",
      title: "Solution overview",
      description: "Vision narrative — AI-orchestrated life-cycle intelligence platform and structural model.",
    },
    {
      href: "/executive",
      title: "Executive dashboard",
      description: "Future-state principles and platform role — non-negotiable anchors for build decisions.",
    },
    {
      href: "/commercial-estimates",
      title: "Commercial estimates",
      description: "Economic model and valuation drivers — margin expansion, headcount decoupling, IP ownership.",
    },
    {
      href: "/summary",
      title: "Summary",
      description: "Executive Vision Report summary — strategic drivers, future-state principles, and vision narrative.",
    },
    {
      href: "/journey",
      title: "Journey mapping",
      description: "Patient wellbeing journey model — explore AI vs human involvement across care stages.",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <section className="glass rounded-[32px] p-8 md:p-12">
          <p className="pill badge-accent">Executive Vision Report</p>
          <h1 className="text-display mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Workshop synthesis and direction
          </h1>
          <p className="mt-4 text-lg text-[color:var(--ink-muted)]">
            The organisation is operating in a market evolving faster than traditional models can
            support. The challenge is not a lack of capability, but the need to realign structure,
            technology, and narrative to match the modern market.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a 
              href="/summary#strategic-inflection-point" 
              className="pill hover:bg-black/10 transition-colors cursor-pointer"
            >
              Strategic inflection point
            </a>
            <a 
              href="/summary#outcome-led-demand" 
              className="pill hover:bg-black/10 transition-colors cursor-pointer"
            >
              Outcome-led demand
            </a>
            <a 
              href="/summary#ai-foundational" 
              className="pill hover:bg-black/10 transition-colors cursor-pointer"
            >
              AI foundational
            </a>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="card flex flex-col p-6 transition hover:border-black/30"
            >
              <h2 className="text-display text-lg">{section.title}</h2>
              <p className="mt-3 flex-1 text-sm text-[color:var(--ink-muted)]">
                {section.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-[color:var(--accent)]">
                View →
              </span>
            </a>
          ))}
        </section>
      </main>
  );
}
