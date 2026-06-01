import { GoogleGenerativeAI } from "@google/generative-ai";
import { findTopic } from "@/lib/curriculum";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  let body: { topicId: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const t = findTopic(body.topicId);
  if (!t) {
    return Response.json({ error: "Unknown topic" }, { status: 404 });
  }

  const prompt = `Generate ONE practice problem for a Kazakhstan grade ${t.grade} student studying "${t.topic.title}".
Theory recap: ${t.topic.theory}

Output JSON only with this shape: {"problem": "...", "hint": "...", "answer": "..."}.
Use $...$ for inline LaTeX. Difficulty: medium. Do not include anything outside the JSON.`;

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);
    return Response.json(parsed);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: `Gemini error: ${msg}` }, { status: 500 });
  }
}
