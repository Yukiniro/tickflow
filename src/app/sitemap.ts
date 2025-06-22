import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tickflow.toimagen.com'
  
  // 定义所有页面路径
  const pageRoutes = [
    '',
    '/flip', 
    '/digital', 
    '/basic', 
    '/comic',
    '/analog',
    '/led'
  ]
  
  // 为每个语言和页面创建URL
  const pages = routing.locales.flatMap((locale) => 
    pageRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return pages
} 