"use client";

import { useState } from "react";

const ACCESS_CODE = "PAM2026";

type EconomicDriver = {
  id: string;
  title: string;
  icon: string;
  color: string;
  current: string;
  target: string;
  impact: string;
};

const economicDrivers: EconomicDriver[] = [
  {
    id: "margin",
    title: "Margin Expansion",
    icon: "📈",
    color: "#10b981",
    current: "Volume-driven revenue",
    target: "Margin-led growth through automation",
    impact: "Improved EBITDA and operating leverage",
  },
  {
    id: "headcount",
    title: "Headcount Decoupling",
    icon: "👥",
    color: "#8b5cf6",
    current: "Workforce expansion for scale",
    target: "Growth through intelligence",
    impact: "Lower execution risk premium",
  },
  {
    id: "ip",
    title: "IP Ownership",
    icon: "🛡️",
    color: "#f59e0b",
    current: "Rented capabilities",
    target: "Defensible orchestration layers",
    impact: "Higher valuation multiples",
  },
  {
    id: "revenue",
    title: "Revenue Predictability",
    icon: "🎯",
    color: "#06b6d4",
    current: "Contract-based revenue",
    target: "Outcome-based commercial models",
    impact: "Clearer revenue visibility",
  },
];

const opportunityAreas = [
  { label: "Flexible cost structure through automation", priority: "high" },
  { label: "Diversified revenue streams", priority: "high" },
  { label: "Predictable cash flow models", priority: "medium" },
  { label: "Streamlined coordination through intelligence", priority: "high" },
  { label: "Scale through enablement and AI", priority: "medium" },
];

const valuationDrivers = [
  { driver: "Platform narrative coherence", impact: "Clearer investor story", score: 85 },
  { driver: "Owned intelligence layer", impact: "Defensible competitive moat", score: 90 },
  { driver: "Margin through automation", impact: "Improved EBITDA", score: 75 },
  { driver: "Reduced key-person risk", impact: "Lower risk premium", score: 70 },
  { driver: "Scalable orchestration", impact: "Growth without cost increase", score: 80 },
];

export default function CommercialEstimatesPage() {
  const [selectedDriver, setSelectedDriver] = useState<EconomicDriver>(economicDrivers[0]);
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
            <h1 className="text-display mt-6 text-2xl">Commercial Estimates</h1>
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="pill badge-accent">Commercial Estimates</p>
              <h1 className="text-display mt-4 text-4xl md:text-5xl">
                Economic Model & Valuation
              </h1>
              <p className="mt-4 max-w-xl text-lg text-[color:var(--ink-muted)]">
                The transformation has direct implications for commercial sustainability, margin
                structure, and long-term valuation.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Target</p>
                <p className="text-display mt-2 text-3xl font-bold text-emerald-700">+40%</p>
                <p className="mt-1 text-xs text-emerald-600">Margin improvement</p>
              </div>
              <div className="rounded-[24px] border border-violet-200 bg-violet-50 p-6 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-violet-600">Target</p>
                <p className="text-display mt-2 text-3xl font-bold text-violet-700">2.5x</p>
                <p className="mt-1 text-xs text-violet-600">Valuation multiple</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Economic Drivers Grid */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Target Economic Model</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Click each driver to see transformation details
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {economicDrivers.map((driver) => (
                  <button
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className={`group flex flex-col rounded-2xl border p-5 text-left transition-all hover:shadow-lg ${
                      selectedDriver.id === driver.id
                        ? "border-black/20 bg-white shadow-lg"
                        : "border-black/10 bg-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                        style={{ backgroundColor: `${driver.color}20` }}
                      >
                        {driver.icon}
                      </div>
                      <span className="text-xs font-semibold text-[color:var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                        View →
                      </span>
                    </div>
                    <h3 className="text-display mt-4 text-lg">{driver.title}</h3>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        Today
                      </span>
                      <span className="text-xs text-[color:var(--accent)]">→</span>
                      <span className="rounded bg-[color:var(--accent)]/10 px-2 py-0.5 text-xs text-[color:var(--accent)]">
                        Future
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Valuation Drivers */}
            <section className="card p-6">
              <h2 className="text-display text-xl">Valuation Drivers</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Future-state principles designed with valuation in mind
              </p>
              <div className="mt-4 space-y-3">
                {valuationDrivers.map((item) => (
                  <div
                    key={item.driver}
                    className="rounded-xl border border-black/10 bg-white/70 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-black">{item.driver}</p>
                        <p className="mt-1 text-xs text-[color:var(--ink-muted)]">{item.impact}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-display text-xl font-bold text-[color:var(--accent)]">
                          {item.score}
                        </p>
                        <p className="text-xs text-black/50">score</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-amber-400 transition-all duration-500"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Selected Driver Detail */}
            <section className="card overflow-hidden p-0">
              <div
                className="border-b border-black/10 p-6"
                style={{
                  background: `linear-gradient(135deg, ${selectedDriver.color}15 0%, transparent 100%)`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                    style={{ backgroundColor: `${selectedDriver.color}25` }}
                  >
                    {selectedDriver.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      Economic driver
                    </p>
                    <h3 className="text-display text-2xl">{selectedDriver.title}</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-stretch gap-3">
                  <div className="flex-1 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
                      Today
                    </p>
                    <p className="mt-2 text-sm text-slate-700">{selectedDriver.current}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="rounded-full bg-[color:var(--accent)]/10 px-3 py-1 text-lg text-[color:var(--accent)]">→</span>
                  </div>
                  <div className="flex-1 rounded-xl bg-[color:var(--accent)]/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
                      Future
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--accent)]">{selectedDriver.target}</p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${selectedDriver.color}10` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: selectedDriver.color }}>
                    Valuation Impact
                  </p>
                  <p className="mt-2 text-sm text-black/70">{selectedDriver.impact}</p>
                </div>
              </div>
            </section>

            {/* Opportunity Areas */}
            <section className="card p-6">
              <h3 className="text-display text-lg">Opportunity Areas</h3>
              <div className="mt-4 space-y-2">
                {opportunityAreas.map((opportunity) => (
                  <div
                    key={opportunity.label}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      opportunity.priority === "high" ? "bg-[color:var(--accent)]/10" : "bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${
                        opportunity.priority === "high" ? "bg-[color:var(--accent)]" : "bg-slate-400"
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={`text-sm ${
                        opportunity.priority === "high" ? "text-black" : "text-slate-700"
                      }`}
                    >
                      {opportunity.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section className="glass rounded-[24px] p-6">
              <h3 className="text-display text-lg">Commercial Summary</h3>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
                Long-term financial resilience and optionality are <strong>core strategic
                drivers</strong>.
              </p>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
                The transformation path directly addresses margin expansion, reduced operational
                dependency, and valuation-aligned architecture.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
