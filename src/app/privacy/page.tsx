import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - IMG-X',
  description: 'IMG-X privacy policy. Learn how we protect your privacy with 100% browser-based image conversion. No data collection, no tracking, no uploads.',
  alternates: {
    canonical: 'https://imgx.tharidulakmal.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-[#e6edf3] sm:text-5xl">
            Privacy Policy
          </h1>
          
          <div className="space-y-8">
            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">100% Private Processing</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X processes all images entirely in your browser using client-side JavaScript. Your images are <strong>never uploaded to any server</strong>. All conversion happens locally on your device using the HTML5 Canvas API.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">No Data Collection</h2>
              <p className="text-[#8b949e] leading-relaxed">
                We do not collect, store, or transmit any personal data. We do not use tracking cookies, analytics, or any form of user tracking. Your use of IMG-X is completely anonymous.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">No Server Storage</h2>
              <p className="text-[#8b949e] leading-relaxed">
                Since all processing happens in your browser, we never store your images on any server. Once you close your browser tab, all data related to your image conversion is gone.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">No Third-Party Services</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X does not use any third-party services for image processing. The conversion is performed entirely by your browser using standard web APIs. No external APIs are called during the conversion process.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Open Source Transparency</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X is open source software. You can review the complete source code on GitHub to verify that no data is being collected or transmitted. Transparency is core to our privacy commitment.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Cookies</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X does not use cookies for tracking or analytics. The only cookies that may be set are essential cookies required for the basic functionality of the website (if hosted on a platform that requires them).
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Changes to This Policy</h2>
              <p className="text-[#8b949e] leading-relaxed">
                If we make any material changes to our privacy policy, we will update this page and notify users through prominent notice on our website. However, given our architecture (client-side only), significant changes are unlikely.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Contact</h2>
              <p className="text-[#8b949e] leading-relaxed">
                If you have any questions about this privacy policy, please contact us through our GitHub repository.
              </p>
            </section>

            <p className="text-center text-sm text-[#8b949e]">
              Last updated: May 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
