"use client";

const KEY = "math-hunters-state-v1";

export type UserState = {
  email: string | null;
  name: string | null;
  grade: number | null;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string | null;
  completedTopics: string[];
  quizResults: Record<string, { score: number; total: number; passedAt: string }>;
  badges: string[];
  /** xpHistory: array of { date: ISO yyyy-mm-dd, xp: number gained that day } */
  xpHistory: { date: string; xp: number }[];
};

const DEFAULT: UserState = {
  email: null,
  name: null,
  grade: null,
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  completedTopics: [],
  quizResults: {},
  badges: [],
  xpHistory: [],
};

export function loadState(): UserState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveState(s: UserState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("mh:state"));
}

export function xpForLevel(level: number) {
  return level * 300;
}

function recordXpDay(s: UserState, amount: number) {
  const today = new Date().toISOString().slice(0, 10);
  const last = s.xpHistory[s.xpHistory.length - 1];
  if (last && last.date === today) {
    last.xp += amount;
  } else {
    s.xpHistory.push({ date: today, xp: amount });
  }
  if (s.xpHistory.length > 60) s.xpHistory.shift();
}

export function gainXP(amount: number) {
  const s = loadState();
  s.xp += amount;
  recordXpDay(s, amount);
  while (s.xp >= xpForLevel(s.level)) {
    s.xp -= xpForLevel(s.level);
    s.level += 1;
  }
  updateStreak(s);
  saveState(s);
  return s;
}

export function completeTopic(topicId: string) {
  const s = loadState();
  if (!s.completedTopics.includes(topicId)) {
    s.completedTopics.push(topicId);
  }
  saveState(s);
}

export function recordQuiz(topicId: string, score: number, total: number) {
  const s = loadState();
  const passing = score / total >= 0.7;
  s.quizResults[topicId] = {
    score,
    total,
    passedAt: new Date().toISOString(),
  };
  if (passing && !s.completedTopics.includes(topicId)) {
    s.completedTopics.push(topicId);
  }
  const earned = passing ? 50 + score * 5 : score * 3;
  s.xp += earned;
  recordXpDay(s, earned);
  while (s.xp >= xpForLevel(s.level)) {
    s.xp -= xpForLevel(s.level);
    s.level += 1;
  }
  awardBadges(s);
  updateStreak(s);
  saveState(s);
  return { state: s, earned, passing };
}

function updateStreak(s: UserState) {
  const today = new Date().toISOString().slice(0, 10);
  if (s.lastActiveDate === today) return;
  if (s.lastActiveDate) {
    const last = new Date(s.lastActiveDate);
    const diff = Math.floor((Date.now() - last.getTime()) / 86400000);
    s.streak = diff === 1 ? s.streak + 1 : 1;
  } else {
    s.streak = 1;
  }
  s.lastActiveDate = today;
}

function awardBadges(s: UserState) {
  const add = (b: string) => {
    if (!s.badges.includes(b)) s.badges.push(b);
  };
  if (s.completedTopics.length >= 1) add("First Steps");
  if (s.completedTopics.length >= 5) add("Topic Trekker");
  if (s.completedTopics.length >= 10) add("Math Wanderer");
  if (s.level >= 5) add("Level 5 Hunter");
  if (s.streak >= 3) add("3-Day Streak");
  if (s.streak >= 7) add("Week Warrior");
  const perfectQuizzes = Object.values(s.quizResults).filter(
    (r) => r.score === r.total,
  ).length;
  if (perfectQuizzes >= 1) add("Perfect Score");
  if (perfectQuizzes >= 3) add("Triple Perfect");
}

export function setProfile(email: string, name: string, grade: number) {
  const s = loadState();
  s.email = email;
  s.name = name;
  s.grade = grade;
  updateStreak(s);
  saveState(s);
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("mh:state"));
}
