"use client";

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { timeAtom } from "@/store/time";
import { useTranslations } from "next-intl";

// 十二时辰:地支 · 别称 · 现代时段(子时起于 23:00)。
// 别称(夜半/平旦/日中…)是时辰最有文化味的部分,作 CJK 视觉本体、各语言通用;
// 生肖经 i18n 本地化,作非中日语言的理解钩子。
const SHICHEN = [
  { branch: "子", key: "zi", epithet: "夜半", range: "23–01" },
  { branch: "丑", key: "chou", epithet: "鸡鸣", range: "01–03" },
  { branch: "寅", key: "yin", epithet: "平旦", range: "03–05" },
  { branch: "卯", key: "mao", epithet: "日出", range: "05–07" },
  { branch: "辰", key: "chen", epithet: "食时", range: "07–09" },
  { branch: "巳", key: "si", epithet: "隅中", range: "09–11" },
  { branch: "午", key: "wu", epithet: "日中", range: "11–13" },
  { branch: "未", key: "wei", epithet: "日昳", range: "13–15" },
  { branch: "申", key: "shen", epithet: "晡时", range: "15–17" },
  { branch: "酉", key: "you", epithet: "日入", range: "17–19" },
  { branch: "戌", key: "xu", epithet: "黄昏", range: "19–21" },
  { branch: "亥", key: "hai", epithet: "人定", range: "21–23" },
] as const;
const KE_CJK = ["初", "一", "二", "三"];

export function ShichenClock() {
  const now = useAtomValue(timeAtom); // 原始时间,不受 12/24 开关影响
  const t = useTranslations("shichenClock");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 挂载标记,避免 SSR 水合不一致;心跳由布局中常驻的 Nav(useTime)统一驱动
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const H = now.getHours();
  const M = now.getMinutes();
  const S = now.getSeconds();

  const idx = Math.floor(((H + 1) % 24) / 2); // 0..11 → 子丑…亥
  const minsIntoShichen = ((H + 1) % 2) * 60 + M; // 0..119
  const isChu = minsIntoShichen < 60; // 时初 / 时正
  const ke = Math.floor((minsIntoShichen % 60) / 15); // 0..3
  const keProgress = ((minsIntoShichen % 15) * 60 + S) / 900; // 当前刻(15 分钟)进度 0..1

  const pad = (n: number) => String(n).padStart(2, "0");
  const modern = `${pad(H)}:${pad(M)}:${pad(S)}`;
  const cur = SHICHEN[idx];
  const keLabel = `${isChu ? "初" : "正"}${KE_CJK[ke]}刻`;
  const subtitle = t("hourOf", { animal: t(`zodiac.${cur.key}`) });

  return (
    <div
      className="shichen-stage relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      role="img"
      aria-label={`${cur.epithet} ${subtitle} ${keLabel} ${modern}`}
    >
      {/* 中央强化区:地支大字 + 现代时间。hover 整个区域 → 时间放大动画 */}
      <div className="shichen-core flex flex-col items-center">
        {/* key=idx → 换时辰时巨字墨晕淡入 */}
        <span
          key={idx}
          className="shichen-hero shichen-bloom select-none font-bold leading-none"
          style={{ fontSize: "min(46vh, 50vmin)" }}
        >
          {cur.branch}
        </span>
        <span className="shichen-time mt-3 font-mono text-lg tabular-nums select-none md:mt-5 md:text-2xl">{modern}</span>
      </div>

      {/* 题字:竖排别称,右上角(下移让开 fixed 导航栏) */}
      <span
        className="shichen-epithet absolute top-16 right-5 select-none font-bold leading-none md:top-20 md:right-10"
        style={{ writingMode: "vertical-rl", fontSize: "min(9vh, 7vmin)" }}
      >
        {cur.epithet}
      </span>

      {/* 左上:现代时段 + 本地化生肖(下移让开导航栏,限宽防溢出) */}
      <div className="absolute top-16 left-5 max-w-[55vw] md:top-20 md:left-10">
        <div className="font-mono text-xs tracking-[0.3em]" style={{ color: "var(--ink-soft)" }}>
          {cur.range}
        </div>
        <div className="shichen-epithet mt-1.5 truncate text-sm font-bold md:text-base" style={{ color: "var(--ink)" }}>
          {subtitle}
        </div>
      </div>

      {/* 左下:朱砂落款印 — 当前刻 */}
      <span
        className="shichen-seal absolute bottom-7 left-5 flex items-center justify-center rounded-[20%] font-bold select-none md:bottom-10 md:left-10"
        style={{ writingMode: "vertical-rl", padding: "0.5rem 0.4rem", fontSize: "min(4.2vh, 3.8vmin)", letterSpacing: "0.12em" }}
      >
        {keLabel}
      </span>

      {/* 底边:当前刻进度细线 */}
      <div className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: "color-mix(in srgb, var(--ink) 10%, transparent)" }}>
        <div
          className="h-full transition-[width] duration-700 ease-linear"
          style={{ width: `${keProgress * 100}%`, background: "var(--red)" }}
        />
      </div>
    </div>
  );
}
