import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CURRICULUM } from "@/lib/curriculum";

export default function GradesIndex() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-bold mb-2">All Grades</h1>
        <p className="text-text-secondary mb-10">
          Kazakhstan national curriculum, grades 7–11.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM.map((g) => (
            <Link
              key={g.grade}
              href={`/grades/${g.grade}`}
              className="group relative rounded-lg bg-primary border border-border-default p-6 hover:border-accent-blue transition-colors"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg" />
              <div className="text-xs text-text-secondary">Grade</div>
              <div className="text-5xl font-bold text-accent-blue mb-2">{g.grade}</div>
              <p className="text-text-secondary text-sm mb-4">{g.description}</p>
              <div className="text-xs text-text-secondary">
                {g.subjects.reduce((n, s) => n + s.topics.length, 0)} topics ·{" "}
                {g.subjects.length} subjects
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
