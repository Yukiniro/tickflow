import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { detectLocaleFromHeaders, getManifestConfig } from '@/lib/utils/manifest'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // 获取请求头中的语言信息
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  
  // 检测用户的首选语言
  const locale = detectLocaleFromHeaders(acceptLanguage)
  
  // 获取本地化配置
  const config = await getManifestConfig(locale)

  return {
    name: config.name,
    short_name: config.short_name,
    description: config.description,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    categories: ['utilities', 'productivity'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '810x810',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
} 