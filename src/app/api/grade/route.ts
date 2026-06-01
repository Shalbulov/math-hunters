import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json({ error: "GEMINI_API_KEY missing" }, { status: 500 });
  }

  let body: { problem: string; userAnswer: string; expectedAnswer: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { problem, userAnswer, expectedAnswer } = body;
  if (!problem || !userAnswer || !expectedAnswer) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const prompt = `You are grading a math student's answer.
Problem: ${problem}
Expected answer: ${expectedAnswer}
Student's answer: ${userAnswer}

Are they mathematically equivalent? Respond ONLY in JSON: {"correct": true|false, "feedback": "one short sentence", "solution": "step-by-step worked solution using $...$ for LaTeX"}.
Solution should be 2-4 numbered steps, concise.`;

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return Response.json(JSON.parse(text));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: msg }, { status: 500 });
  }
}
