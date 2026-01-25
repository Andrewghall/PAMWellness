"use client";

import { useState, useEffect } from "react";

type FullscreenImage = {
  src: string;
  alt: string;
} | null;

type Section = {
  id: string;
  title: string;
  icon: string;
};

const sections: Section[] = [
  { id: "why", title: "Why this solution exists", icon: "🎯" },
  { id: "ethos", title: "Design Ethos", icon: "💡" },
  { id: "ethics", title: "Ethics & Guardrails", icon: "🛡️" },
  { id: "model", title: "Care Operating Model", icon: "⚙️" },
  { id: "features", title: "Core Features", icon: "✨" },
];

const challenges = [
  "Fragmented patient journeys",
  "Limited real-time operational visibility",
  "Reliance on informal handovers",
  "Administrative burden on clinicians",
  "Retrospective quality oversight",
  "Disconnected engagement channels",
  "Lack of early warning indicators",
];

const designPrinciples = [
  {
    title: "Care first, administration second",
    description: "The platform exists to support care delivery, not create additional work. Anything that can be captured automatically should not require manual completion.",
  },
  {
    title: "Continuity over transactions",
    description: "Care is managed as a journey, not a series of isolated interactions. Context moves forward with the patient and clinician at every stage.",
  },
  {
    title: "Guidance, never decision-making",
    description: "Automation and intelligence support humans. They do not replace clinical judgement. No automation provides diagnosis, treatment advice or clinical conclusions.",
  },
  {
    title: "Visibility before escalation",
    description: "Issues must be visible while care is being delivered, not only after escalation or failure.",
  },
  {
    title: "One journey, many actors",
    description: "Different actors engage at different points but operate from the same underlying case and intelligence.",
  },
];

const guardrails = {
  clinical: [
    "No automated clinical statements",
    "No diagnostic or treatment recommendations",
    "Clinical responsibility always remains with qualified professionals",
  ],
  ai: [
    "Human-in-the-loop at all times",
    "Transparent and traceable outputs",
    "No autonomous decision-making",
  ],
  data: [
    "Small Language Models (SLMs) only",
    "No consumer or open LLM usage",
    "No external training on PAM data",
    "Full alignment with PAM governance and regulatory obligations",
  ],
};

const actors = [
  { name: "Patients", icon: "👤" },
  { name: "Clinicians", icon: "🩺" },
  { name: "Agent clinicians", icon: "📞" },
  { name: "Client organisations", icon: "🏢" },
  { name: "PAM operational teams", icon: "⚙️" },
  { name: "PAM executives", icon: "📊" },
  { name: "Regulators", icon: "📋" },
];

const channels = ["Phone", "WhatsApp", "Web chat", "Email", "Portal messaging", "Video"];

const coreFeatures = [
  "End-to-end journey management",
  "Actor-based access and views",
  "PAM Buddy interaction layer",
  "Multi-channel engagement on one case",
  "Automatic transcription and data capture",
  "Real-time guidance and prompts",
  "KPI tracking and escalation",
  "Live and historical quality monitoring",
  "SLM-driven intelligence layer",
  "Full governance and audit controls",
];

const solutionOutcomes = [
  { label: "Manages care as a continuous end-to-end journey", icon: "🔄" },
  { label: "Supports all actors through one connected platform", icon: "🤝" },
  { label: "Embeds quality and governance into delivery", icon: "✅" },
  { label: "Provides real-time visibility and guidance", icon: "👁️" },
  { label: "Removes unnecessary administrative effort", icon: "⚡" },
  { label: "Enables growth without loss of control", icon: "📈" },
];

