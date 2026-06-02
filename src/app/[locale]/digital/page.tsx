import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { DigitalWatch } from "@/components/clock/digital-watch";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";
import { routing } from "@/i18n/routing";
import { buildClockPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "digitalWatch" });

  return buildClockPageMetadata({
    locale,
    route: "/digital",
    title: t("title"),
    description: t("description"),
  });
}

export default async function DigitalWatchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <DigitalWatch />
      </FullscreenContainer>
    </>
  );
}
