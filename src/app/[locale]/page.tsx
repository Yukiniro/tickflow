import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 设置请求区域设置以启用静态渲染
  setRequestLocale(locale);

  // 直接重定向到 basic 页面
  redirect({ href: "/basic", locale });
}
