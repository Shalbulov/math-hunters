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
    <header className="sticky top-0 z-40 border-b border-border-default bg-primary-dark/90 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
          <Link href="/grades" className="hover:text-accent-blue transition-colors">
            Grades
          </Link>
          <Link href="/dashboard" className="hover:text-accent-blue transition-colors">
            Dashboard
          </Link>
          <Link href="/#how" className="hover:text-accent-blue transition-colors">
            How it works
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {signedIn ? (
            <>
              {state!.streak > 0 && (
                <div className="hidden sm:flex items-center gap-1 text-warning text-sm">
                  <Flame size={16} />
                  <span>{state!.streak}</span>
                </div>
              )}
              <Link
                href="/dashboard"
                className="text-sm px-3 py-1.5 rounded-md border border-border-default hover:border-accent-blue transition-colors"
              >
                Lvl {state!.level} · {state!.xp} XP
              </Link>
              <button
                onClick={logout}
                className="text-text-secondary hover:text-error transition-colors"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-3 py-1.5 rounded-md border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary-dark transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm px-3 py-1.5 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
