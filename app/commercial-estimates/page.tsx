"use client";

import { useState } from "react";

const ACCESS_CODE = "PAM2026";

export default function CommercialEstimatesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeInput === ACCESS_CODE) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="glass rounded-[32px] p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-display mt-6 text-2xl">Application Delivery Proposal</h1>
            <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
              This page contains sensitive commercial information. Please enter the access code to continue.
            </p>
            <form onSubmit={handleCodeSubmit} className="mt-6">
              <input
                type="password"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter access code"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-center text-lg tracking-widest outline-none transition-all focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-[color:var(--accent)] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[color:var(--accent)]/90"
              >
                Access Page
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <p className="pill badge-accent">Application Delivery Proposal</p>
          <h1 className="text-display mt-4 text-4xl md:text-5xl">
            Building Your New EAP Platform
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[color:var(--ink-muted)]">
            This page defines the recommended next steps, workshop structure, delivery horizons, and commercial model to progress from the DREAM outcomes into your new, scalable EAP platform.
          </p>
        </header>

        {/* Purpose Section */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">Purpose</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            The intent is to give clarity on:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "What we build first (MVP)",
              "How we phase value over time",
              "What the client should expect",
              "What support is required from the business",
              "Cost, timing, and delivery milestones"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-blue-50 p-3 border border-blue-200">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-blue-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Phase 1 - Discovery Sprint */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">Phase 1 — Discovery & Design Sprint (1 week)</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            To ensure clarity, alignment, and delivery confidence, we recommend a dedicated one-week discovery and design sprint prior to commencing build.
          </p>
          <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
            <p className="text-sm text-amber-800">
              This sprint removes ambiguity early, confirms architectural direction, and locks the decisions required to deliver an MVP without scope drift or rework.
            </p>
          </div>
        </section>

        {/* Discovery Sprint Structure */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Discovery Sprint Structure</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left p-3 font-semibold">Day</th>
                  <th className="text-left p-3 font-semibold">Focus</th>
                  <th className="text-left p-3 font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    day: "Day 1",
                    focus: "Actor journeys",
                    outcome: "Validated journeys across all personas including corporate, clinicians, patients, operations, and leadership"
                  },
                  {
                    day: "Day 2",
                    focus: "Buddy journey design",
                    outcome: "Detailed Patient Buddy and Clinician Buddy journeys including triggers, interactions, escalation paths, safety boundaries, and human handoff points"
                  },
                  {
                    day: "Day 3",
                    focus: "Tooling, interfaces & integrations",
                    outcome: "System map covering existing solutions, required interfaces, APIs, events, and integrations (including RingCentral and other core platforms)"
                  },
                  {
                    day: "Day 4",
                    focus: "KPIs, SOPs & operating model",
                    outcome: "Defined KPI framework, reporting requirements, SOP alignment, governance controls, and future-state operating model"
                  },
                  {
                    day: "Day 5",
                    focus: "MVP definition & horizon planning",
                    outcome: "Locked MVP scope, phased Horizon 1–3 roadmap, dependencies, sequencing, and delivery success measures"
                  }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/5">
                    <td className="p-3 font-medium text-[color:var(--accent)]">{row.day}</td>
                    <td className="p-3">{row.focus}</td>
                    <td className="p-3 text-[color:var(--ink-muted)]">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Discovery Deliverables */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Discovery Deliverables</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            At the conclusion of the sprint, the following artefacts will be produced:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "End-to-end actor journey maps across all personas",
              "Patient Buddy journey specification",
              "Clinician Buddy journey specification",
              "System, interface, and data interaction diagrams",
              "Integration requirements covering RingCentral and existing platforms",
              "KPI catalogue with definitions, owners, and measurement cadence",
              "Dashboard and reporting requirements",
              "SOP mapping and future-state process alignment",
              "Portal structure, navigation model, and role-based access design",
              "MVP feature definition with prioritised backlog",
              "Horizon roadmap (H1, H2, H3)"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50 p-4 border border-emerald-200">
            <p className="text-sm text-emerald-800 mb-3">
              These deliverables together form the operational, technical, and commercial blueprint for build.
            </p>
            <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-300">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2">What is the Horizon Roadmap?</h4>
              <p className="text-sm text-emerald-800">
                The Horizon roadmap delivers specific platform specifications and features in three phases:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-emerald-800 ml-4">
                <li><strong>Horizon 1 (H1):</strong> Core Platform Specifications - foundational features and core EAP workflows</li>
                <li><strong>Horizon 2 (H2):</strong> Advanced Feature Specifications - expanded capabilities and deeper integrations</li>
                <li><strong>Horizon 3 (H3):</strong> Enterprise Platform Specifications - enterprise-grade capabilities and operational excellence</li>
              </ul>
              <p className="text-sm text-emerald-800 mt-2">
                Each horizon delivers specific features with progressive functional depth built out within each phase.
              </p>
            </div>
          </div>
        </section>

        {/* Phase 2 - POV */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">Phase 2 — Platform Proof of Value (POV) (10 days)</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            Following discovery, we recommend a 10-day Proof of Value (POV) to demonstrate that the proposed platform architecture can operate effectively within the client's existing technology estate.
          </p>
          <div className="rounded-xl bg-purple-50 p-4 border border-purple-200">
            <p className="text-sm text-purple-800 mb-3">
              <strong>The POV is the first build step towards the MVP.</strong> All work completed during the POV phase will be fully utilized and forms the foundation for the complete MVP delivery.
            </p>
            <p className="text-sm text-purple-800">
              The POV provides tangible assurance prior to full MVP investment by validating that interfaces, integrations, and workflows function as intended.
            </p>
          </div>
        </section>

        {/* POV Objectives */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">POV Objectives</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Demonstrate real interaction between the platform and existing systems",
              "Prove integration feasibility and performance",
              "Validate data flow, orchestration, and security model",
              "Confirm Buddy journeys can operate within live tooling",
              "De-risk MVP delivery before full build commitment"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* POV Scope */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">POV Scope</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            The POV will include:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Working platform shell",
              "Secure portal entry point",
              "Role-based access model",
              "Live or sandbox integrations (including RingCentral)",
              "Event handling and data exchange",
              "Demonstration Patient Buddy workflow",
              "Demonstration Clinician Buddy workflow",
              "Basic dashboards populated from integrated data"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-indigo-50 p-4 border border-indigo-200">
            <p className="text-sm text-indigo-800 mb-3">
              The POV is not a full MVP, but a functional validation layer designed to prove interoperability.
            </p>
            <p className="text-sm text-indigo-800">
              <strong>All POV deliverables become the foundation for MVP development</strong> - no work is discarded or repeated.
            </p>
          </div>
        </section>

        {/* Delivery Clarity by Horizon */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">Delivery Clarity by Horizon (For example)</h2>
          
          {/* Horizon 1 */}
          <div className="mb-8">
            <h3 className="text-display text-lg mb-3 text-emerald-700">Horizon 1 — MVP (Business Outcomes)</h3>
            <p className="text-sm text-emerald-600 mb-4 font-medium">Horizon 1 represents the complete operational application from a client business perspective.</p>
            
            <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 mb-4">
              <h4 className="text-sm font-semibold text-emerald-900 mb-3">Core Business Outcomes</h4>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• A single digital portal acting as the operational front door for the organisation</li>
                <li>• Clearly defined journeys for Patients, Clinicians, Corporate users, and Operational and leadership teams</li>
                <li>• A consistent experience across digital and assisted channels</li>
              </ul>
            </div>

            <div className="rounded-xl bg-blue-50 p-4 border border-blue-200 mb-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Patient Experience Outcomes</h4>
              <p className="text-sm text-blue-800 mb-2">A defined Patient Buddy journey that:</p>
              <ul className="space-y-1 text-sm text-blue-800 ml-4">
                <li>• Guides patients proactively and reactively</li>
                <li>• Supports appointment management, updates, and communications</li>
                <li>• Identifies risk or exception scenarios</li>
                <li>• Escalates to human teams when required</li>
              </ul>
              <p className="text-sm text-blue-800 mt-3 font-medium">Result: Improved patient confidence, responsiveness, and satisfaction</p>
            </div>

            <div className="rounded-xl bg-purple-50 p-4 border border-purple-200 mb-4">
              <h4 className="text-sm font-semibold text-purple-900 mb-3">Clinician Experience Outcomes</h4>
              <p className="text-sm text-purple-800 mb-2">A defined Clinician Buddy journey that:</p>
              <ul className="space-y-1 text-sm text-purple-800 ml-4">
                <li>• Reduces administrative burden</li>
                <li>• Supports task prioritisation and workflow management</li>
                <li>• Assists with documentation and follow-up</li>
                <li>• Enables safe escalation and oversight</li>
              </ul>
              <p className="text-sm text-purple-800 mt-3 font-medium">Result: Improved clinician efficiency and reduced cognitive load</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 mb-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-3">Operational Outcomes</h4>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>• Standardised end-to-end processes across patient and clinician journeys</li>
                <li>• Clear ownership of each stage of the journey</li>
                <li>• Defined escalation paths and accountability</li>
                <li>• Reduced manual coordination between teams</li>
              </ul>
            </div>

            <div className="rounded-xl bg-indigo-50 p-4 border border-indigo-200 mb-4">
              <h4 className="text-sm font-semibold text-indigo-900 mb-3">Performance & Governance Outcomes</h4>
              <p className="text-sm text-indigo-800 mb-2">A defined KPI framework covering:</p>
              <ul className="space-y-1 text-sm text-indigo-800 ml-4">
                <li>• Patient experience</li>
                <li>• Clinical safety</li>
                <li>• Operational efficiency</li>
                <li>• Throughput and responsiveness</li>
              </ul>
              <ul className="space-y-1 text-sm text-indigo-800 mt-2">
                <li>• Executive dashboards providing real-time visibility</li>
                <li>• Agreed decision cadence supported by measurable data</li>
              </ul>
            </div>

            <div className="rounded-xl bg-rose-50 p-4 border border-rose-200 mb-4">
              <h4 className="text-sm font-semibold text-rose-900 mb-3">Operating Model Outcomes</h4>
              <ul className="space-y-1 text-sm text-rose-800">
                <li>• Updated SOPs aligned to the new digital model</li>
                <li>• Clear roles, responsibilities, and handoffs</li>
                <li>• Consistent governance across clinical and non-clinical activity</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-emerald-100 rounded-xl border border-emerald-300">
              <h4 className="text-sm font-semibold text-emerald-900 mb-2">At the end of Horizon 1, the client will have:</h4>
              <ul className="space-y-1 text-sm text-emerald-800">
                <li>• A fully operational digital care platform</li>
                <li>• Measurable performance visibility</li>
                <li>• Improved patient and clinician experience</li>
                <li>• Reduced operational friction</li>
                <li>• A scalable foundation for future expansion</li>
              </ul>
            </div>
          </div>

          {/* Horizon 2 */}
          <div className="mb-8">
            <h3 className="text-display text-lg mb-3 text-blue-700">Horizon 2 — Expansion (Additional Build)</h3>
            <p className="text-sm text-blue-600 mb-3 font-medium">Build cost: £50,000</p>
            <p className="text-sm text-blue-800 mb-4">Horizon 2 is an extension of the live MVP and is not required for initial delivery.</p>
            
            <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm text-blue-800 mb-3">Scope may include:</p>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Additional automations</li>
                <li>• Extended analytics</li>
                <li>• Further system integrations</li>
                <li>• Journey optimisation</li>
                <li>• Quality framework implementation</li>
              </ul>
              <p className="text-sm text-blue-800 mt-3 font-medium">Deliverables are defined only once Horizon 1 is operational.</p>
            </div>
          </div>

          {/* Horizon 3 */}
          <div className="mb-6">
            <h3 className="text-display text-lg mb-3 text-purple-700">Horizon 3 — Additional Scope</h3>
            <p className="text-sm text-purple-800 mb-4">Horizon 3 represents additional capability only, based on future requirements.</p>
            
            <div className="rounded-xl bg-purple-50 p-4 border border-purple-200">
              <p className="text-sm text-purple-800 mb-3">Examples include:</p>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Advanced AI capabilities</li>
                <li>• New product modules</li>
                <li>• Predictive analytics</li>
                <li>• Commercial extensions</li>
              </ul>
              <p className="text-sm text-purple-800 mt-3 font-medium">Scope and pricing are defined separately once Horizon 2 priorities are known.</p>
            </div>
          </div>
        </section>

        {/* MVP Timeline */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Indicative MVP Timeline</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left p-3 font-semibold">Phase</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                  <th className="text-left p-3 font-semibold">Output</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { phase: "Discovery & Workshops", duration: "2 weeks", output: "Final scope & architecture" },
                  { phase: "UX / Portal Design", duration: "2 weeks", output: "Clickable designs" },
                  { phase: "Core Build", duration: "6–8 weeks", output: "Functional MVP" },
                  { phase: "Testing & Refinement", duration: "2 weeks", output: "Production-ready" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/5">
                    <td className="p-3 font-medium">{row.phase}</td>
                    <td className="p-3">{row.duration}</td>
                    <td className="p-3 text-[color:var(--ink-muted)]">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-[color:var(--accent)]">Total: ~12 weeks</p>
          </div>
        </section>

        {/* Commercial Estimate */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Commercial Estimate</h2>
          <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 mb-4">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> These are rough order of magnitude estimates and subject to further due diligence to ensure we get the accurate baseline around Horizon deliverables.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left p-3 font-semibold">Component</th>
                  <th className="text-right p-3 font-semibold">Investment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { component: "Discovery workshops", investment: "£12,000" },
                  { component: "Proof of Value (required)", investment: "£20,000" },
                  { component: "MVP build (depending on POV progression)", investment: "£130,000–£150,000" },
                  { component: "Annual operate and support", investment: "£100,000" },
                  { component: "Horizon 2 expansion", investment: "£50,000" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/5">
                    <td className="p-3">{row.component}</td>
                    <td className="p-3 text-right font-medium">{row.investment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl bg-[color:var(--accent)]/5 p-4 border-l-4 border-[color:var(--accent)]">
            <p className="text-sm text-[color:var(--ink-muted)] font-medium">
              Horizon 3 — Additional scope as required, priced separately once Horizon 2 priorities are known.
            </p>
          </div>
        </section>

        {/* What the Client Should Expect */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">What the Client Should Expect</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            As the client, you should expect:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Weekly delivery updates and progress reports",
              "Fortnightly demo sessions showing working software",
              "Transparent roadmap tracking with clear milestones",
              "Early visibility of working features and functionality",
              "Incremental value delivery throughout the project",
              "Clear communication on risks and dependencies",
              "Regular stakeholder alignment sessions",
              "Documentation and handover materials"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Client Responsibilities */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Client Responsibilities</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            To ensure delivery velocity, the client will need to provide:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Named product owner",
              "Access to subject matter experts",
              "System documentation and credentials",
              "Timely feedback on designs",
              "Decision-making availability"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Success Measures */}
        <section className="card p-6">
          <h2 className="text-display text-xl mb-4">Success Measures</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "MVP live within 12 weeks",
              "Actor journeys fully supported",
              "Portal adopted as primary entry point",
              "Foundation in place for Horizons 2 and 3"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="glass rounded-[24px] p-6">
          <h2 className="text-display text-xl mb-4">Summary</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            This phased approach ensures:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Fast time to value",
              "Controlled investment",
              "Reduced delivery risk",
              "Clear operational benefits",
              "Architecture aligned to EAP service excellence"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[color:var(--ink-muted)]">
                <span className="text-[color:var(--accent)]">•</span>
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-[color:var(--accent)]/5 p-4 border-l-4 border-[color:var(--accent)]">
            <p className="text-sm text-[color:var(--ink-muted)] font-medium">
              The MVP establishes the foundation for your new EAP Platform, with future horizons unlocking automation, intelligence, and scalable growth.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
