import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'About Tharidu Lakmal Rupasingha | Full Stack Developer',
  description: 'Learn about Tharidu Lakmal Rupasingha, a Full Stack Developer specializing in browser-based tools, microservices, modern web applications, and privacy-first software engineering.',
  alternates: {
    canonical: 'https://imgx.tharidulakmal.com/about',
  },
  openGraph: {
    type: 'profile',
    url: 'https://imgx.tharidulakmal.com/about',
    siteName: 'IMG-X',
    title: 'About Tharidu Lakmal Rupasingha | Full Stack Developer',
    description: 'Full Stack Developer specializing in browser-based tools, microservices, modern web applications, and privacy-first software engineering.',
  },
};

function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tharidu Lakmal Rupasingha',
    url: 'https://imgx.tharidulakmal.com/about',
    jobTitle: 'Full Stack Developer',
    image: 'https://imgx.tharidulakmal.com/images/me.png',
    sameAs: [
      'https://github.com/tharidul',
      'https://www.linkedin.com/in/tharidul',
      'https://www.youtube.com/@tharindulakmal5593',
      'https://tharidulakmal.com',
    ],
    knowsAbout: [
      'Java',
      'Spring Boot',
      'Node.js',
      'React',
      'Next.js',
      'PostgreSQL',
      'MongoDB',
      'Microservices',
      'Privacy-first software',
    ],
    knowsLanguage: ['English'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <PersonSchema />
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-4xl font-bold text-[#e6edf3] sm:text-5xl">
            Tharidu Lakmal Rupasingha
          </h1>
          <p className="mb-8 text-center text-lg text-[#8b949e]">
            Full Stack Developer
          </p>

          <div className="space-y-6">
            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-xl font-semibold text-[#e6edf3]">About</h2>
              <p className="text-[#8b949e] leading-relaxed">
                Full Stack Developer building browser-based tools, modern web applications, and privacy-first software. Specializes in microservices architecture and cloud systems. Focuses on creating utility tools that prioritize user privacy and local processing.
              </p>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-xl font-semibold text-[#e6edf3]">Technical Expertise</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[#e6edf3]">Frontend</h3>
                  <p className="text-xs text-[#8b949e]">React, Next.js, TypeScript, TailwindCSS</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[#e6edf3]">Backend</h3>
                  <p className="text-xs text-[#8b949e]">Java, Spring Boot, Node.js, Express</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[#e6edf3]">Databases</h3>
                  <p className="text-xs text-[#8b949e]">PostgreSQL, MongoDB, Redis</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-[#e6edf3]">Cloud & DevOps</h3>
                  <p className="text-xs text-[#8b949e]">Docker, Kubernetes, AWS, CI/CD</p>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-xl font-semibold text-[#e6edf3]">Projects</h2>
              <ul className="space-y-3 text-sm text-[#8b949e]">
                <li>
                  <a href="/" className="font-medium text-[#e6edf3] hover:text-violet-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded">
                    IMG-X
                  </a>
                  <span className="block text-xs mt-1">Private browser-based image converter. No uploads. 100% local processing.</span>
                </li>
                <li>
                  <span className="font-medium text-[#e6edf3]">Microservices Systems</span>
                  <span className="block text-xs mt-1">Distributed architecture implementations with Spring Boot and Node.js.</span>
                </li>
                <li>
                  <span className="font-medium text-[#e6edf3]">SaaS Platforms</span>
                  <span className="block text-xs mt-1">Full-stack web applications with PostgreSQL and MongoDB.</span>
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-6">
              <h2 className="mb-4 text-xl font-semibold text-[#e6edf3]">Connect</h2>
              <nav className="flex flex-wrap gap-4 text-sm" aria-label="Social links">
                <a
                  href="https://github.com/tharidul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tharidul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@tharindulakmal5593"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                >
                  YouTube
                </a>
                <a
                  href="https://tharidulakmal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
                >
                  tharidulakmal.com
                </a>
              </nav>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
