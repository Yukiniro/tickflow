import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { BasicClock } from "@/components/clock/basic-clock";
import { BackgroundImage } from "@/components/background-image";
import { FullscreenContainer } from "@/components/fullscreen-container";
import { routing } from "@/i18n/routing";
import { buildClockPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "basicClock" });

  return buildClockPageMetadata({
    locale,
    route: "/basic",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BasicClockPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FullscreenContainer>
        <BackgroundImage />
        <BasicClock />
      </FullscreenContainer>
    </>
  );
}
