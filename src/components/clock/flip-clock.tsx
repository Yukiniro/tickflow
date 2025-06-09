"use client";

import { useTime } from "@/hooks/use-time";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

interface FlipDigitProps {
  value: number;
}

function FlipDigit({ value }: FlipDigitProps) {
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
    <div className="flip-container">
      <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 xl:w-56 xl:h-64 flip-shadow">
        {/* 上半部分 */}
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-t-xl">
          {/* 上半部分静态背景 - 新数字 */}
          <div className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-t-xl border-2 border-b border-gray-300 dark:border-gray-600">
            <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "0%" }}>
              <div className="text-gray-900 dark:text-white font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight flip-text dark:flip-text-dark">
                {isFlipping ? nextDisplay : currentDisplay}
              </div>
            </div>
          </div>

          {/* 当前数字上半部分 - 围绕底部翻转消失 */}
          {isFlipping && (
            <div
              className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-t-xl border-2 border-b border-gray-300 dark:border-gray-600 origin-bottom"
              style={{
                transformStyle: "preserve-3d",
                animation: "flipTopDown 0.3s ease-out forwards",
              }}
            >
              <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "0%" }}>
                <div className="text-gray-900 dark:text-white font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight flip-text dark:flip-text-dark">
                  {currentDisplay}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 下半部分 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden rounded-b-xl">
          {/* 下半部分静态背景 - 当前数字 */}
          <div className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-b-xl border-2 border-t-0 border-gray-300 dark:border-gray-600">
            <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "-100%" }}>
              <div className="text-gray-900 dark:text-white font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight flip-text dark:flip-text-dark">
                {currentDisplay}
              </div>
            </div>
          </div>

          {/* 新数字下半部分 - 从上方围绕顶部翻转进入 */}
          {isFlipping && (
            <div
              className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-b-xl border-2 border-t-0 border-gray-300 dark:border-gray-600 origin-top"
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
                <div className="text-gray-900 dark:text-white font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight flip-text dark:flip-text-dark">
                  {nextDisplay}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 中间分割线 */}
        <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent transform -translate-y-0.5 z-30 rounded-full"></div>

        {/* 翻转时的阴影和光效 */}
        {isFlipping && (
          <>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-black/40 to-black/10 rounded-t-xl z-20 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-black/40 to-black/10 rounded-b-xl z-20 transition-opacity duration-300 delay-300"></div>
          </>
        )}
      </div>
    </div>
  );
}

export function FlipClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();
  const t = useTranslations("clock");

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center space-x-8">
          <div className="w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 xl:w-56 xl:h-64 bg-muted rounded-xl animate-pulse"></div>
          <div className="text-6xl lg:text-7xl font-bold text-muted-foreground">:</div>
          <div className="w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 xl:w-56 xl:h-64 bg-muted rounded-xl animate-pulse"></div>
          <div className="text-6xl lg:text-7xl font-bold text-muted-foreground">:</div>
          <div className="w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 lg:w-48 lg:h-56 xl:h-64 bg-muted rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-12 ">
      {/* 主时钟 */}
      <div className="flex items-center space-x-8 lg:space-x-12">
        <FlipDigit value={hours} />
        <div className="text-6xl lg:text-7xl xl:text-8xl font-black text-primary/70 flip-separator">:</div>
        <FlipDigit value={minutes} />
        <div className="text-6xl lg:text-7xl xl:text-8xl font-black text-primary/70 flip-separator">:</div>
        <FlipDigit value={seconds} />
      </div>

      {/* AM/PM 指示器 */}
      {ampm && (
        <div className="px-8 py-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-2 border-primary/30 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
          <span className="text-2xl lg:text-3xl font-black text-primary tracking-wider relative z-10">{ampm}</span>
        </div>
      )}
    </div>
  );
}
