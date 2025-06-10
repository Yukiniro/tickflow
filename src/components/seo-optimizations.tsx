export function SEOOptimizations() {
  return (
    <>
      {/* 预加载关键资源 */}
      <link rel="preload" href="/logo.png" as="image" type="image/png" />

      {/* DNS预解析 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* 预连接 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Viewport优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      {/* 浏览器主题颜色 */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />

      {/* Apple Web App */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TickFlow" />

      {/* 禁用自动格式化 */}
      <meta name="format-detection" content="telephone=no" />

      {/* 安全性标头 */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

      {/* 性能提示 */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </>
  );
}
