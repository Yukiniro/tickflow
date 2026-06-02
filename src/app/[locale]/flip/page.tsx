import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { BackgroundImage } from "@/components/background-image";
import { FlipClock } from "@/components/clock/flip-clock";
import { FullscreenContainer } from "@/components/fullscreen-container";
import { routing } from "@/i18n/routing";
import { buildClockPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flipClock" });

  return buildClockPageMetadata({
    locale,
    route: "/flip",
    title: t("title"),
    description: t("description"),
  });
}

export default async function FlipClockPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <FlipClock />
      </FullscreenContainer>
    </>
  );
}
