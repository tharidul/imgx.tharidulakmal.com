import Header from './components/Header';
import Hero from './components/Hero';
import ImageConverter from '@/components/converter/ImageConverter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Hero />
        <ImageConverter />
      </main>
      <Footer />
    </div>
  );
}
