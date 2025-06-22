"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { HIGHLIGHT_FEATURES } from "./constants";

export function HighlightsSection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t("highlights.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("highlights.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIGHLIGHT_FEATURES.map(feature => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.type}
                className="group p-6 rounded-xl border border-border bg-card hover:bg-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={cn(
                    "w-12 h-12 mb-4 bg-gradient-to-br rounded-lg flex items-center justify-center",
                    feature.gradientFrom,
                    feature.gradientTo,
                  )}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {t(`highlights.${feature.type}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t(`highlights.${feature.type}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
