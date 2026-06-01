"use client";

import { useEffect, useState } from "react";
import { loadState, type UserState } from "@/lib/store";

export function AmbientChrome() {
  const [state, setState] = useState<UserState | null>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const sync = () => setState(loadState());
    sync();
    window.addEventListener("mh:state", sync);

    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);

    return () => {
      window.removeEventListener("mh:state", sync);
      clearInterval(id);
    };
  }, []);

  return (
    <>
      {/* Atmospheric background: pixel grid + radial focus toward center column */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none pixel-grid opacity-30 z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse 800px 1200px at center, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 800px 1200px at center, black 30%, transparent 90%)",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 900px at center, rgba(0, 229, 255, 0.04), transparent 70%)",
        }}
      />

      {/* Corner brackets — arcade cabinet vibe */}
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      {/* Left rail — only on lg+ */}
      <aside
        aria-hidden
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[calc((100vw-720px)/2)] pointer-events-none z-10 flex-col items-stretch justify-between py-8 px-6"
      >
        <div className="font-display text-[10px] tracking-[0.4em] text-text-muted">
          ◢ KZ
        </div>

        {/* Vertical wordmark */}
        <div className="flex-1 flex items-center justify-end">
          <div
            className="font-display text-[11px] tracking-[0.45em] text-text-muted whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            MATH<span className="text-accent">/</span>HUNTERS · GRADE 7—11
          </div>
        </div>

        <div className="font-display text-[10px] tracking-[0.25em] text-text-muted leading-relaxed">
          <div>EST</div>
          <div className="text-accent">2026</div>
        </div>
      </aside>

      {/* Right rail — live console */}
      <aside
        aria-hidden
        className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[calc((100vw-720px)/2)] pointer-events-none z-10 flex-col items-stretch justify-between py-8 px-6"
      >
        <div className="text-right">
          <div className="font-display text-[10px] tracking-[0.4em] text-text-muted">
            LIVE ◣
          </div>
          <div className="scoreboard text-base text-accent mt-1">{time}</div>
        </div>

        {/* Console gauges */}
        <div className="space-y-3 text-right">
          <Gauge label="LVL" value={state?.level ?? 1} />
          <Gauge label="XP" value={state?.xp ?? 0} />
          <Gauge label="STREAK" value={state?.streak ?? 0} highlight={!!state?.streak} />
          <Gauge label="BADGES" value={state?.badges.length ?? 0} />
        </div>

        <div className="text-right font-display text-[10px] tracking-[0.25em] text-text-muted leading-relaxed">
          <div>GEMINI</div>
          <div className="text-accent">2.5 FLASH</div>
        </div>
      </aside>

      {/* Tickertape between rails — bottom horizontal line of glyphs */}
      <div
        aria-hidden
        className="hidden lg:block fixed bottom-0 left-0 right-0 h-px bg-border-default z-10 pointer-events-none"
      />
    </>
  );
}

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls =
    pos === "tl"
      ? "top-3 left-3 border-l border-t"
      : pos === "tr"
        ? "top-3 right-3 border-r border-t"
        : pos === "bl"
          ? "bottom-3 left-3 border-l border-b"
          : "bottom-3 right-3 border-r border-b";
  return (
    <div
      aria-hidden
      className={`fixed w-3.5 h-3.5 border-accent/50 pointer-events-none z-20 ${cls}`}
    />
  );
}

function Gauge({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="font-display text-[9px] tracking-[0.3em] text-text-muted">
        {label}
      </div>
      <div
        className={`scoreboard text-2xl leading-none ${
          highlight ? "text-warning" : "text-text-primary"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
