import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import iconBussines from "@/assets/IconNetwork.png"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '#services', label: t('nav.services') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#pricing', label: t('nav.pricing') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-30 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <img 
                  src={iconBussines} 
                  alt="AI-Powered Mobile App"
                  className="w-30 h-10 drop-shadow-2xl opacity-50 rounded-md"/>
            </div>      
            <span className="text-lg font-bold text-foreground">Brothers Apps Studios</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
            
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <a href="#contact">
                {t('nav.contact')}
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                >
                  {language === 'es' ? 'EN' : 'ES'}
                </button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
                  {t('nav.contact')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
