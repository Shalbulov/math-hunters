"use client";

import katex from "katex";
import { useMemo } from "react";

export function MathInline({ children }: { children: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, { throwOnError: false, displayMode: false });
    } catch {
      return children;
    }
  }, [children]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MathBlock({ children }: { children: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, { throwOnError: false, displayMode: true });
    } catch {
      return children;
    }
  }, [children]);
  return (
    <div className="my-3 overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export function MathText({ text }: { text: string }) {
  const parts = useMemo(() => {
    const out: { type: "text" | "math"; value: string }[] = [];
    const regex = /\$([^$]+)\$/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > lastIndex) out.push({ type: "text", value: text.slice(lastIndex, m.index) });
      out.push({ type: "math", value: m[1] });
      lastIndex = m.index + m[0].length;
    }
    if (lastIndex < text.length) out.push({ type: "text", value: text.slice(lastIndex) });
    return out;
  }, [text]);

  return (
    <>
      {parts.map((p, i) =>
        p.type === "math" ? <MathInline key={i}>{p.value}</MathInline> : <span key={i}>{p.value}</span>,
      )}
    </>
  );
}
