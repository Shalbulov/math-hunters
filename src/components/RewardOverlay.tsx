"use client";

import { useEffect } from "react";

type Props = {
  show: boolean;
  stat: string;
  glyph?: string;
  onDone: () => void;
};

export function RewardOverlay({ show, stat, glyph = "⚡", onDone }: Props) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm flex items-center justify-center pixel-grid edge-pulse">
      <div className="text-center reward-stat">
        <div className="font-display text-[120px] md:text-[200px] leading-none text-accent text-glow-cyan flame-flicker">
          {glyph}
        </div>
        <div className="scoreboard text-5xl md:text-7xl mt-2 text-text-primary">
          {stat}
        </div>
      </div>
    </div>
  );
}
