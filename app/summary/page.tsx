"use client";

import { useState } from "react";

const strategicDrivers = [
  { label: "Long-term financial resilience", icon: "💰", color: "#10b981" },
  { label: "Predictable margin expansion", icon: "📈", color: "#8b5cf6" },
  { label: "Clearer platform narrative", icon: "🎯", color: "#f59e0b" },
  { label: "AI as foundational", icon: "🧠", color: "#06b6d4" },
  { label: "Integrity and ownership", icon: "🛡️", color: "#ec4899" },
];

const futurePrinciples = [
  { number: 1, principle: "Journey-led, not channel-led", category: "approach" },
  { number: 2, principle: "Intelligence before automation", category: "priority" },
  { number: 3, principle: "Human and agent collaboration by design", category: "model" },
  { number: 4, principle: "Ownership of core knowledge and orchestration", category: "strategy" },
  { number: 5, principle: "Simplicity for users, sophistication underneath", category: "design" },
  { number: 6, principle: "Outcomes measurable at every stage", category: "accountability" },
  { number: 7, principle: "Architecture designed with valuation in mind", category: "commercial" },
];

const futureStateOutcomes = [
  {
    outcome: "Value through orchestration",
    description: "Not through volume",
    icon: "⚡",
    color: "#8b5cf6",
  },
  {
    outcome: "Growth through margin expansion",
    description: "Not workforce expansion",
    icon: "📈",
    color: "#10b981",
  },
  {
    outcome: "Differentiation through owned intelligence",
    description: "Not rented capability",
    icon: "🛡️",
    color: "#f59e0b",
  },
];

const journeySteps = [
  { step: "Discovery", status: "complete" },
  { step: "Reimagine", status: "complete" },
  { step: "Constraints", status: "complete" },
  { step: "Solution", status: "complete" },
  { step: "Commercial", status: "complete" },
  { step: "Execute", status: "next" },
];

export default function SummaryPage() {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="pill badge-accent">Summary</p>
              <h1 className="text-display mt-4 text-4xl md:text-5xl">
                Executive Vision Report
              </h1>
              <p className="mt-4 text-lg text-[color:var(--ink-muted)]">
                This moment represents a <strong>strategic inflection point</strong>: an opportunity
                to reposition from incremental optimisation toward purposeful transformation.
              </p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-white/80 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Workshop synthesis</p>
              <div className="mt-4 flex items-center gap-2">
                {journeySteps.map((item, i) => (
                  <div key={item.step} className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        item.status === "complete"
                          ? "bg-emerald-500 text-white"
                          : "border-2 border-dashed border-[color:var(--accent)] text-[color:var(--accent)]"
                      }`}
                    >
                      {item.status === "complete" ? "✓" : i + 1}
                    </div>
                    {i < journeySteps.length - 1 && (
                      <div className="h-0.5 w-3 bg-black/10" />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-[color:var(--ink-muted)]">
                Ready to execute
              </p>
            </div>
          </div>
        </header>

        {/* Future State Outcomes */}
        <section className="grid gap-4 md:grid-cols-3">
          {futureStateOutcomes.map((item) => (
            <div
              key={item.outcome}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div
                className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-20 transition-transform group-hover:scale-150"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-3xl">{item.icon}</span>
              <p className="text-display mt-4 text-lg">{item.outcome}</p>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">{item.description}</p>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Challenge */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Today's Challenge</h2>
              <div className="mt-4 rounded-xl bg-amber-50 p-4">
                <p className="text-sm text-amber-900">
                  The organisation is operating in a market that is evolving faster than
                  traditional operating models were designed to support.
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-black/50">
                    Customer expectations
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                    Shifted from channels to outcomes, speed, and full life-cycle experience
                  </p>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-black/50">
                    Technology shift
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                    AI and automation changing how scale, margin, and quality are achieved
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-black/5 p-4 text-center">
                <p className="text-sm font-medium text-black">
                  The challenge is to realign structure, technology, and narrative
                </p>
              </div>
            </section>

            {/* Future Principles */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Future-State Principles</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Non-negotiable anchors for all build decisions
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {futurePrinciples.map((item) => (
                  <button
                    key={item.number}
                    onMouseEnter={() => setActivePrinciple(item.number)}
                    onMouseLeave={() => setActivePrinciple(null)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      activePrinciple === item.number
                        ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5 shadow-md"
                        : "border-black/10 bg-white/70 hover:border-black/20"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white transition-all ${
                        activePrinciple === item.number
                          ? "bg-[color:var(--accent)] scale-110"
                          : "bg-black/20"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-sm text-[color:var(--ink-muted)]">{item.principle}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Vision Narrative */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Vision Narrative</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border-l-4 border-[color:var(--accent)] bg-[color:var(--accent)]/5 p-4">
                  <p className="text-sm text-[color:var(--ink-muted)]">
                    The organisation will evolve into an <strong>AI-orchestrated life-cycle
                    intelligence platform</strong> designed to manage customer, product, and
                    revenue journeys end to end.
                  </p>
                </div>
                <p className="text-sm text-[color:var(--ink-muted)]">
                  Rather than focusing on individual interactions or service channels, the platform
                  will unify data, knowledge, automation, and human expertise into a single
                  intelligence layer.
                </p>
                <p className="text-sm text-[color:var(--ink-muted)]">
                  AI will operate as the <strong>connective tissue</strong> that enables speed,
                  insight, and consistency across every journey.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Strategic Drivers */}
            <section className="card p-6">
              <h3 className="text-display text-lg">Strategic Drivers</h3>
              <p className="mt-2 text-xs text-[color:var(--ink-muted)]">
                Workshop alignment on core direction
              </p>
              <div className="mt-4 space-y-2">
                {strategicDrivers.map((driver) => (
                  <div
                    key={driver.label}
                    className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/70 p-3 transition-all hover:border-black/20"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                      style={{ backgroundColor: `${driver.color}20` }}
                    >
                      {driver.icon}
                    </div>
                    <span className="text-sm text-[color:var(--ink-muted)]">{driver.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section className="glass rounded-[24px] p-6">
              <h3 className="text-display text-lg">Conclusion</h3>
              <p className="mt-4 text-sm text-[color:var(--ink-muted)]">
                This platform-led model positions the organisation for:
              </p>
              <div className="mt-4 space-y-2">
                {["Sustained relevance", "Scalability", "Valuation resilience"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-emerald-800">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-black/5 p-4 text-center">
                <p className="text-sm font-semibold text-black">
                  In an increasingly outcome-driven market
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
