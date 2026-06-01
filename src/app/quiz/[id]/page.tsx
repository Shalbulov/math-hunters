"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { findTopic } from "@/lib/curriculum";
import { MathText } from "@/components/Math";
import { recordQuiz } from "@/lib/store";
import { Check, X, Trophy, Sparkles, ArrowRight } from "lucide-react";

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
    return (
      <>
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
          <div className="rounded-lg bg-primary border border-border-default p-8 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg" />
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                summary.passing ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
              }`}
            >
              {summary.passing ? <Trophy size={40} /> : <Sparkles size={40} />}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {summary.passing ? "Quiz passed!" : "Keep practicing!"}
            </h1>
            <p className="text-text-secondary mb-6">
              You scored{" "}
              <span className="text-accent-blue font-bold">
                {summary.score}/{quiz.length}
              </span>{" "}
              ({Math.round((summary.score / quiz.length) * 100)}%) ·{" "}
              <span className="text-accent-blue">+{summary.earned} XP</span>
            </p>

            <div className="text-left space-y-4 my-8">
              {quiz.map((qq, i) => {
                const correct = answers[i] === qq.correct;
                return (
                  <div
                    key={qq.id}
                    className={`rounded-md border p-4 ${
                      correct
                        ? "border-success/40 bg-success/5"
                        : "border-error/40 bg-error/5"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {correct ? (
                        <Check className="text-success mt-0.5" size={18} />
                      ) : (
                        <X className="text-error mt-0.5" size={18} />
                      )}
                      <div className="text-sm">
                        <MathText text={qq.question} />
                      </div>
                    </div>
                    {!correct && (
                      <div className="text-xs text-text-secondary ml-7">
                        Correct answer:{" "}
                        <span className="text-success">
                          <MathText text={qq.options[qq.correct]} />
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-text-secondary ml-7 mt-1">
                      <MathText text={qq.explanation} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/grades/${grade}`}
                className="px-6 py-3 rounded-md border border-accent-blue text-accent-blue hover:bg-accent-blue/10 transition-colors"
              >
                Back to Grade {grade}
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors"
              >
                View dashboard
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-3 text-sm text-text-secondary">
          <Link href={`/topics/${topic.id}`} className="hover:text-accent-blue">
            ← Back to topic
          </Link>
          <span>
            Question {idx + 1} / {quiz.length}
          </span>
        </div>

        <div className="h-2 bg-primary rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-accent-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-lg bg-primary border border-border-default p-6 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg" />
          <div className="text-lg mb-6">
            <MathText text={q.question} />
          </div>

          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = revealed && i === q.correct;
              const isWrongPick = revealed && isSelected && i !== q.correct;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={`w-full text-left p-4 rounded-md border transition-all ${
                    isCorrect
                      ? "border-success bg-success/10 animate-correct"
                      : isWrongPick
                        ? "border-error bg-error/10 animate-wrong"
                        : isSelected
                          ? "border-accent-blue bg-accent-blue/5"
                          : "border-border-default hover:border-accent-blue/50"
                  } ${revealed ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span className="font-semibold text-accent-blue mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <MathText text={opt} />
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className="mb-4 p-4 rounded-md bg-primary-light border border-border-default text-sm">
              <strong className="text-accent-blue">Explanation: </strong>
              <MathText text={q.explanation} />
            </div>
          )}

          <div className="flex justify-end">
            {!revealed ? (
              <button
                onClick={check}
                disabled={selected == null}
                className="px-6 py-2.5 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Check answer
              </button>
            ) : (
              <button
                onClick={next}
                className="px-6 py-2.5 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors flex items-center gap-2"
              >
                {idx < quiz.length - 1 ? "Next" : "See results"}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
