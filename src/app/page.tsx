import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CURRICULUM } from "@/lib/curriculum";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 pixel-grid opacity-50 [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
          <div className="relative max-w-[720px] mx-auto px-4 md:px-0 pt-14 md:pt-20 pb-16">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-accent/30 text-accent text-[11px] tracking-wider font-display mb-8">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              GEMINI 2.5 FLASH · LIVE
            </div>
            <h1 className="font-display text-[56px] md:text-[88px] leading-[0.95] tracking-[-0.03em] font-bold">
              HUNT<br />
              YOUR<br />
              <span className="text-accent text-glow-cyan">MATH<span className="text-text-primary">.</span></span>
            </h1>
            <p className="mt-6 text-[15px] text-text-secondary max-w-md leading-relaxed">
              Grade 7–11 Kazakhstan curriculum. Built like the games you already play —
              streaks, ranks, instant feedback. No filler.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <Link
                href="/onboarding"
                className="font-display text-base px-6 py-3 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors inline-flex items-center gap-2"
              >
                START HUNT <ArrowRight size={16} />
              </Link>
              <Link
                href="/grades"
                className="font-display text-base px-6 py-3 border border-border-light text-text-primary hover:border-accent transition-colors"
              >
                BROWSE
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-border-default">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 py-14">
            <div className="font-display text-[11px] tracking-[0.2em] text-text-muted mb-6">
              ◢ PICK YOUR GRADE
            </div>
            <div className="grid grid-cols-5 gap-2">
              {CURRICULUM.map((g) => (
                <Link
                  key={g.grade}
                  href={`/grades/${g.grade}`}
                  className="group relative aspect-square border border-border-default bg-surface hover:border-accent transition-colors flex flex-col items-center justify-center"
                >
                  <div className="scoreboard text-3xl md:text-5xl text-text-primary group-hover:text-accent transition-colors">
                    {g.grade}
                  </div>
                  <div className="font-display text-[9px] tracking-wider text-text-muted mt-1">
                    GRADE
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border-default">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 py-14">
            <div className="font-display text-[11px] tracking-[0.2em] text-text-muted mb-6">
              ◢ HOW IT FEELS
            </div>
            <div className="space-y-px bg-border-default">
              <FeatureRow num="01" title="Tutor on tap" body="Gemini explains every step. Ask anything mid-lesson." />
              <FeatureRow num="02" title="Earn ranks" body="XP, levels, streaks. Hunter 1 → 100." />
              <FeatureRow num="03" title="Real videos" body="Curated Khan Academy + Organic Chemistry Tutor." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureRow({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="bg-surface px-5 py-6 flex items-baseline gap-6">
      <span className="scoreboard text-2xl text-accent w-10 flex-shrink-0">{num}</span>
      <div>
        <h3 className="font-display text-lg mb-1">{title}</h3>
        <p className="text-sm text-text-secondary">{body}</p>
      </div>
    </div>
  );
}
