"use client";

import { useTranslations } from "next-intl";
import { CTAButton } from "./cta-button";
import Link from "next/link";
import { SiGithub as Github } from "react-icons/si";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2.5 w-2.5 bg-rail" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">All aboard</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("cta.title")}</h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("cta.description")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <CTAButton />
            <Link
              href="https://github.com/Yukiniro/tickflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-foreground px-8 py-4 text-base font-bold uppercase tracking-wide text-foreground transition-colors duration-75 hover:bg-foreground hover:text-background"
            >
              <Github className="h-5 w-5" />
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
