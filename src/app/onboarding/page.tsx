"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setProfile } from "@/lib/store";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/Logo";

type Subject = "algebra" | "geometry" | "calculus";
type DailyXP = 50 | 100 | 200;

const SUBJECT_CARDS: { id: Subject; label: string; icon: string; tag: string }[] = [
  { id: "algebra", label: "Algebra", icon: "x²", tag: "EQUATIONS" },
  { id: "geometry", label: "Geometry", icon: "△", tag: "SHAPES" },
  { id: "calculus", label: "Calculus", icon: "∫", tag: "CHANGE" },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [goal, setGoal] = useState<DailyXP | null>(null);
  const [name, setName] = useState("");

  function next() {
    if (step === 0 && grade == null) return;
    if (step === 1 && subjects.length === 0) return;
    if (step === 2 && (goal == null || !name)) return;
    if (step < 2) {
      setStep(step + 1);
    } else {
      setProfile(`hunter@${name.toLowerCase()}.kz`, name, grade!);
      router.push("/dashboard");
    }
  }

  function toggleSubject(s: Subject) {
    setSubjects((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s],
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="px-4 md:px-0 max-w-[720px] mx-auto w-full flex items-center justify-between py-4">
        <Logo size="sm" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1 transition-all ${
                i === step
                  ? "w-8 bg-accent"
                  : i < step
                    ? "w-4 bg-accent/60"
                    : "w-4 bg-border-default"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <div className="max-w-[720px] mx-auto px-4 md:px-0 w-full">
          {step === 0 && (
            <div>
              <div className="font-display text-[11px] tracking-[0.2em] text-text-muted mb-3">
                ◢ 01 / 03
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
                What grade<br />are you in?
              </h1>
              <div className="grid grid-cols-5 gap-2">
                {[7, 8, 9, 10, 11].map((g) => {
                  const active = grade === g;
                  return (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`aspect-square border-2 transition-all ${
                        active
                          ? "border-accent bg-accent-soft glow-cyan"
                          : "border-border-default bg-surface hover:border-border-light"
                      }`}
                    >
                      <div
                        className={`scoreboard text-3xl md:text-5xl ${
                          active ? "text-accent text-glow-cyan" : "text-text-primary"
                        }`}
                      >
                        {g}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="font-display text-[11px] tracking-[0.2em] text-text-muted mb-3">
                ◢ 02 / 03
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-2">
                What's the<br />target?
              </h1>
              <p className="text-text-secondary text-sm mb-8">Pick one or more.</p>
              <div className="grid grid-cols-3 gap-2">
                {SUBJECT_CARDS.map((s) => {
                  const active = subjects.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSubject(s.id)}
                      className={`relative aspect-[3/4] border-2 transition-all overflow-hidden text-left p-4 flex flex-col justify-between ${
                        active
                          ? "border-accent bg-accent-soft glow-cyan"
                          : "border-border-default bg-surface hover:border-border-light"
                      }`}
                    >
                      <div className="absolute inset-0 pixel-grid-fine opacity-30 pointer-events-none" />
                      {active && (
                        <span className="absolute top-2 right-2 bg-accent text-bg rounded-full w-5 h-5 flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                      <div
                        className={`font-display text-5xl md:text-7xl leading-none ${
                          active ? "text-accent" : "text-text-primary"
                        }`}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div className="font-display text-base font-bold">{s.label}</div>
                        <div className="font-display text-[10px] tracking-wider text-text-muted mt-0.5">
                          {s.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="font-display text-[11px] tracking-[0.2em] text-text-muted mb-3">
                ◢ 03 / 03
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
                Daily<br />XP target.
              </h1>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {[50, 100, 200].map((xp) => {
                  const active = goal === xp;
                  return (
                    <button
                      key={xp}
                      onClick={() => setGoal(xp as DailyXP)}
                      className={`aspect-[4/3] border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                        active
                          ? "border-accent bg-accent-soft glow-cyan"
                          : "border-border-default bg-surface hover:border-border-light"
                      }`}
                    >
                      <div
                        className={`scoreboard text-4xl ${
                          active ? "text-accent" : "text-text-primary"
                        }`}
                      >
                        {xp}
                      </div>
                      <div className="font-display text-[10px] tracking-wider text-text-muted">
                        XP / DAY
                      </div>
                    </button>
                  );
                })}
              </div>
              <label className="block">
                <span className="font-display text-[11px] tracking-[0.2em] text-text-muted">
                  HUNTER TAG
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={20}
                  className="mt-2 w-full bg-surface border-2 border-border-default focus:border-accent outline-none px-4 py-3 font-display text-xl"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border-default">
        <div className="max-w-[720px] mx-auto px-4 md:px-0 py-4 flex items-center justify-between">
          <button
            onClick={() => (step > 0 ? setStep(step - 1) : router.push("/"))}
            className="text-text-muted hover:text-text-primary flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={next}
            disabled={
              (step === 0 && grade == null) ||
              (step === 1 && subjects.length === 0) ||
              (step === 2 && (goal == null || !name))
            }
            className="font-display text-base px-6 py-3 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {step < 2 ? "NEXT" : "ENTER"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
