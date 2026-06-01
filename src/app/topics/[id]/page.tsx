import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { allTopics, findTopic } from "@/lib/curriculum";
import { MathInline, MathText } from "@/components/Math";
import { ChatInterface } from "@/components/ChatInterface";
import { PracticeProblem } from "@/components/PracticeProblem";
import { PlayCircle } from "lucide-react";

export function generateStaticParams() {
  return allTopics().map((t) => ({ id: t.id }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const found = findTopic(id);
  if (!found) notFound();
  const { topic, grade, subject } = found;

  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="text-sm text-text-secondary mb-3">
          <Link href="/grades" className="hover:text-accent-blue">
            Grades
          </Link>{" "}
          /{" "}
          <Link href={`/grades/${grade}`} className="hover:text-accent-blue">
            Grade {grade}
          </Link>{" "}
          / {subject}
        </div>

        <div className="flex items-start gap-4 mb-2">
          <span className="font-math text-accent-blue text-2xl px-4 py-2 rounded-lg bg-primary border border-accent-blue/40 glow-blue">
            <MathInline>{topic.icon}</MathInline>
          </span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
            <p className="text-text-secondary text-sm">{topic.titleRu}</p>
          </div>
        </div>
        <p className="text-text-secondary mb-8">{topic.summary}</p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {topic.youtubeId && (
              <div className="rounded-lg bg-primary border border-border-default overflow-hidden">
                <div className="aspect-video w-full bg-primary-dark">
                  <iframe
                    src={`https://www.youtube.com/embed/${topic.youtubeId}`}
                    title={topic.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="px-4 py-2 text-xs text-text-secondary flex items-center gap-1.5 border-t border-border-default">
                  <PlayCircle size={14} className="text-accent-blue" />
                  Curated video lesson
                </div>
              </div>
            )}

            <div className="rounded-lg bg-primary border border-border-default p-5 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent-blue rounded-t-lg" />
              <h2 className="font-semibold mb-3">Theory</h2>
              <div className="text-text-primary leading-relaxed">
                <MathText text={topic.theory} />
              </div>
            </div>

            <div className="rounded-lg bg-primary border border-border-default p-5">
              <h2 className="font-semibold mb-3">Practice problems</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-primary">
                {topic.practice.map((p, i) => (
                  <li key={i}>
                    <MathText text={p} />
                  </li>
                ))}
              </ol>
            </div>

            <PracticeProblem topicId={topic.id} />
          </div>

          <div className="space-y-6">
            <ChatInterface topicId={topic.id} />

            <Link
              href={`/quiz/${topic.id}`}
              className="block text-center px-6 py-4 rounded-lg bg-accent-blue text-primary-dark font-semibold hover:bg-accent-light transition-colors glow-blue"
            >
              Take quiz ({topic.quiz.length} questions) →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
