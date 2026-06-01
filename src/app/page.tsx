import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlyphMarquee } from "@/components/GlyphMarquee";
import { CURRICULUM } from "@/lib/curriculum";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 pt-12 md:pt-16 pb-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-accent/30 text-accent text-[10px] tracking-[0.2em] font-display mb-6">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  GEMINI 2.5 FLASH · LIVE
                </div>
                <h1 className="font-display text-[64px] sm:text-[96px] md:text-[120px] leading-[0.88] tracking-[-0.04em] font-bold">
                  HUNT<br />
                  YOUR<br />
                  <span className="text-accent text-glow-cyan">
                    MATH<span className="text-text-primary">.</span>
                  </span>
                </h1>
              </div>
              {/* Demo HUD card on the right (desktop) */}
              <div className="hidden md:flex flex-col items-end gap-3 pb-6">
                <div className="border border-border-default bg-surface px-4 py-3 w-44 relative overflow-hidden">
                  <div className="absolute inset-0 pixel-grid-fine opacity-30" />
                  <div className="relative">
                    <div className="font-display text-[9px] tracking-[0.3em] text-text-muted">
                      ◢ TOPICS
                    </div>
                    <div className="scoreboard text-3xl text-text-primary mt-0.5 leading-none">
                      8
                    </div>
                  </div>
                </div>
                <div className="border border-border-default bg-surface px-4 py-3 w-44 relative overflow-hidden">
                  <div className="absolute inset-0 pixel-grid-fine opacity-30" />
                  <div className="relative">
                    <div className="font-display text-[9px] tracking-[0.3em] text-text-muted">
                      ◢ GRADES
                    </div>
                    <div className="scoreboard text-3xl text-accent mt-0.5 leading-none">
                      7—11
                    </div>
                  </div>
                </div>
                <div className="border border-accent bg-surface-elev px-4 py-3 w-44 glow-cyan relative overflow-hidden">
                  <div className="absolute inset-0 pixel-grid-fine opacity-30" />
                  <div className="relative">
                    <div className="font-display text-[9px] tracking-[0.3em] text-accent">
                      ◢ QUIZZES
                    </div>
                    <div className="scoreboard text-3xl text-text-primary mt-0.5 leading-none">
                      40+
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 md:mt-10 text-[15px] text-text-secondary max-w-md leading-relaxed">
              Grade 7–11 Kazakhstan curriculum. Built like the games you already play —
              streaks, ranks, instant feedback. No filler.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
              <div className="font-display text-[11px] tracking-[0.2em] text-text-muted">
                <span className="text-success">●</span> NO SIGN-UP · FREE
              </div>
            </div>
          </div>
        </section>

        {/* Live math marquee — fills horizontal space, ambient motion */}
        <GlyphMarquee />

        {/* Pick your grade */}
        <section className="border-t border-border-default">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 py-14">
            <div className="flex items-baseline justify-between mb-5">
              <div className="font-display text-[11px] tracking-[0.2em] text-text-muted">
                ◢ PICK YOUR GRADE
              </div>
              <div className="font-display text-[10px] tracking-wider text-text-muted">
                5 / 5
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {CURRICULUM.map((g) => (
                <Link
                  key={g.grade}
                  href={`/grades/${g.grade}`}
                  className="group relative aspect-square border border-border-default bg-surface hover:border-accent transition-colors flex flex-col items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 pixel-grid-fine opacity-25 group-hover:opacity-50 transition-opacity" />
                  <div className="relative scoreboard text-3xl md:text-5xl text-text-primary group-hover:text-accent transition-colors">
                    {g.grade}
                  </div>
                  <div className="relative font-display text-[9px] tracking-wider text-text-muted mt-1">
                    GRADE
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it feels */}
        <section className="border-t border-border-default">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 py-14">
            <div className="font-display text-[11px] tracking-[0.2em] text-text-muted mb-5">
              ◢ HOW IT FEELS
            </div>
            <div className="space-y-px bg-border-default">
              <FeatureRow num="01" title="Tutor on tap" body="Gemini explains every step. Ask anything mid-lesson." />
              <FeatureRow num="02" title="Earn ranks" body="XP, levels, streaks. Hunter 1 → 100." />
              <FeatureRow num="03" title="Real videos" body="Curated Khan Academy + Organic Chemistry Tutor." />
              <FeatureRow num="04" title="Built for KZ" body="Aligned with the national curriculum, grades 7–11." />
            </div>
          </div>
        </section>

        {/* Stat band */}
        <section className="border-t border-border-default bg-surface/40">
          <div className="max-w-[720px] mx-auto px-4 md:px-0 py-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border-default">
            <Stat label="GRADES" value="5" />
            <Stat label="TOPICS" value="8" />
            <Stat label="QUIZ Qs" value="40" />
            <Stat label="API" value="LIVE" />
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg px-5 py-5">
      <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
        {label}
      </div>
      <div className="scoreboard text-3xl text-text-primary mt-1">{value}</div>
    </div>
  );
}
