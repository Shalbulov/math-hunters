"use client";

import { MathInline } from "@/components/Math";

const GLYPHS = [
  "x^2", "\\int", "\\frac{a}{b}", "\\sqrt{x}", "\\sin\\theta", "\\Delta",
  "\\sum_{n=1}^{\\infty}", "\\pi r^2", "a^2+b^2=c^2", "\\frac{dy}{dx}",
  "e^{i\\pi}+1=0", "f'(x)", "\\nabla", "\\cos 2x", "\\log_2 n",
  "\\vec{v}", "\\angle ABC", "(x-1)(x+1)", "\\lim_{n\\to\\infty}", "x^n",
];

export function GlyphMarquee() {
  // duplicate for seamless loop
  const items = [...GLYPHS, ...GLYPHS];
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-border-default bg-surface/40 py-3 select-none"
    >
      <div className="marquee-track gap-10 text-text-muted font-math">
        {items.map((g, i) => (
          <span key={i} className="text-xl whitespace-nowrap opacity-70">
            <MathInline>{g}</MathInline>
          </span>
        ))}
      </div>
    </div>
  );
}
