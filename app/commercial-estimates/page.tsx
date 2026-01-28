"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const handleDownloadQuote = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    
    try {
      // Set margins: 25mm on all sides
      const margin = 25;
      const contentWidth = 210 - (margin * 2);
      const contentHeight = 297 - (margin * 2);
      
      // Helper function to add text with proper positioning
      const addText = (text: string, x: number, y: number, fontSize = 11, fontStyle = 'normal') => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', fontStyle as any);
        pdf.text(text, margin + x, margin + y);
      };
      
      // Helper function to add footer
      const addFooter = (pageNumber: number) => {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const copyright = '© Ethenta 2026';
        const copyrightWidth = pdf.getTextWidth(copyright);
        const copyrightX = (210 - copyrightWidth) / 2;
        pdf.text(copyright, copyrightX, 285);
        
        // Add page number
        pdf.text(`${pageNumber}`, 195, 285);
      };
      
      // Helper function to add logo to page
      const addLogo = async () => {
        try {
          // Create image element
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          // Load the logo
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = '/ethenta_black_text_teal_dots.png';
          });
          
          // Add logo to PDF - top-left, max 40mm width
          pdf.addImage(img, 'PNG', margin, margin, 40, 14);
        } catch (error) {
          // Fallback to text if image fails
          addText('Ethenta', 0, 5, 12, 'bold');
        }
      };
      
      // PAGE 1 - Header and Introduction
      await addLogo();
      
      // Document title
      addText('Application Delivery Proposal', 0, 25, 24, 'bold');
      
      // Date and reference
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      addText(`Date: ${today}`, 0, 45, 11, 'normal');
      addText('Reference: PAM-EAP-2026-001', 0, 52, 11, 'normal');
      
      // Section 1: Executive Summary
      addText('Executive Summary', 0, 75, 16, 'bold');
      addText('This proposal outlines the delivery of a modern EAP platform for PAM Wellness.', 0, 85, 11, 'normal');
      
      // What this delivers
      addText('Platform Overview', 0, 105, 16, 'bold');
      addText('A modern, scalable EAP platform that becomes the single operational front door for patients, clinicians, corporate users and leadership, replacing fragmented systems with one joined-up experience.', 0, 115, 11, 'normal');
      
      // Key benefits
      addText('Key Benefits', 0, 135, 16, 'bold');
      const benefits = [
        'Faster access to care',
        'Reduced operational friction',
        'Improved clinical oversight',
        'Clear performance visibility',
        'Scalable foundation for automation',
        'Single source of truth for operations'
      ];
      
      let yPos = 145;
      benefits.forEach(benefit => {
        addText(`• ${benefit}`, 5, yPos, 11, 'normal');
        yPos += 14;
      });
      
      // Add footer to page 1
      addFooter(1);
      
      // PAGE 2 - Delivery Approach
      pdf.addPage();
      await addLogo();
      
      addText('Delivery Approach', 0, 25, 16, 'bold');
      addText('Delivery is structured into clear phases to ensure speed to value, controlled investment, and low delivery risk.', 0, 35, 11, 'normal');
      
      // Phase 1
      addText('Phase 1: Discovery & Design Sprint', 0, 55, 14, 'bold');
      addText('Purpose: Remove ambiguity early and confirm technical approach.', 0, 65, 11, 'normal');
      addText('Investment: £20,000 | Duration: 10 days', 0, 75, 11, 'normal');
      
      const phase1Outcomes = [
        'Agreed future-state journeys',
        'Defined roles and governance',
        'Confirmed KPIs and success measures',
        'Finalised MVP scope and roadmap'
      ];
      
      yPos = 85;
      addText('Key Outcomes:', 0, yPos, 11, 'bold');
      yPos += 10;
      phase1Outcomes.forEach(outcome => {
        addText(`• ${outcome}`, 5, yPos, 11, 'normal');
        yPos += 12;
      });
      
      // Phase 2
      addText('Phase 2: Proof of Value', 0, yPos + 5, 14, 'bold');
      addText('Purpose: Prove integrations and workflows in the live estate.', 0, yPos + 15, 11, 'normal');
      addText('Investment: £30,000 | Status: Required', 0, yPos + 25, 11, 'normal');
      
      const phase2Validations = [
        'RingCentral integration',
        'Portal coexistence approach',
        'Secure data exchange',
        'End-to-end journey execution',
        'Buddy workflows validation'
      ];
      
      yPos = yPos + 35;
      addText('Validated Components:', 0, yPos, 11, 'bold');
      yPos += 10;
      phase2Validations.forEach(validation => {
        addText(`• ${validation}`, 5, yPos, 11, 'normal');
        yPos += 12;
      });
      
      // Add footer to page 2
      addFooter(2);
      
      // PAGE 3 - Implementation Phases
      pdf.addPage();
      await addLogo();
      
      addText('Implementation Phases', 0, 25, 16, 'bold');
      addText('Core platform build and scaling phases following successful validation.', 0, 35, 11, 'normal');
      
      // Phase 3
      addText('Phase 3: Horizon 1 - MVP Build', 0, 55, 14, 'bold');
      addText('Purpose: Deliver fully operational EAP platform with core functionality.', 0, 65, 11, 'normal');
      addText('Investment: £250,000 | Duration: 12-15 weeks', 0, 75, 11, 'normal');
      
      const mvpFeatures = [
        'Single digital care portal',
        'Live patient and clinician journeys',
        'Patient Buddy for engagement',
        'Clinician Buddy for workload management',
        'RingCentral communications integration',
        'Executive KPI dashboards',
        'Standardised SOPs and governance'
      ];
      
      yPos = 85;
      addText('Platform Features:', 0, yPos, 11, 'bold');
      yPos += 10;
      mvpFeatures.forEach(feature => {
        addText(`• ${feature}`, 5, yPos, 11, 'normal');
        yPos += 12;
      });
      
      // Phase 4
      addText('Phase 4: Horizon 2 - Platform Scaling', 0, yPos + 5, 14, 'bold');
      addText('Purpose: Scale platform across organisation with full rollout and optimisation.', 0, yPos + 15, 11, 'normal');
      addText('Investment: £50,000 | Duration: 12 weeks', 0, yPos + 25, 11, 'normal');
      
      const scalingActivities = [
        'Complete rollout of all required journeys',
        'Full workflow automation and optimisation',
        'Platform stabilisation and performance tuning',
        'Extended automation across care pathways',
        'Advanced reporting and insights',
        'Additional system integrations',
        'User experience optimisation',
        'Quality framework implementation'
      ];
      
      yPos = yPos + 35;
      addText('Scaling Activities:', 0, yPos, 11, 'bold');
      yPos += 10;
      scalingActivities.forEach(activity => {
        addText(`• ${activity}`, 5, yPos, 11, 'normal');
        yPos += 12;
      });
      
      // Phase 5
      addText('Phase 5: Operations & Enhancement', 0, yPos + 5, 14, 'bold');
      addText('Purpose: Ongoing platform operation, support and continuous improvement.', 0, yPos + 15, 11, 'normal');
      addText('Investment: £10,000 per month | Start: From go-live', 0, yPos + 25, 11, 'normal');
      
      const operationsServices = [
        'Platform operation and support',
        'Monitoring and service assurance',
        'Performance optimisation',
        'Minor enhancements and updates',
        'Stability and release management'
      ];
      
      yPos = yPos + 35;
      addText('Operational Services:', 0, yPos, 11, 'bold');
      yPos += 10;
      operationsServices.forEach(service => {
        addText(`• ${service}`, 5, yPos, 11, 'normal');
        yPos += 12;
      });
      
      // Add footer to page 3
      addFooter(3);
      
      // PAGE 4 - Investment Summary
      pdf.addPage();
      await addLogo();
      
      addText('Investment Summary', 0, 25, 16, 'bold');
      addText('Total investment required for full platform delivery and first year operations.', 0, 35, 11, 'normal');
      
      // Investment total
      addText('Total First-Year Investment: £400,000', 0, 55, 14, 'bold');
      
      // Investment breakdown
      addText('Investment Breakdown', 0, 75, 14, 'bold');
      
      const investments = [
        ['Phase 1: Discovery & Design Sprint', '£20,000', '2 weeks'],
        ['Phase 2: Proof of Value', '£30,000', '2 weeks'],
        ['Phase 3: Horizon 1 - MVP Build', '£250,000', '12-15 weeks'],
        ['Phase 4: Horizon 2 - Platform Scaling', '£50,000', '12 weeks'],
        ['Phase 5: Operations (first year)', '~£50,000', '52 weeks balance']
      ];
      
      yPos = 85;
      investments.forEach(investment => {
        addText(`${investment[0]}`, 0, yPos, 11, 'normal');
        addText(`${investment[1]}`, 120, yPos, 11, 'bold');
        addText(`${investment[2]}`, 150, yPos, 11, 'normal');
        yPos += 12;
      });
      
      // Ongoing costs
      addText('Ongoing Operational Costs', 0, yPos + 10, 14, 'bold');
      addText('Post Year 1: £10,000 per month', 0, yPos + 20, 11, 'bold');
      addText('Assumes 3-year service agreement.', 0, yPos + 30, 11, 'normal');
      
      // Client outcomes
      addText('Client Outcomes', 0, yPos + 50, 16, 'bold');
      addText('At the end of the full delivery programme, PAM Wellness will have:', 0, yPos + 60, 11, 'normal');
      
      const outcomes = [
        'A single, unified digital care platform across all services',
        'Fully designed and supported patient, clinician, and operational journeys',
        'Reduced administrative effort through automation and intelligent workflows',
        'Faster, more consistent and higher-quality care delivery',
        'Real-time visibility of operational performance, quality, demand, and outcomes',
        'A scalable, modular platform supporting continuous enhancement, new services, and future growth'
      ];
      
      yPos = yPos + 70;
      outcomes.forEach(outcome => {
        addText(`• ${outcome}`, 5, yPos, 11, 'normal');
        yPos += 14;
      });
      
      // Add footer to page 4
      addFooter(4);
      
      pdf.save("PAM-Wellness-Commercial-Proposal.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
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
