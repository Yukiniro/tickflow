# TickFlow

一个优雅的多语言时钟应用，基于 Next.js 和 Tailwind CSS 构建。提供多种时钟样式，支持实时显示、优雅动画和响应式设计。

## ✨ 主要功能

### 🕐 多种时钟样式
- **基础时钟（basic）** - 超大号极简数字文本，等宽数字对齐
- **数字时钟（digital）** - 带表壳边框的数字手表样式
- **翻转时钟（flip）** - 模拟翻页时钟的显示效果，带有优雅的翻转动画
- **漫画时钟（comic）** - 使用漫画字体显示当前时间，充满趣味性
- **模拟时钟（analog）** - 经典指针表盘，时/分/秒针，悬停显示数字时间
- **LED 时钟（led）** - 点阵 LED 数码管显示，支持多种颜色主题
- **辉光管时钟（nixie）** - 模拟 Nixie 辉光管，0-9 阴极堆叠、仅当前数字点亮，带金属网格与玻璃质感
- **十二时辰（shichen）** - 中国传统计时：地支（子丑寅…）+ 别称（夜半/平旦/日中）+ 时刻（初/正·刻），并对照现代时段，生肖随语言本地化

> 全站时间由单一心跳（`useClockHeartbeat`）每秒驱动，12/24 小时制可全局切换。首页另有 Mondaine 站台钟与巨型实时时间展示。

### 🌍 国际化支持
支持 9 种语言：

- 🇺🇸 **English** · 🇨🇳 **中文** · 🇯🇵 **日本語** · 🇰🇷 **한국어** · 🇫🇷 **Français**
- 🇩🇪 **Deutsch** · 🇪🇸 **Español** · 🇷🇺 **Русский** · 🇵🇹 **Português**

### 🎨 用户体验
- **响应式设计** - 完美适配桌面、平板和移动设备
- **暗色模式** - 支持明暗主题切换
- **背景图片** - 可选的动态背景图片，支持透明度和模糊度调节
- **全屏模式** - 支持全屏预览时钟
- **声音效果** - 可选的时钟滴答声
- **分享功能** - 一键分享到社交媒体

## 🚀 快速开始

