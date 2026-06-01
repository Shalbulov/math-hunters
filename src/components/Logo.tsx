import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 32 : size === "lg" ? 56 : 40;
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div
        className="relative rounded-full bg-primary-dark border border-accent-blue/40 flex items-center justify-center glow-blue transition-transform group-hover:scale-105"
        style={{ width: dim, height: dim }}
      >
        <span className="font-math text-accent-blue text-glow-blue text-xs leading-none">
          ∫x²
        </span>
      </div>
      <span className={`font-semibold ${text} tracking-tight`}>
        Math <span className="text-accent-blue">Hunters</span>
      </span>
    </Link>
  );
}
