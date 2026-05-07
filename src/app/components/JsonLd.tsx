export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "IMG-X",
          url: "https://imgx.tharidulakmal.com",
          description:
            "Convert images instantly to PNG, JPG, WEBP, ICO and more. Fast, private, and 100% browser-based. Your files never leave your device.",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Convert PNG to JPG",
            "Convert JPG to PNG",
            "Convert JPG to WEBP",
            "Convert PNG to WEBP",
            "Convert images to ICO",
            "Resize images",
            "Adjust image quality",
            "100% private, browser-based conversion",
          ],
        }),
      }}
    />
  );
}