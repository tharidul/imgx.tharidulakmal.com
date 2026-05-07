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
    default: "IMG-X — Private Browser-Based Image Converter",
    template: "%s | IMG-X",
  },
  description:
    "Convert images to PNG, JPG, WebP, ICO and more. No uploads. No cloud processing. 100% local browser-based conversion. Your files never leave your device.",
  keywords: [
    "image converter",
    "convert image online",
    "png to jpg",
    "jpg to webp",
    "png to webp",
    "jpg to png",
    "webp to png",
    "free image converter",
    "browser image converter",
    "private image converter",
    "local image conversion",
    "imgx",
  ],
  authors: [{ name: "Tharindu Lakmal", url: "https://tharidulakmal.com" }],
  creator: "Tharindu Lakmal",
  publisher: "Tharindu Lakmal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imgx.tharidulakmal.com",
    siteName: "IMG-X",
    title: "IMG-X — Private Browser-Based Image Converter",
    description:
      "Convert images to PNG, JPG, WebP, ICO and more. No uploads. No cloud processing. 100% local browser-based conversion.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IMG-X — Private Browser-Based Image Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMG-X — Private Browser-Based Image Converter",
    description:
      "Convert images to PNG, JPG, WebP, ICO and more. No uploads. No cloud processing. 100% local browser-based conversion.",
    images: ["/og-image.png"],
    creator: "@tharidul",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://imgx.tharidulakmal.com",
  },
  verification: {
    google: "google-site-verification-token",
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