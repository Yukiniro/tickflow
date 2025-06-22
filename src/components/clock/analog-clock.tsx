"use client";

import { useTime } from "@/hooks/use-time";
import { useTranslations } from "next-intl";

export function AnalogClock() {
  const { hours, minutes, seconds, mounted } = useTime();
  const t = useTranslations("analogClock");

  if (!mounted) {
    return null;
  }

  // 计算指针角度 (从12点开始，顺时针)
  const secondDegrees = seconds * 6; // 每秒6度
  const minuteDegrees = minutes * 6 + seconds * 0.1; // 每分钟6度，加上秒针的平滑移动
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5; // 每小时30度，加上分钟的平滑移动

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]" role="img" aria-label={t("description")}>
        {/* 时钟背景 */}
        <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 shadow-2xl" />

        {/* 内圈阴影效果 */}
        <div className="absolute inset-2 rounded-full shadow-inner bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-700 dark:to-gray-900" />

        {/* 分钟刻度 (60个小刻度) */}
        {Array.from({ length: 60 }, (_, i) => {
          const angle = i * 6; // 每个分钟刻度间隔6度
          const radian = (angle - 90) * (Math.PI / 180); // 转换为弧度，-90度使12点在顶部
          const radius = 47; // 分钟刻度距离中心的百分比
          const x = 50 + radius * Math.cos(radian); // 计算x坐标
          const y = 50 + radius * Math.sin(radian); // 计算y坐标

          // 跳过小时刻度位置，避免重叠
          if (i % 5 === 0) return null;

          return (
            <div
              key={`minute-${i}`}
              className="absolute w-0.5 h-2 bg-gray-600 dark:bg-gray-400 rounded-full shadow-sm"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: "center",
              }}
              aria-label={t("minuteMarkers")}
            />
          );
        })}

        {/* 小时刻度 (12个主刻度) */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = i * 30; // 每个小时刻度间隔30度
          const radian = (angle - 90) * (Math.PI / 180); // 转换为弧度，-90度使12点在顶部
          const radius = 45; // 小时刻度距离中心的百分比
          const x = 50 + radius * Math.cos(radian); // 计算x坐标
          const y = 50 + radius * Math.sin(radian); // 计算y坐标

          return (
            <div
              key={`hour-${i}`}
              className="absolute w-1 h-6 bg-gray-800 dark:bg-gray-200 rounded-full shadow-md"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: "center",
              }}
              aria-label={t("hourMarkers")}
            />
          );
        })}

        {/* 时针 */}
        <div
          className="absolute left-1/2 top-1/2 w-1.5 h-[25%] bg-gray-800 dark:bg-gray-200 rounded-full origin-bottom shadow-lg"
          style={{
            transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
          }}
          aria-label={t("hourHand")}
        />

        {/* 分针 */}
        <div
          className="absolute left-1/2 top-1/2 w-1 h-[35%] bg-gray-800 dark:bg-gray-200 rounded-full origin-bottom shadow-lg"
          style={{
            transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
          }}
          aria-label={t("minuteHand")}
        />

        {/* 秒针 */}
        <div
          className="absolute left-1/2 top-1/2 w-0.5 h-[40%] bg-red-500 rounded-full origin-bottom shadow-md"
          style={{
            transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
            filter: "drop-shadow(0 1px 3px rgba(239, 68, 68, 0.4))",
          }}
          aria-label={t("secondHand")}
        />

        {/* 中心圆点 */}
        <div
          className="absolute left-1/2 top-1/2 w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
          }}
          aria-label="时钟中心"
        />
      </div>
    </div>
  );
}
