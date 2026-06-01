"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  className?: string;
}

export function CTAButton({ href = "/basic", className }: CTAButtonProps) {
  const t = useTranslations("home");

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 bg-rail px-8 py-4 text-base font-bold uppercase tracking-wide text-rail-foreground transition-colors duration-75 hover:bg-foreground hover:text-background",
        className,
      )}
    >
      <span className="h-2 w-2 bg-rail-foreground transition-colors duration-75 group-hover:bg-background" />
      {t("cta.button")}
    </Link>
  );
}
