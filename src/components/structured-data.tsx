interface StructuredDataProps {
  locale: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = "https://tickflow.toimagen.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TickFlow",
    description:
      locale === "zh"
        ? "功能丰富的在线时钟应用，提供翻转时钟、数字时钟、模拟时钟等多种时钟样式，支持实时显示和优雅动画效果"
        : "Feature-rich online clock application with flip clock, digital clock, analog clock and more styles, supporting real-time display and elegant animations",
    url: `${baseUrl}/${locale}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "TickFlow",
      url: baseUrl,
    },
    inLanguage: locale,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    features:
      locale === "zh"
        ? ["翻转时钟", "数字时钟", "模拟时钟", "实时显示", "响应式设计", "多语言支持"]
        : [
            "Flip Clock",
            "Digital Clock",
            "Analog Clock",
            "Real-time Display",
            "Responsive Design",
            "Multi-language Support",
          ],
    keywords:
      locale === "zh"
        ? "在线时钟,实时时钟,数字时钟,翻转时钟,模拟时钟,时间显示"
        : "online clock,real-time clock,digital clock,flip clock,analog clock,time display",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
