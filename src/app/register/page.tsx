"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { setProfile } from "@/lib/store";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState(7);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setProfile(email, name, grade);
    router.push("/dashboard");
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-md mx-auto px-6 py-12 w-full">
          <h1 className="text-3xl font-bold mb-2">Create account</h1>
          <p className="text-text-secondary mb-8 text-sm">
            Pick your grade to get a curriculum tailored to you.
          </p>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Name" value={name} onChange={setName} placeholder="Arsen" />
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
              placeholder="At least 6 characters"
            />
            <div>
              <span className="block text-sm text-text-secondary mb-2">Grade</span>
              <div className="grid grid-cols-5 gap-2">
                {[7, 8, 9, 10, 11].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`py-2 rounded-md border transition-colors ${
                      grade === g
                        ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                        : "border-border-default hover:border-accent-blue/50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-error text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-accent-blue text-primary-dark font-semibold hover:bg-accent-light transition-colors"
            >
              Create account
            </button>
          </form>
          <p className="text-text-secondary text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-accent-blue hover:underline">
              Sign in
            </Link>
          </p>
        </div>
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
