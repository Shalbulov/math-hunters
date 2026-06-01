"use client";

import { useState } from "react";
import { Lightbulb, RotateCw, Eye } from "lucide-react";
import { MathText } from "@/components/Math";

type Problem = { problem: string; hint: string; answer: string };

export function PracticeProblem({ topicId }: { topicId: string }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setShowHint(false);
    setShowAnswer(false);
    setProblem(null);
    try {
      const res = await fetch("/api/generate-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setProblem(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate problem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg bg-primary border border-border-default p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">AI-generated practice</h3>
        <button
          onClick={generate}
          disabled={loading}
          className="text-sm px-3 py-1.5 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors disabled:opacity-40 flex items-center gap-1.5"
        >
          <RotateCw size={14} className={loading ? "animate-spin" : ""} />
          {problem ? "New problem" : "Generate"}
        </button>
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
      {!problem && !loading && !error && (
        <p className="text-text-secondary text-sm">
          Click <span className="text-accent-blue">Generate</span> for a fresh problem from Gemini.
        </p>
      )}
      {problem && (
        <div className="space-y-3">
          <div className="text-base">
            <MathText text={problem.problem} />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs px-3 py-1.5 rounded-md border border-border-default hover:border-accent-blue flex items-center gap-1"
            >
              <Lightbulb size={12} /> {showHint ? "Hide hint" : "Hint"}
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="text-xs px-3 py-1.5 rounded-md border border-border-default hover:border-accent-blue flex items-center gap-1"
            >
              <Eye size={12} /> {showAnswer ? "Hide answer" : "Show answer"}
            </button>
          </div>
          {showHint && (
            <div className="text-sm text-warning bg-warning/10 border border-warning/30 rounded-md p-3">
              💡 <MathText text={problem.hint} />
            </div>
          )}
          {showAnswer && (
            <div className="text-sm text-success bg-success/10 border border-success/30 rounded-md p-3">
              ✓ <MathText text={problem.answer} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
