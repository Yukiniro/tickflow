"use client";

import { useTime } from "@/hooks/use-time";
import { useTranslations } from "next-intl";

export function LedClock() {
  const { hours, minutes, seconds, ampm, is24Hour, mounted } = useTime();
  const t = useTranslations("ledClock");

  if (!mounted) {
    return null;
  }

  // 5x7像素点阵数字定义 (0-9)
  const digitPatterns: { [key: string]: boolean[][] } = {
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

  // 渲染单个数字的像素点阵
  const renderDigit = (digit: string, key: string) => {
    const pattern = digitPatterns[digit] || digitPatterns["0"];

    return (
      <div key={key} className="flex flex-col gap-1.5 md:gap-2">
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 md:gap-2">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full transition-all duration-200 ${
                  isActive ? "bg-green-400 dark:bg-green-300" : "bg-gray-600/20 dark:bg-gray-500/20"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 0 12px rgba(34, 197, 94, 0.8), 0 0 24px rgba(34, 197, 94, 0.4), inset 0 0 8px rgba(34, 197, 94, 0.3)"
                    : "none",
                  filter: isActive ? "brightness(1.2) contrast(1.1)" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  // 渲染AM/PM字母的简化版本
  const renderLetter = (char: string, key: string) => {
    const letterPatterns: { [key: string]: boolean[][] } = {
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

    const pattern = letterPatterns[char];
    if (!pattern) return null;

    return (
      <div key={key} className="flex flex-col gap-1">
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-200 ${
                  isActive ? "bg-green-400 dark:bg-green-300" : "bg-gray-600/15 dark:bg-gray-500/15"
                }`}
                style={{
                  boxShadow: isActive ? "0 0 8px rgba(34, 197, 94, 0.6), 0 0 16px rgba(34, 197, 94, 0.3)" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  // 格式化时间并分割成字符数组
  const formatTime = () => {
    if (is24Hour) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0",
      )}`;
    } else {
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0",
      )}`;
    }
  };

  const timeString = formatTime();
  const timeChars = timeString.split("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* 像素点阵时钟显示 - 带有科技感背景 */}
      <div className="relative">
        {/* 时钟背景容器 */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-black dark:via-gray-900 dark:to-black border border-green-500/30 shadow-2xl" />

        {/* 网格纹理背景 */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20 overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* 动态光效背景 */}
        <div
          className="absolute inset-0 rounded-3xl opacity-40 overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)
            `,
            animation: "pulse 4s ease-in-out infinite",
          }}
        />

        {/* 扫描线效果 */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-15 overflow-hidden"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(34, 197, 94, 0.1) 2px,
                rgba(34, 197, 94, 0.1) 4px
              )
            `,
            animation: "scan 3s linear infinite",
          }}
        />

        {/* 主时钟内容 */}
        <div className="relative z-10 flex items-center justify-center gap-4 md:gap-6 lg:gap-8 p-8 md:p-12">
          {timeChars.map((char, index) => renderDigit(char, `digit-${index}`))}
        </div>
      </div>

      {/* AM/PM 显示 (12小时制) */}
      {!is24Hour && ampm && (
        <div className="mt-6 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-sm border border-green-500/20 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            {ampm.split("").map((char, index) => renderLetter(char, `letter-${index}`))}
          </div>
        </div>
      )}

      {/* CSS 动画 */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
