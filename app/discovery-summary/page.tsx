"use client";

import { useState } from "react";

type Dimension = {
  id: string;
  name: string;
  score: number;
  target: number;
  interpretation: string;
  insight: string;
  strengths: string[];
  realities: string[];
  quote?: string;
};

const dimensions: Dimension[] = [
  {
    id: "people",
    name: "People",
    score: 6,
    target: 9,
    interpretation: "Strong expertise, limited scalability",
    insight: "People capability exceeds system capability.",
    strengths: [
      "High clinical expertise",
      "Strong leadership commitment",
      "Trusted care delivery",
      "Purpose-driven culture",
    ],
    realities: [
      "Knowledge embedded in individuals",
      "Informal handovers and transfer",
      "Scaling requires hiring rather than enablement",
      "Limited systemised intelligence",
    ],
  },
  {
    id: "processes",
    name: "Processes",
    score: 5,
    target: 8,
    interpretation: "Functional but inconsistent",
    insight: "Processes function, but they do not flow.",
    strengths: [
      "Core workflows exist",
      "Compliance processes embedded",
      "Operational experience across teams",
    ],
    realities: [
      "Manual handoffs",
      "Inconsistent execution",
      "Limited end-to-end visibility",
      "Processes implicit rather than orchestrated",
    ],
  },
  {
    id: "customer",
    name: "Customer",
    score: 6,
    target: 9,
    interpretation: "High-quality care, fragmented journey",
    insight: "Clinical experience is strong. Operational experience is inconsistent.",
    strengths: [
      "Strong clinical outcomes",
      "High patient trust",
      "Clinician-led quality of care",
    ],
    realities: [
      "Fragmented journeys",
      "Communication gaps",
      "Operational delays",
      "Limited continuity across touchpoints",
    ],
    quote: "Why don't we give them a buddy through the journey?",
  },
  {
    id: "technology",
    name: "Technology",
    score: 4,
    target: 8,
    interpretation: "Supports activity, not intelligence",
    insight: "Technology supports activity, not intelligence.",
    strengths: [
      "Core platforms in place",
      "Digital adoption underway",
      "Appetite for innovation",
    ],
    realities: [
      "Poor system integration",
      "Manual reporting",
      "No single source of truth",
      "Limited real-time insight",
    ],
  },
  {
    id: "regulation",
    name: "Regulation",
    score: 5,
    target: 8,
    interpretation: "Managed manually, not proactively",
    insight: "Compliance is managed, not enabled.",
    strengths: [
      "Strong governance culture",
      "High compliance awareness",
      "Clear regulatory accountability",
    ],
    realities: [
      "Manual reporting burden",
      "Reactive compliance management",
      "Limited regulatory foresight",
      "Dependence on key individuals",
    ],
  },
];

const overallScore = 5.2;
const overallTarget = 8.5;

const crossCuttingThemes = [
  { theme: "Knowledge trapped in people", icon: "🧠" },
  { theme: "Fragmented systems", icon: "🔗" },
  { theme: "Manual orchestration", icon: "⚙️" },
  { theme: "Retrospective visibility", icon: "👁️" },
  { theme: "Increasing leadership load", icon: "📈" },
  { theme: "Limited intelligence-led decision support", icon: "🤖" },
];

const workshopQuotes = [
  "We rely too much on individuals. When someone isn't there, things slow down.",
  "We have the systems, but they don't talk to each other, so visibility is always delayed.",
];

const coreValues = ["Integrity", "Patient wellbeing", "Meaningful work", "Long-term sustainability"];

