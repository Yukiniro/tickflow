import { useTranslations } from "next-intl";
import { FeatureCard } from "./feature-card";
import { CLOCK_FEATURES } from "./constants";

export function FeaturesSection() {
  const t = useTranslations("home");

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6 border-b-2 border-foreground pb-5">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2.5 w-2.5 bg-rail" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Departures</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("features.title")}</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground md:block">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="border-t border-border">
          {CLOCK_FEATURES.map((feature, i) => (
            <FeatureCard key={feature.type} type={feature.type} icon={feature.icon} index={i} href={feature.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
