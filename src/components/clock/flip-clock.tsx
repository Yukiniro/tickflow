"use client";

import { useTime } from "@/hooks/use-time";
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

      // 翻转动画完成后更新当前值 - 优化到600ms以匹配更流畅的动画
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
    <div className={`${isFlipping ? "flipping" : ""}`}>
      <div className="relative flip-container w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-60 lg:w-56 lg:h-68 xl:w-64 xl:h-76 2xl:w-72 2xl:h-84 bg-transparent">
        {/* 翻转阴影效果 */}
        <div className="flip-shadow"></div>
        {/* 上半部分 */}
        <div className="absolute top-0 left-0 w-full h-1/2 rounded-t-xl preserve-3d">
          {/* 上半部分静态背景 - 新数字 */}
          <div className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-t-xl border-b overflow-hidden">
            <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "0%" }}>
              <div className="text-gray-900 dark:text-white font-mono font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] leading-none tracking-tight flip-text dark:flip-text-dark">
                {isFlipping ? nextDisplay : currentDisplay}
              </div>
            </div>
          </div>

          {/* 当前数字上半部分 - 围绕底部翻转消失 */}
          {isFlipping && (
            <div
              className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-t-xl border-b origin-bottom backface-hidden flip-top-clip"
              style={{
                transformStyle: "preserve-3d",
                animation: "flipTopDown 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards",
                transformOrigin: "center bottom",
              }}
            >
              <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "0%" }}>
                <div className="text-gray-900 dark:text-white font-mono font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] leading-none tracking-tight flip-text dark:flip-text-dark">
                  {currentDisplay}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 下半部分 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-xl preserve-3d">
          {/* 下半部分静态背景 - 当前数字 */}
          <div className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-b-xl border-t-0 overflow-hidden">
            <div className="absolute w-full flex items-center justify-center" style={{ height: "200%", top: "-100%" }}>
              <div className="text-gray-900 dark:text-white font-mono font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] leading-none tracking-tight flip-text dark:flip-text-dark">
                {currentDisplay}
              </div>
            </div>
          </div>

          {/* 新数字下半部分 - 从上方围绕顶部翻转进入 */}
          {isFlipping && (
            <div
              className="absolute inset-0 flip-digit dark:flip-digit-dark rounded-b-xl border-t-0 origin-top backface-hidden flip-bottom-clip"
              style={{
                transformStyle: "preserve-3d",
                animation: "flipBottomUp 0.3s cubic-bezier(0.0, 0.0, 0.25, 1.0) 0.3s forwards",
                transform: "rotateX(90deg)",
                transformOrigin: "center top",
              }}
            >
              <div
                className="absolute w-full flex items-center justify-center"
                style={{ height: "200%", top: "-100%" }}
              >
                <div className="text-gray-900 dark:text-white font-mono font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] leading-none tracking-tight flip-text dark:flip-text-dark">
                  {nextDisplay}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 中间分割线 */}
        <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent transform -translate-y-0.5 z-30 rounded-full"></div>
      </div>
    </div>
  );
}

export function FlipClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center space-x-8">
          <div className="w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-60 lg:w-56 lg:h-68 xl:w-64 xl:h-76 2xl:w-72 2xl:h-84 bg-muted rounded-xl animate-pulse"></div>
          <div className="text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] font-bold text-muted-foreground">:</div>
          <div className="w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-60 lg:w-56 lg:h-68 xl:w-64 xl:h-76 2xl:w-72 2xl:h-84 bg-muted rounded-xl animate-pulse"></div>
          <div className="text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] font-bold text-muted-foreground">:</div>
          <div className="w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-60 lg:w-56 lg:h-68 xl:w-64 xl:h-76 2xl:w-72 2xl:h-84 bg-muted rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-12 ">
      {/* 主时钟 */}
      <div className="flex items-center space-x-8 lg:space-x-16 xl:space-x-20">
        <FlipDigit value={hours} />
        <div className="text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] font-black text-primary/70 flip-separator">
          :
        </div>
        <FlipDigit value={minutes} />
        <div className="text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] font-black text-primary/70 flip-separator">
          :
        </div>
        <FlipDigit value={seconds} />
      </div>

      {/* AM/PM 指示器 */}
      {ampm && (
        <div className="px-8 py-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-2 border-primary/30 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
          <span className="text-3xl lg:text-4xl xl:text-5xl font-black text-primary tracking-wider relative z-10">
            {ampm}
          </span>
        </div>
      )}
    </div>
  );
}
