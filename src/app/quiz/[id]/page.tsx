"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { findTopic } from "@/lib/curriculum";
import { MathText } from "@/components/Math";
import { RewardOverlay } from "@/components/RewardOverlay";
import { recordQuiz } from "@/lib/store";
import { ArrowRight, Check, X } from "lucide-react";

type Phase = "playing" | "result";

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const found = findTopic(id);
  if (!found) notFound();
  const { topic, grade } = found;
  const quiz = topic.quiz;

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz.length).fill(null),
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState<Phase>("playing");
  const [summary, setSummary] = useState<{
    score: number;
    earned: number;
    passing: boolean;
  } | null>(null);
  const [reward, setReward] = useState<string | null>(null);

  const q = quiz[idx];
  const progress = ((idx + (revealed ? 1 : 0)) / quiz.length) * 100;

  function choose(i: number) {
    if (revealed) return;
    setSelected(i);
  }

  function check() {
    if (selected == null) return;
    const a = [...answers];
    a[idx] = selected;
    setAnswers(a);
    setRevealed(true);
    if (selected === q.correct) setReward("HIT");
  }

  function next() {
    setRevealed(false);
    setSelected(null);
    if (idx < quiz.length - 1) {
      setIdx(idx + 1);
    } else {
      const finalAnswers = [...answers];
      if (finalAnswers[idx] == null) finalAnswers[idx] = selected;
      const score = finalAnswers.reduce(
        (n: number, ans, i) => (ans === quiz[i].correct ? n + 1 : n),
        0,
      );
      const res = recordQuiz(topic.id, score, quiz.length);
      setSummary({ score, earned: res.earned, passing: res.passing });
      setPhase("result");
    }
  }

  if (phase === "result" && summary) {
    const pct = Math.round((summary.score / quiz.length) * 100);
    return (
      <>
        <Header />
        <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-8 pb-12 w-full">
          <section className="relative border border-border-default bg-surface overflow-hidden mb-6">
            <div className="absolute inset-0 pixel-grid opacity-40" />
            <div className="relative p-6 md:p-8 text-center">
              <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-1">
                {summary.passing ? "◢ PASSED" : "◢ TRY AGAIN"}
              </div>
              <div
                className={`scoreboard text-[100px] md:text-[140px] leading-[0.85] ${
                  summary.passing ? "text-accent text-glow-cyan" : "text-warning"
                }`}
              >
                {pct}
                <span className="text-3xl">%</span>
              </div>
              <div className="font-display text-sm tracking-wider text-text-muted mt-2">
                {summary.score}/{quiz.length} ·{" "}
                <span className="text-accent">+{summary.earned} XP</span>
              </div>
            </div>
          </section>

          <div className="space-y-px bg-border-default mb-6">
            {quiz.map((qq, i) => {
              const correct = answers[i] === qq.correct;
              return (
                <div
                  key={qq.id}
                  className={`bg-surface px-4 py-3 ${
                    correct ? "border-l-2 border-success" : "border-l-2 border-error"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {correct ? (
                      <Check className="text-success mt-1 flex-shrink-0" size={14} />
                    ) : (
                      <X className="text-error mt-1 flex-shrink-0" size={14} />
                    )}
                    <div className="flex-1 text-sm">
                      <div className="text-text-primary mb-1">
                        <MathText text={qq.question} />
                      </div>
                      {!correct && (
                        <div className="text-xs text-success">
                          <MathText text={qq.options[qq.correct]} />
                        </div>
                      )}
                      <div className="text-xs text-text-muted mt-1">
                        <MathText text={qq.explanation} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Link
              href={`/grades/${grade}`}
              className="flex-1 font-display text-center px-4 py-3 border border-border-default hover:border-accent transition-colors text-sm tracking-wider"
            >
              ← GRADE {grade}
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 font-display text-center px-4 py-3 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors"
            >
              DASHBOARD →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="h-0.5 bg-surface-elev sticky top-[57px] z-30">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-4 pb-8 w-full">
        <div className="flex items-center justify-between mb-4 text-xs">
          <Link
            href={`/topics/${topic.id}`}
            className="text-text-muted hover:text-text-primary font-display tracking-wider"
          >
            ← {topic.title.toUpperCase()}
          </Link>
          <span className="scoreboard text-base text-text-primary">
            {idx + 1}<span className="text-text-muted text-sm"> / {quiz.length}</span>
          </span>
        </div>

        <div className="border border-border-default bg-surface relative overflow-hidden">
          <div className="absolute inset-0 pixel-grid-fine opacity-25 pointer-events-none" />
          <div className="relative px-5 pt-6 pb-5">
            <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-3">
              ◢ QUESTION {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="text-xl md:text-2xl leading-snug mb-6">
              <MathText text={q.question} />
            </div>

            <div className="space-y-2 mb-5">
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = revealed && i === q.correct;
                const isWrongPick = revealed && isSelected && i !== q.correct;
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={`w-full text-left px-4 py-3 border transition-all flex items-center gap-3 ${
                      isCorrect
                        ? "border-success bg-success/10 animate-correct"
                        : isWrongPick
                          ? "border-error bg-error/10 animate-wrong"
                          : isSelected
                            ? "border-accent bg-accent-soft"
                            : "border-border-default hover:border-border-light"
                    } ${revealed ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <span
                      className={`font-display text-xs tracking-wider px-2 py-0.5 border ${
                        isCorrect
                          ? "border-success text-success"
                          : isWrongPick
                            ? "border-error text-error"
                            : isSelected
                              ? "border-accent text-accent"
                              : "border-border-light text-text-muted"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">
                      <MathText text={opt} />
                    </span>
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="px-4 py-3 bg-surface-elev border border-border-light text-sm mb-4">
                <span className="font-display text-[10px] tracking-[0.25em] text-accent">
                  ◢ EXPLAINED
                </span>
                <div className="mt-1">
                  <MathText text={q.explanation} />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              {!revealed ? (
                <button
                  onClick={check}
                  disabled={selected == null}
                  className="font-display text-base px-6 py-3 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  CHECK
                </button>
              ) : (
                <button
                  onClick={next}
                  className="font-display text-base px-6 py-3 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors flex items-center gap-2"
                >
                  {idx < quiz.length - 1 ? "NEXT" : "RESULTS"}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <RewardOverlay
        show={reward != null}
        stat={reward || ""}
        glyph="⚡"
        onDone={() => setReward(null)}
      />
    </>
  );
}
