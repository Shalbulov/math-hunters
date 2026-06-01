"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadState, xpForLevel, type UserState } from "@/lib/store";
import { allTopics, findTopic } from "@/lib/curriculum";
import { Award, BookCheck, Flame, Trophy, Zap } from "lucide-react";

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
  const quizCount = Object.keys(state.quizResults).length;
  const xpNeeded = xpForLevel(state.level);
  const xpProgress = (state.xp / xpNeeded) * 100;

  const lastFive = state.completedTopics
    .slice(-5)
    .reverse()
    .map((id) => findTopic(id))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back{state.name ? `, ${state.name}` : ""}!
          </h1>
          <p className="text-text-secondary mt-1">
            Level {state.level} Hunter ·{" "}
            <span className="text-accent-blue">{state.xp}</span> / {xpNeeded} XP
            {state.streak > 0 && (
              <>
                {" "}· <Flame className="inline text-warning" size={14} />{" "}
                {state.streak}-day streak
              </>
            )}
          </p>
          <div className="h-2 bg-primary rounded-full overflow-hidden mt-4 max-w-md">
            <div
              className="h-full bg-accent-blue transition-all duration-500"
              style={{ width: `${Math.min(100, xpProgress)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<BookCheck className="text-accent-blue" size={20} />}
            label="Topics"
            value={`${completedCount}/${totalTopics}`}
          />
          <StatCard
            icon={<Trophy className="text-accent-blue" size={20} />}
            label="Quizzes"
            value={String(quizCount)}
          />
          <StatCard
            icon={<Zap className="text-accent-blue" size={20} />}
            label="Total XP"
            value={String(state.xp + (state.level - 1) * 300)}
          />
          <StatCard
            icon={<Award className="text-accent-blue" size={20} />}
            label="Badges"
            value={String(state.badges.length)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg bg-primary border border-border-default p-5">
            <h2 className="font-semibold mb-4">Recent activity</h2>
            {lastFive.length === 0 ? (
              <div className="text-text-secondary text-sm">
                No completed topics yet.{" "}
                <Link href="/grades" className="text-accent-blue hover:underline">
                  Start learning
                </Link>
              </div>
            ) : (
              <ul className="space-y-2">
                {lastFive.map(
                  (f) =>
                    f && (
                      <li key={f.topic.id} className="flex items-center gap-2 text-sm">
                        <BookCheck className="text-success" size={16} />
                        <Link
                          href={`/topics/${f.topic.id}`}
                          className="hover:text-accent-blue"
                        >
                          {f.topic.title}
                        </Link>
                        <span className="text-text-secondary text-xs ml-auto">
                          G{f.grade}
                        </span>
                      </li>
                    ),
                )}
              </ul>
            )}
          </div>

          <div className="rounded-lg bg-primary border border-border-default p-5">
            <h2 className="font-semibold mb-4">Badges</h2>
            {state.badges.length === 0 ? (
              <p className="text-text-secondary text-sm">
                No badges yet — complete topics and quizzes to earn them.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/40 text-accent-blue text-xs flex items-center gap-1"
                  >
                    <Award size={12} /> {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={state.grade ? `/grades/${state.grade}` : "/grades"}
            className="inline-block px-6 py-3 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors"
          >
            Continue learning →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-primary border border-border-default p-5 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg" />
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-text-secondary">{label}</div>
    </div>
  );
}
