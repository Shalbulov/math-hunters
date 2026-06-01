"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { loadState, logout, type UserState } from "@/lib/store";
import { Flame, LogOut } from "lucide-react";

export function Header() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    const sync = () => setState(loadState());
    sync();
    window.addEventListener("mh:state", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mh:state", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const signedIn = state?.email != null;

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-bg/85 backdrop-blur">
      <div className="max-w-[720px] mx-auto flex items-center justify-between px-4 md:px-0 py-3.5">
        <Logo />
        <div className="flex items-center gap-3">
          {signedIn ? (
            <>
              {state!.streak > 0 && (
                <div className="hidden sm:flex items-center gap-1 text-warning text-sm">
                  <Flame size={14} className="flame-flicker" />
                  <span className="scoreboard text-base">{state!.streak}</span>
                </div>
              )}
              <Link
                href="/profile"
                className="font-display text-sm px-2.5 py-1 border border-accent/30 text-accent hover:border-accent transition-colors"
                style={{ clipPath: "polygon(8% 0, 100% 0, 100% 80%, 92% 100%, 0 100%, 0 20%)" }}
              >
                LVL {state!.level}
              </Link>
              <button
                onClick={logout}
                className="text-text-muted hover:text-error transition-colors"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link
              href="/onboarding"
              className="font-display text-sm px-3 py-1.5 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors"
            >
              START
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
