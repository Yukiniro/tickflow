import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TickFlow - 优雅的时钟应用',
    short_name: 'TickFlow',
    description: '一个基于 Next.js 和 Tailwind CSS 的优雅时钟应用',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
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
        sizes: '810x810',
        type: 'image/png',
      },
    ],
  }
} 