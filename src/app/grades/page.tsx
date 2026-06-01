import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CURRICULUM } from "@/lib/curriculum";

export default function GradesIndex() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-8 pb-12 w-full">
        <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-2">
          ◢ ALL GRADES
        </div>
        <h1 className="font-display text-4xl font-bold mb-2">Pick your level</h1>
        <p className="text-text-secondary text-sm mb-8">
          Kazakhstan national curriculum, grades 7–11.
        </p>
        <div className="space-y-2">
          {CURRICULUM.map((g) => {
            const topicCount = g.subjects.reduce((n, s) => n + s.topics.length, 0);
            return (
              <Link
                key={g.grade}
                href={`/grades/${g.grade}`}
                className="group relative block border border-border-default bg-surface hover:border-accent transition-colors"
              >
                <div className="absolute inset-0 pixel-grid-fine opacity-25" />
                <div className="relative px-5 py-5 flex items-center gap-5">
                  <div className="scoreboard text-5xl md:text-6xl text-accent leading-none w-16 flex-shrink-0">
                    {g.grade}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
                      GRADE
                    </div>
                    <div className="font-display text-lg font-bold leading-tight">
                      {g.description}
                    </div>
                    <div className="text-xs text-text-muted mt-1 font-display tracking-wider">
                      {topicCount} TOPICS · {g.subjects.length} SUBJECTS
                    </div>
                  </div>
                  <span className="font-display text-accent text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
