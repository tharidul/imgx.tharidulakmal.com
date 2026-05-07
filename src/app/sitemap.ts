import type { MetadataRoute } from "next";

export const dynamic = 'force-static';

const conversions = [
  'png-to-jpg',
  'jpg-to-png',
  'jpg-to-webp',
  'png-to-webp',
  'png-to-ico',
  'jpg-to-ico',
  'webp-to-png',
  'webp-to-jpg',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imgx.tharidulakmal.com';
  
  const conversionUrls = conversions.map((conversion) => ({
    url: `${baseUrl}/convert/${conversion}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...conversionUrls,
  ];
}