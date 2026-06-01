import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 支持的语言列表
  locales: ["en", "zh", "ja", "ko", "fr", "de", "es", "ru", "pt"],

  // 默认语言
  defaultLocale: "en",
});
