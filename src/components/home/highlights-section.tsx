"use client";

import { useTranslations } from "next-intl";
import { HIGHLIGHT_FEATURES } from "./constants";

export function HighlightsSection() {
  const t = useTranslations("home");

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 border-b-2 border-foreground pb-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-2.5 w-2.5 bg-rail" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Specifications</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("highlights.title")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t("highlights.subtitle")}</p>
        </div>

        {/* 规格网格:发丝线构成的瑞士网格 */}
        <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHT_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={feature.type} className="group border-b border-r border-border p-7 transition-colors duration-75 hover:bg-background">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tabular-nums tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 text-foreground transition-colors duration-75 group-hover:text-rail" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">
                  {t(`highlights.${feature.type}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`highlights.${feature.type}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
