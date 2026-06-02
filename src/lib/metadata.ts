import { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** 站点根地址，集中维护，避免散落在各文件 */
export const SITE_URL = "https://tickflow.toimagen.com";

/** locale → BCP-47 语言地区码，用于 hreflang 与 og:locale，覆盖全部受支持语言 */
const LOCALE_TO_BCP47: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  ru: "ru-RU",
  pt: "pt-BR",
};

function toBcp47(locale: string): string {
  return LOCALE_TO_BCP47[locale] ?? LOCALE_TO_BCP47[routing.defaultLocale];
}

/** og:locale 需要下划线形式（如 zh_CN） */
export function getOgLocale(locale: string): string {
  return toBcp47(locale).replace("-", "_");
}

/**
 * 生成 canonical + 全语言 hreflang（含 x-default）。
 * route 为路由后缀：首页传 ""，时钟页传 "/analog" 等。
 * 由 routing.locales 动态展开，新增语言时自动覆盖，无需手改。
 */
export function buildAlternates(locale: string, route = ""): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[toBcp47(l)] = `${SITE_URL}/${l}${route}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${route}`;

  return {
    canonical: `${SITE_URL}/${locale}${route}`,
    languages,
  };
}

/** 生成完整的 Open Graph 字段，确保子页面覆盖时不丢失站点级信息 */
export function buildOpenGraph(
  locale: string,
  route: string,
  title: string,
  description: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    type: "website",
    url: `${SITE_URL}/${locale}${route}`,
    siteName: "TickFlow",
    locale: getOgLocale(locale),
    images: [
      {
        url: "/logo.png",
        width: 810,
        height: 810,
        alt: title,
      },
    ],
  };
}

/** 生成完整的 Twitter Card 字段，确保子页面覆盖时不丢失站点级信息 */
export function buildTwitter(title: string, description: string): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    creator: "@tickflow",
    site: "@tickflow",
    images: ["/logo.png"],
  };
}

/**
 * 时钟子页统一的 metadata 生成：独立 title/description、canonical、hreflang、OG、Twitter。
 * 解决子页继承首页 canonical / OG 导致无法被独立收录、分享预览错乱的问题。
 */
export function buildClockPageMetadata(params: {
  locale: string;
  route: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, route, title, description } = params;
  return {
    title,
    description,
    alternates: buildAlternates(locale, route),
    openGraph: buildOpenGraph(locale, route, title, description),
    twitter: buildTwitter(title, description),
  };
}

/** 首页 metadata（标题、描述、关键词），其余 OG / Twitter / alternates 由 layout 统一注入 */
export function generateHomeMetadata(title: string, description: string, keywords: string): Metadata {
  return {
    title,
    description,
    keywords,
  };
}
