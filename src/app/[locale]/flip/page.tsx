import { setRequestLocale } from "next-intl/server";
import { FlipClock } from "@/components/clock/flip-clock";
import { FlipClockStructuredData } from "@/components/flip-clock-structured-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const isZh = locale === "zh";
  const baseUrl = "https://tickflow.toimagen.com";

  return {
    title: isZh ? "翻转时钟 - TickFlow" : "Flip Clock - TickFlow",
    description: isZh
      ? "体验精美的3D翻转时钟效果，实时显示当前时间，支持多种翻转动画。优雅的视觉设计，流畅的动画效果。"
      : "Experience beautiful 3D flip clock effects with real-time display. Elegant visual design with smooth animation transitions.",
    keywords: isZh
      ? "翻转时钟,3D时钟,动画时钟,实时时钟,数字时钟,在线时钟,时间显示,时钟应用"
      : "flip clock, 3D clock, animated clock, real-time clock, digital clock, online clock, time display, clock app",
    openGraph: {
      title: isZh ? "翻转时钟 - TickFlow" : "Flip Clock - TickFlow",
      description: isZh
        ? "体验精美的3D翻转时钟效果，实时显示当前时间，支持多种翻转动画。"
        : "Experience beautiful 3D flip clock effects with real-time display.",
      url: `${baseUrl}/${locale}/flip`,
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 810,
          height: 810,
          alt: isZh ? "TickFlow 翻转时钟" : "TickFlow Flip Clock",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "翻转时钟 - TickFlow" : "Flip Clock - TickFlow",
      description: isZh
        ? "体验精美的3D翻转时钟效果，实时显示当前时间"
        : "Experience beautiful 3D flip clock effects with real-time display",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/flip`,
      languages: {
        "zh-CN": `${baseUrl}/zh/flip`,
        "en-US": `${baseUrl}/en/flip`,
        "ja-JP": `${baseUrl}/ja/flip`,
      },
    },
  };
}

export default async function FlipClockPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 设置请求区域设置以启用静态渲染
  setRequestLocale(locale);

  return (
    <>
      <FlipClockStructuredData locale={locale} />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <FlipClock />
      </div>
    </>
  );
}
