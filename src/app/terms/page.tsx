import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - IMG-X',
  description: 'IMG-X terms of service. Free to use image converter with no warranties. Use at your own risk.',
  alternates: {
    canonical: 'https://imgx.tharidulakmal.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-[#e6edf3] sm:text-5xl">
            Terms of Service
          </h1>
          
          <div className="space-y-8">
            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Acceptance of Terms</h2>
              <p className="text-[#8b949e] leading-relaxed">
                By using IMG-X, you agree to these terms of service. If you do not agree to these terms, please do not use this service.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Free to Use</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X is provided free of charge for personal and commercial use. There are no fees, subscriptions, or hidden costs associated with using this service.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">No Warranties</h2>
              <p className="text-[#8b949e] leading-relaxed">
                IMG-X is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free. We are not responsible for any loss of data or damage resulting from use of this service.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Limitation of Liability</h2>
              <p className="text-[#8b949e] leading-relaxed">
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of IMG-X. Our total liability shall not exceed the amount you paid, if any, to use the service (which is $0).
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">User Responsibility</h2>
              <p className="text-[#8b949e] leading-relaxed">
                You are responsible for ensuring that you have the legal right to convert and use any images you process with IMG-X. We are not responsible for any copyright infringement or other legal issues arising from your use of converted images.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Prohibited Uses</h2>
              <p className="text-[#8b949e] leading-relaxed">
                You may not use IMG-X for any illegal purposes, including but not limited to: converting illegal content, violating intellectual property rights, or attempting to circumvent any security measures.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Service Availability</h2>
              <p className="text-[#8b949e] leading-relaxed">
                We reserve the right to modify, suspend, or discontinue IMG-X at any time without notice. We are not responsible for any downtime or service interruptions.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Changes to Terms</h2>
              <p className="text-[#8b949e] leading-relaxed">
                We may update these terms of service from time to time. Continued use of IMG-X after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-2xl font-semibold text-[#e6edf3]">Governing Law</h2>
              <p className="text-[#8b949e] leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts.
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
