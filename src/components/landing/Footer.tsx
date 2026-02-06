import { motion } from 'framer-motion';
import { Zap, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import iconBussines from "@/assets/IconNetwork.png";
const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/alvaro2302', label: 'GitHub' },
  ];

  return (
    <footer className="border-t border-white/5">
      {/* CTA Section */}
      <motion.div 
        className="section-padding"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="text-center lg:text-left">
              <a href="#" className="inline-flex items-center gap-2 mb-4">
                <div className="w-30 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <img 
                  src={iconBussines} 
                  alt="AI-Powered Mobile App"
                  className="w-30 h-10 drop-shadow-2xl opacity-50 rounded-md"/>
                </div> 
                <span className="text-lg font-bold">Brothers Apps Studios</span>
              </a>
              <p className="text-muted-foreground max-w-md">
                {t('footer.tagline')}
              </p>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-sm text-muted-foreground mb-4">{t('cta.title')}</p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 group hover-glow">
                <a href="https://www.fiverr.com/studiosolidos/develop-app-ios-and-android-mobile-app-with-react-native" target="_blank" rel="noopener noreferrer">
                  {t('cta.button')}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Brothers Apps Studios. {t('footer.rights')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-2"
              >
                Fiverr
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
