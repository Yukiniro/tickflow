"use client";

import { useTranslations } from "next-intl";
import { CTAButton } from "./cta-button";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-background/80 to-muted/30 dark:from-background dark:via-background/90 dark:to-muted/20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl font-bold py-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        <div className="flex gap-4 justify-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
