import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generateHomeMetadata } from "@/lib/metadata";
import { HeroSection, FeaturesSection, CTASection, Footer } from "@/components/home";

export function generateStaticParams() {
  return ["en", "zh", "ja"].map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("home");

  return generateHomeMetadata(locale, t("title"), t("subtitle"));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col pt-14 bg-background">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
