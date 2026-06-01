# TickFlow — 站点外壳设计纲领

> 方向:**瑞士铁路精准**(Swiss Railway Precision)。参考 Hans Hilfiker 1944 年为瑞士铁路设计的 Mondaine 站台钟。
> 记忆锚:首屏一台真实运行的 Mondaine 钟 + 巨型实时时间。
> 全站签名交互:**滴答脉冲(tick)**——分隔符、秒针、进度线随 `useTime()` 心跳每秒精准跳动。

## 1. 主题(Theme)
- 跟随系统(`next-themes`,light / dark)。
- 扁平。靠**网格、留白、发丝级边框、背景色阶**分层,**禁用装饰性阴影与渐变**。
- 瑞士国际主义:强网格、非对称排版、克制。

## 2. 调色板(Palette)
单一强调色 = 铁路红。其余纯黑白灰。Token 定义在 `globals.css`(HSL):
- `--rail`(铁路红):light `0 100% 45%` / dark `0 100% 60%`;`--rail-foreground: 0 0% 100%`。
- 中性:沿用现有 `--background / --foreground / --muted / --border`。
- 红色只用于:logo tick 方块、秒针与红点、主 CTA、hover 强调、秒进度线。**不滥用**。

## 3. 字体(Typography)
- 单一无衬线字体系统 **Archivo**(变量字体,经 `next/font/google` 注入为 `--font-archivo`)。
  瑞士原则=系统化克制,一种字体打天下,靠字重 / 字距 / 大小拉层次。
- 标签 / eyebrow:`uppercase` + 宽字距(`tracking-[0.2em]`),小字号。
- 时间数字:`tabular-nums`,等宽对齐,超大字号。
- **禁用 Inter**(无性格)、禁用渐变文字。

## 4. 组件(Components)
- 圆角:外壳一律 **sharp(`rounded-none`)**,呼应站台牌的方正。(全局 `--radius` 不动,避免波及六个时钟页与 ui/*。)
- 按钮:实心铁路红 / 发丝边框 ghost,两种。hover **瞬时**切换(`duration-0` 或极短),非柔滑——瑞士=精准。
- 卡片→**时刻表条目**:六种时钟以编号列表(01–06)+ 发丝分隔线呈现,不用阴影卡片。
- Highlights→**规格表**:label/value 定义网格。

## 5. 布局(Layout)
- Hero 非对称:左 = 文案 + 巨型时间,右 = Mondaine 钟。
- 容器 `max-w-7xl`,强左对齐基线,section 间用发丝线分隔而非纯留白堆叠。

## 6. 深度(Depth)
- 无阴影。相邻面用背景色阶(≥4% L 差)或 1px border 区分。

## 7. Do / Don't
- DO:网格、发丝线、单红强调、tabular 数字、瞬时 hover、真实活钟。
- DON'T:紫蓝渐变、彩虹图标、六张同款阴影卡、圆润 pill、柔滑缓动滥用、Inter。

## 8. 响应式(Responsive)
- Hero 在 `md` 以下竖排(时间在上、钟在下或缩小)。
- 时刻表条目移动端单列,编号保留。
- 全宽与 375px 均需验证。

## 9. 提示词指南(Prompt guide)
> "Swiss railway timetable aesthetic, Mondaine station clock, single rail-red
> accent on black/white grid, Archivo grotesque, tabular numerals, hairline
> dividers, flat no-shadow, per-second tick pulse."
