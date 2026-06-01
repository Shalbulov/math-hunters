"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadState, setProfile } from "@/lib/store";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    const existing = loadState();
    const name = existing.name || email.split("@")[0];
    const grade = existing.grade || 7;
    setProfile(email, name, grade);
    router.push("/dashboard");
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-md mx-auto px-6 py-16 w-full">
        <h1 className="text-3xl font-bold mb-2">Sign in</h1>
        <p className="text-text-secondary mb-8 text-sm">
          Local demo auth — your progress is stored in this browser.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <Field
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            placeholder="you@school.kz"
          />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="••••••••"
          />
          {error && <p className="text-error text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-accent-blue text-primary-dark font-semibold hover:bg-accent-light transition-colors"
          >
            Sign in
          </button>
        </form>
        <p className="text-text-secondary text-sm mt-6 text-center">
          No account?{" "}
          <Link href="/register" className="text-accent-blue hover:underline">
            Create one
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-text-secondary mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-primary border border-border-default rounded-md px-3 py-2.5 focus:outline-none focus:border-accent-blue"
      />
    </label>
  );
}
