import { motion } from 'framer-motion';
import { Smartphone, Layers, Brain, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Smartphone,
      title: t('services.native.title'),
      description: t('services.native.desc'),
      features: [
        { text: t('services.native.tech1'), type: 'check' },
        { text: t('services.native.tech2'), type: 'check' },
      ],
    },
    {
      icon: Layers,
      title: t('services.react.title'),
      description: t('services.react.desc'),
      features: [
        { text: t('services.react.feature1'), type: 'check' },
        { text: t('services.react.feature2'), type: 'check' },
      ],
    },
    {
      icon: Brain,
      title: t('services.ai.title'),
      description: t('services.ai.desc'),
      features: [
        { text: t('services.ai.feature1'), type: 'list' },
        { text: t('services.ai.feature2'), type: 'list' },
      ],
    },
  ];

  const technologies = [
    { name: 'Kotlin', icon: '⊕' },
    { name: 'Swift', icon: '◇' },
    { name: 'React Native', icon: '→' },
    { name: 'OpenAI', icon: '◎' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Gemini', icon: '✦' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="section-padding bg-card/30">
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
            {t('services.badge')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-card border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-all duration-300 hover-glow"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm">
                    {feature.type === 'check' ? (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                    <span className="text-muted-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-lg">{tech.icon}</span>
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
