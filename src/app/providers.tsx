"use client";

import { Provider } from "jotai";
import { ClockHeartbeat } from "@/components/clock-heartbeat";

/**
 * 根状态容器:提供 Jotai store,并挂载全站唯一的时钟心跳。
 * 所有使用 atom / useClock() 的组件都必须在此之下。
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <ClockHeartbeat />
      {children}
    </Provider>
  );
}
