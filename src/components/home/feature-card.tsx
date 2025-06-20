"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  type: "analog" | "digital" | "timezone";
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  hoverColor: string;
}

export function FeatureCard({ type, icon, gradientFrom, gradientTo, hoverColor }: FeatureCardProps) {
  const t = useTranslations("home");

  return (
    <div className="group p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div
        className={cn(
          "w-16 h-16 mx-auto mb-6 bg-gradient-to-br rounded-2xl flex items-center justify-center",
          gradientFrom,
          gradientTo,
        )}
      >
        {icon}
      </div>
      <h3 className={cn("text-2xl font-semibold mb-4 text-center text-card-foreground transition-colors", hoverColor)}>
        {t(`features.${type}.title`)}
      </h3>
      <p className="text-muted-foreground text-center leading-relaxed">{t(`features.${type}.description`)}</p>
    </div>
  );
}
