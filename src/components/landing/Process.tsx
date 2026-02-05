import { motion } from 'framer-motion';
import { MessageSquare, FileText, Code, Rocket, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageSquare,
      title: t('process.step1.title'),
      description: t('process.step1.desc'),
    },
    {
      icon: FileText,
      title: t('process.step2.title'),
      description: t('process.step2.desc'),
    },
    {
      icon: Code,
      title: t('process.step3.title'),
      description: t('process.step3.desc'),
    },
    {
      icon: Rocket,
      title: t('process.step4.title'),
      description: t('process.step4.desc'),
    },
    {
      icon: Headphones,
      title: t('process.step5.title'),
      description: t('process.step5.desc'),
    },
  ];

  return (
    <section className="section-padding">
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
            {t('process.badge')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4">
            {t('process.title')}
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step Number */}
                <motion.div 
                  className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-2xl bg-card border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
                  
                  {/* Step indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-sm lg:text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
