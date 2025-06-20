import { Metadata } from "next";

export function generateHomeMetadata(locale: string, title: string, description: string): Metadata {
  const keywords =
    locale === "zh"
      ? "在线时钟, 模拟时钟, 数字时钟, 多时区, 网页时钟, 时间显示"
      : locale === "ja"
      ? "オンライン時計, アナログ時計, デジタル時計, 複数タイムゾーン, ウェブ時計, 時間表示"
      : "online clock, analog clock, digital clock, multiple timezones, web clock, time display";

  return {
    title,
    description,
    keywords,
  };
} 