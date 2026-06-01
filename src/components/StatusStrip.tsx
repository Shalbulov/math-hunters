"use client";

import { useEffect, useState } from "react";
import { loadState, type UserState } from "@/lib/store";

type Props = {
  mode: string;
};

export function StatusStrip({ mode }: Props) {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    const sync = () => setState(loadState());
    sync();
    window.addEventListener("mh:state", sync);
    return () => window.removeEventListener("mh:state", sync);
  }, []);

  if (!state) return null;

  return (
    <div className="border-b border-border-default bg-surface/40 backdrop-blur lg:hidden">
      <div className="max-w-[720px] mx-auto px-4 py-1.5 flex items-center justify-between gap-3 font-display text-[10px] tracking-[0.2em] text-text-muted overflow-x-auto whitespace-nowrap">
        <span className="text-accent">◢ {mode}</span>
        <span className="flex items-center gap-1">
          LVL <span className="text-text-primary scoreboard text-xs">{state.level}</span>
        </span>
        <span className="flex items-center gap-1">
          XP <span className="text-text-primary scoreboard text-xs">{state.xp}</span>
        </span>
        {state.streak > 0 && (
          <span className="flex items-center gap-1 text-warning">
            🔥<span className="scoreboard text-xs">{state.streak}</span>
          </span>
        )}
        <span>{state.badges.length}B</span>
      </div>
    </div>
  );
}
