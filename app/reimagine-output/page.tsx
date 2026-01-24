"use client";

import Link from "next/link";
import { useState } from "react";

const journeyStages = [
  { id: "pre-care", title: "Pre-care Portal", summary: "Patient initiates support before live care begins." },
  { id: "access-onboarding", title: "Access & Onboarding", summary: "Eligibility and registration are confirmed." },
  { id: "initial-assessment", title: "Initial Assessment", summary: "Needs are assessed to determine pathway." },
  { id: "triage-routing", title: "Triage & Routing", summary: "Case matched to clinician and service model." },
  { id: "care-delivery", title: "Care Delivery", summary: "Sessions delivered with clinical quality." },
  { id: "ongoing-management", title: "Ongoing Management", summary: "Coordination and progress tracking." },
  { id: "outcomes-closure", title: "Outcomes & Closure", summary: "Outcomes recorded and case closed." },
  { id: "reporting-governance", title: "Reporting & Governance", summary: "Compliance reporting and insights." },
  { id: "follow-on-reentry", title: "Follow-on & Re-entry", summary: "Continuity preserved for re-engagement." },
];

type Theme = {
  id: string;
  number: number;
  title: string;
  weighting: "very-high" | "high" | "medium" | "low";
  category: "primary" | "supporting" | "contextual";
  description: string[];
};

const themes: Theme[] = [
  {
    id: "joined-journey",
    number: 1,
    title: "A joined-up end-to-end care journey",
    weighting: "very-high",
    category: "primary",
    description: [
      "The strongest theme was the need to move away from care being delivered as isolated moments.",
      "The session consistently returned to the idea that calls, appointments and follow-ups work individually but break down when they are not connected.",
      "The reimagined future is one where care flows as a single journey from first contact through assessment, delivery and follow-up.",
      "Information moves forward with the patient. The journey does not reset.",
    ],
  },
  {
    id: "visibility",
    number: 2,
    title: "Visibility across the full journey",
    weighting: "very-high",
    category: "primary",
    description: [
      "A repeated frustration was the inability to see what is happening until something becomes a problem.",
      "Leadership visibility today is often retrospective.",
      "In the future state, the business can see flow, pressure and risk while care is happening, not after.",
      "This visibility underpins confidence and control.",
    ],
  },
  {
    id: "care-delivery",
    number: 3,
    title: "Redefining how care is delivered",
    weighting: "high",
    category: "primary",
    description: [
      "There was strong agreement that traditional contact-centre thinking is the wrong starting point for modern care delivery.",
      "The future model is not built around transactions, but around continuity and outcomes.",
      "Care is organised around where the patient is in their journey, not around individual touchpoints.",
    ],
  },
  {
    id: "actors",
    number: 4,
    title: "Designing for different actors",
    weighting: "high",
    category: "primary",
    description: [
      "The session clearly recognised that care is experienced differently by different actors.",
      "Patients, clinicians, operational teams and leadership all interact with care at different moments and for different purposes.",
      "The future model supports these differences while keeping everyone aligned to the same underlying journey.",
    ],
  },
  {
    id: "language",
    number: 5,
    title: "A shared operating language",
    weighting: "high",
    category: "primary",
    description: [
      "The group highlighted the difficulty created when teams operate with different views of the business.",
      "The care journey becomes the shared operating language.",
      "It allows teams to align on priorities, flow, ownership and outcomes.",
    ],
  },
  {
    id: "continuity",
    number: 6,
    title: "Continuity over handovers",
    weighting: "medium",
    category: "supporting",
    description: [
      "The reliance on handovers and informal knowledge was recognised as a risk.",
      "The future model reduces dependency on people remembering what happens next.",
      "Ownership is clearer and transitions are smoother.",
    ],
  },
  {
    id: "leadership",
    number: 7,
    title: "Leadership confidence and control",
    weighting: "medium",
    category: "supporting",
    description: [
      "Leadership expressed the need for confidence that care is running as expected.",
      "The future state provides clarity on where patients sit, where pressure exists and where attention is required.",
      "This reduces reactive management.",
    ],
  },
  {
    id: "quality",
    number: 8,
    title: "Quality holding as volume increases",
    weighting: "medium",
    category: "supporting",
    description: [
      "Quality was strongly linked to journey visibility.",
      "When care is fragmented, quality suffers.",
      "In the reimagined future, quality is embedded across the journey and does not degrade as demand grows.",
    ],
  },
  {
    id: "consistency",
    number: 9,
    title: "Consistency of experience",
    weighting: "low",
    category: "contextual",
    description: [
      "Ensuring a consistent experience across pathways and entry points was discussed as an outcome of better journey design.",
    ],
  },
  {
    id: "growth",
    number: 10,
    title: "Creating a platform for future growth",
    weighting: "low",
    category: "contextual",
    description: [
      "Growth and expansion were acknowledged as context, but the session focused on readiness rather than targets.",
    ],
  },
];

