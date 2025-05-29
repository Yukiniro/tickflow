# tickflow

tickflow 是一个基于 Next.js 和 Tailwind CSS 的时钟应用。

## 技术栈

- Next.js
- Tailwind CSS
- TypeScript
- React
- Shadcn UI
- Vercel

## 核心逻辑

`useTime` 钩子会返回当前时间，并使用 `useEffect` 钩子每秒更新一次时间。

## 应用需求

- 支持 SEO，支持 SSR
- 支持暗色模式
- 顶部可以切换时钟样式，有以下几种：
  - 基础时钟：显示当前时间，每秒更新一次
  - 翻页时钟：模拟翻页时钟的显示效果
  - 数字手表：模拟数字手表的显示效果
  - 漫画字体：使用漫画字体显示当前时间

