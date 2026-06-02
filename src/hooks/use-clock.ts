"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { formattedTimeAtom, is24HourAtom } from "@/store/time";

/**
 * 只读时钟订阅:读取由根 <ClockHeartbeat> 心跳驱动的 timeAtom,
 * 不新建 setInterval / AudioContext。用于所有纯展示组件(各类时钟、时间排版),
 * 避免重复计时器与多个音频上下文。
 */
export function useClock() {
  const [mounted, setMounted] = useState(false);
  const formatted = useAtomValue(formattedTimeAtom);
  const is24Hour = useAtomValue(is24HourAtom);

  useEffect(() => {
    // 挂载标记:SSR 水合后置位,属预期用法
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return { ...formatted, is24Hour, mounted };
}
