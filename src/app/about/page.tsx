import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'About IMG-X - Free Online Image Converter',
  description: 'Learn about IMG-X, a free, browser-based image converter that prioritizes privacy and speed. No uploads, no signup, 100% client-side processing.',
  alternates: {
    canonical: 'https://imgx.tharidulakmal.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-[#e6edf3] sm:text-5xl">
            About IMG-X
          </h1>
          
          <div className="space-y-8">
            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">What is IMG-X?</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X is a free, browser-based image converter that lets you convert images between different formats without ever uploading your files to a server. All processing happens locally in your browser, ensuring complete privacy and instant results.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Privacy First</h2>
              <p className="text-[#8b949e] leading-relaxed">
                Unlike other image converters, IMG-X never sends your files to any server. All image processing is done entirely in your browser using the HTML5 Canvas API. Your images never leave your device, making IMG-X the most private way to convert images online.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Supported Formats</h2>
              <ul className="grid gap-2 text-[#8b949e] sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> PNG (Portable Network Graphics)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> JPG/JPEG (Joint Photographic Experts Group)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> WEBP (Web Picture Format)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> ICO (Icon Format)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> SVG (Scalable Vector Graphics)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> BMP (Bitmap)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> TIFF (Tagged Image File Format)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-violet-400">→</span> GIF (Graphics Interchange Format)
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Features</h2>
              <ul className="space-y-2 text-[#8b949e]">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>100% free with no signup required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>No file uploads - everything stays on your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Instant conversion with no waiting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Adjust image dimensions with aspect ratio lock</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Control quality for lossy formats (JPG, WEBP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Works on all modern browsers</span>
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Open Source</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X is built with modern web technologies including Next.js, React, and the HTML5 Canvas API. The code is open source and available on GitHub for anyone to inspect, fork, or contribute to.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
