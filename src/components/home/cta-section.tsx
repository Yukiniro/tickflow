"use client";

import { useTranslations } from "next-intl";
import { CTAButton } from "./cta-button";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 px-4 bg-muted/30 dark:bg-muted/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground">{t("cta.title")}</h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{t("cta.description")}</p>
        <CTAButton className="inline-block" />
      </div>
    </section>
  );
}
