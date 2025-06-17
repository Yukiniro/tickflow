# Pexels API 设置说明

## 1. 获取 Pexels API Key

1. 访问 [Pexels API 页面](https://www.pexels.com/api/)
2. 点击 "Get Started" 按钮
3. 注册或登录 Pexels 账户
4. 在 API 面板中获取您的 API Key

## 2. 配置环境变量

在项目根目录创建 `.env.local` 文件，并添加以下内容：

```bash
NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key_here
```

将 `your_pexels_api_key_here` 替换为您从 Pexels 获取的实际 API Key。

## 3. 功能说明

### 背景图片功能包括：

- **启用/禁用背景图片**：通过导航栏的背景按钮控制
- **图片类别选择**：支持自然、风景、城市、抽象等多种类别
- **透明度调节**：0-100% 可调节背景图片透明度
- **模糊度调节**：0-20px 可调节背景图片模糊程度
- **随机更换**：点击刷新按钮获取新的背景图片
- **摄影师署名**：自动显示图片摄影师信息和 Pexels 链接

### 使用方式：

1. 点击导航栏中的"背景"按钮
2. 启用背景图片功能
3. 选择喜欢的图片类别
4. 调节透明度和模糊度
5. 点击"更换背景"获取新图片

## 4. 技术特性

- 使用 **Jotai** 进行状态管理（原子化状态管理）
- 支持本地存储设置（localStorage）
- 响应式设计，适配移动端
- 支持明暗主题
- 图片预加载和错误处理
- SEO 友好的图片加载
- 服务端渲染 (SSR) 兼容

## 5. 状态管理架构

项目使用 Jotai 进行状态管理，背景图片相关的状态包括：

### 基础状态 Atoms：
- `currentPhotoAtom` - 当前背景图片
- `categoryAtom` - 图片类别（持久化）
- `enabledAtom` - 是否启用背景（持久化）
- `opacityAtom` - 透明度设置（持久化）
- `blurAtom` - 模糊度设置（持久化）
- `loadingAtom` - 加载状态
- `errorAtom` - 错误信息

### 操作 Atoms：
- `setCurrentPhotoAtom` - 设置当前图片
- `setCategoryAtom` - 设置图片类别
- `setEnabledAtom` - 切换启用状态
- 等等...

## 6. API 限制

Pexels API 有以下限制：
- 免费计划：每月 200 次请求
- 付费计划：更高的请求限制

请根据您的使用需求选择合适的计划。

## 7. 开发说明

项目使用 Jotai 而不是 Zustand 进行状态管理，这提供了：
- 更好的 TypeScript 支持
- 原子化的状态管理
- 更小的包体积
- 更好的服务端渲染支持 