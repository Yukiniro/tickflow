import { setRequestLocale } from "next-intl/server";
import { FlipClock } from "@/components/clock/flip-clock";

export default async function FlipClockPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 设置请求区域设置以启用静态渲染
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <FlipClock />
    </div>
  );
}
