import { useTranslations } from "next-intl";
import { CTAButton } from "./cta-button";
import { MondaineClock } from "./mondaine-clock";
import { LiveTime } from "./live-time";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* 左:文案 + 巨型实时时间 */}
        <div className="order-2 lg:order-1">
          {/* eyebrow:红色 tick 方块 + 品牌 */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-3 w-3 bg-rail" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">TickFlow</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>

          {/* 巨型实时时间——视觉锚 */}
          <LiveTime className="mt-8 block text-6xl text-foreground sm:text-7xl md:text-8xl" />

          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CTAButton />
          </div>
        </div>

        {/* 右:Mondaine 站台钟 */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <MondaineClock className="h-auto w-[min(72vw,440px)]" />
        </div>
      </div>
    </section>
  );
}
