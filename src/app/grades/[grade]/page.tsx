import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CURRICULUM, findGrade } from "@/lib/curriculum";
import { MathInline } from "@/components/Math";

export function generateStaticParams() {
  return CURRICULUM.map((g) => ({ grade: String(g.grade) }));
}

export default async function GradePage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const { grade } = await params;
  const g = findGrade(Number(grade));
  if (!g) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto px-4 md:px-0 pt-8 pb-12 w-full">
        <div className="text-xs text-text-muted mb-3 font-display tracking-wider">
          <Link href="/grades" className="hover:text-accent">
            GRADES
          </Link>{" "}
          / G{g.grade}
        </div>

        <div className="flex items-end gap-4 mb-2">
          <span className="scoreboard text-7xl md:text-8xl text-accent leading-[0.85]">
            {g.grade}
          </span>
          <div className="pb-2">
            <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
              GRADE
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight">
              {g.description}
            </h1>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {g.subjects.map((subj) => (
            <section key={subj.id}>
              <div className="flex items-center gap-2 mb-3">
                <div className="font-display text-[10px] tracking-[0.25em] text-accent">
                  ◢ {subj.name.toUpperCase()}
                </div>
                <div className="flex-1 h-px bg-border-default" />
                <div className="text-xs text-text-muted font-display tracking-wider">
                  {subj.topics.length}
                </div>
              </div>
              <div className="space-y-px bg-border-default">
                {subj.topics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/topics/${t.id}`}
                    className="group bg-surface flex items-center gap-4 px-4 py-4 hover:bg-surface-elev transition-colors"
                  >
                    <span className="font-math text-accent text-base bg-bg border border-border-default px-2 py-1 min-w-[44px] text-center">
                      <MathInline>{t.icon}</MathInline>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold truncate">{t.title}</div>
                      <div className="text-xs text-text-muted truncate">{t.summary}</div>
                    </div>
                    <span className="font-display text-text-muted group-hover:text-accent transition-colors">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
