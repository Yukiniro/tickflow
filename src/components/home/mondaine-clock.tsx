"use client";

import { useCallback, useRef } from "react";
import { useClock } from "@/hooks/use-clock";
import { cn } from "@/lib/utils";

interface MondaineClockProps {
  className?: string;
}

const MAX_TILT = 12; // 最大倾斜角度

/**
 * Mondaine 瑞士铁路站台钟。
 * 只读订阅 <Nav> 驱动的心跳(useClock),不新增计时器 / 音频上下文。
 * 红色秒针每秒离散跳动,带轻微过冲——还原机械"滴答"手感(全站签名交互)。
 * 鼠标跟随 3D 倾斜:钟面像实体圆盘朝光标翻转,变换直接写 DOM(ref),不触发 SVG 重渲染。
 */
export function MondaineClock({ className }: MondaineClockProps) {
  const { hours, minutes, seconds, mounted } = useClock();

  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // 触屏不拦截滚动
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${(-py * MAX_TILT * 2).toFixed(2)}deg) rotateY(${(px * MAX_TILT * 2).toFixed(2)}deg) scale(1.02)`;
    });
  }, []);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const el = tiltRef.current;
    if (el) el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  // 指针角度(12 点为 0,顺时针)
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  // 秒针在 59→0 处会反向回绕一整圈,该时刻取消过渡以避免倒转
  const secondWrapping = seconds === 0;

  // 12 个小时刻度(粗 bar)
  const hourMarks = Array.from({ length: 12 }, (_, i) => i * 30);
  // 60 个分钟刻度(细),跳过小时位
  const minuteMarks = Array.from({ length: 60 }, (_, i) => i).filter(i => i % 5 !== 0).map(i => i * 6);

  return (
    <div
      className={cn("aspect-square perspective-[1100px]", className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div
        ref={tiltRef}
        className="h-full w-full transition-transform duration-300 ease-out will-change-transform transform-3d filter-[drop-shadow(0_18px_28px_rgba(0,0,0,0.14))] dark:filter-[drop-shadow(0_18px_28px_rgba(0,0,0,0.5))]"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Mondaine railway clock">
          {/* 表盘 */}
          <circle cx="100" cy="100" r="99" className="mondaine-face" />
          <circle cx="100" cy="100" r="98" fill="none" className="mondaine-ring" strokeWidth="1.5" />

          {/* 分钟细刻度 */}
          {minuteMarks.map(deg => (
            <rect
              key={`m-${deg}`}
              x="99.1"
              y="8"
              width="1.8"
              height="7"
              className="mondaine-ink"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}

          {/* 小时粗刻度 */}
          {hourMarks.map(deg => (
            <rect
              key={`h-${deg}`}
              x="97.4"
              y="8"
              width="5.2"
              height="17"
              className="mondaine-ink"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}

          {/* 指针:仅在挂载后渲染,避免 SSR 时间不一致 */}
          {mounted && (
            <>
              {/* 时针 */}
              <rect
                x="95.5"
                y="50"
                width="9"
                height="60"
                rx="1.5"
                className="mondaine-ink"
                style={{ transition: "transform 0.18s cubic-bezier(0.4, 1.6, 0.5, 1)" }}
                transform={`rotate(${hourDeg} 100 100)`}
              />
              {/* 分针 */}
              <rect
                x="96.8"
                y="22"
                width="6.4"
                height="88"
                rx="1.5"
                className="mondaine-ink"
                style={{ transition: "transform 0.18s cubic-bezier(0.4, 1.6, 0.5, 1)" }}
                transform={`rotate(${minuteDeg} 100 100)`}
              />
              {/* 秒针:细红针,绕中心旋转,中心侧留短配重 */}
              <rect
                x="99"
                y="24"
                width="2"
                height="90"
                rx="1"
                className="mondaine-rail"
                style={{ transition: secondWrapping ? "none" : "transform 0.13s cubic-bezier(0.34, 1.7, 0.5, 1)" }}
                transform={`rotate(${secondDeg} 100 100)`}
              />
              {/* 中心红色圆块:秒针轴心,覆盖时分针根部 */}
              <circle cx="100" cy="100" r="6.5" className="mondaine-rail" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