### 环境要求
- Node.js 20.9+
- pnpm (推荐) 或 npm

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
pnpm build
pnpm start
```

### 常用脚本
```bash
pnpm lint        # ESLint 检查（Next 16 不再于 build 时运行 lint）
pnpm typecheck   # tsc --noEmit 类型检查
pnpm format      # Prettier 格式化 src/**/*.{ts,tsx,css}
```

## 🛠️ 技术栈

- **Next.js 16** - React 框架（App Router + Turbopack）
- **React 19** - UI 库
- **next-intl** - 国际化解决方案
- **Tailwind CSS v4** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全的 JavaScript
- **Jotai** - 轻量级状态管理
- **Radix UI** - 无障碍的 UI 组件
- **react-icons** - 图标库（Lucide 图标 + Simple Icons 品牌图标）
- **clsx + tailwind-merge** - 类名管理工具

## 📁 项目结构

```
src/
├── app/
│   ├── [locale]/              # 国际化路由（所有页面均带语言前缀）
│   │   ├── basic/             # 基础时钟页面
│   │   ├── digital/           # 数字时钟页面
│   │   ├── comic/             # 漫画时钟页面
│   │   ├── flip/              # 翻转时钟页面
│   │   ├── analog/            # 模拟时钟页面
│   │   ├── led/               # LED 时钟页面
│   │   ├── layout.tsx         # 语言布局
│   │   └── page.tsx           # 首页
│   ├── globals.css            # 全局样式
│   ├── manifest.ts            # PWA 配置
│   ├── providers.tsx          # Jotai Provider + 全站时钟心跳挂载
│   ├── robots.ts              # SEO 配置
│   └── sitemap.ts             # 站点地图
├── components/
│   ├── home/                  # 首页区块（多为 Server Component）
│   │   ├── hero-section.tsx   # 英雄区域
│   │   ├── features-section.tsx / feature-card.tsx
│   │   ├── highlights-section.tsx
│   │   ├── cta-section.tsx / cta-button.tsx
│   │   ├── footer.tsx / contact-link.tsx
│   │   ├── live-time.tsx      # 首页巨型实时时间（client 岛）
│   │   ├── mondaine-clock.tsx # Mondaine 站台钟（client 岛）
│   │   ├── constants.tsx      # 常量数据
│   │   └── index.ts
│   ├── clock/                 # 八种时钟组件
│   │   ├── basic-clock.tsx / digital-watch.tsx / comic-clock.tsx
│   │   ├── flip-clock.tsx / analog-clock.tsx / led-clock.tsx
│   │   ├── nixie-clock.tsx / shichen-clock.tsx
│   │   └── led-themes.ts      # LED 主题表（共享）
│   ├── ui/                    # Radix UI + CVA 基础组件
│   ├── clock-heartbeat.tsx    # 全站唯一心跳载体（挂载一次）
│   ├── clock-type-selector.tsx# 时钟类型选择器
│   ├── nav.tsx                # 导航栏
│   ├── background-image.tsx / background-toggle.tsx
│   ├── fullscreen-container.tsx / fullscreen-toggle.tsx
│   ├── language-switcher.tsx / theme-toggle.tsx / theme-provider.tsx
│   ├── sound-toggle.tsx / time-format-toggle.tsx / share-button.tsx
│   ├── led-theme-selector.tsx / github-icon.tsx / google-analytics.tsx
│   └── structured-data.tsx / flip-clock-structured-data.tsx / seo-optimizations.tsx
├── hooks/
│   ├── use-clock-heartbeat.ts # 唯一写入方：setInterval + 滴答声
│   ├── use-clock.ts           # 只读时间订阅（所有展示组件使用）
│   └── use-time-format.ts     # 12/24 小时制切换
├── i18n/
│   ├── locales/               # 9 种语言 JSON（en/zh/ja/ko/fr/de/es/ru/pt）
│   ├── navigation.ts          # 导航配置
│   ├── request.ts             # 请求配置
│   └── routing.ts             # 路由配置（locales 唯一来源）
├── lib/
│   ├── pexels.ts              # Pexels API 集成
│   ├── metadata.ts            # 元数据工具
│   ├── utils.ts               # cn() 类名工具
│   └── utils/manifest.ts      # manifest 本地化工具
├── store/                     # Jotai 状态
│   ├── background.ts          # 背景状态
│   ├── sound.ts               # 声音状态
│   ├── time.ts                # 时间状态
│   └── led-theme.ts           # LED 主题持久化
├── types/                     # TypeScript 类型定义
└── proxy.ts                   # 国际化中间件（Next 16 由 middleware 更名为 proxy）
```

## 🌐 国际化

### 语言切换
- 点击导航栏右上角的地球图标可以切换语言
- 应用会记住您的语言偏好
- URL 会自动包含语言代码（如 `/en/basic`, `/zh/digital`）

### 支持的路由
- 所有路由均带语言前缀：`en` / `zh` / `ja` / `ko` / `fr` / `de` / `es` / `ru` / `pt`
- 首页：`/[locale]`（如 `/en`、`/zh`）
- 时钟页面：`/[locale]/basic`、`/digital`、`/comic`、`/flip`、`/analog`、`/led`、`/nixie`、`/shichen`

### 添加新语言
1. 在 `src/i18n/routing.ts` 中添加新的语言代码
2. 在 `src/i18n/locales/` 中创建对应的 JSON 文件
3. 在 `src/components/language-switcher.tsx` 中添加语言选项

> 三处缺一会导致该语言静默失效。

## 🎨 主题和样式

### 暗色模式
- 自动检测系统主题偏好（基于 `next-themes`）
- 支持手动切换明暗主题
- 所有组件都支持主题切换

### 背景图片
- 集成 Pexels API 获取高质量背景图片
- 支持透明度和模糊度调节
- 自动刷新背景图片

### 响应式设计
- 移动优先的设计理念
- 完美适配各种屏幕尺寸
- 流畅的动画和过渡效果

## 🔧 开发指南

### 环境变量配置

创建 `.env.local` 文件并添加以下配置：

```bash
# Google Analytics (可选)
# 获取你的 GA4 测量 ID: https://analytics.google.com/
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Pexels API (可选，用于背景图片)
# 获取你的 API 密钥: https://www.pexels.com/api/
NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key_here
```

> 注意：背景图片功能在客户端发起请求，因此 Pexels 密钥使用 `NEXT_PUBLIC_` 前缀；`next.config.ts` 仅放行 `images.pexels.com` 作为图片来源。

### Google Analytics 集成

项目已集成 Google Analytics 4，支持以下功能：

- **页面浏览跟踪** - 自动跟踪页面访问
- **事件跟踪** - 跟踪用户交互行为：
  - 时钟类型切换
  - 语言切换
  - 主题切换
  - 背景设置
  - 声音开关
  - 时间格式切换
  - 全屏模式

### 代码规范
- 使用 TypeScript 确保类型安全
- 遵循 React 最佳实践
- 组件化开发，提高代码复用性
- 使用 ESLint 和 Prettier 保持代码质量
- 注释与提交信息以中文为主，保持与现有风格一致

### 状态管理
- 使用 Jotai 进行轻量级状态管理
- 按功能模块组织状态（time / sound / background / led-theme）
- 背景与 LED 主题通过 `atomWithStorage` 持久化

### 时钟心跳架构
- 全站仅一个 `setInterval`：由 `<ClockHeartbeat>`（在根 `<Providers>` 中）挂载一次，每秒写入 `timeAtom`
- 所有展示组件通过只读的 `useClock()` 订阅，不再各自新建计时器或 `AudioContext`
- 切换控件使用 `useTimeFormat()` 读写 12/24 小时制

## 📱 PWA 支持

- 可安装为桌面应用
- 离线缓存支持
- 推送通知（计划中）

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [next-intl](https://next-intl-docs.vercel.app/) - 国际化解决方案
- [Radix UI](https://www.radix-ui.com/) - 无障碍 UI 组件
- [Pexels](https://www.pexels.com/) - 高质量图片资源
- [React Icons](https://react-icons.github.io/react-icons/) - 图标库（Lucide UI 图标 + Simple Icons 品牌图标）

## 📞 联系我们

- 📧 Email: yukiniro@hotmail.com
- 🐦 Twitter: [@Yukiniro](https://x.com/Yukiro94317534)
- 📦 GitHub: [tickflow](https://github.com/Yukiniro/tickflow)

---

⭐ 如果这个项目对你有帮助，请给我们一个星标！
