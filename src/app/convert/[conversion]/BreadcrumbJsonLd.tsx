interface BreadcrumbJsonLdProps {
  conversion: string;
  source: string;
  target: string;
}

export default function BreadcrumbJsonLd({ conversion, source, target }: BreadcrumbJsonLdProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://imgx.tharidulakmal.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Convert",
        item: "https://imgx.tharidulakmal.com/convert",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${source.toUpperCase()} to ${target.toUpperCase()}`,
        item: `https://imgx.tharidulakmal.com/convert/${conversion}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
