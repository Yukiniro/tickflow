"use client";

import { useClock } from "@/hooks/use-clock";
import { cn } from "@/lib/utils";

interface LiveTimeProps {
  className?: string;
  showSeconds?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * 巨型实时时间排版。tabular-nums 等宽对齐;分隔符 `:` 每秒随心跳脉冲(全站签名交互)。
 * 复用 useClock() 只读订阅,不新增计时器。
 */
export function LiveTime({ className, showSeconds = true }: LiveTimeProps) {
  const { hours, minutes, seconds, ampm, is24Hour, mounted } = useClock();

  // 每秒变更 key 触发重挂载 → 重放 tick-flash 动画,与心跳精准同步
  const colon = (id: string) => (
    <span key={`${id}-${seconds}`} className="animate-tick text-rail">
      :
    </span>
  );

  return (
    <span className={cn("font-semibold tabular-nums tracking-tight", className)} suppressHydrationWarning>
      {mounted ? (
        <>
          {pad(hours)}
          {colon("c1")}
          {pad(minutes)}
          {showSeconds && (
            <>
              {colon("c2")}
              {pad(seconds)}
            </>
          )}
          {!is24Hour && ampm && (
            <span className="ml-[0.25em] align-top text-[0.32em] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {ampm}
            </span>
          )}
        </>
      ) : (
        <span className="text-muted-foreground/40">{showSeconds ? "--:--:--" : "--:--"}</span>
      )}
    </span>
  );
}
