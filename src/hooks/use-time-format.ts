"use client";

import { useCallback } from "react";
import { useAtom } from "jotai";
import { is24HourAtom } from "@/store/time";

/**
 * 12/24 小时制切换。仅给切换控件(如 <TimeFormatToggle>)使用;
 * 纯展示组件请用 useClock() 读取 is24Hour,避免订阅写入能力。
 */
export function useTimeFormat() {
  const [is24Hour, setIs24Hour] = useAtom(is24HourAtom);

  // 函数式更新 → 回调引用稳定,不依赖当前 is24Hour
  const toggleTimeFormat = useCallback(() => {
    setIs24Hour(prev => !prev);
  }, [setIs24Hour]);

  return { is24Hour, toggleTimeFormat };
}
