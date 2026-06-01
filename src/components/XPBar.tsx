"use client";

import { useEffect, useState } from "react";

type Props = {
  current: number;
  target: number;
  /** start from previous fill so overshoot is visible */
  previous?: number;
  showStops?: boolean;
};

export function XPBar({ current, target, previous = 0, showStops = true }: Props) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, []);

  const pct = Math.min(1, current / target);
  const startPct = Math.min(1, previous / target);

  const stops = [0.25, 0.5, 0.75];

  return (
    <div className="relative h-2 bg-surface-elev overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-accent xp-bar-fill"
        style={
          {
            width: "100%",
            transform: `scaleX(${startPct})`,
            ["--xp-start" as never]: startPct,
            ["--xp-target" as never]: animate ? pct : startPct,
          } as React.CSSProperties
        }
      />
      <div
        className="absolute inset-y-0 left-0 bg-accent/40 blur-sm"
        style={{ width: `${pct * 100}%` }}
      />
      {showStops &&
        stops.map((s) => (
          <span
            key={s}
            className="absolute top-0 bottom-0 w-px bg-bg/60"
            style={{ left: `${s * 100}%` }}
          />
        ))}
    </div>
  );
}
