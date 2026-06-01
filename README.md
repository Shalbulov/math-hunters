# Math Hunters

AI-powered mathematics learning platform for grades 7–11 (Kazakhstan national curriculum).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · KaTeX · Gemini 2.5 Flash · Prisma + Neon (ready for Phase 2).

## Features (MVP)

- Curriculum-aligned topics for grades 7–11 (Algebra, Geometry, Calculus)
- YouTube video lessons embedded per topic
- KaTeX-rendered theory and equations
- AI tutor chat powered by Gemini, with per-topic context injection
- Gemini-generated practice problems with hint/answer reveal
- Multiple-choice quizzes with instant feedback, explanations, and animations
- Gamification: XP, levels (Hunter ranks), streaks, badges
- Dashboard with progress, recent activity, badges
- Local sign-up/sign-in (browser-only) – ready to swap for Prisma+Neon

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in GEMINI_API_KEY
npm run dev
```

Open <http://localhost:3000>.

Get a free Gemini API key: <https://aistudio.google.com/apikey>.

## Design system

Dark navy `#0A192F` background, white text, electric blue `#00D4FF` accents — defined as Tailwind v4 tokens in `src/app/globals.css`.

## Project structure

```
src/
  app/
    page.tsx                 Landing
    grades/                  Grade index + per-grade
    topics/[id]/             Topic page (video + theory + AI chat + practice)
    quiz/[id]/               Quiz with scoring
    dashboard/               XP, level, badges
    login/, register/        Local auth
    api/chat/                Gemini chat endpoint
    api/generate-problem/    Gemini practice problem generator
  components/                Header, Footer, Logo, Math, ChatInterface, PracticeProblem
  lib/
    curriculum.ts            Kazakhstan grades 7-11 data
    store.ts                 localStorage progress store
prisma/schema.prisma         Future Postgres schema (User, Progress, Quiz, Badge)
```

## Roadmap

- **Phase 1 (MVP) — shipped:** UI, curriculum, AI chat, quizzes, gamification with localStorage
- **Phase 2 — server-side:** Prisma + Neon, real auth, persistent progress, leaderboard
- **Phase 3 — advanced:** Adaptive difficulty, teacher dashboard, Kazakh/Russian/English UI
