export default function SeoContent() {
  return (
    <section className="mx-auto max-w-3xl mt-10 space-y-4 text-xs" aria-label="Additional information">
      {/* Supported Formats */}
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
        <h2 className="mb-2 text-sm font-medium text-[#e6edf3]">Supported Image Formats</h2>
        <p className="text-[#8b949e]">
          Convert between PNG, JPG/JPEG, WebP, SVG, BMP, TIFF, and GIF. All processing happens locally in your browser.
        </p>
      </div>


      {/* FAQ */}
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
        <h2 className="mb-3 text-sm font-medium text-[#e6edf3]">Frequently Asked Questions</h2>
        <dl className="space-y-3 text-[#8b949e]">
          <div>
            <dt className="font-medium text-[#e6edf3] mb-1">Is IMG-X free to use?</dt>
            <dd>Yes, IMG-X is completely free with no limits or watermarks.</dd>
          </div>
          <div>
            <dt className="font-medium text-[#e6edf3] mb-1">Are my images uploaded anywhere?</dt>
            <dd>No. All conversion happens locally in your browser. Your images never leave your device.</dd>
          </div>
          <div>
            <dt className="font-medium text-[#e6edf3] mb-1">What image formats are supported?</dt>
            <dd>PNG, JPG/JPEG, WebP, SVG, BMP, TIFF, and GIF. You can convert between any of these formats.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
