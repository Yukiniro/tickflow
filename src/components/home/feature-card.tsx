import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";
import { LuArrowRight } from "react-icons/lu";

interface FeatureCardProps {
  type: "basic" | "flip" | "digital" | "comic" | "analog" | "led" | "nixie" | "shichen";
  icon: IconType;
  index: number;
  href?: string;
}

/** 时刻表条目:编号 · 图标 · 名称 · 描述 · 出发箭头。发丝分隔,瞬时 hover。 */
export function FeatureCard({ type, icon: Icon, index, href }: FeatureCardProps) {
  const t = useTranslations("home");

  const row = (
    <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-border px-2 py-6 transition-colors duration-75 hover:bg-accent/40 sm:grid-cols-[auto_auto_1fr_auto] sm:gap-8">
      {/* 编号 */}
      <span className="font-mono text-sm font-bold tabular-nums text-muted-foreground transition-colors duration-75 group-hover:text-rail">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* 图标(单色,无渐变方块) */}
      <Icon className="h-6 w-6 text-foreground transition-colors duration-75 group-hover:text-rail" strokeWidth={2} />

      {/* 名称 + 描述 */}
      <div className="min-w-0">
        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-75 group-hover:text-rail">
          {t(`features.${type}.title`)}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground sm:line-clamp-none">
          {t(`features.${type}.description`)}
        </p>
      </div>

      {/* 出发箭头 */}
      <LuArrowRight
        className={cn(
          "h-5 w-5 shrink-0 text-muted-foreground transition-all duration-75",
          "group-hover:translate-x-1 group-hover:text-rail",
        )}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {row}
      </Link>
    );
  }

  return row;
}
