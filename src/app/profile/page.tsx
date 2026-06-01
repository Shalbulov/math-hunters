"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadState, xpForLevel, type UserState } from "@/lib/store";
import { allTopics, CURRICULUM, findTopic } from "@/lib/curriculum";
import { Lock, Award, Flame } from "lucide-react";

export default function ProfilePage() {
  const [state, setState] = useState<UserState | null>(null);

  useEffect(() => {
    const sync = () => setState(loadState());
    sync();
    window.addEventListener("mh:state", sync);
    return () => window.removeEventListener("mh:state", sync);
  }, []);

  if (!state) return null;

  // Build 7-day xp series
  const today = new Date();
  const days: { date: string; xp: number; label: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const found = state.xpHistory.find((h) => h.date === iso);
    days.push({
      date: iso,
      xp: found ? found.xp : 0,
      label: d.toLocaleDateString("en", { weekday: "short" })[0],
    });
  }

  // Subject breakdown
  const subjectTotals = CURRICULUM.flatMap((g) =>
    g.subjects.map((s) => ({ name: s.name, total: s.topics.length })),
  );
  const subjectAgg = subjectTotals.reduce<Record<string, { done: number; total: number }>>(
    (acc, s) => {
      acc[s.name] = acc[s.name] || { done: 0, total: 0 };
      acc[s.name].total += s.total;
      return acc;
    },
    {},
  );
  for (const tid of state.completedTopics) {
    const t = findTopic(tid);
    if (t) subjectAgg[t.subject] = { ...subjectAgg[t.subject], done: subjectAgg[t.subject].done + 1 };
  }
  const subjects = Object.entries(subjectAgg);

  const xpNeeded = xpForLevel(state.level);
  const totalTopics = allTopics().length;

  return (
    <>
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-6 pb-16 w-full">
        <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-2">
          ◢ HUNTER PROFILE
        </div>

        {/* Identity card */}
        <section className="border border-border-default bg-surface mb-6 relative overflow-hidden">
          <div className="absolute inset-0 pixel-grid opacity-30" />
          <div className="relative p-5 md:p-6 flex items-center gap-5">
            <div
              className="w-20 h-20 md:w-24 md:h-24 bg-bg border border-accent flex items-center justify-center scoreboard text-3xl md:text-4xl text-accent flame-flicker"
              style={{
                clipPath:
                  "polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)",
              }}
            >
              {(state.name?.[0] || "H").toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-2xl md:text-3xl font-bold truncate">
                {state.name || "Hunter"}
              </div>
              <div className="text-xs text-text-muted font-display tracking-wider mt-0.5">
                GRADE {state.grade || "—"} · LEVEL {state.level}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <Stat icon={<Award size={12} className="text-accent" />} label="BADGES" value={state.badges.length} />
                <Stat icon={<Flame size={12} className="text-warning" />} label="STREAK" value={state.streak} />
                <Stat label="TOPICS" value={`${state.completedTopics.length}/${totalTopics}`} />
              </div>
            </div>
          </div>
        </section>

        {/* XP timeline sparkline */}
        <section className="border border-border-default bg-surface mb-6">
          <div className="px-5 py-3 border-b border-border-default flex items-center justify-between">
            <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
              ◢ XP · LAST 7 DAYS
            </div>
            <div className="scoreboard text-sm text-accent">
              {days.reduce((n, d) => n + d.xp, 0)}
            </div>
          </div>
          <div className="p-5">
            <Sparkline days={days} />
          </div>
        </section>

        {/* Subject breakdown — filled arc segments */}
        <section className="border border-border-default bg-surface mb-6">
          <div className="px-5 py-3 border-b border-border-default font-display text-[10px] tracking-[0.25em] text-text-muted">
            ◢ SUBJECT BREAKDOWN
          </div>
          <div className="p-5 flex items-center gap-6">
            <ArcDonut subjects={subjects} />
            <div className="flex-1 space-y-2.5">
              {subjects.map(([name, agg], i) => {
                const pct = agg.total === 0 ? 0 : (agg.done / agg.total) * 100;
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2"
                          style={{ background: SUBJECT_COLORS[i % SUBJECT_COLORS.length] }}
                        />
                        <span className="font-display tracking-wider">{name.toUpperCase()}</span>
                      </div>
                      <span className="font-display text-text-muted">
                        {agg.done}/{agg.total}
                      </span>
                    </div>
                    <div className="h-1 bg-bg overflow-hidden">
                      <div
                        className="h-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: SUBJECT_COLORS[i % SUBJECT_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Locked next level card */}
        <section className="relative border border-border-default bg-surface-elev overflow-hidden mb-6">
          <div className="absolute inset-0 pixel-grid-fine opacity-30" />
          <div className="relative px-5 py-6 flex items-center gap-5">
            <div className="w-16 h-16 border border-border-light bg-bg flex items-center justify-center text-text-muted">
              <Lock size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
                ◢ NEXT RANK
              </div>
              <div className="scoreboard text-3xl md:text-4xl text-text-muted">
                LVL {state.level + 1}
              </div>
              <div className="mt-2 h-1 bg-bg overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-700"
                  style={{ width: `${(state.xp / xpNeeded) * 100}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] font-display tracking-wider">
                <span className="text-text-muted">{state.xp} XP</span>
                <span className="text-accent">{xpNeeded - state.xp} TO GO</span>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="border border-border-default bg-surface">
          <div className="px-5 py-3 border-b border-border-default font-display text-[10px] tracking-[0.25em] text-text-muted">
            ◢ BADGES · {state.badges.length}
          </div>
          <div className="p-5">
            {state.badges.length === 0 ? (
              <p className="text-text-muted text-sm">
                No badges yet — complete topics and quizzes to earn them.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {state.badges.map((b) => (
                  <div
                    key={b}
                    className="px-3 py-2 border border-accent/40 bg-accent-soft text-accent font-display text-xs tracking-wider flex items-center gap-2"
                  >
                    <Award size={12} /> {b.toUpperCase()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href={state.grade ? `/grades/${state.grade}` : "/grades"}
            className="font-display text-base px-6 py-3 bg-accent text-bg font-bold inline-flex items-center gap-2"
          >
            CONTINUE HUNT →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

const SUBJECT_COLORS = ["#00E5FF", "#FACC15", "#FF5C7C", "#4ADE80", "#A78BFA"];

function Stat({ icon, label, value }: { icon?: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="scoreboard text-base text-text-primary">{value}</span>
      <span className="font-display tracking-wider text-text-muted hidden sm:inline">{label}</span>
    </div>
  );
}

function Sparkline({ days }: { days: { date: string; xp: number; label: string }[] }) {
  const max = Math.max(20, ...days.map((d) => d.xp));
  const w = 100;
  const h = 32;
  const points = days
    .map((d, i) => {
      const x = (i / (days.length - 1)) * w;
      const y = h - (d.xp / max) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h + 8}`} className="w-full h-24" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,${h} ${points} ${w},${h}`}
          fill="url(#sg)"
          stroke="none"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sparkline-path"
        />
        {days.map((d, i) => {
          const x = (i / (days.length - 1)) * w;
          const y = h - (d.xp / max) * h;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.2"
              fill="#00E5FF"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      <div className="flex justify-between mt-1 text-[10px] font-display tracking-wider text-text-muted">
        {days.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

function ArcDonut({ subjects }: { subjects: [string, { done: number; total: number }][] }) {
  const total = subjects.reduce((n, [, a]) => n + a.total, 0);
  const radius = 42;
  const stroke = 12;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const done = subjects.reduce((n, [, a]) => n + a.done, 0);
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="relative w-32 h-32 flex-shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#1A2240" strokeWidth={stroke} />
        {subjects.map(([name, agg], i) => {
          if (agg.total === 0) return null;
          const frac = agg.done / total;
          const segLen = frac * circumference;
          const el = (
            <circle
              key={name}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={SUBJECT_COLORS[i % SUBJECT_COLORS.length]}
              strokeWidth={stroke}
              strokeDasharray={`${segLen} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += segLen;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="scoreboard text-2xl text-text-primary">{pct}</span>
        <span className="font-display text-[9px] tracking-wider text-text-muted">PERCENT</span>
      </div>
    </div>
  );
}
