"use client";

import { useTime } from "@/hooks/use-time";
import { useAtomValue } from "jotai";
import { enabledAtom } from "@/store/background";

export function BasicClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();
  const backgroundEnabled = useAtomValue(enabledAtom);

  if (!mounted) {
    return null;
  }

  // 根据背景启用状态选择样式类
  const getTextStyle = () => {
    if (backgroundEnabled) {
      // 有背景时使用轮廓样式，确保在任何背景上都可见
      return "clock-text-outline";
    } else {
      // 无背景时使用增强可见性样式，适应浅色/深色主题
      return "clock-text-enhanced";
    }
  };

  const getAmPmStyle = () => {
    if (backgroundEnabled) {
      return "clock-text-outline-small";
    } else {
      return "text-muted-foreground font-bold";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`text-[16vw] font-bold tabular-nums tracking-wider ${getTextStyle()}`}>
        {String(hours).padStart(2, "0")}
        <span>:</span>
        {String(minutes).padStart(2, "0")}
        <span>:</span>
        {String(seconds).padStart(2, "0")}
      </div>
      {ampm && <div className={`text-[4vw] font-medium ${getAmPmStyle()}`}>{ampm}</div>}
    </div>
  );
}
