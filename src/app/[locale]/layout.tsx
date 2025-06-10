import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { StructuredData } from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tickflow.toimagen.com"),
  title: "TickFlow",
  description: "一个优雅的时钟应用",
  keywords: "online clock, real-time clock, digital clock, current time, time display, world clock",
  openGraph: {
    title: "TickFlow - 优雅的时钟应用",
    description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
    type: "website",
    url: "https://tickflow.toimagen.com",
    siteName: "TickFlow",
    locale: "zh_CN",
    images: [
      {
        url: "/logo.png",
        width: 810,
        height: 810,
        alt: "TickFlow Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TickFlow - 优雅的时钟应用",
    description: "一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用",
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 确保传入的 locale 是有效的
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 设置请求区域设置以启用静态渲染
  setRequestLocale(locale);

  // 获取当前语言的消息
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative min-h-screen">
              <Nav />
              <main className="container flex min-h-screen flex-col items-center justify-center">{children}</main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
