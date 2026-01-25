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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 md:px-6 md:py-10 lg:gap-10 lg:px-6 lg:py-10">
        <section className="glass rounded-[32px] p-6 md:p-8 lg:p-12">
          <p className="pill badge-accent">Executive Vision Report</p>
          <h1 className="text-display mt-4 text-2xl font-semibold leading-tight md:text-4xl lg:text-5xl">
            Market Leadership and Strategic Growth
          </h1>
          <p className="mt-4 text-base text-[color:var(--ink-muted)] md:text-lg">
            The DREAM workshop established PAM Wellness's ambition to move beyond incremental improvement and position itself as a market leader in employee mental health and wellbeing. This represents a strategic growth opportunity to actively shape the future of EAP-led care delivery.
          </p>
          <div className="mt-6 rounded-xl bg-amber-50 p-4 border border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">Leadership Focus Areas:</h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Insurer first-contact care model</li>
              <li>• Creating meaningful differentiation from competitors</li>
              <li>• Delivering a more proactive and connected model of care</li>
              <li>• Providing greater visibility and insight for employer clients</li>
              <li>• Strengthening PAM's position as a trusted wellbeing partner</li>
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm md:gap-3">
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

        <section className="grid gap-3 md:gap-4 lg:grid-cols-2 lg:gap-4 xl:grid-cols-4">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="card flex flex-col p-4 transition hover:border-black/30 md:p-6"
            >
              <h2 className="text-display text-base md:text-lg">{section.title}</h2>
              <p className="mt-3 flex-1 text-sm text-[color:var(--ink-muted)] md:text-sm">
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
