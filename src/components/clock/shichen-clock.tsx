"use client";

import { useTime } from "@/hooks/use-time";
import { useAtomValue } from "jotai";
import { timeAtom } from "@/store/time";
import { useTranslations } from "next-intl";

// 十二地支与对应生肖键(字圈恒为 CJK 字形,是视觉本体;文字标签随 locale 变)
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const BRANCH_KEYS = ["zi", "chou", "yin", "mao", "chen", "si", "wu", "wei", "shen", "you", "xu", "hai"];
// 一个时辰(2 小时)= 8 刻,每刻 15 分钟;刻名:初初/初一/初二/初三 + 正初/正一/正二/正三
const KE_CJK = ["初", "一", "二", "三"];

export function ShichenClock() {
  const { mounted } = useTime(); // 仅用于挂载标记 + 心跳
  const now = useAtomValue(timeAtom); // 原始时间,不受 12/24 开关影响
  const t = useTranslations("shichenClock");

  if (!mounted) return null;

  const H = now.getHours();
  const M = now.getMinutes();
  const S = now.getSeconds();

  // 子时起于 23:00,故先把小时偏移一位再按双时辰折算
  const idx = Math.floor(((H + 1) % 24) / 2); // 0..11 → 子丑…亥
  const minsIntoShichen = ((H + 1) % 2) * 60 + M; // 0..119
  const isChu = minsIntoShichen < 60; // 时初 / 时正
  const ke = Math.floor((minsIntoShichen % 60) / 15); // 0..3
  // 当前刻(15 分钟块)的秒级进度,驱动外圈细弧
  const keProgress = ((minsIntoShichen % 15) * 60 + S) / (15 * 60);

  const branch = BRANCHES[idx];
  const keLabel = `${isChu ? "初" : "正"}${KE_CJK[ke]}刻`;
  const subtitle = t("hourOf", { animal: t(`zodiac.${BRANCH_KEYS[idx]}`) });

  const pad = (n: number) => String(n).padStart(2, "0");
  const modern = `${pad(H)}:${pad(M)}:${pad(S)}`;

  const R = 130;
  const C = 2 * Math.PI * R;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="shichen-face relative w-[88vw] h-[88vw] max-w-[460px] max-h-[460px] rounded-full flex items-center justify-center"
        role="img"
        aria-label={`${subtitle} ${keLabel} ${modern}`}
      >
        {/* 刻进度弧 */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r={R} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
          <circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            className="shichen-arc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - keProgress)}
          />
        </svg>

        {/* 12 时辰字圈 */}
        {BRANCHES.map((ch, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180); // 子在顶部,顺时针
          const x = 50 + 42 * Math.cos(angle);
          const y = 50 + 42 * Math.sin(angle);
          const active = i === idx;
          return (
            <span
              key={ch}
              className={`absolute font-serif select-none transition-all duration-500 ${
                active ? "shichen-active text-3xl md:text-4xl font-bold" : "shichen-idle text-xl md:text-2xl"
              }`}
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              {ch}
            </span>
          );
        })}

        {/* 圆心:大字时辰 + 刻 + 生肖小注 + 现代时间 */}
        <div className="flex flex-col items-center justify-center text-center px-6">
          <div className="shichen-center font-serif text-7xl md:text-8xl font-bold leading-none">{branch}</div>
          <div className="shichen-ke font-serif text-2xl md:text-3xl mt-2">{keLabel}</div>
          <div className="mt-3 text-sm md:text-base text-muted-foreground">{subtitle}</div>
          <div className="mt-1 font-mono text-xs md:text-sm text-muted-foreground tabular-nums">{modern}</div>
        </div>
      </div>
    </div>
  );
}