const directionOfTravel = [
  { from: "fragmented moments", to: "joined journeys" },
  { from: "hindsight", to: "visibility" },
  { from: "transactions", to: "continuity" },
  { from: "informal coordination", to: "clear ownership" },
  { from: "reactive management", to: "confident control" },
];

const getWeightingColor = (weighting: Theme["weighting"]) => {
  switch (weighting) {
    case "very-high":
      return { bg: "bg-red-100", text: "text-red-700", bar: "bg-red-500" };
    case "high":
      return { bg: "bg-amber-100", text: "text-amber-700", bar: "bg-amber-500" };
    case "medium":
      return { bg: "bg-blue-100", text: "text-blue-700", bar: "bg-blue-500" };
    case "low":
      return { bg: "bg-slate-100", text: "text-slate-600", bar: "bg-slate-400" };
  }
};

const getCategoryLabel = (category: Theme["category"]) => {
  switch (category) {
    case "primary":
      return "Primary theme";
    case "supporting":
      return "Supporting theme";
    case "contextual":
      return "Contextual theme";
  }
};

export default function ReimagineOutputPage() {
  const primaryThemes = themes.filter((t) => t.category === "primary");
  const supportingThemes = themes.filter((t) => t.category === "supporting");

  const [selectedPrimaryTheme, setSelectedPrimaryTheme] = useState<Theme | null>(primaryThemes[0]);
  const [selectedSupportingTheme, setSelectedSupportingTheme] = useState<Theme | null>(supportingThemes[0]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <p className="pill badge-accent">Reimagine Output</p>
          <h1 className="text-display mt-4 text-4xl md:text-5xl">
            The future care model for PAM Wellness
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[color:var(--ink-muted)]">
            The Reimagine session focused on defining the future direction of PAM Wellness as a care business.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-[color:var(--ink-muted)]">
            The conversation intentionally avoided technology and solutions, and instead explored what must change in the way care is organised, experienced and managed as the business grows.
          </p>
          <p className="mt-4 text-xs text-black/40">
            The themes below are presented in order of importance and emphasis during the session.
          </p>
        </header>

        {/* Thinking Framework - House Analogy */}
        <section className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            How we approached the Reimagine session
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="/house-old.png"
                  alt="The Old House"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-display mt-4 text-lg">The Old House</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                What do we see today? Where are things patched, fragile or overly complex?
              </p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="/house-refreshed.png"
                  alt="The Refreshed House"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-display mt-4 text-lg">The Refreshed House</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                What improves but remains structurally the same?
              </p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="/house-ideal.png"
                  alt="The Ideal Home"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-display mt-4 text-lg">The Ideal Home</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Ignoring walls and constraints: What would we design from the ground up? What would feel effortless?
              </p>
            </div>
          </div>
        </section>

        {/* Journey Stages Strip - Clickable to Journey Builder */}
        <Link
          href="/journey"
          className="group relative block overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-all hover:border-[color:var(--accent)] hover:shadow-lg"
          title="Click to go to the Journey Mapper to refine the process steps in the journey"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent)]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                  Patient Wellbeing Journey
                </p>
                <p className="mt-1 text-sm text-[color:var(--ink-muted)]">
                  9 stages from pre-care to re-entry
                </p>
              </div>
              <span className="rounded-full bg-[color:var(--accent)]/10 px-4 py-2 text-xs font-semibold text-[color:var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                Click to refine in Journey Mapper →
              </span>
            </div>
            <div className="mt-4 grid grid-cols-9 gap-2">
              {journeyStages.map((stage, i) => (
                <div key={stage.id} className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent)] text-xs font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    {i < journeyStages.length - 1 && (
                      <div className="h-0.5 flex-1 bg-[color:var(--accent)]/30" />
                    )}
                  </div>
                  <p className="mt-2 text-xs font-semibold text-black leading-tight">{stage.title}</p>
                  <p className="mt-1 text-[10px] leading-tight text-black/50">{stage.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Primary Themes Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Primary Themes List */}
          <section className="card p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                1–5
              </span>
              <div>
                <h2 className="text-display text-xl">Primary themes</h2>
                <p className="text-xs text-[color:var(--ink-muted)]">Highest weighting — these topics dominated the discussion</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {primaryThemes.map((theme) => {
                const colors = getWeightingColor(theme.weighting);
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedPrimaryTheme(theme)}
                    title="Click to see full details"
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      selectedPrimaryTheme?.id === theme.id
                        ? "border-[color:var(--accent)] bg-white shadow"
                        : "border-black/10 bg-white/70 hover:border-black/20"
                    }`}
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-sm font-bold text-white">
                      {theme.number}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-black">{theme.title}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}>
                      {theme.weighting.replace("-", " ")}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Primary Theme Detail */}
          <section className="card overflow-hidden p-0 flex flex-col">
            {selectedPrimaryTheme && (
              <>
                <div className="border-b border-black/10 bg-gradient-to-r from-[color:var(--accent)]/10 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent)] text-xl font-bold text-white">
                      {selectedPrimaryTheme.number}
                    </span>
                    <div className="flex-1">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getWeightingColor(selectedPrimaryTheme.weighting).bg} ${getWeightingColor(selectedPrimaryTheme.weighting).text}`}>
                        {selectedPrimaryTheme.weighting.replace("-", " ")} weighting
                      </span>
                      <h3 className="text-display mt-1 text-xl">{selectedPrimaryTheme.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    {selectedPrimaryTheme.description.map((para: string, i: number) => (
                      <p key={i} className="text-sm text-[color:var(--ink-muted)] leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        </div>

        {/* Supporting Themes Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Supporting Themes List */}
          <section className="card p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                6–8
              </span>
              <div>
                <h2 className="text-display text-xl">Supporting themes</h2>
                <p className="text-xs text-[color:var(--ink-muted)]">Medium weighting</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {supportingThemes.map((theme) => {
                const colors = getWeightingColor(theme.weighting);
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedSupportingTheme(theme)}
                    title="Click to see full details"
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      selectedSupportingTheme?.id === theme.id
                        ? "border-[color:var(--accent)] bg-white shadow"
                        : "border-black/10 bg-white/70 hover:border-black/20"
                    }`}
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                      {theme.number}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-black">{theme.title}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colors.bg} ${colors.text}`}>
                      {theme.weighting}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Supporting Theme Detail */}
          <section className="card overflow-hidden p-0 flex flex-col">
            {selectedSupportingTheme && (
              <>
                <div className="border-b border-black/10 bg-gradient-to-r from-blue-500/10 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-xl font-bold text-white">
                      {selectedSupportingTheme.number}
                    </span>
                    <div className="flex-1">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getWeightingColor(selectedSupportingTheme.weighting).bg} ${getWeightingColor(selectedSupportingTheme.weighting).text}`}>
                        {selectedSupportingTheme.weighting} weighting
                      </span>
                      <h3 className="text-display mt-1 text-xl">{selectedSupportingTheme.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    {selectedSupportingTheme.description.map((para: string, i: number) => (
                      <p key={i} className="text-sm text-[color:var(--ink-muted)] leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        </div>

        {/* Direction of Travel */}
        <section className="glass rounded-[24px] p-8">
          <h2 className="text-display text-2xl">Overall direction of travel</h2>
          <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
            Taken together, the workshop defined a clear direction:
          </p>
          <div className="mt-6 space-y-3">
            {directionOfTravel.map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                  {i + 1}
                </span>
                <span className="min-w-[140px] text-sm text-slate-600">
                  {item.from}
                </span>
                <span className="text-xl text-[color:var(--accent)]">→</span>
                <span className="text-sm font-semibold text-[color:var(--accent)]">
                  {item.to}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-800">
              This weighted view reflects not just what was discussed, but <strong>what mattered most</strong> during the Reimagine session. It provides a clear guide for what the future care model must prioritise as PAM Wellness moves forward.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
