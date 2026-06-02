import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/app/providers";
import { Nav } from "@/components/nav";
import { StructuredData } from "@/components/structured-data";
import { SEOOptimizations } from "@/components/seo-optimizations";
import { routing } from "@/i18n/routing";
import { SITE_URL, buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

interface MetadataMessages {
  title: string;
  description: string;
  keywords: string;
  openGraph: { title: string; description: string };
  twitter: { title: string; description: string };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  // 获取本地化消息
  const messages = await getMessages({ locale });
  const t = messages.metadata as unknown as MetadataMessages;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.title,
      template: `%s | TickFlow`,
    },
    description: t.description,
    keywords: t.keywords,
    openGraph: buildOpenGraph(locale, "", t.openGraph.title, t.openGraph.description),
    twitter: buildTwitter(t.twitter.title, t.twitter.description),
    alternates: buildAlternates(locale, ""),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <StructuredData locale={locale} />
        <SEOOptimizations />
      </head>
      <body className={`${archivo.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Nav />
              <main>{children}</main>
            </Providers>
          </NextIntlClientProvider>
        </ThemeProvider>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
