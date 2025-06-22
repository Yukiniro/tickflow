"use client";

import { useTranslations } from "next-intl";
import { FeatureCard } from "./feature-card";
import { CLOCK_FEATURES } from "./constants";

export function FeaturesSection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t("features.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("features.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLOCK_FEATURES.map(feature => (
            <FeatureCard key={feature.type} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
