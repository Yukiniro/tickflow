# TickFlow

一个优雅的多语言时钟应用，基于 Next.js 和 Tailwind CSS 构建。提供多种时钟样式，支持实时显示、优雅动画和响应式设计。

## ✨ 主要功能

### 🕐 多种时钟样式
- **基础时钟** - 经典的模拟时钟显示，支持多种表盘样式和指针动画
- **数字时钟** - 清晰的数字时间显示，支持12/24小时制切换
- **翻转时钟** - 模拟翻页时钟的显示效果，带有优雅的翻转动画
- **漫画时钟** - 使用漫画字体显示当前时间，充满趣味性

### 🌍 国际化支持
- 🇺🇸 **English** - 英语
- 🇨🇳 **中文** - 简体中文  
- 🇯🇵 **日本語** - 日语

### 🎨 用户体验
- **响应式设计** - 完美适配桌面、平板和移动设备
- **暗色模式** - 支持明暗主题切换
- **背景图片** - 可选的动态背景图片，支持透明度和模糊度调节
- **全屏模式** - 支持全屏预览时钟
- **声音效果** - 可选的时钟滴答声
- **分享功能** - 一键分享到社交媒体

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
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

## 🛠️ 技术栈

- **Next.js 15** - React 框架，支持 SSR 和静态生成
- **next-intl** - 国际化解决方案
- **Tailwind CSS** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全的 JavaScript
- **Jotai** - 轻量级状态管理
- **Radix UI** - 无障碍的 UI 组件
- **Lucide React** - 精美的图标库
- **clsx + tailwind-merge** - 类名管理工具

## 📁 项目结构

```
src/
├── app/
│   ├── [locale]/              # 国际化路由
│   │   ├── basic/             # 基础时钟页面
│   │   ├── digital/           # 数字时钟页面
│   │   ├── comic/             # 漫画时钟页面
│   │   ├── flip/              # 翻转时钟页面
│   │   ├── layout.tsx         # 语言布局
│   │   └── page.tsx           # 首页
│   ├── globals.css            # 全局样式
│   ├── manifest.ts            # PWA 配置
│   ├── providers.tsx          # 全局提供者
│   ├── robots.ts              # SEO 配置
│   └── sitemap.ts             # 站点地图
├── components/
│   ├── home/                  # 首页组件
│   │   ├── hero-section.tsx   # 英雄区域
│   │   ├── feature-card.tsx   # 功能卡片
│   │   ├── features-section.tsx # 功能区域
│   │   ├── cta-section.tsx    # 行动号召
│   │   ├── cta-button.tsx     # 按钮组件
│   │   ├── footer.tsx         # 页脚
│   │   ├── contact-link.tsx   # 联系链接
│   │   ├── constants.tsx      # 常量数据
│   │   └── index.ts           # 导出文件
│   ├── clock/                 # 时钟组件
│   │   ├── basic-clock.tsx    # 基础时钟
│   │   ├── digital-watch.tsx  # 数字手表
│   │   ├── comic-clock.tsx    # 漫画时钟
│   │   ├── flip-clock.tsx     # 翻转时钟
│   │   ├── flip-clock-client.tsx # 翻转时钟客户端
│   │   └── clock-type-selector.tsx # 时钟类型选择器
│   ├── ui/                    # UI 组件库
│   │   ├── button.tsx         # 按钮组件
│   │   ├── card.tsx           # 卡片组件
│   │   ├── dropdown-menu.tsx  # 下拉菜单
│   │   ├── tooltip.tsx        # 工具提示
│   │   └── ...                # 其他 UI 组件
│   ├── background-image.tsx   # 背景图片组件
│   ├── background-toggle.tsx  # 背景切换组件
│   ├── fullscreen-toggle.tsx  # 全屏切换组件
│   ├── github-icon.tsx        # GitHub 图标组件
│   ├── language-switcher.tsx  # 语言切换器
│   ├── nav.tsx                # 导航栏
│   ├── share-button.tsx       # 分享按钮
│   ├── sound-toggle.tsx       # 声音切换组件
│   ├── theme-toggle.tsx       # 主题切换组件
│   └── time-format-toggle.tsx # 时间格式切换组件
├── hooks/
│   └── use-time.ts            # 时间管理钩子
├── i18n/
│   ├── locales/               # 语言文件
│   │   ├── en.json            # 英语翻译
│   │   ├── zh.json            # 中文翻译
│   │   └── ja.json            # 日语翻译
│   ├── navigation.ts          # 导航配置
│   ├── request.ts             # 请求配置
│   └── routing.ts             # 路由配置
├── lib/
│   ├── pexels.ts              # Pexels API 集成
│   ├── metadata.ts            # 元数据工具
│   └── utils/
│       └── utils.ts           # 工具函数
├── store/                     # 状态管理
│   ├── background.ts          # 背景状态
│   ├── sound.ts               # 声音状态
│   └── time.ts                # 时间状态
├── types/
│   └── index.ts               # TypeScript 类型定义
└── middleware.ts              # 国际化中间件
```

## 🌐 国际化

### 语言切换
- 点击导航栏右上角的地球图标可以切换语言
- 应用会记住您的语言偏好
- URL 会自动包含语言代码（如 `/en/basic`, `/zh/digital`）

### 支持的路由
- `/en/` - 英语首页
- `/zh/` - 中文首页  
- `/ja/` - 日语首页
- 各语言下的时钟页面：`/[locale]/basic`, `/[locale]/digital`, `/[locale]/comic`, `/[locale]/flip`

### 添加新语言
1. 在 `src/i18n/routing.ts` 中添加新的语言代码
2. 在 `src/i18n/locales/` 中创建对应的 JSON 文件
3. 在 `src/components/language-switcher.tsx` 中添加语言选项

## 🎨 主题和样式

### 暗色模式
- 自动检测系统主题偏好
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
PEXELS_API_KEY=your_pexels_api_key_here
```

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

### 状态管理
- 使用 Jotai 进行轻量级状态管理
- 按功能模块组织状态
- 支持持久化存储

### 性能优化
- 组件懒加载
- 图片优化
- 代码分割
- SEO 优化

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
- [Lucide](https://lucide.dev/) - 精美图标库

## 📞 联系我们

- 📧 Email: yukiniro@hotmail.com
- 🐦 Twitter: [@Yukiniro](https://x.com/Yukiro94317534)
- 📦 GitHub: [tickflow](https://github.com/tickflow)

---

⭐ 如果这个项目对你有帮助，请给我们一个星标！

