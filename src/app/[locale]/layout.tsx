import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { BackgroundImage } from "@/components/background-image";
import { StructuredData } from "@/components/structured-data";
import { SEOOptimizations } from "@/components/seo-optimizations";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tickflow.toimagen.com"),
  title: {
    default: "TickFlow - 优雅的时钟应用",
    template: "%s | TickFlow",
  },
  description:
    "TickFlow 是一个功能丰富的在线时钟应用，提供翻转时钟、数字时钟、模拟时钟等多种时钟样式。支持实时显示、优雅动画、响应式设计，为您带来极致的时间体验。",
  keywords:
    "在线时钟,实时时钟,数字时钟,翻转时钟,模拟时钟,时间显示,世界时钟,时钟应用,TickFlow,online clock,real-time clock,digital clock,flip clock,analog clock,time display,world clock,clock app",
  openGraph: {
    title: "TickFlow - 优雅的时钟应用",
    description: "功能丰富的在线时钟应用，提供翻转时钟、数字时钟、模拟时钟等多种样式，支持实时显示和优雅动画效果",
    type: "website",
    url: "https://tickflow.toimagen.com",
    siteName: "TickFlow",
    locale: "zh_CN",
    images: [
      {
        url: "/logo.png",
        width: 810,
        height: 810,
        alt: "TickFlow - 优雅的时钟应用",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TickFlow - 优雅的时钟应用",
    description: "功能丰富的在线时钟应用，支持翻转时钟、数字时钟等多种样式",
    creator: "@tickflow",
    site: "@tickflow",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://tickflow.toimagen.com",
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
            <BackgroundImage />
            <Nav />
            <main>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
