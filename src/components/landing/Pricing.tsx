import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.basic.name'),
      description: t('pricing.basic.desc'),
      price: t('pricing.basic.price'),
      period: t('pricing.basic.period'),
      features: [
        { text: t('pricing.basic.f1'), included: true },
        { text: t('pricing.basic.f2'), included: true },
        { text: t('pricing.basic.f3'), included: true },
        { text: t('pricing.basic.f4'), included: false },
      ],
      featured: false,
    },
    {
      name: t('pricing.standard.name'),
      description: t('pricing.standard.desc'),
      price: t('pricing.standard.price'),
      period: t('pricing.standard.period'),
      features: [
        { text: t('pricing.standard.f1'), included: true },
        { text: t('pricing.standard.f2'), included: true },
        { text: t('pricing.standard.f3'), included: true },
        { text: t('pricing.standard.f4'), included: true },
      ],
      featured: true,
      badge: t('pricing.standard.recommended'),
    },
    {
      name: t('pricing.premium.name'),
      description: t('pricing.premium.desc'),
      price: t('pricing.premium.price'),
      period: t('pricing.premium.period'),
      features: [
        { text: t('pricing.premium.f1'), included: true },
        { text: t('pricing.premium.f2'), included: true },
        { text: t('pricing.premium.f3'), included: true },
        { text: t('pricing.premium.f4'), included: true },
      ],
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="pricing" className="section-padding bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-primary uppercase tracking-widest">
            {t('pricing.badge')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4">
            {t('pricing.title')}
          </h2>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: plan.featured ? 0 : -5 }}
              className={`relative bg-card rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
                plan.featured
                  ? 'border-2 border-primary shadow-lg shadow-primary/10 md:scale-105 z-10'
                  : 'border border-white/5 hover:border-white/10'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${
                  plan.featured
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                }`}
              >
                <a href="#contact">
                  {t('pricing.cta')}
                </a>
           
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
