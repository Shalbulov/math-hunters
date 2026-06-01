import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 28 : size === "lg" ? 48 : 34;
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-base";
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div
        className="relative bg-bg border border-accent flex items-center justify-center transition-transform group-hover:scale-105"
        style={{
          width: dim,
          height: dim,
          clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)",
        }}
      >
        <span className="font-display text-accent text-xs leading-none">∫x²</span>
      </div>
      <span className={`font-display font-bold ${text} tracking-tight`}>
        MATH<span className="text-accent">/</span>HUNTERS
      </span>
    </Link>
  );
}
