import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CURRICULUM, findGrade } from "@/lib/curriculum";
import { MathInline } from "@/components/Math";
import { ChevronRight } from "lucide-react";

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
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-sm text-text-secondary mb-2">
          <Link href="/grades" className="hover:text-accent-blue">
            Grades
          </Link>{" "}
          / Grade {g.grade}
        </div>
        <h1 className="text-4xl font-bold mb-2">Grade {g.grade}</h1>
        <p className="text-text-secondary mb-10">{g.description}</p>

        <div className="space-y-10">
          {g.subjects.map((subj) => (
            <section key={subj.id}>
              <h2 className="text-2xl font-semibold mb-4 text-accent-blue">
                {subj.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {subj.topics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/topics/${t.id}`}
                    className="group relative rounded-lg bg-primary border border-border-default p-5 hover:border-accent-blue transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-math text-accent-blue text-sm px-2 py-0.5 rounded bg-primary-dark border border-border-default">
                          <MathInline>{t.icon}</MathInline>
                        </span>
                        <h3 className="font-semibold">{t.title}</h3>
                      </div>
                      <p className="text-sm text-text-secondary">{t.summary}</p>
                      <p className="text-xs text-text-muted mt-1">{t.titleRu}</p>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-text-secondary group-hover:text-accent-blue transition-colors flex-shrink-0 mt-1"
                    />
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
