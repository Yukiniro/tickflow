"use client";

import { useClock } from "@/hooks/use-clock";
import { useTranslations } from "next-intl";

export function AnalogClock() {
  const { hours, minutes, seconds, mounted, is24Hour, ampm } = useClock();
  const t = useTranslations("analogClock");

  if (!mounted) {
    return null;
  }

  // 计算指针角度 (从12点开始，顺时针)
  const secondDegrees = seconds * 6; // 每秒6度
  const minuteDegrees = minutes * 6 + seconds * 0.1; // 每分钟6度，加上秒针的平滑移动
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5; // 每小时30度，加上分钟的平滑移动

  // 格式化时间显示
  const formatTime = () => {
    if (is24Hour) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0",
      )}`;
    } else {
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0",
      )}`;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="group relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] cursor-pointer transition-all duration-300 hover:scale-105"
        role="img"
        aria-label={t("description")}
      >
        {/* 时钟背景:外圈发丝边,增加表壳实体感 */}
        <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800 shadow-2xl ring-1 ring-black/10 dark:ring-white/10" />

        {/* 内圈阴影效果 */}
        <div className="absolute inset-2 rounded-full shadow-inner bg-linear-to-br from-gray-50 to-gray-200 dark:from-gray-700 dark:to-gray-900" />

        {/* 玻璃罩高光:顶部受光,让表盘像真实凸面镜面 */}
        <div className="analog-gloss pointer-events-none absolute inset-2 rounded-full" />

        {/* 数字时间显示 - hover时显示 */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 scale-75 transform opacity-0 transition-all duration-300 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto">

          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs rounded-lg px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200 tabular-nums">
                {formatTime()}
              </div>
              {!is24Hour && ampm && (
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{ampm}</div>
              )}
            </div>
          </div>
        </div>

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
              className="absolute w-0.5 h-2 bg-gray-600 dark:bg-gray-400 rounded-full shadow-xs transition-opacity duration-300 opacity-100 group-hover:opacity-30"
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
          const isCardinal = i % 3 === 0; // 12 / 3 / 6 / 9 主方位刻度,更粗更长

          return (
            <div
              key={`hour-${i}`}
              className={`absolute ${isCardinal ? "w-1.5 h-7" : "w-1 h-6"} bg-gray-800 dark:bg-gray-200 rounded-full shadow-md transition-opacity duration-300 opacity-100 group-hover:opacity-40`}
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
          className="absolute left-1/2 top-1/2 w-1.5 h-[25%] bg-gray-800 dark:bg-gray-200 rounded-full origin-bottom shadow-lg transition-opacity duration-300 opacity-100 group-hover:opacity-30"
          style={{
            transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
          }}
          aria-label={t("hourHand")}
        />

        {/* 分针 */}
        <div
          className="absolute left-1/2 top-1/2 w-1 h-[35%] bg-gray-800 dark:bg-gray-200 rounded-full origin-bottom shadow-lg transition-opacity duration-300 opacity-100 group-hover:opacity-30"
          style={{
            transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
          }}
          aria-label={t("minuteHand")}
        />

        {/* 秒针 */}
        <div
          className="absolute left-1/2 top-1/2 w-0.5 h-[40%] bg-red-500 rounded-full origin-bottom shadow-md transition-opacity duration-300 opacity-100 group-hover:opacity-40"
          style={{
            transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
            filter: "drop-shadow(0 1px 3px rgba(239, 68, 68, 0.4))",
          }}
          aria-label={t("secondHand")}
        />

        {/* 秒针配重尾:中心另一侧的短红杆,平衡视觉、贴近真实秒针 */}
        <div
          className="absolute left-1/2 top-1/2 w-1 h-[9%] bg-red-500 rounded-full origin-top transition-opacity duration-300 opacity-100 group-hover:opacity-40"
          style={{
            transform: `translate(-50%, 0) rotate(${secondDegrees}deg)`,
          }}
          aria-hidden
        />

        {/* 中心圆点:红色轴帽 + 浅色描边,呼应 Mondaine 站台钟 */}
        <div
          className="absolute left-1/2 top-1/2 w-3.5 h-3.5 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg ring-2 ring-white/80 dark:ring-black/40 transition-opacity duration-300 opacity-100 group-hover:opacity-30"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))",
          }}
          aria-label="时钟中心"
        />
      </div>
    </div>
  );
}
