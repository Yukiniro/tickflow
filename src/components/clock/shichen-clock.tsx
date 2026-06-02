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

function Node({ state, isFirst, isLast }: { state: "past" | "active" | "future"; isFirst: boolean; isLast: boolean }) {
  return (
    <span className="relative flex w-5 shrink-0 items-stretch justify-center self-stretch">
      {/* 日之脉络:贯穿的墨线,首尾收到节点中心 */}
      <span
        aria-hidden
        className="absolute w-px -translate-x-1/2"
        style={{ background: "var(--rail)", left: "50%", top: isFirst ? "50%" : 0, bottom: isLast ? "50%" : 0 }}
      />
      <span className="relative z-10 self-center">
        {state === "active" ? (
          <span
            className="block h-3.5 w-3.5 rounded-full"
            style={{
              background: "var(--red)",
              boxShadow: "0 0 0 3px var(--paper-bg), 0 0 12px 1px color-mix(in srgb, var(--red) 55%, transparent)",
            }}
          />
        ) : state === "past" ? (
          <span className="block h-2 w-2 rounded-full" style={{ background: "var(--ink)", boxShadow: "0 0 0 3px var(--paper-bg)" }} />
        ) : (
          <span
            className="block h-2 w-2 rounded-full border"
            style={{ borderColor: "var(--ink-faint)", background: "var(--paper-bg)", boxShadow: "0 0 0 3px var(--paper-bg)" }}
          />
        )}
      </span>
    </span>
  );
}

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
  const keLabel = `${isChu ? "初" : "正"}·${KE_CJK[ke]}刻`;
  const subtitle = t("hourOf", { animal: t(`zodiac.${cur.key}`) });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="shichen-paper relative w-full max-w-md rounded-sm px-6 py-7 md:px-9 md:py-9"
        role="img"
        aria-label={`${cur.epithet} ${subtitle} ${keLabel} ${modern}`}
      >
        {/* 卷首小印:一日长卷 */}
        <div className="mb-4 flex items-center justify-between font-serif text-xs tracking-[0.4em]" style={{ color: "var(--ink-faint)" }}>
          <span>一日十二時辰</span>
          <span style={{ color: "var(--red)" }}>·今·</span>
        </div>

        <ol className="flex flex-col">
          {SHICHEN.map((s, i) => {
            const active = i === idx;
            const past = i < idx;
            const node = <Node state={active ? "active" : past ? "past" : "future"} isFirst={i === 0} isLast={i === SHICHEN.length - 1} />;

            if (active) {
              return (
                <li key={s.key} className="shichen-focus my-1 flex items-stretch gap-4 rounded-sm">
                  {node}
                  <div className="flex-1 py-3 pr-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-5xl font-bold leading-none md:text-6xl" style={{ color: "var(--red)" }}>
                        {s.branch}
                      </span>
                      <span className="font-serif text-2xl md:text-3xl" style={{ color: "var(--ink)" }}>
                        {s.epithet}
                      </span>
                    </div>
                    <div className="mt-2 text-sm md:text-base" style={{ color: "var(--ink)" }}>
                      {subtitle} · {s.range}
                    </div>
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <span className="font-serif text-base" style={{ color: "var(--red)" }}>
                        {keLabel}
                      </span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: "var(--rail)" }}>
                        <span
                          className="block h-full rounded-full transition-[width] duration-500"
                          style={{ width: `${keProgress * 100}%`, background: "var(--red)" }}
                        />
                      </span>
                    </div>
                    <div className="mt-1.5 font-mono text-xs tabular-nums" style={{ color: "var(--ink-faint)" }}>
                      {modern}
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={s.key} className="flex items-stretch gap-4" style={{ opacity: past ? 0.7 : 0.42 }}>
                {node}
                <div className="flex flex-1 items-center gap-3 py-[0.3rem]">
                  <span className="font-serif text-lg" style={{ color: "var(--ink)" }}>
                    {s.branch}
                  </span>
                  <span className="font-serif text-base" style={{ color: "var(--ink-faint)" }}>
                    {s.epithet}
                  </span>
                  <span className="ml-auto font-mono text-xs tabular-nums" style={{ color: "var(--ink-faint)" }}>
                    {s.range}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
