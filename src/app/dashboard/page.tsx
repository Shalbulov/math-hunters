"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { XPBar } from "@/components/XPBar";
import { loadState, xpForLevel, type UserState } from "@/lib/store";
import { allTopics, CURRICULUM, findTopic } from "@/lib/curriculum";
import { Flame, ArrowRight, Zap } from "lucide-react";

export default function Dashboard() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    const sync = () => setState(loadState());
    sync();
    window.addEventListener("mh:state", sync);
    return () => window.removeEventListener("mh:state", sync);
  }, []);

  if (!state) return null;

  const totalTopics = allTopics().length;
  const completedCount = state.completedTopics.length;
  const xpNeeded = xpForLevel(state.level);

  // pick next mission: first not-completed topic in user's grade
  const userGrade = state.grade || 7;
  const gradeData = CURRICULUM.find((g) => g.grade === userGrade) || CURRICULUM[0];
  const nextTopic =
    gradeData.subjects
      .flatMap((s) => s.topics)
      .find((t) => !state.completedTopics.includes(t.id)) ||
    gradeData.subjects[0].topics[0];

  const lastThree = state.completedTopics
    .slice(-3)
    .reverse()
    .map((id) => findTopic(id))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-6 pb-16 w-full">

        <section className="relative overflow-hidden border border-border-default bg-surface mb-6">
          <div className="absolute inset-0 pixel-grid opacity-40" />
          <div className="relative p-5 md:p-6">
            <div className="flex items-start justify-between mb-1">
              <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
                ◢ HUNTER {state.name?.toUpperCase() || "ANON"}
              </div>
              {state.streak > 0 && (
                <div className="flex items-center gap-1.5">
                  <Flame className="text-warning flame-flicker" size={16} />
                  <span className="scoreboard text-xl text-warning">{state.streak}</span>
                  <span className="font-display text-[10px] tracking-wider text-text-muted mt-1">
                    DAYS
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-end justify-between gap-3 mt-4">
              <div>
                <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-1">
                  XP
                </div>
                <div className="scoreboard text-[72px] md:text-[96px] text-text-primary leading-[0.85]">
                  {state.xp}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-1">
                  LVL
                </div>
                <div className="scoreboard text-[72px] md:text-[96px] text-accent leading-[0.85] text-glow-cyan">
                  {state.level}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <XPBar current={state.xp} target={xpNeeded} />
              <div className="mt-2 flex justify-between text-[10px] font-display tracking-wider text-text-muted">
                <span>0</span>
                <span>{Math.round(xpNeeded / 4)}</span>
                <span>{Math.round(xpNeeded / 2)}</span>
                <span>{Math.round((xpNeeded * 3) / 4)}</span>
                <span className="text-accent">{xpNeeded}</span>
              </div>
            </div>
          </div>
        </section>

        <Link
          href={`/topics/${nextTopic.id}`}
          className="group relative overflow-hidden block border border-accent bg-surface-elev mb-6 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 pixel-grid-fine opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-accent/15" />
          <div className="relative p-5 md:p-6 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="font-display text-[10px] tracking-[0.25em] text-accent mb-2">
                ◢ TODAY'S MISSION
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight truncate">
                {nextTopic.title}
              </h2>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="text-text-muted font-display tracking-wider">
                  GRADE {userGrade}
                </span>
                <span className="w-1 h-1 bg-text-muted rounded-full" />
                <span className="text-accent font-display tracking-wider">
                  +{50 + nextTopic.quiz.length * 5} XP
                </span>
              </div>
            </div>
            <div className="font-display text-accent flex-shrink-0 transition-transform group-hover:translate-x-1">
              <ArrowRight size={28} strokeWidth={2.5} />
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <StatBlock label="TOPICS" value={`${completedCount}`} sub={`/${totalTopics}`} />
          <StatBlock label="QUIZZES" value={`${Object.keys(state.quizResults).length}`} />
          <StatBlock label="BADGES" value={`${state.badges.length}`} />
        </div>

        <section className="border border-border-default bg-surface">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border-default">
            <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
              ◢ RECENT
            </div>
            <Link
              href="/profile"
              className="font-display text-[10px] tracking-wider text-accent hover:text-text-primary transition-colors"
            >
              VIEW ALL →
            </Link>
          </div>
          {lastThree.length === 0 ? (
            <div className="px-5 py-8 text-center text-text-secondary text-sm">
              No completed topics yet.{" "}
              <Link href="/grades" className="text-accent">
                Start the hunt
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border-default">
              {lastThree.map(
                (f) =>
                  f && (
                    <li key={f.topic.id}>
                      <Link
                        href={`/topics/${f.topic.id}`}
                        className="flex items-center justify-between px-5 py-4 hover:bg-surface-elev transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Zap size={14} className="text-accent flex-shrink-0" />
                          <span className="font-display truncate">{f.topic.title}</span>
                        </div>
                        <span className="font-display text-[10px] tracking-wider text-text-muted flex-shrink-0">
                          G{f.grade}
                        </span>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatBlock({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="relative border border-border-default bg-surface p-4">
      <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="scoreboard text-3xl text-text-primary">{value}</span>
        {sub && (
          <span className="font-display text-xs text-text-muted">{sub}</span>
        )}
      </div>
    </div>
  );
}
