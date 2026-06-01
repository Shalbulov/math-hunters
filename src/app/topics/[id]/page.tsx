import { notFound } from "next/navigation";
import { allTopics, findTopic } from "@/lib/curriculum";
import { LessonScreen } from "@/components/LessonScreen";

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
  return (
    <LessonScreen
      topic={found.topic}
      grade={found.grade}
      subject={found.subject}
    />
  );
}
