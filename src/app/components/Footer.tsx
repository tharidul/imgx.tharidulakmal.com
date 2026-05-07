export default function Footer() {
  return (
    <footer className="border-t border-[#30363d] bg-[#0d1117] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs text-[#8b949e]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span>
              All processing happens in your browser. Your files are never uploaded.
            </span>
          </div>

          <nav className="flex flex-wrap gap-4 text-xs text-[#8b949e]" aria-label="Footer navigation">
            <a href="/about" className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">
              About
            </a>
            <a href="/privacy" className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">
              Terms
            </a>
          </nav>

          <nav className="flex flex-wrap gap-4 text-xs text-[#8b949e]" aria-label="Social links">
            <a
              href="https://tharidulakmal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              tharidulakmal.com
            </a>
            <a
              href="https://github.com/tharidul"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              GitHub
            </a>
            <a
              href="https://www.youtube.com/@tharindulakmal5593"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/in/tharidul/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#e6edf3] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              LinkedIn
            </a>
          </nav>

          <div className="text-xs text-[#8b949e]">
            © 2026 IMG-X by <a href="https://tharidulakmal.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e6edf3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">Tharindu Lakmal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
