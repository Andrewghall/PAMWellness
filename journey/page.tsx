"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type EmotionState = "high" | "moderate" | "stable";

type PersonaParticipation = {
  active: boolean;
  notes: string;
};

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
  personaParticipation: {
    Client: PersonaParticipation;
    Patient: PersonaParticipation;
    Clinicians: PersonaParticipation;
    AgentClinicians: PersonaParticipation;
    Regulator: PersonaParticipation;
    PAMExecutives: PersonaParticipation;
  };
};

type JourneyModel = {
  workshopId: string;
  version: string;
  updatedAt: string;
  stages: JourneyStage[];
};

const initialStages: JourneyStage[] = [
  {
    id: "pre-care",
    order: 1,
    patient: {
      stageTitle: "Pre-care Portal",
      mindset: "Preparing for care and seeking clarity.",
      context: "Patient logs in, completes pre-care information, and initiates support before live care begins.",
    },
    pam: {
      stageTitle: "Prepare & Guide",
      objective: "Reduce uncertainty and ensure readiness for assessment and triage.",
    },
    aiInvolvement: { aiPercent: 80, humanPercent: 20 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Repeated education", "Unstructured FAQs"],
    aiBehaviours: ["Summarise eligibility criteria", "Provide personalised guidance scripts", "Pre-populate intake forms"],
    personaParticipation: {
      Client: { active: false, notes: "" },
      Patient: { active: true, notes: "Portal entry and information capture." },
      Clinicians: { active: true, notes: "Receives pre-care context." },
      AgentClinicians: { active: true, notes: "Coordinates intake readiness." },
      Regulator: { active: true, notes: "Consent and data handling requirements." },
      PAMExecutives: { active: false, notes: "" },
    },
  },
  {
    id: "access-onboarding",
    order: 2,
    patient: {
      stageTitle: "Access and Onboarding",
      mindset: "Confirming eligibility and getting registered.",
      context: "Eligibility, consent, and registration are confirmed, and baseline information is captured.",
    },
    pam: {
      stageTitle: "Verify & Register",
      objective: "Confirm eligibility and capture complete baseline data.",
    },
    aiInvolvement: { aiPercent: 70, humanPercent: 30 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Manual eligibility checks", "Duplicate data entry"],
    aiBehaviours: ["Auto-verify eligibility", "Pre-fill registration fields", "Flag incomplete data"],
    personaParticipation: {
      Client: { active: true, notes: "Confirms employee eligibility." },
      Patient: { active: true, notes: "Completes registration." },
      Clinicians: { active: false, notes: "" },
      AgentClinicians: { active: true, notes: "Validates intake completeness." },
      Regulator: { active: true, notes: "Consent tracking." },
      PAMExecutives: { active: false, notes: "" },
    },
  },
  {
    id: "initial-assessment",
    order: 3,
    patient: {
      stageTitle: "Initial Assessment",
      mindset: "Sharing details and hoping for quick understanding.",
      context: "Needs are assessed clinically and operationally to determine the right support pathway.",
    },
    pam: {
      stageTitle: "Assess & Stratify",
      objective: "Capture clinical and operational needs to determine pathway.",
    },
    aiInvolvement: { aiPercent: 60, humanPercent: 40 },
    emotionalState: "high",
    governanceLine: "AI supports – humans decide.",
    ohioBlockers: ["Incomplete referral data", "Missing risk indicators"],
    aiBehaviours: ["Extract key clinical indicators", "Suggest risk stratification", "Generate assessment summary"],
    personaParticipation: {
      Client: { active: false, notes: "" },
      Patient: { active: true, notes: "Provides clinical history." },
      Clinicians: { active: true, notes: "Reviews and validates assessment." },
      AgentClinicians: { active: true, notes: "Prepares case summary." },
      Regulator: { active: true, notes: "Clinical documentation standards." },
      PAMExecutives: { active: false, notes: "" },
    },
  },
  {
    id: "triage-routing",
    order: 4,
    patient: {
      stageTitle: "Triage and Routing",
      mindset: "Waiting to be matched with the right support.",
      context: "Case is matched to pathway, clinician type, urgency, and service model.",
    },
    pam: {
      stageTitle: "Match & Route",
      objective: "Ensure optimal matching to pathway and clinician.",
    },
    aiInvolvement: { aiPercent: 75, humanPercent: 25 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Manual triage delays", "Suboptimal clinician matching"],
    aiBehaviours: ["Recommend pathway match", "Suggest clinician based on availability", "Flag urgent cases"],
    personaParticipation: {
      Client: { active: false, notes: "" },
      Patient: { active: true, notes: "Awaits routing confirmation." },
      Clinicians: { active: true, notes: "Receives assigned cases." },
      AgentClinicians: { active: true, notes: "Executes routing logic." },
      Regulator: { active: false, notes: "" },
      PAMExecutives: { active: true, notes: "Monitors capacity and routing efficiency." },
    },
  },
  {
    id: "care-delivery",
    order: 5,
    patient: {
      stageTitle: "Care Delivery",
      mindset: "Expecting high-quality sessions and consistent support.",
      context: "Sessions and interventions are delivered with high clinical quality.",
    },
    pam: {
      stageTitle: "Deliver & Support",
      objective: "Deliver clinical interventions with quality and consistency.",
    },
    aiInvolvement: { aiPercent: 30, humanPercent: 70 },
    emotionalState: "stable",
    governanceLine: "Human-led – AI assists.",
    ohioBlockers: ["Session preparation overhead", "Inconsistent documentation"],
    aiBehaviours: ["Prepare session briefs", "Real-time note assistance", "Post-session summary generation"],
    personaParticipation: {
      Client: { active: false, notes: "" },
      Patient: { active: true, notes: "Receives care." },
      Clinicians: { active: true, notes: "Leads clinical sessions." },
      AgentClinicians: { active: true, notes: "Supports documentation." },
      Regulator: { active: true, notes: "Clinical quality standards." },
      PAMExecutives: { active: false, notes: "" },
    },
  },
  {
    id: "ongoing-management",
    order: 6,
    patient: {
      stageTitle: "Ongoing Case Management",
      mindset: "Seeking continuity and progress tracking.",
      context: "Coordination, continuity, adjustments, and progress tracking across the active case.",
    },
    pam: {
      stageTitle: "Monitor & Adjust",
      objective: "Maintain engagement and adjust care as needed.",
    },
    aiInvolvement: { aiPercent: 55, humanPercent: 45 },
    emotionalState: "stable",
    governanceLine: "AI supports – humans decide.",
    ohioBlockers: ["Manual progress tracking", "Missed follow-ups"],
    aiBehaviours: ["Track progress metrics", "Proactive check-in reminders", "Flag cases requiring attention"],
    personaParticipation: {
      Client: { active: true, notes: "Receives progress updates." },
      Patient: { active: true, notes: "Engages in ongoing care." },
      Clinicians: { active: true, notes: "Reviews and adjusts care plans." },
      AgentClinicians: { active: true, notes: "Coordinates follow-ups." },
      Regulator: { active: false, notes: "" },
      PAMExecutives: { active: true, notes: "Reviews case outcomes." },
    },
  },
  {
    id: "outcomes-closure",
    order: 7,
    patient: {
      stageTitle: "Outcomes and Closure",
      mindset: "Looking for clarity on progress and next steps.",
      context: "Outcomes are recorded and the case is closed with appropriate follow-up actions.",
    },
    pam: {
      stageTitle: "Record & Close",
      objective: "Document outcomes and ensure appropriate closure.",
    },
    aiInvolvement: { aiPercent: 65, humanPercent: 35 },
    emotionalState: "stable",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Incomplete outcome recording", "Manual discharge processes"],
    aiBehaviours: ["Generate outcome summary", "Recommend follow-up actions", "Prepare closure documentation"],
    personaParticipation: {
      Client: { active: true, notes: "Receives outcome report." },
      Patient: { active: true, notes: "Reviews outcomes." },
      Clinicians: { active: true, notes: "Approves closure." },
      AgentClinicians: { active: true, notes: "Finalises documentation." },
      Regulator: { active: true, notes: "Outcome reporting requirements." },
      PAMExecutives: { active: true, notes: "Reviews aggregate outcomes." },
    },
  },
  {
    id: "reporting-governance",
    order: 8,
    patient: {
      stageTitle: "Reporting and Governance",
      mindset: "Trusting that data is handled properly.",
      context: "Employer updates, operational insight, and compliance reporting occur throughout.",
    },
    pam: {
      stageTitle: "Report & Govern",
      objective: "Provide transparency and ensure compliance.",
    },
    aiInvolvement: { aiPercent: 85, humanPercent: 15 },
    emotionalState: "stable",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Manual report generation", "Delayed compliance updates"],
    aiBehaviours: ["Auto-generate employer reports", "Track compliance metrics", "Flag governance issues"],
    personaParticipation: {
      Client: { active: true, notes: "Receives aggregated reports." },
      Patient: { active: false, notes: "" },
      Clinicians: { active: false, notes: "" },
      AgentClinicians: { active: true, notes: "Generates reports." },
      Regulator: { active: true, notes: "Compliance oversight." },
      PAMExecutives: { active: true, notes: "Reviews governance dashboards." },
    },
  },
  {
    id: "follow-on-reentry",
    order: 9,
    patient: {
      stageTitle: "Follow-on and Re-entry",
      mindset: "Appreciating continuity rather than starting over.",
      context: "Support continues where needed, with continuity preserved rather than restarting.",
    },
    pam: {
      stageTitle: "Continue & Reconnect",
      objective: "Preserve continuity and enable seamless re-engagement.",
    },
    aiInvolvement: { aiPercent: 70, humanPercent: 30 },
    emotionalState: "moderate",
    governanceLine: "AI leads – humans approve.",
    ohioBlockers: ["Loss of case history", "Restart friction"],
    aiBehaviours: ["Retrieve prior case context", "Recommend re-entry pathway", "Pre-populate returning patient data"],
    personaParticipation: {
      Client: { active: true, notes: "May initiate re-referral." },
      Patient: { active: true, notes: "Returns for continued support." },
      Clinicians: { active: true, notes: "Reviews prior history." },
      AgentClinicians: { active: true, notes: "Facilitates re-entry." },
      Regulator: { active: false, notes: "" },
      PAMExecutives: { active: false, notes: "" },
    },
  },
];

const emotionOptions: { id: EmotionState; label: string; color: string }[] = [
  { id: "high", label: "High emotion / high clinical risk", color: "bg-red-500" },
  { id: "moderate", label: "Moderate emotion", color: "bg-amber-500" },
  { id: "stable", label: "Positive / stable", color: "bg-emerald-500" },
];

const WORKSHOP_ID = "cmkpawx0f0001ky04lpv3658i";

export default function JourneyBuilderPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stages, setStages] = useState<JourneyStage[]>(initialStages);
  const [selectedStageId, setSelectedStageId] = useState<string>(initialStages[0]?.id ?? "");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddStage, setShowAddStage] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const selectedStage = stages.find((s) => s.id === selectedStageId) ?? null;

  const handleExportJSON = () => {
    const model: JourneyModel = {
      workshopId: WORKSHOP_ID,
      version: "1.0",
      updatedAt: new Date().toISOString(),
      stages,
    };
    const payload = JSON.stringify(model, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pam-journey-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as JourneyModel;
        if (!data.stages || !Array.isArray(data.stages)) {
          setImportError("Invalid JSON: missing stages array");
          return;
        }
        setStages(data.stages);
        setSelectedStageId(data.stages[0]?.id ?? "");
        setImportError(null);
      } catch {
        setImportError("Invalid JSON format");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleReset = () => {
    setStages(initialStages);
    setSelectedStageId(initialStages[0]?.id ?? "");
    setShowResetConfirm(false);
  };

  const updatePatient = (id: string, updates: Partial<JourneyStage["patient"]>) => {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === id ? { ...stage, patient: { ...stage.patient, ...updates } } : stage
      )
    );
  };

  const updatePam = (id: string, updates: Partial<JourneyStage["pam"]>) => {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === id ? { ...stage, pam: { ...stage.pam, ...updates } } : stage
      )
    );
  };

  const updateAiInvolvement = (id: string, aiPercent: number) => {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === id
          ? { ...stage, aiInvolvement: { aiPercent, humanPercent: 100 - aiPercent } }
          : stage
      )
    );
  };

  const updateEmotionalState = (id: string, emotionalState: EmotionState) => {
    setStages((prev) =>
      prev.map((stage) => (stage.id === id ? { ...stage, emotionalState } : stage))
    );
  };

  const updateOhioBlockers = (id: string, blockers: string[]) => {
    setStages((prev) =>
      prev.map((stage) => (stage.id === id ? { ...stage, ohioBlockers: blockers } : stage))
    );
  };

  const updateAiBehaviours = (id: string, behaviours: string[]) => {
    setStages((prev) =>
      prev.map((stage) => (stage.id === id ? { ...stage, aiBehaviours: behaviours } : stage))
    );
  };

  const updateGovernanceLine = (id: string, governanceLine: string) => {
    setStages((prev) =>
      prev.map((stage) => (stage.id === id ? { ...stage, governanceLine } : stage))
    );
  };

  const deleteStage = () => {
    const idx = stages.findIndex((s) => s.id === selectedStageId);
    const newStages = stages.filter((s) => s.id !== selectedStageId);
    setStages(newStages);
    const newSelected = newStages[Math.min(idx, newStages.length - 1)]?.id ?? "";
    setSelectedStageId(newSelected);
    setShowDeleteConfirm(false);
  };

  const moveStage = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    setStages((prev) => {
      const fromIndex = prev.findIndex((s) => s.id === fromId);
      const toIndex = prev.findIndex((s) => s.id === toId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next.map((s, i) => ({ ...s, order: i + 1 }));
    });
  };

  const addStage = (title: string, pamTitle: string) => {
    const id = `stage-${Date.now()}`;
    const newStage: JourneyStage = {
      id,
      order: stages.length + 1,
      patient: {
        stageTitle: title,
        mindset: "Define the patient mindset for this stage.",
        context: "Describe the patient context and situation.",
      },
      pam: {
        stageTitle: pamTitle,
        objective: "Define the PAM objective for this stage.",
      },
      aiInvolvement: { aiPercent: 50, humanPercent: 50 },
      emotionalState: "moderate",
      governanceLine: "AI supports – humans decide.",
      ohioBlockers: [],
      aiBehaviours: [],
      personaParticipation: {
        Client: { active: false, notes: "" },
        Patient: { active: true, notes: "" },
        Clinicians: { active: true, notes: "" },
        AgentClinicians: { active: true, notes: "" },
        Regulator: { active: false, notes: "" },
        PAMExecutives: { active: false, notes: "" },
      },
    };
    setStages((prev) => [...prev, newStage]);
    setSelectedStageId(id);
    setShowAddStage(false);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Top Bar: Export and Reset */}
        <section className="card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-display text-xl">Export & reset</h2>
              <p className="text-sm text-[color:var(--ink-muted)]">
                Export JSON, import JSON, or reset to default values. PNG snapshot via Preview.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href="/journey/preview"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-black/70 transition hover:border-black/30"
              >
                Preview PNG
              </Link>
              <button
                onClick={handleExportJSON}
                className="rounded-full border border-black/10 bg-black px-4 py-2 text-white"
              >
                Export JSON
              </button>
              <label className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 transition hover:border-black/30">
                Import JSON
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleImportJSON}
                />
              </label>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-black/70 transition hover:border-black/30"
              >
                Reset model
              </button>
            </div>
          </div>
          {importError && (
            <div className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
              {importError}
            </div>
          )}
        </section>

        {/* Main Layout: Two Columns */}
        <div className="grid gap-6 lg:grid-cols-[7fr_3fr]">
          {/* Left Column: Journey Rows */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-display text-2xl">Journey stages</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {emotionOptions.map((opt) => (
                  <span key={opt.id} className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1">
                    <span className={`h-2 w-2 rounded-full ${opt.color}`} />
                    {opt.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  id={stage.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={() => setDragOverId(stage.id)}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={() => {
                    if (draggingId) {
                      moveStage(draggingId, stage.id);
                      setDraggingId(null);
                    }
                    setDragOverId(null);
                  }}
                  className={`relative flex rounded-2xl border transition ${
                    selectedStageId === stage.id
                      ? "border-[color:var(--accent)] bg-white shadow-lg"
                      : "border-black/10 bg-white/80 hover:border-black/20"
                  } ${dragOverId === stage.id && draggingId !== stage.id ? "ring-2 ring-[color:var(--accent)]" : ""}`}
                >
                  {/* Drag Handle */}
                  <div
                    draggable
                    onDragStart={() => setDraggingId(stage.id)}
                    onDragEnd={() => {
                      setDraggingId(null);
                      setDragOverId(null);
                    }}
                    className="flex w-8 flex-shrink-0 cursor-grab items-center justify-center rounded-l-2xl border-r border-black/5 bg-slate-50 text-black/30 hover:bg-slate-100 hover:text-black/50 active:cursor-grabbing"
                  >
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                      <circle cx="2" cy="2" r="1.5" />
                      <circle cx="8" cy="2" r="1.5" />
                      <circle cx="2" cy="6" r="1.5" />
                      <circle cx="8" cy="6" r="1.5" />
                      <circle cx="2" cy="10" r="1.5" />
                      <circle cx="8" cy="10" r="1.5" />
                      <circle cx="2" cy="14" r="1.5" />
                      <circle cx="8" cy="14" r="1.5" />
                    </svg>
                  </div>

                  {/* Card Content */}
                  <button
                    onClick={() => setSelectedStageId(stage.id)}
                    className="flex-1 p-5 text-left"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      {/* Patient Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            PATIENT
                          </span>
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              emotionOptions.find((e) => e.id === stage.emotionalState)?.color
                            }`}
                          />
                        </div>
                        <h3 className="mt-2 text-lg font-semibold text-black">
                          {stage.patient.stageTitle}
                        </h3>
                        <p className="mt-1 text-sm text-[color:var(--ink-muted)]">
                          {stage.patient.mindset}
                        </p>
                      </div>

                      {/* PAM Pairing */}
                      <div className="md:text-right">
                        <span className="rounded bg-[color:var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[color:var(--accent)]">
                          PAM
                        </span>
                        <p className="mt-2 text-sm font-medium text-black">{stage.pam.stageTitle}</p>
                      </div>
                    </div>

                    {/* AI Slider */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-black/60">
                        <span>AI {stage.aiInvolvement.aiPercent}%</span>
                        <span>Human {stage.aiInvolvement.humanPercent}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-amber-400"
                          style={{ width: `${stage.aiInvolvement.aiPercent}%` }}
                        />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Stage Button */}
            <button
              onClick={() => setShowAddStage(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/20 bg-white/50 py-4 text-sm font-medium text-black/50 transition hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/5 hover:text-[color:var(--accent)]"
            >
              <span className="text-lg">+</span>
              Add new stage
            </button>
          </div>

          {/* Right Column: Stage Detail Panel */}
          <aside className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Stage detail
            </p>

            {selectedStage ? (
              <div className="mt-4 space-y-4 text-sm">
                {/* Patient Stage */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    Patient stage
                  </label>
                  <input
                    value={selectedStage.patient.stageTitle}
                    onChange={(e) => updatePatient(selectedStage.id, { stageTitle: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* Patient Mindset */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    Patient mindset
                  </label>
                  <input
                    value={selectedStage.patient.mindset}
                    onChange={(e) => updatePatient(selectedStage.id, { mindset: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* Patient Context */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    Patient context
                  </label>
                  <textarea
                    value={selectedStage.patient.context}
                    onChange={(e) => updatePatient(selectedStage.id, { context: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                    rows={2}
                  />
                </div>

                {/* PAM Stage */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    PAM stage
                  </label>
                  <input
                    value={selectedStage.pam.stageTitle}
                    onChange={(e) => updatePam(selectedStage.id, { stageTitle: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* PAM Objective */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    PAM objective
                  </label>
                  <textarea
                    value={selectedStage.pam.objective}
                    onChange={(e) => updatePam(selectedStage.id, { objective: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                    rows={2}
                  />
                </div>

                {/* AI Involvement Slider */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    AI involvement
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={selectedStage.aiInvolvement.aiPercent}
                    onChange={(e) => updateAiInvolvement(selectedStage.id, Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-black/60">
                    <span>AI {selectedStage.aiInvolvement.aiPercent}%</span>
                    <span>Human {selectedStage.aiInvolvement.humanPercent}%</span>
                  </div>
                </div>

                {/* Emotional State */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    Emotional state
                  </label>
                  <div className="mt-2 grid gap-2">
                    {emotionOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateEmotionalState(selectedStage.id, opt.id)}
                        className={`flex items-center justify-between rounded-full border px-3 py-2 text-xs ${
                          selectedStage.emotionalState === opt.id
                            ? "border-black/40 bg-white"
                            : "border-black/10 bg-white/70"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`h-2 w-2 rounded-full ${opt.color}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* OHIO Blockers */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    OHIO blockers (comma separated)
                  </label>
                  <input
                    value={selectedStage.ohioBlockers.join(", ")}
                    onChange={(e) =>
                      updateOhioBlockers(
                        selectedStage.id,
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* AI Behaviours */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    AI behaviours (comma separated)
                  </label>
                  <input
                    value={selectedStage.aiBehaviours.join(", ")}
                    onChange={(e) =>
                      updateAiBehaviours(
                        selectedStage.id,
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* Governance Line */}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    Governing statement
                  </label>
                  <input
                    value={selectedStage.governanceLine}
                    onChange={(e) => updateGovernanceLine(selectedStage.id, e.target.value)}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>

                {/* Delete Stage */}
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="mt-2 w-full rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Delete stage
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-[color:var(--ink-muted)]">Select a stage to view detail.</p>
            )}
          </aside>
        </div>

        {/* Reset Confirm Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
              <h3 className="text-display text-xl">Reset to default?</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                This will discard all changes and restore the original 9 journey stages.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-full bg-red-600 px-4 py-2 text-sm text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
              <h3 className="text-display text-xl">Delete this stage?</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                This action cannot be undone. The stage will be permanently removed.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteStage}
                  className="flex-1 rounded-full bg-red-600 px-4 py-2 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Stage Modal */}
        {showAddStage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
              <h3 className="text-display text-xl">Add new stage</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                Create a new journey stage. You can edit all details after creation.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const patientTitle = (form.elements.namedItem("patientTitle") as HTMLInputElement).value;
                  const pamTitle = (form.elements.namedItem("pamTitle") as HTMLInputElement).value;
                  if (patientTitle && pamTitle) {
                    addStage(patientTitle, pamTitle);
                  }
                }}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    Patient stage title
                  </label>
                  <input
                    name="patientTitle"
                    placeholder="e.g., Initial Consultation"
                    required
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-black/50">
                    PAM stage title
                  </label>
                  <input
                    name="pamTitle"
                    placeholder="e.g., Assess & Guide"
                    required
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStage(false)}
                    className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm text-white"
                  >
                    Add stage
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
