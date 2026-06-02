import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { AnalogClock } from "@/components/clock/analog-clock";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "analogClock" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AnalogClockPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <AnalogClock />
      </FullscreenContainer>
    </>
  );
}
