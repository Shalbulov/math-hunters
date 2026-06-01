"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MathText } from "@/components/Math";
import { ChatInterface } from "@/components/ChatInterface";
import { RewardOverlay } from "@/components/RewardOverlay";
import { Keypad } from "@/components/Keypad";
import type { Topic } from "@/lib/curriculum";
import { gainXP } from "@/lib/store";
import { ArrowLeft, ArrowRight, Bot, BookOpen, Play, Zap, RotateCw, Lightbulb } from "lucide-react";

type Tab = "solve" | "theory" | "video" | "tutor";
type Problem = { problem: string; hint: string; answer: string };

export function LessonScreen({
  topic,
  grade,
  subject,
}: {
  topic: Topic;
  grade: number;
  subject: string;
}) {
  const [tab, setTab] = useState<Tab>("solve");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loadingProblem, setLoadingProblem] = useState(false);
  const [answer, setAnswer] = useState("");
  const [grading, setGrading] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [result, setResult] = useState<{
    correct: boolean;
    feedback: string;
    solution: string;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  // Auto-generate first problem on mount
  useEffect(() => {
    if (tab === "solve" && !problem && !loadingProblem) {
      void generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function generate() {
    setLoadingProblem(true);
    setProblem(null);
    setAnswer("");
    setFlipped(false);
    setResult(null);
    setShowHint(false);
    try {
      const res = await fetch("/api/generate-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId: topic.id }),
      });
      const data = await res.json();
      if (res.ok) setProblem(data);
      else setProblem({ problem: "Could not load problem.", hint: "", answer: "" });
    } finally {
      setLoadingProblem(false);
    }
  }

  async function submit() {
    if (!problem || !answer.trim() || grading) return;
    setGrading(true);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: problem.problem,
          userAnswer: answer,
          expectedAnswer: problem.answer,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
        if (data.correct) {
          setFlipped(true);
          const newStreak = streak + 1;
          setStreak(newStreak);
          gainXP(20);
          setTimeout(() => {
            setReward(newStreak >= 3 ? `×${newStreak} CHAIN` : "+20 XP");
          }, 400);
        } else {
          setStreak(0);
        }
      }
    } finally {
      setGrading(false);
    }
  }

  function nextProblem() {
    void generate();
  }

  return (
    <>
      <Header />

      {/* Thin progress bar in status-bar area */}
      <div className="h-0.5 bg-surface-elev sticky top-[57px] z-30">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: streak > 0 ? `${Math.min(100, streak * 20)}%` : "8%" }}
        />
      </div>

      <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-4 pb-6 w-full">
        <div className="flex items-center justify-between mb-3">
          <Link
            href={`/grades/${grade}`}
            className="text-text-muted hover:text-text-primary flex items-center gap-1 text-xs"
          >
            <ArrowLeft size={14} /> Grade {grade} · {subject}
          </Link>
          {streak > 0 && (
            <span className="font-display text-xs tracking-wider text-accent">
              CHAIN {streak}
            </span>
          )}
        </div>

        <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-1">
          {topic.title}
        </h1>
        <p className="text-xs text-text-muted mb-4">{topic.titleRu}</p>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-px bg-border-default mb-4 border border-border-default">
          <TabBtn active={tab === "solve"} onClick={() => setTab("solve")} icon={<Zap size={14} />} label="SOLVE" />
          <TabBtn active={tab === "theory"} onClick={() => setTab("theory")} icon={<BookOpen size={14} />} label="THEORY" />
          <TabBtn active={tab === "video"} onClick={() => setTab("video")} icon={<Play size={14} />} label="VIDEO" />
          <TabBtn active={tab === "tutor"} onClick={() => setTab("tutor")} icon={<Bot size={14} />} label="TUTOR" />
        </div>

        {tab === "solve" && (
          <SolveTab
            problem={problem}
            loading={loadingProblem}
            answer={answer}
            grading={grading}
            flipped={flipped}
            result={result}
            showHint={showHint}
            toggleHint={() => setShowHint(!showHint)}
            onChar={(c) => setAnswer((a) => a + c)}
            onBackspace={() => setAnswer((a) => a.slice(0, -1))}
            onSubmit={submit}
            onNext={nextProblem}
          />
        )}

        {tab === "theory" && (
          <div className="border border-border-default bg-surface p-5 relative">
            <div className="absolute inset-0 pixel-grid-fine opacity-20 pointer-events-none" />
            <div className="relative">
              <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-3">
                ◢ CORE
              </div>
              <div className="leading-relaxed text-text-primary text-[15px]">
                <MathText text={topic.theory} />
              </div>
            </div>
          </div>
        )}

        {tab === "video" && topic.youtubeId && (
          <div className="border border-border-default bg-surface overflow-hidden">
            <div className="aspect-video w-full bg-bg">
              <iframe
                src={`https://www.youtube.com/embed/${topic.youtubeId}`}
                title={topic.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="px-4 py-2.5 text-[10px] font-display tracking-wider text-text-muted border-t border-border-default flex items-center gap-1.5">
              <Play size={11} className="text-accent" /> CURATED LESSON
            </div>
          </div>
        )}

        {tab === "tutor" && <ChatInterface topicId={topic.id} />}

        {/* Quiz CTA */}
        <Link
          href={`/quiz/${topic.id}`}
          className="mt-6 block border border-accent bg-surface-elev px-5 py-4 hover:bg-accent-soft transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-[10px] tracking-[0.25em] text-accent mb-1">
                ◢ FINAL TEST
              </div>
              <div className="font-display text-lg">
                {topic.quiz.length} questions · pass at 70%
              </div>
            </div>
            <ArrowRight
              className="text-accent group-hover:translate-x-1 transition-transform"
              size={22}
            />
          </div>
        </Link>
      </main>

      <Footer />

      <RewardOverlay
        show={reward != null}
        stat={reward || ""}
        glyph={streak >= 3 ? "🔥" : "⚡"}
        onDone={() => setReward(null)}
      />
    </>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 flex items-center justify-center gap-1.5 font-display text-[10px] tracking-[0.2em] transition-colors ${
        active ? "bg-accent text-bg" : "bg-surface text-text-muted hover:text-text-primary"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SolveTab({
  problem,
  loading,
  answer,
  grading,
  flipped,
  result,
  showHint,
  toggleHint,
  onChar,
  onBackspace,
  onSubmit,
  onNext,
}: {
  problem: Problem | null;
  loading: boolean;
  answer: string;
  grading: boolean;
  flipped: boolean;
  result: { correct: boolean; feedback: string; solution: string } | null;
  showHint: boolean;
  toggleHint: () => void;
  onChar: (c: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      {/* Equation card – occupies ~60% vertical space on mobile */}
      <div className="flip-card mb-4" style={{ minHeight: "min(58vh, 480px)" }}>
        <div
          className={`flip-card-inner relative ${flipped ? "flipped" : ""}`}
          style={{ minHeight: "min(58vh, 480px)" }}
        >
          {/* FRONT — the problem */}
          <div className="flip-face border border-border-default bg-surface overflow-hidden relative flex flex-col">
            <div className="absolute inset-0 pixel-grid-fine opacity-25 pointer-events-none" />
            <div className="relative px-5 pt-4 flex items-center justify-between">
              <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
                ◢ PROBLEM
              </div>
              <button
                onClick={onNext}
                disabled={loading}
                className="text-text-muted hover:text-accent transition-colors disabled:opacity-30"
                aria-label="New problem"
              >
                <RotateCw size={14} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
            <div className="relative flex-1 flex items-center justify-center px-6 py-8">
              {loading ? (
                <div className="text-text-muted text-sm">Generating…</div>
              ) : problem ? (
                <div className="text-center text-2xl md:text-3xl leading-relaxed">
                  <MathText text={problem.problem} />
                </div>
              ) : null}
            </div>
            <div className="relative px-5 pb-4 space-y-3">
              {/* Answer display */}
              <div className="bg-bg border border-border-default min-h-[56px] px-4 py-3 flex items-center justify-between">
                <div className="font-math text-2xl text-text-primary truncate">
                  {answer || <span className="text-text-muted">_</span>}
                </div>
                <div className="font-display text-[10px] tracking-wider text-text-muted">
                  YOUR ANSWER
                </div>
              </div>
              {result && !result.correct && (
                <div className="text-error text-xs flex items-center gap-1.5 animate-wrong">
                  <span className="font-display tracking-wider">MISS · </span>
                  <MathText text={result.feedback} />
                </div>
              )}
              {showHint && problem && problem.hint && (
                <div className="text-warning text-xs flex items-start gap-1.5">
                  <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
                  <MathText text={problem.hint} />
                </div>
              )}
              {!result && problem && problem.hint && (
                <button
                  onClick={toggleHint}
                  className="text-[10px] font-display tracking-wider text-text-muted hover:text-warning flex items-center gap-1"
                >
                  <Lightbulb size={11} /> {showHint ? "HIDE HINT" : "HINT"}
                </button>
              )}
            </div>
          </div>

          {/* BACK — worked solution after correct */}
          <div className="flip-face flip-face-back border border-success bg-surface overflow-hidden relative flex flex-col">
            <div className="absolute inset-0 pixel-grid-fine opacity-25 pointer-events-none" />
            <div className="relative px-5 pt-4 flex items-center justify-between">
              <div className="font-display text-[10px] tracking-[0.25em] text-success">
                ◢ SOLVED
              </div>
              <button
                onClick={onNext}
                className="font-display text-[10px] tracking-wider text-accent hover:text-text-primary"
              >
                NEXT →
              </button>
            </div>
            <div className="relative flex-1 px-6 py-4 overflow-y-auto">
              {result && (
                <>
                  <div className="text-base mb-3 text-text-secondary">
                    <MathText text={problem?.problem || ""} />
                  </div>
                  <div className="text-base leading-relaxed">
                    <MathText text={result.solution} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keypad */}
      <Keypad
        onChar={onChar}
        onBackspace={onBackspace}
        onSubmit={onSubmit}
        canSubmit={!flipped && answer.length > 0 && !!problem}
        loading={grading}
      />
    </div>
  );
}
