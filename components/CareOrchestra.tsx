"use client";

import { useMemo, useState } from "react";

const maturityStages = [
  "Reactive",
  "Assisted",
  "Augmented",
  "Orchestrated",
  "Intelligent",
];

const humanAnchors = [
  { label: "Clinician", x: 70, y: 80 },
  { label: "Nurse", x: 240, y: 40 },
  { label: "Coordinator", x: 330, y: 140 },
  { label: "Compliance", x: 260, y: 280 },
  { label: "Operations", x: 80, y: 260 },
];

export default function CareOrchestra() {
  const [stageIndex, setStageIndex] = useState(2);
  const coherence = useMemo(() => stageIndex / 4, [stageIndex]);
  const pulseIntensity = useMemo(() => 0.3 + coherence * 0.7, [coherence]);
  const chaosOpacity = useMemo(() => 0.7 - coherence * 0.6, [coherence]);
  const governanceGlow = useMemo(() => 0.15 + coherence * 0.5, [coherence]);

  return (
    <section
      id="orchestra"
      className="relative overflow-hidden rounded-[32px] border border-black/10 p-8 md:p-12"
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0">
        <img
          src="/orchestra-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-80"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fffaf1,transparent_60%)]" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl">
          <p className="pill">Human + AI Collaboration Experience</p>
          <h2 className="text-display mt-4 text-4xl">From friction to flow</h2>
          <p className="mt-4 text-sm text-[color:var(--ink-muted)]">
            AI prepares the field. Humans decide. Patients stabilise.
          </p>
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm">
              <span>System maturity</span>
              <span className="font-semibold">{maturityStages[stageIndex]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={4}
              step={1}
              value={stageIndex}
              onChange={(event) => setStageIndex(Number(event.target.value))}
              className="mt-3 w-full"
            />
            <div className="mt-2 flex justify-between text-[11px] text-black/50">
              {maturityStages.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-xs text-black/60">
            Signal: coherence increases, chaos dissolves, governance stabilises.
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative h-[460px] w-[460px]">
            <div
              className="absolute inset-0 rounded-full border border-black/10 bg-[radial-gradient(circle_at_center,#fff8f0,#f5efe4)]"
              style={{ boxShadow: `0 0 80px rgba(216, 122, 60, ${governanceGlow})` }}
            />
            <div
              className="absolute inset-10 rounded-full border border-black/10 bg-white/60"
              style={{ boxShadow: `0 0 60px rgba(120, 154, 144, ${pulseIntensity})` }}
            />
            <div
              className="absolute inset-20 rounded-full border border-dashed border-black/20"
              style={{ opacity: 0.2 + coherence * 0.5 }}
            />

            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-black/10 bg-white/90">
              <span className="text-[11px] uppercase tracking-[0.2em] text-black/50">
                Patient
              </span>
              <span className="text-base font-semibold text-black">Wellbeing</span>
              <span
                className="mt-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                style={{ opacity: pulseIntensity }}
              />
            </div>

            <div
              className="absolute inset-0"
              style={{ opacity: chaosOpacity }}
            >
              <div className="absolute left-12 top-20 h-16 w-32 rounded-full border border-black/10 bg-white/40 blur-[1px]" />
              <div className="absolute right-10 top-36 h-10 w-24 rounded-full border border-black/10 bg-white/40 blur-[1px]" />
              <div className="absolute left-20 bottom-28 h-12 w-28 rounded-full border border-black/10 bg-white/40 blur-[1px]" />
            </div>

            <div
              className="absolute inset-0"
              style={{ opacity: 0.2 + coherence * 0.7 }}
            >
              <div className="absolute left-24 top-24 h-28 w-64 rounded-full bg-[radial-gradient(circle_at_left,rgba(216,122,60,0.25),transparent_70%)]" />
              <div className="absolute right-14 bottom-20 h-24 w-56 rounded-full bg-[radial-gradient(circle_at_right,rgba(120,154,144,0.25),transparent_70%)]" />
              <div className="absolute left-32 bottom-36 h-20 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,196,158,0.35),transparent_70%)]" />
            </div>

            {humanAnchors.map((human) => (
              <div
                key={human.label}
                className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-black/20 bg-white text-[10px] font-semibold text-black shadow-sm"
                style={{ left: human.x, top: human.y }}
              >
                <span className="text-center leading-tight">{human.label}</span>
              </div>
            ))}

            <div
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: `rgba(120, 154, 144, ${0.2 + coherence * 0.4})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
