import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imgx.tharidulakmal.com"),
  title: {
    default: "IMG-X — Free Online Image Converter",
    template: "%s | IMG-X",
  },
  description:
    "Convert images instantly to PNG, JPG, WEBP, ICO and more. Fast, private, and 100% browser-based. Your files never leave your device.",
  keywords: [
    "image converter",
    "convert image online",
    "png to jpg",
    "jpg to webp",
    "free image converter",
    "browser image converter",
    "imgx",
  ],
  authors: [{ name: "Tharidulakmal" }],
  creator: "Tharidulakmal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imgx.tharidulakmal.com",
    siteName: "IMG-X",
    title: "IMG-X — Free Online Image Converter",
    description:
      "Convert images instantly to PNG, JPG, WEBP, ICO and more. Fast, private, 100% in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IMG-X — Free Online Image Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMG-X — Free Online Image Converter",
    description:
      "Convert images instantly to PNG, JPG, WEBP, ICO and more. Fast, private, 100% in your browser.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://imgx.tharidulakmal.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}