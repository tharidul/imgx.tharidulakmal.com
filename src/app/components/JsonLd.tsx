export default function JsonLd() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "IMG-X",
    url: "https://imgx.tharidulakmal.com",
    image: "https://imgx.tharidulakmal.com/og-image.png",
    description:
      "Private browser-based image converter supporting PNG, JPG, WebP, SVG, BMP, TIFF, and GIF formats. All processing happens locally in your browser with no server uploads.",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "ImageConverter",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and HTML5 Canvas support",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Browser-based image conversion",
      "Privacy-first local image processing",
      "Image resizing and optimization",
      "ICO and favicon generation",
      "Supports PNG, JPG, WebP, SVG, BMP, TIFF, and GIF",
      "Quality adjustment for lossy formats",
      "No server uploads or data transmission",
    ],
    creator: {
      "@type": "Person",
      name: "Tharidu Lakmal Rupasingha",
      url: "https://imgx.tharidulakmal.com/about",
      sameAs: [
        "https://github.com/tharidul",
        "https://www.linkedin.com/in/tharidul",
        "https://www.youtube.com/@tharindulakmal5593",
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is IMG-X free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, IMG-X is completely free with no limits or watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images uploaded anywhere?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All conversion happens locally in your browser. Your images never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "What image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PNG, JPG/JPEG, WebP, SVG, BMP, TIFF, and GIF. You can convert between any of these formats.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}