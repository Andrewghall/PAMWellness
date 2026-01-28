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
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <p className="pill badge-accent">Application Delivery Proposal</p>
          <h1 className="text-display mt-4 text-4xl md:text-5xl">
            Building Your New EAP Platform
          </h1>
        </header>

        {/* What this delivers */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">What this delivers</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-6">
            A modern, scalable EAP platform that becomes the single operational front door for patients, clinicians, corporate users and leadership — replacing fragmented systems with one joined-up experience.
          </p>
          
          <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 mb-6">
            <p className="text-sm font-semibold text-emerald-800 mb-3">This approach provides:</p>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li>• Faster access to care</li>
              <li>• Reduced operational friction</li>
              <li>• Improved clinical oversight</li>
              <li>• Clear performance visibility</li>
              <li>• A scalable foundation for automation and AI</li>
            </ul>
          </div>
        </section>

        {/* The Commercial Approach */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">The Commercial Approach</h2>
          <p className="text-sm text-[color:var(--ink-muted)] mb-6">
            Delivery is structured into clear phases to ensure speed to value, controlled investment, and low delivery risk.
          </p>
          
          <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              Each phase builds directly on the previous one — no rework, no duplicated cost.
            </p>
          </div>
        </section>

        {/* Delivery Phases */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-6">Delivery Phases</h2>
          
          {/* Phase 1 */}
          <div className="mb-8 pb-8 border-b border-black/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-display text-xl">1. Discovery & Design Sprint</h3>
              <div className="text-right">
                <span className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white">
                  £20,000
                </span>
                <p className="text-xs text-amber-600 mt-1">10 days</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-black mb-2">Purpose:</p>
                <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4">
                  <li>• Remove ambiguity early</li>
                  <li>• Confirm operating model and journeys</li>
                  <li>• Lock MVP scope and roadmap</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-black mb-2">Key outcomes:</p>
                <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4">
                  <li>• Agreed future-state journeys</li>
                  <li>• Defined roles, access and governance</li>
                  <li>• Confirmed KPIs and success measures</li>
                  <li>• Finalised MVP and Horizon roadmap</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="mb-8 pb-8 border-b border-black/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-display text-xl">2. Proof of Value (POV)</h3>
              <div className="text-right">
                <span className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white">
                  £30,000
                </span>
                <p className="text-xs text-purple-600 mt-1">Required</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-black mb-2">Purpose:</p>
                <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4">
                  <li>• Prove integrations and workflows in the live estate</li>
                  <li>• De-risk the MVP before full build investment</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-black mb-2">What is validated:</p>
                <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4">
                  <li>• RingCentral integration</li>
                  <li>• Existing portal coexistence or migration</li>
                  <li>• Secure data exchange</li>
                  <li>• End-to-end journey execution</li>
                  <li>• Buddy workflows operating across systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="mb-8 pb-8 border-b border-black/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-display text-xl">3. MVP Build – Horizon 1</h3>
              <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
                £250,000
              </span>
            </div>
            
            <p className="text-sm text-[color:var(--ink-muted)] mb-4">
              Delivers a fully operational EAP platform including:
            </p>
            
            <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4 mb-4">
              <li>• Single digital care portal</li>
              <li>• Live patient journeys</li>
              <li>• Live clinician journeys</li>
              <li>• Patient Buddy for proactive and reactive engagement</li>
              <li>• Clinician Buddy for workload management and escalation</li>
              <li>• RingCentral-aligned communications</li>
              <li>• Executive KPI dashboards</li>
              <li>• Standardised SOPs and governance</li>
            </ul>
            
            <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200">
              <p className="text-sm font-semibold text-emerald-800">Outcome:</p>
              <ul className="space-y-1 text-sm text-emerald-700 mt-1">
                <li>• One platform</li>
                <li>• One operating model</li>
                <li>• One source of truth</li>
              </ul>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="mb-8 pb-8 border-b border-black/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-display text-xl">4. Horizon 2 – Finalise solution</h3>
              <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                £50,000
              </span>
            </div>
            
            <p className="text-sm text-[color:var(--ink-muted)] mb-4">
              Enhances the live platform with:
            </p>
            
            <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4 mb-4">
              <li>• Extended automation across journeys</li>
              <li>• Deeper insight and reporting</li>
              <li>• Additional system integrations</li>
              <li>• Experience optimisation</li>
              <li>• Quality framework implementation</li>
            </ul>
          </div>

          {/* Phase 5 */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-display text-xl">5. Operate, Refine & Upgrade</h3>
              <div className="text-right">
                <span className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white">
                  £10,000 per month
                </span>
                <p className="text-xs text-amber-600 mt-1">from go-live</p>
              </div>
            </div>
            
            <p className="text-sm text-[color:var(--ink-muted)] mb-4">Includes:</p>
            <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4">
              <li>• Platform operation and support</li>
              <li>• Monitoring and service assurance</li>
              <li>• Performance optimisation</li>
              <li>• Minor enhancements</li>
              <li>• Stability and release management</li>
            </ul>
          </div>
        </section>

        {/* Year 1 Investment Summary */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">Year 1 Investment Summary</h2>
          
          <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 p-6">
            <div className="text-center mb-6">
              <p className="text-sm font-semibold text-emerald-700 mb-2">Total first-year investment:</p>
              <p className="text-3xl font-bold text-emerald-800">£400,000</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-semibold text-emerald-700">Investment breakdown by phase:</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-200">
                      <th className="text-left py-2 font-semibold text-emerald-800">Phase</th>
                      <th className="text-right py-2 font-semibold text-emerald-800">Investment</th>
                      <th className="text-right py-2 font-semibold text-emerald-800">TIME FRAMES</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">1. Discovery & Design Sprint</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£20,000</td>
                      <td className="py-2 text-right text-emerald-600">2 weeks</td>
                    </tr>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">2. Proof of Value (POV)</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£30,000</td>
                      <td className="py-2 text-right text-emerald-600">2 weeks</td>
                    </tr>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">3. MVP Build – Horizon 1</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£250,000</td>
                      <td className="py-2 text-right text-emerald-600">12-15 weeks</td>
                    </tr>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">4. Horizon 2 – Finalise solution</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£50,000</td>
                      <td className="py-2 text-right text-emerald-600">12 weeks</td>
                    </tr>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">5. Operate and run cost</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£50,000</td>
                      <td className="py-2 text-right text-emerald-600">Balance of 52 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="border-t border-emerald-300 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-emerald-800">Total Year 1 Investment:</span>
                  <span className="text-lg font-bold text-emerald-800">£400,000</span>
                </div>
              </div>
              
              <div className="border-t border-emerald-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-emerald-700">Post year 1 - Ongoing operate cost:</span>
                  <span className="text-lg font-bold text-emerald-800">£10K (per month)</span>
                </div>
                <p className="text-xs text-emerald-600 mt-1">Assumes a 3 year agreement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What the Client Gets */}
        <section className="card p-6">
          <h2 className="text-display text-2xl mb-4">What the Client Gets</h2>
          
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            By the end of Horizon 1, the organisation will have:
          </p>
          
          <ul className="space-y-2 text-sm text-[color:var(--ink-muted)] pl-4">
            <li>• A single operational digital care platform</li>
            <li>• Fully supported patient and clinician journeys</li>
            <li>• Reduced administrative burden</li>
            <li>• Improved experience and responsiveness</li>
            <li>• Real-time operational and quality visibility</li>
            <li>• A scalable foundation for Horizons 2 and 3</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
