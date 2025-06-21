import { routing } from '@/i18n/routing'

export type SupportedLocale = 'zh' | 'en' | 'ja'

/**
 * 从 Accept-Language 头中检测用户的首选语言
 */
export function detectLocaleFromHeaders(acceptLanguage: string | null): SupportedLocale {
  if (!acceptLanguage) {
    return 'en' // 默认英文
  }

  // 解析 Accept-Language 头
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, quality = '1'] = lang.trim().split(';q=')
      return {
        language: language.split('-')[0], // 只取主要语言代码
        quality: parseFloat(quality)
      }
    })
    .sort((a, b) => b.quality - a.quality)

  // 查找支持的语言
  for (const { language } of languages) {
    if (routing.locales.includes(language as SupportedLocale)) {
      return language as SupportedLocale
    }
  }

  return 'zh' // 如果没有匹配的语言，回退到中文
}

/**
 * 获取 manifest 的本地化配置
 */
export async function getManifestConfig(locale: SupportedLocale) {
  // 动态导入国际化消息
  const messages = await import(`@/i18n/locales/${locale}.json`)
  const t = messages.default.manifest

  return {
    name: t.name,
    short_name: t.short_name,
    description: t.description,
  }
} 