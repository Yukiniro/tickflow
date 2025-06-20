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
        "px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",
        className,
      )}
    >
      {t("cta.button")}
    </Link>
  );
}
