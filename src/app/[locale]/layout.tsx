import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { StructuredData } from "@/components/structured-data";
import { SEOOptimizations } from "@/components/seo-optimizations";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  // 获取本地化消息
  const messages = await getMessages({ locale });
  const t = messages.metadata as any;

  // 根据locale设置对应的语言代码
  const localeMap: Record<string, string> = {
    zh: "zh_CN",
    en: "en_US",
    ja: "ja_JP",
  };

  const ogLocale = localeMap[locale] || "zh_CN";

  return {
    metadataBase: new URL("https://tickflow.toimagen.com"),
    title: {
      default: t.title,
      template: `%s | TickFlow`,
    },
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.openGraph.title,
      description: t.openGraph.description,
      type: "website",
      url: `https://tickflow.toimagen.com/${locale}`,
      siteName: "TickFlow",
      locale: ogLocale,
      images: [
        {
          url: "/logo.png",
          width: 810,
          height: 810,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.twitter.title,
      description: t.twitter.description,
      creator: "@tickflow",
      site: "@tickflow",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `https://tickflow.toimagen.com/${locale}`,
      languages: {
        "zh-CN": "https://tickflow.toimagen.com/zh",
        "en-US": "https://tickflow.toimagen.com/en",
        "ja-JP": "https://tickflow.toimagen.com/ja",
      },
    },
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <Nav />
            <main>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
