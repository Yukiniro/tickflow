import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateHomeMetadata } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import { HeroSection, FeaturesSection, HighlightsSection, CTASection, Footer } from "@/components/home";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  const tMeta = await getTranslations("metadata");

  return generateHomeMetadata(t("title"), t("subtitle"), tMeta("keywords"));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col pt-14 bg-background">
      <HeroSection />
      <FeaturesSection />
      <HighlightsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
