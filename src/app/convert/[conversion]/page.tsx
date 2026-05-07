import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImageConverter from '@/components/converter/ImageConverter';
import Link from 'next/link';
import { parseConversionRoute, formatConversionTitle, getConversionDescription, getConversionFeatures, getConversionExplanation, getFAQItems } from '@/lib/image/route-utils';
import { ImageFormat } from '@/types/image';

interface PageProps {
  params: Promise<{ conversion: string }>;
}

// Generate static params for all conversion routes
export function generateStaticParams() {
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

  return conversions.map((conversion) => ({
    conversion: conversion,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conversion } = await params;
  const route = parseConversionRoute(conversion);
  
  if (!route) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = formatConversionTitle(route.source, route.target);
  const description = getConversionDescription(route.source, route.target);

  return {
    title,
    description,
    alternates: {
      canonical: `https://imgx.tharidulakmal.com/convert/${conversion}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://imgx.tharidulakmal.com/convert/${conversion}`,
      siteName: 'IMG-X',
      title,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function ConversionPage({ params }: PageProps) {
  const { conversion } = await params;
  const route = parseConversionRoute(conversion);

  if (!route) {
    notFound();
  }

  const title = formatConversionTitle(route.source, route.target);
  const description = getConversionDescription(route.source, route.target);
  const features = getConversionFeatures(route.source, route.target);
  const explanation = getConversionExplanation(route.source, route.target);
  const faqItems = getFAQItems(route.source, route.target);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-4xl font-bold text-[#e6edf3] sm:text-5xl">
            {title}
          </h1>
          <p className="mb-8 text-center text-lg text-[#8b949e]">
            {description}
          </p>
          
          <div className="mb-8 rounded-lg border border-[#30363d] bg-[#161b22] p-6">
            <h2 className="mb-4 text-xl font-semibold text-[#e6edf3]">Why use our {route.source.toUpperCase()} to {route.target.toUpperCase()} converter?</h2>
            <ul className="space-y-2 text-[#8b949e]">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <ImageConverter defaultFormat={route.target} />

          <div className="mt-12 space-y-8">
            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">About this conversion</h2>
              <p className="text-[#8b949e] leading-relaxed">
                {explanation}
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-[#30363d] pb-4 last:border-0 last:pb-0">
                    <h3 className="mb-2 text-lg font-medium text-[#e6edf3]">{item.question}</h3>
                    <p className="text-[#8b949e]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-violet-600 transition-colors hover:text-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] rounded">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
