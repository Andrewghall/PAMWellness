"use client";

import { useState } from "react";

type Shift = {
  id: string;
  from: string;
  to: string;
  icon: string;
  description: string;
  implications: string[];
};

const strategicShifts: Shift[] = [
  {
    id: "channels",
    from: "Channels",
    to: "Life cycles",
    icon: "🔄",
    description: "Move from managing discrete touchpoints to orchestrating complete patient and customer journeys",
    implications: [
      "End-to-end visibility across all interactions",
      "Proactive engagement based on journey stage",
      "Unified data model across lifecycle",
    ],
  },
  {
    id: "tools",
    from: "Tools",
    to: "Outcomes",
    icon: "🎯",
    description: "Shift focus from feature delivery to measurable business and patient outcomes",
    implications: [
      "Success measured by results, not activity",
      "Value-based pricing models",
      "Continuous outcome monitoring",
    ],
  },
  {
    id: "systems",
    from: "Fragmented systems",
    to: "Unified intelligence",
    icon: "🧠",
    description: "Replace disconnected tools with an integrated intelligence layer",
    implications: [
      "Single source of truth",
      "Real-time decision support",
      "Reduced manual coordination",
    ],
  },
  {
    id: "scale",
    from: "Headcount scale",
    to: "Intelligent orchestration",
    icon: "⚡",
    description: "Grow through automation and intelligence rather than linear hiring",
    implications: [
      "Higher margin at scale",
      "Reduced key-person dependency",
      "Faster response times",
    ],
  },
  {
    id: "vendor",
    from: "Vendor dependency",
    to: "Owned strategic IP",
    icon: "🛡️",
    description: "Build defensible capabilities rather than rent commodity solutions",
    implications: [
      "Sustainable competitive moat",
      "Higher valuation multiples",
      "Strategic optionality",
    ],
  },
];

const designPrinciples = [
  { label: "Platform-led engagement", icon: "🌐", benefit: "Scalable customer reach" },
  { label: "Intelligence-driven growth", icon: "🧠", benefit: "Non-linear scaling" },
  { label: "Owned strategic IP", icon: "🛡️", benefit: "Defensible advantage" },
  { label: "Unified product narrative", icon: "🎯", benefit: "Clear market positioning" },
  { label: "AI-native architecture", icon: "⚡", benefit: "Transformative value" },
  { label: "Clear accountability", icon: "✓", benefit: "Fast decision-making" },
];

export default function ConstraintsPage() {
  const [selectedShift, setSelectedShift] = useState<Shift>(strategicShifts[0]);
  const [hoveredPrinciple, setHoveredPrinciple] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="pill badge-accent">Constraints</p>
              <h1 className="text-display mt-4 text-4xl md:text-5xl">Direction of Travel</h1>
              <p className="mt-4 max-w-xl text-lg text-[color:var(--ink-muted)]">
                The agreed direction provides consistency for decision-making across product,
                technology, and commercial strategy.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-[24px] border border-black/10 bg-white/80 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Strategic shifts</p>
              <p className="text-display mt-2 text-5xl font-bold text-[color:var(--accent)]">5</p>
              <p className="mt-1 text-sm text-[color:var(--ink-muted)]">transformation vectors</p>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Strategic Shifts */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Strategic Shifts</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Click each shift to explore implications
              </p>
              <div className="mt-4 space-y-3">
                {strategicShifts.map((shift) => (
                  <button
                    key={shift.id}
                    onClick={() => setSelectedShift(shift)}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all hover:shadow-md ${
                      selectedShift.id === shift.id
                        ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5 shadow-md"
                        : "border-black/10 bg-white/70 hover:border-black/20"
                    }`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-2xl">
                      {shift.icon}
                    </span>
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                            {shift.from}
                          </span>
                          <span className="text-xl text-[color:var(--accent)]">→</span>
                          <span className="rounded-lg bg-[color:var(--accent)]/10 px-3 py-1 text-sm font-medium text-[color:var(--accent)]">
                            {shift.to}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[color:var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                        Details →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Design Principles */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Design Principles</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Guiding principles for all future decisions
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {designPrinciples.map((principle) => (
                  <div
                    key={principle.label}
                    onMouseEnter={() => setHoveredPrinciple(principle.label)}
                    onMouseLeave={() => setHoveredPrinciple(null)}
                    className="group relative cursor-default rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/5 p-4 transition-all hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--accent)]/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{principle.icon}</span>
                      <span className="text-sm font-medium text-black">{principle.label}</span>
                    </div>
                    <div
                      className={`mt-2 overflow-hidden text-xs text-[color:var(--accent)] transition-all ${
                        hoveredPrinciple === principle.label ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      → {principle.benefit}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Detail Panel */}
          <div className="flex flex-col gap-6">
            {/* Selected Shift Detail */}
            <section className="card overflow-hidden p-0">
              <div className="border-b border-black/10 bg-gradient-to-r from-[color:var(--accent)]/10 to-transparent p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    {selectedShift.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">Shift detail</p>
                    <h3 className="text-display text-xl">
                      {selectedShift.from} → {selectedShift.to}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[color:var(--ink-muted)]">{selectedShift.description}</p>
                <div className="mt-6">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-xs">
                      →
                    </span>
                    Implications
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {selectedShift.implications.map((impl, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-black/5 bg-white/70 p-3 text-sm text-[color:var(--ink-muted)]"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                          ✓
                        </span>
                        {impl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Constraint Summary */}
            <section className="glass rounded-[24px] p-6">
              <h3 className="text-display text-lg">Design Anchors</h3>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
                These constraints are not limitations — they are <strong>design anchors</strong>.
              </p>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
                They ensure that every decision moves the organisation toward a coherent,
                defensible, and scalable future state.
              </p>
              <div className="mt-4 rounded-xl bg-black/5 p-4 text-center">
                <p className="text-sm font-semibold text-black">
                  Every choice should pass the constraint test
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
