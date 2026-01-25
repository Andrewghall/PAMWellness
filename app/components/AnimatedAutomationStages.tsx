"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Signal = {
  id: number;
  type: "voice" | "text" | "image" | "document" | "system";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const maturityLabels = [
  "Manual",
  "NLP",
  "Generative",
  "Agentic",
  "Orchestrated",
  "Intelligent",
];

const seededRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const buildSignals = () => {
  const rand = seededRandom(42);
  const types: Signal["type"][] = ["voice", "text", "image", "document", "system"];
  return Array.from({ length: 80 }, (_, index) => {
    const type = types[index % types.length];
    return {
      id: index,
      type,
      x: rand() * 1,
      y: rand() * 1,
      vx: (rand() - 0.5) * 0.002,
      vy: (rand() - 0.5) * 0.002,
      size: 1.5 + rand() * 2.8,
    };
  });
};

const typeColor = (type: Signal["type"]) => {
  switch (type) {
    case "voice":
      return "rgba(88, 146, 255, 0.7)";
    case "text":
      return "rgba(84, 176, 120, 0.7)";
    case "image":
      return "rgba(216, 122, 60, 0.7)";
    case "document":
      return "rgba(154, 120, 216, 0.7)";
    case "system":
      return "rgba(120, 120, 120, 0.7)";
    default:
      return "rgba(0,0,0,0.4)";
  }
};

export default function AnimatedAutomationStages() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signalsRef = useRef<Signal[]>(buildSignals());
  const [maturity, setMaturity] = useState(20);
  const stageLabel = useMemo(
    () => maturityLabels[Math.min(maturityLabels.length - 1, Math.floor(maturity / 20))],
    [maturity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frameId = 0;
    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(250, 245, 236, 0.85)";
      context.fillRect(0, 0, width, height);

      const maturityRatio = maturity / 100;
      const chaos = 1 - maturityRatio;
      const centerX = width / 2;
      const centerY = height / 2;

      // Memory grid
      if (maturityRatio > 0.65) {
        context.strokeStyle = `rgba(120, 154, 144, ${(maturityRatio - 0.6) * 0.4})`;
        context.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
          context.beginPath();
          context.moveTo(i, 0);
          context.lineTo(i, height);
          context.stroke();
        }
        for (let j = 0; j < height; j += 40) {
          context.beginPath();
          context.moveTo(0, j);
          context.lineTo(width, j);
          context.stroke();
        }
      }

      // Stability core
      context.beginPath();
      context.fillStyle = `rgba(88, 176, 120, ${0.2 + maturityRatio * 0.6})`;
      context.arc(centerX, centerY, 36 + maturityRatio * 12, 0, Math.PI * 2);
      context.fill();

      const signals = signalsRef.current;
      signals.forEach((signal) => {
        const pullX = (centerX - signal.x * width) * 0.0004 * maturityRatio;
        const pullY = (centerY - signal.y * height) * 0.0004 * maturityRatio;
        signal.vx += pullX - signal.vx * 0.02;
        signal.vy += pullY - signal.vy * 0.02;

        signal.vx += (Math.sin(signal.id + performance.now() / 1200) * 0.0003) * chaos;
        signal.vy += (Math.cos(signal.id + performance.now() / 1400) * 0.0003) * chaos;

        signal.x += signal.vx;
        signal.y += signal.vy;

        if (signal.x < 0.05 || signal.x > 0.95) signal.vx *= -0.6;
        if (signal.y < 0.05 || signal.y > 0.95) signal.vy *= -0.6;

        context.beginPath();
        context.fillStyle = typeColor(signal.type);
        context.globalAlpha = 0.3 + maturityRatio * 0.7;
        context.arc(signal.x * width, signal.y * height, signal.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      });

      // Governance ring
      context.strokeStyle = `rgba(216, 122, 60, ${0.15 + maturityRatio * 0.5})`;
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(centerX, centerY, 120 + maturityRatio * 40, 0, Math.PI * 2);
      context.stroke();

      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [maturity]);

  return (
    <section id="automation" className="card overflow-hidden p-8 md:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <a href="#automation" className="pill hover:bg-black/10 transition-colors cursor-pointer">
            Animated Intelligence Evolution
          </a>
          <h2 className="text-display text-4xl">Intelligence emerges from signal</h2>
          <p className="text-sm text-[color:var(--ink-muted)]">
            Adjust the maturity to feel the system move from chaos to coherence.
          </p>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Intelligence maturity</span>
              <span className="font-semibold">{stageLabel}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={maturity}
              onChange={(event) => setMaturity(Number(event.target.value))}
              className="mt-3 w-full"
            />
            <p className="mt-3 text-xs text-black/60">Signal: AI prepares. Humans decide.</p>
          </div>
        </div>
        <div className="relative h-[480px] w-full overflow-hidden rounded-[32px] border border-black/10 bg-[#f8f4ec]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
