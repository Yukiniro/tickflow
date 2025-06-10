interface StructuredDataProps {
  locale: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const baseUrl = "https://tickflow.toimagen.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TickFlow",
    description: locale === "zh" ? "一个优雅的时钟应用" : "An elegant clock application",
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
    },
    inLanguage: locale,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
