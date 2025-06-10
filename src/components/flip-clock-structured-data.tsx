interface FlipClockStructuredDataProps {
  locale: string;
}

export function FlipClockStructuredData({ locale }: FlipClockStructuredDataProps) {
  const baseUrl = "https://tickflow.toimagen.com";
  const isZh = locale === "zh";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isZh ? "翻转时钟 - TickFlow" : "Flip Clock - TickFlow",
    description: isZh
      ? "体验精美的3D翻转时钟效果，实时显示当前时间，支持多种翻转动画。优雅的视觉设计，流畅的动画效果。"
      : "Experience beautiful 3D flip clock effects with real-time display. Elegant visual design with smooth animation transitions.",
    url: `${baseUrl}/${locale}/flip`,
    inLanguage: locale,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: isZh ? "翻转时钟" : "Flip Clock",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      description: isZh
        ? "精美的3D翻转时钟，支持实时时间显示和流畅的翻转动画效果"
        : "Beautiful 3D flip clock with real-time display and smooth flip animations",
      features: isZh
        ? ["3D翻转效果", "实时时间显示", "流畅动画", "响应式设计"]
        : ["3D Flip Effects", "Real-time Display", "Smooth Animations", "Responsive Design"],
      author: {
        "@type": "Organization",
        name: "TickFlow",
        url: baseUrl,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "TickFlow",
          item: `${baseUrl}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isZh ? "翻转时钟" : "Flip Clock",
          item: `${baseUrl}/${locale}/flip`,
        },
      ],
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
