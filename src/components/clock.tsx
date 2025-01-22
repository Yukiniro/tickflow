"use client";

import useTime from "@/hooks/useTime";

export function Clock() {
  const { str } = useTime();

  // 只在有 time 值时渲染时间
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-[8vw] md:text-[12vw] lg:text-[16vw] font-bold text-gray-800 tabular-nums">
        {str.split("").map((char: string, index: number) => (
          <span key={index} className="inline-block w-[4.8vw] md:w-[7.2vw] lg:w-[9.6vw] text-center">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
