const kpis = [
  {
    title: "Operational throughput",
    value: "+28%",
    detail: "Cases progressing on first pass, fewer OHIO loops.",
  },
  {
    title: "Compliance readiness",
    value: "92%",
    detail: "Evidence packs generated with traceability metadata.",
  },
  {
    title: "Clinician capacity",
    value: "+14%",
    detail: "Admin effort reduced via documentation automation.",
  },
  {
    title: "Patient experience",
    value: "+24 NPS",
    detail: "Follow-up engagement stabilised within 30 days.",
  },
];

const northStar = [
  {
    label: "OHIO blockers resolved",
    value: "7/12",
  },
  {
    label: "Discovery lens coverage",
    value: "5/5",
  },
  {
    label: "Pilot readiness",
    value: "Ready",
  },
];

const initiatives = [
  {
    name: "Intake acceleration",
    status: "Active",
    impact: "-2.1 days cycle time",
  },
  {
    name: "Clinical summarisation",
    status: "Pilot",
    impact: "+18% clinician capacity",
  },
  {
    name: "Audit evidence automation",
    status: "Active",
    impact: "-10 days audit prep",
  },
  {
    name: "Patient engagement flows",
    status: "Queued",
    impact: "+14% adherence",
  },
];

const riskSignals = [
  {
    name: "Regulatory posture",
    level: "Medium",
    note: "Human approvals enforced in all workflows.",
  },
  {
    name: "Data provenance",
    level: "Strong",
    note: "Synthetic datasets with traceability tags.",
  },
  {
    name: "Clinical safety",
    level: "Guarded",
    note: "AI suggestions never auto-executed.",
  },
];

export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="glass rounded-[32px] p-8">
          <p className="pill badge-accent">Executive Dashboard</p>
          <h1 className="text-display mt-4 text-4xl md:text-5xl">
            CARECORE business view
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[color:var(--ink-muted)]">
            Strategic snapshot of operational health, regulatory posture, and
            pilot readiness. All values are mocked to support discussion.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {northStar.map((item) => (
              <div key={item.label} className="card p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  {item.label}
                </p>
                <p className="text-display mt-3 text-3xl text-[color:var(--accent)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                {kpi.title}
              </p>
              <h2 className="text-display mt-3 text-3xl text-[color:var(--accent)]">
                {kpi.value}
              </h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                {kpi.detail}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              Active initiatives
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {initiatives.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-black">{item.name}</span>
                    <span className="pill">{item.status}</span>
                  </div>
                  <p className="text-xs text-black/60">Impact: {item.impact}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              Risk & compliance signals
            </p>
            <div className="mt-4 space-y-3">
              {riskSignals.map((signal) => (
                <div key={signal.name} className="rounded-2xl border border-black/10 bg-white/70 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-black">{signal.name}</span>
                    <span className="pill badge-accent">{signal.level}</span>
                  </div>
                  <p className="mt-2 text-xs text-black/60">{signal.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
