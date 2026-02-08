import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import Portfolio from '@/components/landing/Portfolio';
import Testimonials from '@/components/landing/Testimonials';
import Process from '@/components/landing/Process';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';
import ContactMe from '@/components/landing/ContactMe';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Testimonials />
          <Process />
          <Pricing />
          <ContactMe />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
