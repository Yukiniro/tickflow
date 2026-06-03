"use client";

import { useClock } from "@/hooks/use-clock";
import { useAtomValue } from "jotai";
import { enabledAtom } from "@/store/background";
import { cn } from "@/lib/utils";

export function BasicClock() {
  const { hours, minutes, seconds, ampm, mounted } = useClock();
  const backgroundEnabled = useAtomValue(enabledAtom);

  if (!mounted) {
    return null;
  }

  // 有背景:轮廓样式保证任意背景上可见;无背景:增强样式适配深浅主题
  const textStyle = backgroundEnabled ? "clock-text-outline" : "clock-text-enhanced";
  const ampmStyle = backgroundEnabled ? "clock-text-outline-small" : "text-muted-foreground font-bold";

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={cn("text-[16vw] font-bold tabular-nums tracking-wider", textStyle)}>
        {String(hours).padStart(2, "0")}
        {/* 分隔符每秒滴答脉冲:key 随秒重挂载,与全站 tick 签名同步 */}
        <span key={`c1-${seconds}`} className="animate-tick inline-block">
          :
        </span>
        {String(minutes).padStart(2, "0")}
        <span key={`c2-${seconds}`} className="animate-tick inline-block">
          :
        </span>
        {String(seconds).padStart(2, "0")}
      </div>
      {ampm && <div className={cn("text-[4vw] font-medium", ampmStyle)}>{ampm}</div>}
    </div>
  );
}
