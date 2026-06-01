import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CURRICULUM } from "@/lib/curriculum";
import { Sparkles, Video, Trophy, Bot } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/40 text-accent-blue text-xs mb-6">
            <Sparkles size={14} /> Gemini AI tutor · Free tier
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            MATH <span className="text-accent-blue text-glow-blue">HUNTERS</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Master Kazakhstan grades 7–11 mathematics with AI-powered tutoring,
            curated video lessons, and gamified quizzes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/grades"
              className="px-8 py-3 rounded-md bg-accent-blue text-primary-dark font-semibold hover:bg-accent-light transition-colors glow-blue"
            >
              Start learning free
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 rounded-md border-2 border-accent-blue text-accent-blue font-semibold hover:bg-accent-blue/10 transition-colors"
            >
              Create account
            </Link>
          </div>

          <div id="how" className="mt-20 grid md:grid-cols-3 gap-6 text-left">
            <Feature
              icon={<Bot className="text-accent-blue" size={28} />}
              title="AI Tutor"
              text="Step-by-step explanations on demand, aligned to the Kazakhstan syllabus."
            />
            <Feature
              icon={<Video className="text-accent-blue" size={28} />}
              title="Video Lessons"
              text="Curated YouTube lessons embedded right next to each topic's theory."
            />
            <Feature
              icon={<Trophy className="text-accent-blue" size={28} />}
              title="Gamified Learning"
              text="Earn XP, level up Hunter ranks, unlock badges, and build streaks."
            />
          </div>
        </section>

        <section className="border-t border-border-default bg-primary/30">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold mb-2">Pick your grade</h2>
            <p className="text-text-secondary mb-8">
              Topics aligned with the Kazakhstan national curriculum.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {CURRICULUM.map((g) => (
                <Link
                  key={g.grade}
                  href={`/grades/${g.grade}`}
                  className="group relative rounded-lg bg-primary border border-border-default p-5 hover:border-accent-blue transition-colors"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xs text-text-secondary">Grade</div>
                  <div className="text-4xl font-bold text-accent-blue">{g.grade}</div>
                  <div className="mt-3 text-xs text-text-secondary line-clamp-2">
                    {g.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="relative rounded-lg bg-primary border border-border-default p-6">
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg" />
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{text}</p>
    </div>
  );
}
