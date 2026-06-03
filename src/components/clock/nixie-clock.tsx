"use client";

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { formattedTimeAtom } from "@/store/time";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// 单个辉光管:堆叠 0-9 十个阴极,仅当前数字点亮,其余保留幽灵感
function Tube({ value }: { value: string }) {
  return (
    <div className="nixie-tube">
      <div className="nixie-mesh" aria-hidden />
      <div className="nixie-stack">
        {DIGITS.map(d => (
          <span key={d} className={`nixie-digit${d === value ? " nixie-lit" : ""}`}>
            {d}
          </span>
        ))}
      </div>
      <div className="nixie-glass" aria-hidden />
    </div>
  );
}

function Colon() {
  return (
    <div className="nixie-colon" aria-hidden>
      <span className="nixie-dot" />
      <span className="nixie-dot" />
    </div>
  );
}

export function NixieClock() {
  const { hours, minutes, seconds, ampm } = useAtomValue(formattedTimeAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 挂载标记,避免 SSR 水合不一致;心跳由布局中常驻的 Nav(useTime)统一驱动
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const h = pad(hours);
  const m = pad(minutes);
  const s = pad(seconds);
  const readout = `${h}:${m}:${s}${ampm ? ` ${ampm}` : ""}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="nixie-rail flex items-center gap-2 md:gap-3" role="img" aria-label={readout}>
          <Tube value={h[0]} />
          <Tube value={h[1]} />
          <Colon />
          <Tube value={m[0]} />
          <Tube value={m[1]} />
          <Colon />
          <Tube value={s[0]} />
          <Tube value={s[1]} />
        </div>
        {ampm && <div className="nixie-ampm">{ampm}</div>}
      </div>
    </div>
  );
}
