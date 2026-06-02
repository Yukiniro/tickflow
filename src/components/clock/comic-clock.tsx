"use client";

import { useClock } from "@/hooks/use-clock";
import { useAtomValue } from "jotai";
import { enabledAtom } from "@/store/background";
import { cn } from "@/lib/utils";

export function ComicClock() {
  const { hours, minutes, seconds, ampm, mounted } = useClock();
  const backgroundEnabled = useAtomValue(enabledAtom);

  if (!mounted) {
    return null;
  }

  // 有背景:轮廓样式保证任意背景上可见;无背景:增强样式适配深浅主题
  const textStyle = backgroundEnabled ? "clock-text-outline-large" : "clock-text-enhanced";
  const ampmStyle = backgroundEnabled ? "clock-text-outline" : "text-muted-foreground";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("font-comic text-[16vw] font-bold tracking-wider", textStyle)}>
        {String(hours).padStart(2, "0")}
        <span>:</span>
        {String(minutes).padStart(2, "0")}
        <span>:</span>
        {String(seconds).padStart(2, "0")}
      </div>
      {ampm && <div className={cn("font-comic mt-6 text-[4vw] font-bold", ampmStyle)}>{ampm}</div>}
    </div>
  );
}