export default function DiscoverySummaryPage() {
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleDimensionClick = (dimension: Dimension) => {
    setSelectedDimension(dimension);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Hero Section */}
        <header className="glass rounded-[32px] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="pill badge-accent">Discovery Summary</p>
              <h1 className="text-display mt-4 text-4xl md:text-5xl">
                Current State Assessment
              </h1>
              <p className="mt-4 max-w-xl text-lg text-[color:var(--ink-muted)]">
                PAM Wellness is <strong>people-strong but system-light</strong>. Growth has
                outpaced the operating model.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-[24px] border border-black/10 bg-white/80 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">Overall maturity</p>
              <div className="relative mt-4 flex h-32 w-32 items-center justify-center">
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallScore / 10) * 283} 283`}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d87a3c" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center">
                  <p className="text-display text-3xl font-bold text-black">{overallScore}</p>
                  <p className="text-xs text-black/50">/ 10</p>
                </div>
              </div>
              <p className="mt-3 text-center text-sm text-[color:var(--ink-muted)]">
                Functional but increasingly constrained
              </p>
            </div>
          </div>
        </header>

        {/* Technology Context Section */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Technology Reality and Current Constraints</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            The workshop identified important context around PAM's existing technology estate that informs many of the challenges experienced today.
          </p>
          <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">Platform Origin and Limitations</h3>
            <p className="text-sm text-blue-800 mb-3">
              While core systems are in place and supporting daily operations, the primary platform currently used was originally designed for Occupational Health delivery rather than Employee Assistance Programme workflows.
            </p>
            <p className="text-sm text-blue-800 mb-3">
              Over time, EAP services have been adapted onto this platform as effectively as possible. However, this has resulted in several structural limitations:
            </p>
            <ul className="space-y-1 text-sm text-blue-800 ml-4">
              <li>• EAP journeys are not natively supported</li>
              <li>• Case management relies heavily on manual coordination</li>
              <li>• Interactions are captured as isolated events rather than as part of a continuous journey</li>
              <li>• Limited end-to-end visibility across multi-touchpoint care</li>
              <li>• Fragmented data across channels and interactions</li>
            </ul>
          </div>
          <p className="text-sm text-[color:var(--ink-muted)] mt-4">
            This context is important, as the majority of constraints identified during discovery stem not from people or process maturity, but from operating an EAP service on technology that was never purpose-built for that model.
          </p>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Dimension Cards */}
          <div className="flex flex-col gap-6">
            {/* Maturity Scores Grid */}
            <section className="card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-display text-xl">Maturity by Dimension</h2>
                <p className="text-xs text-black/50">Click to explore</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {dimensions.map((dim) => (
                  <button
                    key={dim.id}
                    onClick={() => handleDimensionClick(dim)}
                    className={`group relative flex flex-col items-center rounded-2xl border p-4 text-center transition-all hover:border-[color:var(--accent)] hover:shadow-lg ${
                      selectedDimension?.id === dim.id
                        ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5"
                        : "border-black/10 bg-white/70"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-black/50">
                      {dim.name}
                    </p>
                    <div className="relative mt-3 flex h-16 w-16 items-center justify-center">
                      <svg className="absolute inset-0" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="6"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={dim.score >= 6 ? "#10b981" : dim.score >= 5 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(dim.score / 10) * 264} 264`}
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <span className="text-display text-xl font-bold">{dim.score}</span>
                    </div>
                    <p className="mt-2 text-xs text-[color:var(--ink-muted)] line-clamp-2">
                      {dim.interpretation}
                    </p>
                    <span className="mt-2 text-xs font-semibold text-[color:var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                      View details →
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Cross-Cutting Themes */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Cross-Cutting Themes</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Consistent patterns across discovery and workshop dialogue
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {crossCuttingThemes.map((item) => (
                  <div
                    key={item.theme}
                    className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/70 p-4 transition hover:border-black/20"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm text-[color:var(--ink-muted)]">{item.theme}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-black/20 bg-white/50 p-4 text-center text-sm text-black/60">
                These are indicators of <strong>organisational maturity transition</strong>, not
                performance failure.
              </div>
            </section>

            {/* Workshop Voices */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Workshop Voices</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {workshopQuotes.map((quote, index) => (
                  <blockquote
                    key={index}
                    className="relative rounded-2xl border border-black/10 bg-gradient-to-br from-white/80 to-white/40 p-5"
                  >
                    <span className="absolute -left-1 -top-2 text-4xl text-[color:var(--accent)]/30">
                      "
                    </span>
                    <p className="text-sm italic text-[color:var(--ink-muted)]">{quote}</p>
                  </blockquote>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Detail Panel */}
          <div className="flex flex-col gap-6">
            {/* Selected Dimension Detail */}
            <section
              className={`card overflow-hidden p-0 transition-all ${
                showDetail && selectedDimension ? "opacity-100" : "opacity-60"
              }`}
            >
              {selectedDimension ? (
                <div className="flex flex-col">
                  <div className="border-b border-black/10 bg-gradient-to-r from-[color:var(--accent)]/10 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                          Dimension detail
                        </p>
                        <h3 className="text-display mt-1 text-2xl">{selectedDimension.name}</h3>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[color:var(--accent)]/30 bg-white">
                        <span className="text-display text-xl font-bold">
                          {selectedDimension.score}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-black/50">
                        <span>Current</span>
                        <span>Target: {selectedDimension.target}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-amber-400 transition-all duration-500"
                          style={{ width: `${(selectedDimension.score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                          ✓
                        </span>
                        Strengths
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {selectedDimension.strengths.map((s) => (
                          <li
                            key={s}
                            className="text-sm text-[color:var(--ink-muted)] before:mr-2 before:content-['•']"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-600">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                          !
                        </span>
                        Current Realities
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {selectedDimension.realities.map((r) => (
                          <li
                            key={r}
                            className="text-sm text-[color:var(--ink-muted)] before:mr-2 before:content-['•']"
                          >
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedDimension.quote && (
                      <blockquote className="rounded-xl border border-black/10 bg-white/70 p-4 text-sm italic text-[color:var(--ink-muted)]">
                        "{selectedDimension.quote}"
                      </blockquote>
                    )}
                    <div className="mt-auto rounded-xl bg-gradient-to-r from-[color:var(--accent)]/10 to-transparent p-4">
                      <p className="text-sm font-medium text-black">
                        💡 {selectedDimension.insight}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center p-6 text-center">
                  <p className="text-sm text-black/40">
                    Click a dimension above to explore details
                  </p>
                </div>
              )}
            </section>

            {/* Core Values */}
            <section className="card p-6">
              <h3 className="text-display text-lg">Leadership Values</h3>
              <p className="mt-2 text-xs text-[color:var(--ink-muted)]">
                Workshop dialogue showed strong alignment
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {coreValues.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-4 py-2 text-sm font-medium text-[color:var(--accent)]"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </section>

            {/* Consolidated Statement */}
            <section className="glass rounded-[24px] p-6">
              <h3 className="text-display text-lg">Discovery Conclusion</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
                    Strengths
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-emerald-800">
                    <li>Clinically strong</li>
                    <li>Values-led</li>
                    <li>Trusted by patients</li>
                    <li>Operationally functional</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-amber-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-700">
                    Constraints
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-amber-800">
                    <li>Fragmented journeys</li>
                    <li>Manual coordination</li>
                    <li>Limited system intelligence</li>
                    <li>Reliance on individuals</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-black/5 p-4 text-center">
                <p className="text-sm font-semibold text-black">
                  The organisation has outgrown its current operating model.
                </p>
                <p className="mt-2 text-xs text-[color:var(--ink-muted)]">
                  Ready to progress into Reimagine — not due to weakness, but because future
                  ambition cannot be supported by current structure.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
