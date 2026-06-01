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
      <main className="flex-1 max-w-[420px] mx-auto px-4 md:px-0 pt-12 pb-16 w-full">
        <div className="font-display text-[10px] tracking-[0.25em] text-text-muted mb-2">
          ◢ HUNTER LOGIN
        </div>
        <h1 className="font-display text-4xl font-bold mb-2">Continue</h1>
        <p className="text-text-muted text-sm mb-8">
          Local demo — progress lives in this browser.
        </p>
        <form onSubmit={submit} className="space-y-3">
          <Field label="EMAIL" value={email} onChange={setEmail} type="email" placeholder="you@school.kz" />
          <Field label="PASSWORD" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
          {error && <p className="text-error text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full font-display text-base px-6 py-3 bg-accent text-bg font-bold hover:bg-accent-dim transition-colors mt-2"
          >
            ENTER →
          </button>
        </form>
        <p className="text-text-muted text-sm mt-8 text-center">
          New hunter?{" "}
          <Link href="/onboarding" className="text-accent hover:underline">
            Start onboarding
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
      <span className="block font-display text-[10px] tracking-[0.25em] text-text-muted mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border-2 border-border-default focus:border-accent outline-none px-4 py-3 text-base"
      />
    </label>
  );
}
