import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { LedClock } from "@/components/clock/led-clock";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";

export function generateStaticParams() {
  return ["en", "zh", "ja"].map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("ledClock");

  return {
    title: t("title"),
    description: t("description"),
  };
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
