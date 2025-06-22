"use client";

import { useTranslations } from "next-intl";
import { CTAButton } from "./cta-button";
import Link from "next/link";
import { Github } from "lucide-react";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 px-4 bg-muted/30 dark:bg-muted/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-foreground">{t("cta.title")}</h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{t("cta.description")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CTAButton className="inline-block" />
          <Link
            href="https://github.com/Yukiniro/tickflow"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-border bg-background hover:bg-accent text-foreground rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            {t("cta.secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
