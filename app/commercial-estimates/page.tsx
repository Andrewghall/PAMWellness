"use client";

import { useState } from "react";
import jsPDF from "jspdf";

const ACCESS_CODE = "PAM2026";
const ETHENTA_LOGO_PNG_BASE64 = "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";

export default function CommercialEstimatesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeInput === ACCESS_CODE) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code");
    }
  };

  const handleDownloadQuote = async () => {
    if (isGeneratingQuote) return;
    setIsGeneratingQuote(true);
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    try {
      const margin = 25;
      const pageWidth = 210;
      const pageHeight = 297;
      const contentWidth = pageWidth - margin * 2;
      const headerHeight = 18;
      const footerHeight = 10;
      const yStart = margin + headerHeight;
      const yEnd = pageHeight - margin - footerHeight;
      const lineHeight = 6.2;

      const fontFamily = "helvetica";

      const logoDataUrl = `data:image/png;base64,${ETHENTA_LOGO_PNG_BASE64}`;

      const setFont = (size: number, style: "normal" | "bold" = "normal") => {
        pdf.setFont(fontFamily, style);
        pdf.setFontSize(size);
      };

      const wrap = (text: string, maxWidth: number) => pdf.splitTextToSize(text, maxWidth) as string[];

      let currentPage = 1;
      let y = yStart;

      const renderHeader = () => {
        if (logoDataUrl) {
          try {
            pdf.addImage(logoDataUrl, "PNG", margin, margin, 40, 14);
            return;
          } catch (e) {
            console.error("Logo render failed:", e);
          }
        }
        setFont(12, "bold");
        pdf.text("Ethenta", margin, margin + 10);
      };

      const renderFooter = () => {
        setFont(9, "normal");
        const footerY = pageHeight - margin;
        const copyright = "© Ethenta 2026";
        const cWidth = pdf.getTextWidth(copyright);
        pdf.text(copyright, (pageWidth - cWidth) / 2, footerY);
        const pageLabel = `Page ${currentPage}`;
        const pWidth = pdf.getTextWidth(pageLabel);
        pdf.text(pageLabel, pageWidth - margin - pWidth, footerY);
      };

      const newPage = () => {
        renderFooter();
        pdf.addPage();
        currentPage += 1;
        renderHeader();
        y = yStart;
      };

      const ensureSpace = (neededHeight: number) => {
        if (y + neededHeight > yEnd) newPage();
      };

      const addParagraph = (text: string, fontSize = 11, style: "normal" | "bold" = "normal") => {
        setFont(fontSize, style);
        const lines = wrap(text, contentWidth);
        const needed = lines.length * lineHeight + 2;
        ensureSpace(needed);
        lines.forEach((line) => {
          pdf.text(line, margin, y);
          y += lineHeight;
        });
        y += 4;
      };

      const addSectionTitle = (title: string) => {
        setFont(15, "bold");
        ensureSpace(10);
        pdf.text(title, margin, y);
        y += 8;
      };

      const addBullets = (items: string[], maxBullets = 6) => {
        const clipped = items.slice(0, maxBullets);
        setFont(11, "normal");
        clipped.forEach((item) => {
          const bulletIndent = 4;
          const textIndent = 9;
          const lines = wrap(item, contentWidth - textIndent);
          ensureSpace(lines.length * lineHeight + 2);
          pdf.text("•", margin + bulletIndent, y);
          lines.forEach((line, idx) => {
            pdf.text(line, margin + textIndent, y + idx * lineHeight);
          });
          y += lines.length * lineHeight + 2;
        });
        y += 4;
      };

      renderHeader();

      // PAGE 1 - Cover and Executive Summary
      setFont(24, "bold");
      const title = "Application Delivery Proposal";
      const titleWidth = pdf.getTextWidth(title);
      pdf.text(title, (pageWidth - titleWidth) / 2, y);
      y += 10;
      setFont(16, "normal");
      const subtitle = "Building Your New EAP Platform";
      const subtitleWidth = pdf.getTextWidth(subtitle);
      pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, y);
      y += 14;

      setFont(11, "normal");
      const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      addParagraph(`Date: ${today}`);
      addParagraph("Reference: PAM-EAP-2026-001");

      addSectionTitle("Executive Summary");
      addParagraph("This proposal sets out the delivery of a unified EAP platform for PAM Wellness, covering discovery, validation, MVP build, organisation-wide rollout, and transition to run.");

      addSectionTitle("Platform Overview");
      addParagraph("A single operational front door for patients, clinicians, corporate users and leadership, replacing fragmented systems with one joined-up experience.");

      addSectionTitle("Key Benefits");
      addParagraph("Key outcomes expected from implementation:");
      addBullets(
        [
          "Faster access to care",
          "Reduced operational friction",
          "Improved clinical oversight",
          "Performance visibility",
          "Scalable foundation for automation",
          "Single source of truth for operations",
        ],
        6
      );

      // PAGE 2 - Delivery Approach
      newPage();
      addSectionTitle("Delivery Approach");
      addParagraph("Delivery is phased to ensure speed to value, controlled investment, and reduced delivery risk.");

      addSectionTitle("Phase 1: Discovery & Design Sprint");
      addParagraph("Purpose: remove ambiguity early and confirm operating model and technical approach.");
      addParagraph("Investment: £20,000 | Duration: 10 days", 11, "bold");
      addParagraph("Key outcomes:");
      addBullets(
        [
          "Agreed future-state journeys",
          "Defined roles, access and governance",
          "Confirmed KPIs and success measures",
          "Finalised MVP scope and roadmap",
        ],
        6
      );

      addSectionTitle("Phase 2: Proof of Value");
      addParagraph("Purpose: validate integrations and workflows in the live environment.");
      addParagraph("Investment: £30,000 | Status: required", 11, "bold");
      addParagraph("Validated components:");
      addBullets(
        [
          "RingCentral integration",
          "Portal coexistence or migration approach",
          "Secure data exchange",
          "End-to-end journey execution",
          "Buddy workflows across systems",
        ],
        6
      );

      // PAGE 3 - Implementation Phases
      newPage();
      addSectionTitle("Implementation Phases");
      addParagraph("Core platform build and organisation-wide rollout following successful validation.");

      addSectionTitle("Phase 3: Horizon 1 – MVP Build");
      addParagraph("Purpose: deliver a fully operational EAP platform with core journeys and governance.");
      addParagraph("Investment: £250,000 | Duration: 12–15 weeks", 11, "bold");
      addParagraph("Deliverables:");
      addBullets(
        [
          "Single digital care portal",
          "Live patient and clinician journeys",
          "Patient Buddy and Clinician Buddy workflows",
          "RingCentral-aligned communications",
          "Executive KPI dashboards",
          "Standardised SOPs and governance",
        ],
        6
      );

      addSectionTitle("Phase 4: Horizon 2 – Platform Scaling");
      addParagraph("Purpose: scale the platform across all required journeys & workflows with full rollout, optimisation and stabilisation.");
      addParagraph("Investment: £50,000 | Duration: 12 weeks", 11, "bold");
      addParagraph("Deliverables:");
      addBullets(
        [
          "Complete rollout of required journeys and workflows",
          "Workflow automation and optimisation",
          "Stabilisation and performance tuning",
          "Extended reporting and insight",
          "Additional integrations",
          "Quality framework implementation",
        ],
        6
      );

      addSectionTitle("Phase 5: Operate, Refine & Upgrade");
      addParagraph("Purpose: ongoing operation, support, and continuous improvement following go-live.");
      addParagraph("Investment: £10,000 per month | From go-live", 11, "bold");
      addParagraph("Service scope:");
      addBullets(
        [
          "Platform operation and support",
          "Monitoring and service assurance",
          "Performance optimisation",
          "Minor enhancements",
          "Release and stability management",
        ],
        6
      );

      // PAGE 4 - Investment Summary and Outcomes
      newPage();
      addSectionTitle("Investment Summary");
      addParagraph("Summary of investment required for delivery and first-year operation.");

      addParagraph("Total first-year investment: £400,000", 12, "bold");
      addParagraph("Breakdown:");
      addBullets(
        [
          "Phase 1: Discovery & Design Sprint – £20,000",
          "Phase 2: Proof of Value – £30,000",
          "Phase 3: Horizon 1 – MVP Build – £250,000",
          "Phase 4: Horizon 2 – Platform Scaling – £50,000",
          "Phase 5: Operate (Year 1 portion) – ~£50,000",
        ],
        6
      );

      addSectionTitle("Ongoing Operational Cost");
      addParagraph("Post year 1: £10,000 per month (assumes a 3-year agreement).", 11, "normal");

      addSectionTitle("Client Outcomes");
      addParagraph("At the end of the full delivery programme, PAM Wellness will have:");
      addBullets(
        [
          "A single, unified digital care platform across all services",
          "Fully designed and supported patient, clinician, and operational journeys",
          "Reduced administrative effort through automation and intelligent workflows",
          "Faster, more consistent and higher-quality care delivery",
          "Real-time visibility of operational performance, quality, demand, and outcomes",
          "A scalable, modular platform supporting continuous enhancement, new services, and future growth",
        ],
        6
      );

      renderFooter();
      pdf.save("PAM-Wellness-Commercial-Proposal.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was a problem generating the PDF. Please refresh and try again.");
      throw error;
    } finally {
      setIsGeneratingQuote(false);
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
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8" id="commercial-content">
        {/* Hero */}
        <header className="glass rounded-[32px] p-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="pill badge-accent">Application Delivery Proposal</p>
              <h1 className="text-display mt-4 text-4xl md:text-5xl">
                Building Your New EAP Platform
              </h1>
            </div>
            <button
              onClick={handleDownloadQuote}
              className="rounded-lg bg-[color:var(--accent)] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[color:var(--accent)]/90 flex items-center gap-1"
            >
              <span>📄</span>
              Download Quote
            </button>
          </div>
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
              <h3 className="text-display text-xl">3. Horizon 1 - MVP Build</h3>
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
              <h3 className="text-display text-xl">4. Horizon 2 – Scaling the Platform</h3>
              <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                £50,000
              </span>
            </div>
            
            <p className="text-sm text-[color:var(--ink-muted)] mb-4">
              Horizon 2 scales the platform across the organisation:
            </p>
            
            <p className="text-sm text-[color:var(--ink-muted)] mb-4 font-medium">
              All required journeys & workflows, full rollout, optimisation and stabilisation
            </p>
            
            <ul className="space-y-1 text-sm text-[color:var(--ink-muted)] pl-4 mb-4">
              <li>• Complete rollout of all required patient and clinician journeys</li>
              <li>• Full workflow automation and optimisation</li>
              <li>• Platform stabilisation and performance tuning</li>
              <li>• Extended automation across all care pathways</li>
              <li>• Deeper insight and advanced reporting capabilities</li>
              <li>• Additional system integrations for complete coverage</li>
              <li>• User experience optimisation based on feedback</li>
              <li>• Quality framework implementation and governance</li>
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
                      <td className="py-2 text-emerald-800">3. Horizon 1 - MVP Build</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£250,000</td>
                      <td className="py-2 text-right text-emerald-600">12-15 weeks</td>
                    </tr>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">4. Horizon 2 – Finalise solution</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">£50,000</td>
                      <td className="py-2 text-right text-emerald-600">12 weeks</td>
                    </tr>
                    <tr className="border-b border-emerald-100">
                      <td className="py-2 text-emerald-800">5. Operate and run cost (£10K per month)</td>
                      <td className="py-2 text-right font-semibold text-emerald-800">~£50,000</td>
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
          <h2 className="text-display text-2xl mb-4">What PAM Wellness Gets</h2>
          
          <p className="text-sm text-[color:var(--ink-muted)] mb-4">
            At the end of the full delivery programme, PAM Wellness will have:
          </p>
          
          <ul className="space-y-2 text-sm text-[color:var(--ink-muted)] pl-4">
            <li>• A single, unified digital care platform across all services</li>
            <li>• Fully designed and supported patient, clinician, and operational journeys</li>
            <li>• Reduced administrative effort through automation and intelligent workflows</li>
            <li>• Faster, more consistent and higher-quality care delivery</li>
            <li>• Real-time visibility of operational performance, quality, demand, and outcomes</li>
            <li>• A scalable, modular platform supporting continuous enhancement, new services, and future growth</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
