"use client";

import { Delete } from "lucide-react";

type Props = {
  onChar: (c: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  loading?: boolean;
};

const TOP_ROW = ["x", "y", "²", "√", "π"];
const NUM_ROWS: string[][] = [
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", ".", "(", "+"],
];

export function Keypad({ onChar, onBackspace, onSubmit, canSubmit, loading }: Props) {
  return (
    <div className="select-none">
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        {TOP_ROW.map((c) => (
          <KeyBtn key={c} char={c} variant="symbol" onPress={() => onChar(c)} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5" style={{ gridTemplateRows: "repeat(4, minmax(0, 1fr))" }}>
        {NUM_ROWS.map((row, ri) =>
          row.map((c, ci) => (
            <KeyBtn
              key={`${ri}-${ci}`}
              char={c}
              variant={ci === 3 ? "op" : "num"}
              onPress={() => onChar(c)}
            />
          )),
        )}
        <button
          onClick={onBackspace}
          className="h-12 md:h-14 bg-surface border border-border-default hover:border-error text-text-secondary hover:text-error flex items-center justify-center transition-colors"
          style={{ gridColumn: 5, gridRow: 1 }}
          aria-label="Delete"
        >
          <Delete size={18} />
        </button>
        <button
          disabled={!canSubmit || loading}
          onClick={onSubmit}
          className="bg-accent text-bg font-display font-bold text-base hover:bg-accent-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed glow-cyan"
          style={{ gridColumn: 5, gridRow: "2 / 5" }}
        >
          {loading ? "…" : "CHECK"}
        </button>
      </div>
    </div>
  );
}

function KeyBtn({
  char,
  variant,
  onPress,
}: {
  char: string;
  variant: "num" | "op" | "symbol";
  onPress: () => void;
}) {
  const styles =
    variant === "num"
      ? "bg-surface-elev border-border-default hover:border-accent text-text-primary font-display text-xl"
      : variant === "op"
        ? "bg-surface border-accent/30 hover:border-accent text-accent font-display text-xl"
        : "bg-surface border-border-default hover:border-accent text-text-secondary hover:text-accent font-math text-base";

  return (
    <button
      onClick={onPress}
      className={`h-12 md:h-14 border transition-colors active:scale-95 ${styles}`}
    >
      {char}
    </button>
  );
}
