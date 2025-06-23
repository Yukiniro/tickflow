# Google Analytics 设置指南

本项目已集成 Google Analytics 4 (GA4)，提供完整的用户行为分析功能。

## 🚀 快速开始

### 1. 创建 Google Analytics 账户

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 点击"开始测量"
3. 创建账户和媒体资源
4. 选择"网站"作为平台
5. 填写网站信息

### 2. 获取测量 ID

1. 在 GA4 管理界面中，点击左下角的"管理"
2. 在"媒体资源"列中，点击"数据流"
3. 点击你的网站数据流
4. 复制"测量 ID"（格式：G-XXXXXXXXXX）

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# Google Analytics 测量 ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> ⚠️ **重要**: 确保使用 `NEXT_PUBLIC_` 前缀，这样 Next.js 才能在客户端访问该变量。

## 📊 跟踪的事件

### 自动跟踪
- **页面浏览** - 所有页面访问
- **用户会话** - 用户活动时长
- **设备信息** - 设备类型、浏览器、操作系统

### 自定义事件跟踪

| 事件名称 | 类别 | 描述 |
|---------|------|------|
| `clock_type_change` | navigation | 时钟类型切换 |
| `language_change` | localization | 语言切换 |
| `theme_change` | customization | 主题切换 |
| `background_toggle` | customization | 背景开关 |
| `sound_toggle` | customization | 声音开关 |
| `time_format_change` | customization | 时间格式切换 |
| `fullscreen_toggle` | interaction | 全屏模式切换 |

## 🔧 技术实现

### 组件结构

```typescript
// Google Analytics 组件
<GoogleAnalytics gaId="G-XXXXXXXXXX" />

// 事件跟踪函数
trackEvent(action, category, label?, value?)
trackClockTypeChange(clockType)
trackLanguageChange(language)
trackThemeChange(theme)
// ... 其他跟踪函数
```

### 性能优化

- 使用 `@next/third-parties` 优化加载
- 延迟加载 GA 脚本
- 非阻塞式加载
- 自动压缩和缓存

## 📈 数据分析建议

### 重要指标

1. **页面浏览量** - 了解最受欢迎的时钟类型
2. **用户参与度** - 平均会话时长
3. **功能使用率** - 各功能的使用频率
4. **设备分布** - 移动端 vs 桌面端使用情况
5. **地理分布** - 用户地理位置分析

### 自定义报告

建议在 GA4 中创建以下自定义报告：

1. **时钟类型偏好分析**
   - 维度：时钟类型
   - 指标：事件计数、用户数

2. **功能使用分析**
   - 维度：事件类别
   - 指标：事件计数、转化率

3. **多语言使用分析**
   - 维度：语言
   - 指标：用户数、会话数

## 🛡️ 隐私和合规

### GDPR 合规

项目遵循 GDPR 规定：

- 不收集个人身份信息
- 可选择性启用分析
- 透明的数据使用政策

### Cookie 政策

GA4 使用的 Cookie：

- `_ga` - 用户标识符
- `_ga_*` - 会话标识符
- `_gid` - 用户标识符

### 数据保留

- 默认数据保留期：14 个月
- 可在 GA4 设置中调整
- 自动删除过期数据

## 🔍 调试和测试

### 开发环境

在开发模式下，控制台会显示 GA 初始化信息：

```javascript
// 开发环境日志
Google Analytics initialized with ID: G-XXXXXXXXXX
```

### 实时调试

1. 在 GA4 中打开"实时"报告
2. 在网站上执行操作
3. 查看实时事件流

### Chrome 扩展

推荐使用以下 Chrome 扩展进行调试：

- **Google Analytics Debugger** - 查看 GA 请求
- **GA4 Ghost Inspector** - 验证 GA4 配置

## 🚨 常见问题

### Q: 为什么数据没有显示？

A: 检查以下几点：
- 测量 ID 是否正确
- 环境变量是否正确设置
- 是否在生产环境部署
- GA4 数据处理需要 24-48 小时

### Q: 如何测试 GA 是否工作？

A: 
1. 打开浏览器开发者工具
2. 在 Network 标签中过滤 "google-analytics"
3. 执行页面操作，查看是否有请求发送

### Q: 如何禁用 GA？

A: 
- 删除或注释 `NEXT_PUBLIC_GA_ID` 环境变量
- 组件会自动检测并停用 GA

## 📚 相关资源

- [Google Analytics 4 文档](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Third Parties 文档](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
- [GA4 事件参考](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)

---

如果您在设置过程中遇到问题，请查看 [GitHub Issues](https://github.com/tickflow/issues) 或联系我们。 