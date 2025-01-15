"use client";

import { useState, useEffect } from "react";

export function Clock() {
  // 初始状态设置为 null
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // 在客户端首次渲染时设置初始时间
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // 只在有 time 值时渲染时间
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-[8vw] md:text-[12vw] lg:text-[16vw] font-bold text-gray-800 tabular-nums">
        {time
          ? formatTime(time)
              .split("")
              .map((char, index) => (
                <span 
                  key={index} 
                  className="inline-block w-[4.8vw] md:w-[7.2vw] lg:w-[9.6vw] text-center"
                >
                  {char}
                </span>
              ))
          : ""}
      </div>
    </div>
  );
}
