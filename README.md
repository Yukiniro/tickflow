# TickFlow

一个优雅的多语言时钟应用，基于 Next.js 和 Tailwind CSS 构建。

## 🌍 国际化支持

TickFlow 现在支持多语言：

- 🇺🇸 **English** - 英语
- 🇨🇳 **中文** - 简体中文  
- 🇯🇵 **日本語** - 日语

### 语言切换

- 点击导航栏右上角的地球图标可以切换语言
- 应用会记住您的语言偏好
- URL 会自动包含语言代码（如 `/en/basic`, `/zh/digital`）

### 支持的路由

- `/en/` - 英语首页
- `/zh/` - 中文首页  
- `/ja/` - 日语首页
- 各语言下的时钟页面：`/[locale]/basic`, `/[locale]/digital`, `/[locale]/comic`

## 🚀 开始使用

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🛠️ 技术栈

- **Next.js 15** - React 框架
- **next-intl** - 国际化解决方案
- **Tailwind CSS** - 样式框架
- **TypeScript** - 类型安全
- **Jotai** - 状态管理
- **React Icons** - 图标库

## 📁 项目结构

```
src/
├── app/
│   ├── [locale]/          # 国际化路由
│   │   ├── basic/         # 基础时钟
│   │   ├── digital/       # 数字手表
│   │   ├── comic/         # 漫画字体
│   │   └── layout.tsx     # 语言布局
│   └── globals.css
├── components/
│   ├── clock/             # 时钟组件
│   ├── ui/                # UI 组件
│   └── language-switcher.tsx  # 语言切换器
├── hooks/                 # 自定义钩子
│   └── useTime.ts         # 时间管理钩子
├── i18n/
│   ├── locales/           # 语言文件
│   │   ├── en.json        # 英语翻译
│   │   ├── zh.json        # 中文翻译
│   │   └── ja.json        # 日语翻译
│   ├── routing.ts         # 路由配置
│   ├── navigation.ts      # 导航配置
│   └── request.ts         # 请求配置
├── lib/                   # 工具函数
├── store/                 # 状态管理
├── types/                 # TypeScript 类型定义
└── middleware.ts          # 国际化中间件
```

## 🌐 添加新语言

1. 在 `src/i18n/routing.ts` 中添加新的语言代码
2. 在 `src/i18n/locales/` 中创建对应的 JSON 文件
3. 在 `src/components/language-switcher.tsx` 中添加语言选项

## 📝 许可证

MIT License

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

