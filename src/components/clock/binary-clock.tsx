"use client";

import { useTime } from "@/hooks/use-time";
import { useState, useEffect } from "react";
import { LedThemeSelector } from "@/components/led-theme-selector";
import { LED_THEMES, type LedTheme } from "@/components/clock/led-clock";

// 复用 LED 的六色主题与辉光,但用独立 localStorage key,避免与 LED 时钟串色
const STORAGE_KEY = "binary-theme";

export function BinaryClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();
  const [theme, setTheme] = useState<LedTheme>(LED_THEMES[0]);

  // 从 localStorage 水合主题
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      const found = LED_THEMES.find(item => item.id === parsed.id);
      // 挂载后读取本地主题,属预期的 effect 内置位
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (found) setTheme(found);
    } catch (error) {
      console.error("Error parsing saved binary theme:", error);
    }
  }, []);

  const handleThemeChange = (next: LedTheme) => {
    setTheme(next);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  if (!mounted) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  // 六列 BCD:时十/时个/分十/分个/秒十/秒个
  const columns = `${pad(hours)}${pad(minutes)}${pad(seconds)}`.split("").map(Number);
  const colLabels = ["H", "H", "M", "M", "S", "S"];
  const weights = [8, 4, 2, 1];
  const readout = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}${ampm ? ` ${ampm}` : ""}`;

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* 颜色主题选择器(复用 LED) */}
        <div className="sticky top-8 z-10 mb-8">
          <LedThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} themes={LED_THEMES} />
        </div>

        {/* 二进制点阵面板 */}
        <div
          className={`relative p-8 md:p-12 rounded-3xl bg-gray-900 dark:bg-black border ${theme.borderColor} shadow-2xl`}
          role="img"
          aria-label={readout}
        >
          <div className="flex items-end gap-4 md:gap-6 lg:gap-8">
            {/* 行权重标尺 */}
            <div className="flex flex-col items-center gap-3 md:gap-4 pr-1">
              {weights.map(bit => (
                <span
                  key={bit}
                  className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-mono text-xs text-gray-600"
                >
                  {bit}
                </span>
              ))}
              <span className="mt-1 font-mono text-xs text-transparent select-none">·</span>
            </div>

            {columns.map((value, ci) => (
              <div key={ci} className="flex flex-col items-center gap-3 md:gap-4">
                {weights.map(bit => {
                  const on = (value & bit) !== 0;
                  return (
                    <div
                      key={bit}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full transition-colors duration-200"
                      style={{
                        backgroundColor: on ? theme.color : "rgba(107, 114, 128, 0.18)",
                        boxShadow: on ? `0 0 14px ${theme.shadowColor}` : "none",
                      }}
                    />
                  );
                })}
                <span className="mt-1 font-mono text-xs text-gray-500 tabular-nums">{colLabels[ci]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 解码读数(可读性提示) */}
        <div className="mt-8 font-mono text-lg tracking-[0.3em] text-gray-400 tabular-nums" aria-hidden>
          {readout}
        </div>
      </div>
    </div>
  );
}
