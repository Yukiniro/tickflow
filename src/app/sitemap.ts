import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tickflow.toimagen.com'
  
  // 为每个语言创建页面URL
  const pages = routing.locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(l => [l, `${baseUrl}/${l}`])
        ),
      },
    },
  ])

  return pages
} 