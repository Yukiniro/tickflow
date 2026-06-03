"use client";

import { useClock } from "@/hooks/use-clock";
import { useAtom } from "jotai";
import { ledThemeIdAtom } from "@/store/led-theme";
import { LED_THEMES, DEFAULT_LED_THEME, type LedTheme } from "@/components/clock/led-themes";
import { LedThemeSelector } from "@/components/led-theme-selector";

// 重新导出,保持既有引用路径可用
export { LED_THEMES, type LedTheme };

// 5x7 像素点阵数字定义 (0-9 与 ":") —— 静态表,提到模块作用域避免每秒重建
const DIGIT_PATTERNS: Record<string, boolean[][]> = {
  "0": [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  "1": [
    [false, false, true, false, false],
    [false, true, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, true, true, true, false],
  ],
  "2": [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [false, false, false, false, true],
    [false, false, true, true, false],
    [false, true, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, true],
  ],
  "3": [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [false, false, false, false, true],
    [false, false, true, true, false],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  "4": [
    [false, false, false, true, false],
    [false, false, true, true, false],
    [false, true, false, true, false],
    [true, false, false, true, false],
    [true, true, true, true, true],
    [false, false, false, true, false],
    [false, false, false, true, false],
  ],
  "5": [
    [true, true, true, true, true],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, true, true, true, false],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  "6": [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, false],
    [true, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  "7": [
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, true, false],
    [false, false, true, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
    [false, true, false, false, false],
  ],
  "8": [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  "9": [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, true],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  ":": [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
  ],
};

// AM/PM 字母点阵(简化版)
const LETTER_PATTERNS: Record<string, boolean[][]> = {
  A: [
    [false, true, false],
    [true, false, true],
    [true, true, true],
    [true, false, true],
    [true, false, true],
  ],
  P: [
    [true, true, false],
    [true, false, true],
    [true, true, false],
    [true, false, false],
    [true, false, false],
  ],
  M: [
    [true, false, true],
    [true, true, true],
    [true, true, true],
    [true, false, true],
    [true, false, true],
  ],
};

// 渲染单个数字的像素点阵
function renderDigit(digit: string, key: string, theme: LedTheme) {
  const pattern = DIGIT_PATTERNS[digit] || DIGIT_PATTERNS["0"];

  return (
    <div key={key} className="flex flex-col gap-1.5 md:gap-2">
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 md:gap-2">
          {row.map((isActive, colIndex) => (
            <div
              key={colIndex}
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: isActive ? theme.color : "rgba(107, 114, 128, 0.2)",
                // 紧凑亮芯 + 外扩光晕,点亮点更通透
                boxShadow: isActive ? `0 0 4px ${theme.color}, 0 0 16px ${theme.shadowColor}` : "none",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 渲染 AM/PM 字母
function renderLetter(char: string, key: string, theme: LedTheme) {
  const pattern = LETTER_PATTERNS[char];
  if (!pattern) return null;

  return (
    <div key={key} className="flex flex-col gap-1">
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((isActive, colIndex) => (
            <div
              key={colIndex}
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: isActive ? theme.color : "rgba(107, 114, 128, 0.15)",
                boxShadow: isActive ? `0 0 8px ${theme.shadowColor}` : "none",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 格式化时间为 HH:MM:SS(hours 已由 formattedTimeAtom 按 12/24 制处理)
function formatTime(hours: number, minutes: number, seconds: number, is24Hour: boolean) {
  const displayHours = is24Hour ? hours : hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function LedClock() {
  const { hours, minutes, seconds, ampm, is24Hour, mounted } = useClock();

  // 主题持久化交给 atomWithStorage,免去手写 localStorage + effect
  const [themeId, setThemeId] = useAtom(ledThemeIdAtom);
  const currentTheme = LED_THEMES.find(theme => theme.id === themeId) || DEFAULT_LED_THEME;

  if (!mounted) {
    return null;
  }

  const timeChars = formatTime(hours, minutes, seconds, is24Hour).split("");

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* 时钟显示区域 */}
      <div className="flex-1 flex items-center justify-center flex-col relative">
        {/* 颜色主题选择器 - 粘性布局在时钟上方 */}
        <div className="sticky top-8 z-10 mb-8">
          <LedThemeSelector
            currentTheme={currentTheme}
            onThemeChange={theme => setThemeId(theme.id)}
            themes={LED_THEMES}
          />
        </div>

        {/* LED时钟显示 */}
        <div
          className={`led-panel relative p-8 md:p-12 rounded-3xl bg-gray-900 dark:bg-black border ${currentTheme.borderColor} shadow-2xl`}
        >
          {/* 主时钟内容 */}
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
            {timeChars.map((char, index) => renderDigit(char, `digit-${index}`, currentTheme))}
          </div>
        </div>

        {/* AM/PM 显示 */}
        {!is24Hour && ampm && (
          <div className={`mt-6 px-4 py-2 rounded-xl bg-gray-800 dark:bg-gray-900 border ${currentTheme.borderColor}`}>
            <div className="flex items-center justify-center gap-2">
              {ampm.split("").map((char, index) => renderLetter(char, `letter-${index}`, currentTheme))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
