"use client";

import { useClockHeartbeat } from "@/hooks/use-clock-heartbeat";

/**
 * 全站唯一的时钟心跳载体,在根 <Providers> 中挂载一次。
 * 不渲染任何内容,只负责驱动 timeAtom 与滴答声。
 */
export function ClockHeartbeat() {
  useClockHeartbeat();
  return null;
}
