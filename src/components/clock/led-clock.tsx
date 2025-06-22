"use client";

import { useTime } from "@/hooks/use-time";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { LedThemeSelector } from "@/components/led-theme-selector";

export interface LedTheme {
  id: string;
  name: string;
  color: string;
  shadowColor: string;
  borderColor: string;
}

export const LED_THEMES: LedTheme[] = [
  {
    id: "green",
    name: "themes.green",
    color: "#22c55e",
    shadowColor: "rgba(34, 197, 94, 0.8)",
    borderColor: "border-green-500/30",
  },
  {
    id: "blue",
    name: "themes.blue",
    color: "#3b82f6",
    shadowColor: "rgba(59, 130, 246, 0.8)",
    borderColor: "border-blue-500/30",
  },
  {
    id: "red",
    name: "themes.red",
    color: "#ef4444",
    shadowColor: "rgba(239, 68, 68, 0.8)",
    borderColor: "border-red-500/30",
  },
  {
    id: "purple",
    name: "themes.purple",
    color: "#a855f7",
    shadowColor: "rgba(168, 85, 247, 0.8)",
    borderColor: "border-purple-500/30",
  },
  {
    id: "orange",
    name: "themes.orange",
    color: "#f97316",
    shadowColor: "rgba(249, 115, 22, 0.8)",
    borderColor: "border-orange-500/30",
  },
  {
    id: "cyan",
    name: "themes.cyan",
    color: "#06b6d4",
    shadowColor: "rgba(6, 182, 212, 0.8)",
    borderColor: "border-cyan-500/30",
  },
];

export function LedClock() {
  const { hours, minutes, seconds, ampm, is24Hour, mounted } = useTime();
  const t = useTranslations("ledClock");

  // LED主题状态
  const [currentTheme, setCurrentTheme] = useState<LedTheme>(LED_THEMES[0]);

  // 从localStorage加载保存的主题
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("led-theme");
      if (savedTheme) {
        try {
          const parsedTheme = JSON.parse(savedTheme);
          const foundTheme = LED_THEMES.find(theme => theme.id === parsedTheme.id);
          if (foundTheme) {
            setCurrentTheme(foundTheme);
          }
        } catch (error) {
          console.error("Error parsing saved LED theme:", error);
        }
      }
    }
  }, []);

  // 保存主题到localStorage
  const handleThemeChange = (theme: LedTheme) => {
    setCurrentTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("led-theme", JSON.stringify(theme));
    }
  };

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
                className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: isActive ? currentTheme.color : "rgba(107, 114, 128, 0.2)",
                  boxShadow: isActive ? `0 0 12px ${currentTheme.shadowColor}` : "none",
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
                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: isActive ? currentTheme.color : "rgba(107, 114, 128, 0.15)",
                  boxShadow: isActive ? `0 0 8px ${currentTheme.shadowColor}` : "none",
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
    <div className="min-h-screen p-4 flex flex-col">
      {/* 时钟显示区域 */}
      <div className="flex-1 flex items-center justify-center flex-col relative">
        {/* 颜色主题选择器 - 粘性布局在时钟上方 */}
        <div className="sticky top-8 z-10 mb-8">
          <LedThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} themes={LED_THEMES} />
        </div>

        {/* LED时钟显示 */}
        <div
          className={`relative p-8 md:p-12 rounded-3xl bg-gray-900 dark:bg-black border ${currentTheme.borderColor} shadow-2xl`}
        >
          {/* 主时钟内容 */}
          <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
            {timeChars.map((char, index) => renderDigit(char, `digit-${index}`))}
          </div>
        </div>

        {/* AM/PM 显示 */}
        {!is24Hour && ampm && (
          <div className={`mt-6 px-4 py-2 rounded-xl bg-gray-800 dark:bg-gray-900 border ${currentTheme.borderColor}`}>
            <div className="flex items-center justify-center gap-2">
              {ampm.split("").map((char, index) => renderLetter(char, `letter-${index}`))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