export default function SolutionOverviewPage() {
  const [activeSection, setActiveSection] = useState<string>("why");
  const [fullscreenImage, setFullscreenImage] = useState<FullscreenImage>(null);

  // Close fullscreen image on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreenImage) {
        setFullscreenImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImage]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="pill badge-accent">Reimagined Care Operating Solution</p>
              <h1 className="text-display mt-4 text-4xl md:text-5xl">PAM Wellness</h1>
              <p className="mt-4 text-lg text-[color:var(--ink-muted)]">
                A care operating model that supports growth without increasing clinical risk, fragmentation or administrative burden.
              </p>
              <p className="mt-4 text-sm text-[color:var(--ink-muted)]">
                The discovery and Reimagine workshop confirmed that while clinical quality remains strong, the current operating model relies heavily on manual coordination, disconnected interactions and retrospective visibility. As demand increases and pathways expand, this creates pressure across clinicians, operations and leadership.
              </p>
            </div>
            <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Commercial Readiness</p>
              <p className="text-display mt-2 text-lg text-emerald-800">Fully Defined</p>
              <ul className="mt-3 space-y-1 text-xs text-emerald-700">
                <li>✓ Grounded in workshop outputs</li>
                <li>✓ Aligned to PAM governance</li>
                <li>✓ Structured for phased delivery</li>
                <li>✓ Suitable for immediate pricing</li>
              </ul>
            </div>
          </div>
        </header>

        {/* Solution Outcomes */}
        <section className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {solutionOutcomes.map((outcome) => (
            <div
              key={outcome.label}
              className="rounded-2xl border border-black/10 bg-white p-4 text-center"
            >
              <span className="text-2xl">{outcome.icon}</span>
              <p className="mt-2 text-xs text-[color:var(--ink-muted)]">{outcome.label}</p>
            </div>
          ))}
        </section>

        {/* Solution Diagrams */}
        <section className="flex items-center justify-center gap-4">
          <button
            onClick={() => setFullscreenImage({ src: "/pam-buddy-patient.png?v=3", alt: "PAM Buddy Patient" })}
            title="Click to view full size"
            className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white transition-all hover:border-[color:var(--accent)] hover:shadow-lg"
          >
            <img
              src="/pam-buddy-patient.png?v=3"
              alt="PAM Buddy Patient"
              className="h-auto max-h-[400px] w-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/10">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Click to enlarge
              </span>
            </div>
          </button>
          <button
            onClick={() => setFullscreenImage({ src: "/pam-wellness-master.png?v=5", alt: "PAM Wellness CareCore Solution Overview" })}
            title="Click to view full size"
            className="group relative w-1/2 overflow-hidden rounded-2xl border border-black/10 bg-white transition-all hover:border-[color:var(--accent)] hover:shadow-lg"
          >
            <img
              src="/pam-wellness-master.png?v=5"
              alt="PAM Wellness CareCore Solution Overview"
              className="w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/10">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Click to enlarge
              </span>
            </div>
          </button>
        </section>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                activeSection === section.id
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-white border border-black/10 text-black/70 hover:border-black/20"
              }`}
            >
              <span>{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left - Main Content */}
          <div className="flex flex-col gap-6">
            {/* Why Section */}
            {activeSection === "why" && (
              <section className="card p-6">
                <h2 className="text-display text-xl">Why this solution exists</h2>
                <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                  The workshop identified consistent challenges that must be addressed
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {challenges.map((challenge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">!</span>
                      <span className="text-sm text-red-800">{challenge}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-700">
                    The solution directly responds to these challenges by replacing fragmented processes with a <strong>single care operating model</strong> that connects people, journeys, quality and governance.
                  </p>
                </div>
              </section>
            )}

            {/* Design Ethos Section */}
            {activeSection === "ethos" && (
              <section className="card p-6">
                <h2 className="text-display text-xl">Design Ethos</h2>
                <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                  The solution is governed by the following non-negotiable principles
                </p>
                <div className="mt-6 space-y-4">
                  {designPrinciples.map((principle, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-black/10 bg-white p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--accent)] text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <h3 className="text-display text-lg">{principle.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-[color:var(--ink-muted)]">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Ethics & Guardrails Section */}
            {activeSection === "ethics" && (
              <section className="card p-6">
                <h2 className="text-display text-xl">Ethics, Governance and Guardrails</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <h3 className="text-sm font-semibold text-red-800">Clinical Safety</h3>
                    <ul className="mt-3 space-y-2">
                      {guardrails.clinical.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                          <span className="mt-0.5">🚫</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <h3 className="text-sm font-semibold text-amber-800">AI Ethics</h3>
                    <ul className="mt-3 space-y-2">
                      {guardrails.ai.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                          <span className="mt-0.5">⚖️</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <h3 className="text-sm font-semibold text-blue-800">Data Sovereignty</h3>
                    <ul className="mt-3 space-y-2">
                      {guardrails.data.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-blue-700">
                          <span className="mt-0.5">🔒</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-700">
                    <strong>SLMs</strong> provide predictable behaviour, faster domain training and full data control.
                  </p>
                </div>
              </section>
            )}

            {/* Care Operating Model Section */}
            {activeSection === "model" && (
              <section className="card p-6">
                <h2 className="text-display text-xl">Care Operating Model</h2>
                
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-black/70">Actors</h3>
                  <p className="mt-1 text-xs text-[color:var(--ink-muted)]">All actors interact with the same journey, entering at different points with role-based access</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {actors.map((actor) => (
                      <div
                        key={actor.name}
                        className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5"
                      >
                        <span>{actor.icon}</span>
                        <span className="text-sm">{actor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-black/70">Access Model</h3>
                  <p className="mt-1 text-xs text-[color:var(--ink-muted)]">All external actors access through PAM Portal. Patients engage via preferred channel.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {channels.map((channel) => (
                      <span
                        key={channel}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-700"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl bg-emerald-50 p-3">
                    <p className="text-xs text-emerald-700">
                      Regardless of channel: <strong>one case record</strong> exists, <strong>one intelligence layer</strong> operates, <strong>full context</strong> is retained.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                    <h3 className="text-sm font-semibold text-purple-800">PAM Buddy</h3>
                    <p className="mt-2 text-xs text-purple-700">
                      The consistent interaction layer for patients and clinicians. Provides continuity, trusted support, reminders and guidance.
                    </p>
                    <p className="mt-2 text-xs font-medium text-purple-600">
                      Does NOT provide clinical advice or replace clinician judgement.
                    </p>
                  </div>
                  <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                    <h3 className="text-sm font-semibold text-cyan-800">Intelligence Layer</h3>
                    <p className="mt-2 text-xs text-cyan-700">
                      Knowledge becomes agentic intelligence. Understands journey stage, actor role, and case history. Surfaces relevant guidance in real time.
                    </p>
                    <p className="mt-2 text-xs font-medium text-cyan-600">
                      Supports people during care. Does NOT act independently.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <h3 className="text-sm font-semibold">Removal of Forms</h3>
                    <p className="mt-2 text-xs text-[color:var(--ink-muted)]">
                      Manual forms replaced through automatic capture. Voice and text transcribed, structured data extracted, cases created without manual entry.
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <h3 className="text-sm font-semibold">Case Lifecycle Management</h3>
                    <p className="mt-2 text-xs text-[color:var(--ink-muted)]">
                      Cases automatically created, tracked across stages, measured against KPIs. Supports reminders, prompts, escalation and audit timelines.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <h3 className="text-sm font-semibold text-emerald-800">Quality as a Continuous Capability</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-emerald-700">Real-time quality</p>
                      <p className="text-xs text-emerald-600">In-the-moment guidance, early risk detection, live clinician support</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-emerald-700">Historical quality</p>
                      <p className="text-xs text-emerald-600">Trend analysis, pathway performance review, continuous improvement insight</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-medium text-emerald-800">
                    Quality is embedded during care delivery, not inspected afterwards.
                  </p>
                </div>
              </section>
            )}

            {/* Core Features Section */}
            {activeSection === "features" && (
              <section className="card p-6">
                <h2 className="text-display text-xl">Core Features and Functions</h2>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {coreFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent)] text-xs text-white">
                        ✓
                      </span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right - Summary Panel */}
          <div className="flex flex-col gap-6">
            <section className="glass rounded-[24px] p-6">
              <h3 className="text-display text-lg">Solution Principles</h3>
              <ul className="mt-4 space-y-3">
                {designPrinciples.slice(0, 3).map((principle, i) => (
                  <li key={i}>
                    <p className="text-sm font-semibold text-black">{principle.title}</p>
                    <p className="mt-1 text-xs text-[color:var(--ink-muted)]">{principle.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-display text-lg text-emerald-800">Ready for Delivery</h3>
              <p className="mt-3 text-sm text-emerald-700">
                This solution provides PAM Wellness with a scalable, controlled and clinically safe care operating model that supports growth without increasing risk or burden.
              </p>
              <p className="mt-3 text-xs font-medium text-emerald-600">
                Now defined, grounded and suitable for phased delivery and commercial pricing.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={fullscreenImage.src}
            alt={fullscreenImage.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
