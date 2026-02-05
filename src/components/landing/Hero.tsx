import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroPhone from '@/assets/hero-phone.png';

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '5+', label: t('stats.years'), sublabel: t('stats.experience') },
    { value: '20+', label: '', sublabel: t('stats.projects') },
    { value: '5.0', label: '★', sublabel: t('stats.rating') },
    { value: '15+', label: '', sublabel: t('stats.clients') },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('hero.title1')}<br />
              {t('hero.title2')}
              <span className="text-gradient">{t('hero.title3')}</span>
              <br />
              <span className="text-gradient">{t('hero.title4')}</span>
              {t('hero.title5')}
              <br />
              {t('hero.title6')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 group">
                {t('hero.cta1')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-medium px-6">
                {t('hero.cta2')}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-4 gap-4 pt-8 border-t border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    {stat.value}
                    {stat.label && <span className="text-primary">{stat.label}</span>}
                  </div>
                  <div className="text-xs lg:text-sm text-muted-foreground mt-1">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Phone */}
              <motion.div 
                className="relative z-10 w-64 lg:w-80"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src={heroPhone} 
                  alt="AI-Powered Mobile App"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              
              {/* Floating badges */}
              <motion.div 
                className="absolute top-10 -left-4 lg:-left-10 bg-glass rounded-xl px-4 py-2 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary text-lg">⊕</span>
                  <span className="text-sm font-medium">Kotlin</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-20 -right-4 lg:-right-10 bg-glass rounded-xl px-4 py-2 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary text-lg">◎</span>
                  <span className="text-sm font-medium">OpenAI</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
