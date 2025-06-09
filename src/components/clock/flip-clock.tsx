"use client";

import { useTime } from "@/hooks/use-time";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlipDigitProps {
  value: number;
  label: string;
}

function FlipDigit({ value, label }: FlipDigitProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setNextValue(value);
      setIsFlipping(true);

      // 翻转动画完成后更新当前值
      const timer = setTimeout(() => {
        setCurrentValue(value);
        setIsFlipping(false);
        prevValueRef.current = value;
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [value]);

  useEffect(() => {
    setCurrentValue(value);
    setNextValue(value);
    prevValueRef.current = value;
  }, []);

  const currentDisplay = String(currentValue).padStart(2, "0");
  const nextDisplay = String(nextValue).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36">
        {/* 上半部分 */}
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
          {/* 上半部分静态背景 - 新数字 */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-t-lg border-2 border-b border-slate-300 dark:border-slate-500">
            <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "0%" }}>
              <div className="text-slate-900 dark:text-white font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
                {isFlipping ? nextDisplay : currentDisplay}
              </div>
            </div>
          </div>

          {/* 当前数字上半部分 - 围绕底部翻转消失 */}
          {isFlipping && (
            <div
              className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-t-lg border-2 border-b border-slate-300 dark:border-slate-500 origin-bottom"
              style={{
                transformStyle: "preserve-3d",
                animation: "flipTopDown 0.3s ease-out forwards",
              }}
            >
              <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "0%" }}>
                <div className="text-slate-900 dark:text-white font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
                  {currentDisplay}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 下半部分 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
          {/* 下半部分静态背景 - 当前数字 */}
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-b-lg border-2 border-t-0 border-slate-300 dark:border-slate-500">
            <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "-100%" }}>
              <div className="text-slate-900 dark:text-white font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
                {currentDisplay}
              </div>
            </div>
          </div>

          {/* 新数字下半部分 - 从上方围绕顶部翻转进入 */}
          {isFlipping && (
            <div
              className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-b-lg border-2 border-t-0 border-slate-300 dark:border-slate-500 origin-top"
              style={{
                transformStyle: "preserve-3d",
                animation: "flipBottomUp 0.3s ease-out 0.3s forwards",
                transform: "perspective(600px) rotateX(90deg)",
              }}
            >
              <div
                className="absolute w-full flex items-center justify-center"
                style={{ height: "200%", top: "-100%" }}
              >
                <div className="text-slate-900 dark:text-white font-mono font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
                  {nextDisplay}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 中间分割线 */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-400 dark:bg-slate-600 transform -translate-y-0.5 z-30"></div>

        {/* 翻转时的阴影 */}
        {isFlipping && (
          <>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-black bg-opacity-20 rounded-t-lg z-20 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black bg-opacity-20 rounded-b-lg z-20 transition-opacity duration-300 delay-300"></div>
          </>
        )}
      </div>

      <span className="mt-3 text-sm md:text-base text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

export function FlipClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();
  const t = useTranslations("clock");

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 bg-muted rounded-lg animate-pulse"></div>
          <div className="text-4xl font-bold text-muted-foreground">:</div>
          <div className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 bg-muted rounded-lg animate-pulse"></div>
          <div className="text-4xl font-bold text-muted-foreground">:</div>
          <div className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 lg:w-32 lg:h-36 bg-muted rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8">
      {/* 主时钟 */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <FlipDigit value={hours} label={t("hour") || "Hour"} />
        <div className="text-4xl lg:text-5xl font-bold text-muted-foreground animate-pulse">:</div>
        <FlipDigit value={minutes} label={t("minute") || "Min"} />
        <div className="text-4xl lg:text-5xl font-bold text-muted-foreground animate-pulse">:</div>
        <FlipDigit value={seconds} label={t("second") || "Sec"} />
      </div>

      {/* AM/PM 指示器 */}
      {ampm && (
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500 rounded-lg">
          <span className="text-lg font-bold text-slate-900 dark:text-white">{ampm}</span>
        </div>
      )}

      {/* 标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{t("flipClock") || "Flip Clock"}</h1>
        <p className="text-base text-muted-foreground">{t("currentTime") || "Current Time"}</p>
      </div>
    </div>
  );
}
