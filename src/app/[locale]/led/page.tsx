import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { LedClock } from "@/components/clock/led-clock";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";
import { routing } from "@/i18n/routing";
import { buildClockPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ledClock" });

  return buildClockPageMetadata({
    locale,
    route: "/led",
    title: t("title"),
    description: t("description"),
  });
}

export default async function LedClockPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <LedClock />
      </FullscreenContainer>
    </>
  );
}
