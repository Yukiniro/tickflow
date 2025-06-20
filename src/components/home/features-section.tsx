"use client";

import { useTranslations } from "next-intl";
import { FeatureCard } from "./feature-card";
import { FEATURES } from "./constants";

export function FeaturesSection() {
  const t = useTranslations("home");

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">{t("features.title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map(feature => (
            <FeatureCard key={feature.type} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
