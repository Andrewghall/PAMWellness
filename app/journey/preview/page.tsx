"use client";

import Link from "next/link";

type EmotionState = "high" | "moderate" | "stable";

type JourneyStage = {
  id: string;
  order: number;
  patient: {
    stageTitle: string;
    mindset: string;
    context: string;
  };
  pam: {
    stageTitle: string;
    objective: string;
  };
  aiInvolvement: {
    aiPercent: number;
    humanPercent: number;
  };
  emotionalState: EmotionState;
  governanceLine: string;
  ohioBlockers: string[];
  aiBehaviours: string[];
};

const stages: JourneyStage[] = [
  {
    id: "pre-care",
    order: 1,
    patient: { stageTitle: "Pre-care Portal", mindset: "Preparing for care and seeking clarity.", context: "" },
    pam: { stageTitle: "Prepare & Guide", objective: "Reduce uncertainty and ensure readiness." },
    aiInvolvement: { aiPercent: 80, humanPercent: 20 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Repeated education", "Unstructured FAQs"],
    aiBehaviours: ["Summarise eligibility criteria", "Provide personalised guidance scripts"],
  },
  {
    id: "access-onboarding",
    order: 2,
    patient: { stageTitle: "Access and Onboarding", mindset: "Confirming eligibility and getting registered.", context: "" },
    pam: { stageTitle: "Verify & Register", objective: "Confirm eligibility and capture baseline data." },
    aiInvolvement: { aiPercent: 70, humanPercent: 30 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Manual eligibility checks", "Duplicate data entry"],
    aiBehaviours: ["Auto-verify eligibility", "Pre-fill registration fields"],
  },
  {
    id: "initial-assessment",
    order: 3,
    patient: { stageTitle: "Initial Assessment", mindset: "Sharing details and hoping for quick understanding.", context: "" },
    pam: { stageTitle: "Assess & Stratify", objective: "Capture needs to determine pathway." },
    aiInvolvement: { aiPercent: 60, humanPercent: 40 },
    emotionalState: "high",
    governanceLine: "AI supports – humans decide.",
    ohioBlockers: ["Incomplete referral data", "Missing risk indicators"],
    aiBehaviours: ["Extract clinical indicators", "Suggest risk stratification"],
  },
  {
    id: "triage-routing",
    order: 4,
    patient: { stageTitle: "Triage and Routing", mindset: "Waiting to be matched with the right support.", context: "" },
    pam: { stageTitle: "Match & Route", objective: "Optimal matching to pathway and clinician." },
    aiInvolvement: { aiPercent: 75, humanPercent: 25 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Manual triage delays", "Suboptimal matching"],
    aiBehaviours: ["Recommend pathway match", "Flag urgent cases"],
  },
  {
    id: "care-delivery",
    order: 5,
    patient: { stageTitle: "Care Delivery", mindset: "Expecting high-quality sessions.", context: "" },
    pam: { stageTitle: "Deliver & Support", objective: "Clinical interventions with quality." },
    aiInvolvement: { aiPercent: 30, humanPercent: 70 },
    emotionalState: "stable",
    governanceLine: "Human-led – AI assists.",
    ohioBlockers: ["Session prep overhead", "Inconsistent documentation"],
    aiBehaviours: ["Prepare session briefs", "Post-session summaries"],
  },
  {
    id: "ongoing-management",
    order: 6,
    patient: { stageTitle: "Ongoing Case Management", mindset: "Seeking continuity and progress tracking.", context: "" },
    pam: { stageTitle: "Monitor & Adjust", objective: "Maintain engagement and adjust care." },
    aiInvolvement: { aiPercent: 55, humanPercent: 45 },
    emotionalState: "stable",
    governanceLine: "AI supports – humans decide.",
    ohioBlockers: ["Manual progress tracking", "Missed follow-ups"],
    aiBehaviours: ["Track progress metrics", "Proactive reminders"],
  },
  {
    id: "outcomes-closure",
    order: 7,
    patient: { stageTitle: "Outcomes and Closure", mindset: "Looking for clarity on progress.", context: "" },
    pam: { stageTitle: "Record & Close", objective: "Document outcomes and ensure closure." },
    aiInvolvement: { aiPercent: 65, humanPercent: 35 },
    emotionalState: "stable",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Incomplete outcome recording", "Manual discharge"],
    aiBehaviours: ["Generate outcome summary", "Recommend follow-up"],
  },
  {
    id: "reporting-governance",
    order: 8,
    patient: { stageTitle: "Reporting and Governance", mindset: "Trusting data is handled properly.", context: "" },
    pam: { stageTitle: "Report & Govern", objective: "Transparency and compliance." },
    aiInvolvement: { aiPercent: 85, humanPercent: 15 },
    emotionalState: "stable",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Manual report generation", "Delayed compliance"],
    aiBehaviours: ["Auto-generate reports", "Track compliance metrics"],
  },
  {
    id: "follow-on-reentry",
    order: 9,
    patient: { stageTitle: "Follow-on and Re-entry", mindset: "Appreciating continuity.", context: "" },
    pam: { stageTitle: "Continue & Reconnect", objective: "Preserve continuity for re-engagement." },
    aiInvolvement: { aiPercent: 70, humanPercent: 30 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Loss of case history", "Restart friction"],
    aiBehaviours: ["Retrieve prior context", "Pre-populate returning data"],
  },
];

const emotionColors: Record<EmotionState, string> = {
  high: "bg-red-500",
  moderate: "bg-amber-500",
  stable: "bg-emerald-500",
};

const wellbeingOutcomes = [
  "Reduced anxiety through clarity",
  "Faster time to appropriate support",
  "Fewer missed escalations",
  "Improved continuity of care",
  "Higher trust in PAM services",
  "Better patient experience scores",
];

const patientBuddyActions: Record<string, string[]> = {
  "pre-care": ["Answers eligibility questions", "Guides through pre-care forms", "Sends preparation reminders"],
  "access-onboarding": ["Assists with registration", "Explains next steps", "Confirms appointments"],
  "initial-assessment": ["Collects symptom information", "Prepares summary for clinician", "Reduces intake time"],
  "triage-routing": ["Explains wait times", "Updates on matching progress", "Answers pathway questions"],
  "care-delivery": ["Sends session reminders", "Provides between-session support", "Shares resources"],
  "ongoing-management": ["Tracks progress check-ins", "Sends wellbeing prompts", "Flags concerns early"],
  "outcomes-closure": ["Gathers feedback", "Explains outcomes", "Provides closure summary"],
  "reporting-governance": ["Shares relevant reports", "Explains data usage", "Maintains transparency"],
  "follow-on-reentry": ["Welcomes back", "Retrieves history", "Streamlines re-entry"],
};

const clinicianBuddyActions: Record<string, string[]> = {
  "pre-care": ["Surfaces patient context", "Flags pre-care completeness", "Prepares intake summary"],
  "access-onboarding": ["Validates eligibility data", "Highlights missing info", "Pre-populates records"],
  "initial-assessment": ["Extracts key indicators", "Suggests risk level", "Drafts assessment notes"],
  "triage-routing": ["Recommends pathway match", "Shows clinician availability", "Flags urgent cases"],
  "care-delivery": ["Prepares session briefs", "Suggests interventions", "Auto-generates notes"],
  "ongoing-management": ["Tracks patient progress", "Alerts to risks", "Suggests adjustments"],
  "outcomes-closure": ["Drafts outcome summary", "Recommends follow-up", "Completes documentation"],
  "reporting-governance": ["Generates compliance reports", "Tracks KPIs", "Flags audit items"],
  "follow-on-reentry": ["Retrieves case history", "Surfaces prior context", "Suggests continuity plan"],
};

export default function JourneyPreviewPage() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-3xl">PAM Wellness – Stages of Patient Wellbeing Support</h1>
            <div className="mt-3 flex items-center gap-6 text-xs text-black/60">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                High emotion / high clinical risk
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                Moderate emotion
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                Positive / stable
              </span>
            </div>
          </div>
          <Link
            href="/journey"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 transition hover:border-black/30"
          >
            ← Back to Editor
          </Link>
        </div>

        {/* Section A: Patient Experience Journey */}
        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            A. Patient Experience Journey
          </p>
          <div className="mt-4 grid grid-cols-9 gap-2 lg:gap-4">
            {stages.map((stage) => (
              <Link
                key={stage.id}
                href={`/journey#${stage.id}`}
                className="group relative rounded-xl border border-black/10 bg-white/80 p-3 transition hover:border-black/20 hover:shadow-md"
              >
                <span
                  className={`absolute right-2 top-2 h-2.5 w-2.5 rounded-full ${emotionColors[stage.emotionalState]}`}
                />
                <p className="pr-4 text-xs font-semibold text-black hidden lg:block">{stage.patient.stageTitle}</p>
                <p className="mt-2 text-[10px] leading-tight text-black/60 hidden lg:block">{stage.patient.mindset}</p>
                {/* Mobile display */}
                <div className="lg:hidden">
                  <p className="text-xs font-semibold text-black">{stage.patient.stageTitle.length > 12 ? stage.patient.stageTitle.substring(0, 12) + "..." : stage.patient.stageTitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Patient Buddy Journey */}
        <section className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            Patient Buddy – AI Assistant for Patients
          </p>
          <div className="mt-4 grid grid-cols-9 gap-2 lg:gap-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="rounded-xl border border-purple-200 bg-white p-3"
              >
                <p className="text-xs font-semibold text-purple-700 hidden lg:block">🤖 Patient Buddy</p>
                <p className="text-xs font-semibold text-purple-700 lg:hidden">🤖</p>
                <ul className="mt-2 space-y-1 text-[9px] leading-tight text-black/60 hidden lg:block">
                  {patientBuddyActions[stage.id]?.slice(0, 2).map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section B: PAM Experience */}
        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            B. PAM Experience – Blending Agentic AI and Human Care
          </p>
          <div className="mt-4 grid grid-cols-9 gap-2 lg:gap-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/5 p-3"
              >
                <p className="text-xs font-semibold text-[color:var(--accent)] hidden lg:block">{stage.pam.stageTitle}</p>
                <p className="text-xs font-semibold text-[color:var(--accent)] lg:hidden">{stage.pam.stageTitle.length > 10 ? stage.pam.stageTitle.substring(0, 10) + "..." : stage.pam.stageTitle}</p>
                <p className="mt-2 text-[10px] leading-tight text-black/60 hidden lg:block">{stage.pam.objective}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinician Buddy Journey */}
        <section className="rounded-2xl border border-teal-200 bg-teal-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
            Clinician Buddy – AI Assistant for Clinicians
          </p>
          <div className="mt-4 grid grid-cols-9 gap-2 lg:gap-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="rounded-xl border border-teal-200 bg-white p-3"
              >
                <p className="text-xs font-semibold text-teal-700 hidden lg:block">🩺 Clinician Buddy</p>
                <p className="text-xs font-semibold text-teal-700 lg:hidden">🩺</p>
                <ul className="mt-2 space-y-1 text-[9px] leading-tight text-black/60 hidden lg:block">
                  {clinicianBuddyActions[stage.id]?.slice(0, 2).map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section C: What Agentic AI Does */}
        <section className="rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
            C. What Agentic AI Does at Each Stage
          </p>
          <div className="mt-4 grid grid-cols-9 gap-2 lg:gap-4">
            {stages.map((stage) => (
              <div key={stage.id} className="rounded-xl border border-black/10 bg-slate-50 p-3">
                <div className="flex items-center justify-between text-[10px] text-black/60">
                  <span className="hidden lg:block">AI {stage.aiInvolvement.aiPercent}%</span>
                  <span className="hidden lg:block">Human {stage.aiInvolvement.humanPercent}%</span>
                  <span className="lg:hidden">{stage.aiInvolvement.aiPercent}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-amber-400"
                    style={{ width: `${stage.aiInvolvement.aiPercent}%` }}
                  />
                </div>
                <ul className="mt-2 space-y-1 text-[9px] leading-tight text-black/60 hidden lg:block">
                  {stage.aiBehaviours.slice(0, 2).map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <p className="mt-2 border-t border-black/10 pt-2 text-[9px] italic text-black/50 hidden lg:block">
                  {stage.governanceLine}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Panels */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* OHIO Blockers */}
          <section className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              OHIO Blockers Removed Across the Journey
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {stages.map((stage) => (
                <div key={stage.id} className="rounded-xl border border-black/10 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-black">{stage.patient.stageTitle}</p>
                  <p className="mt-1 text-[10px] text-black/60">{stage.ohioBlockers.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Patient Wellbeing Outcomes */}
          <section className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Patient Wellbeing Outcomes
            </p>
            <ul className="mt-4 space-y-2">
              {wellbeingOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-center gap-2 text-sm text-black/70">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                    ✓
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
