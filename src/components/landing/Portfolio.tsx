import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('portfolio.project1.title'),
      description: t('portfolio.project1.desc'),
      tags: ['AI & Productivity', 'React Native'],
      gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      title: t('portfolio.project2.title'),
      description: t('portfolio.project2.desc'),
      tags: ['FinTech', 'Native iOS'],
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      title: t('portfolio.project3.title'),
      description: t('portfolio.project3.desc'),
      tags: ['HealthTech', 'Swift'],
      gradient: 'from-rose-500/20 to-pink-500/20',
    },
    {
      title: t('portfolio.project4.title'),
      description: t('portfolio.project4.desc'),
      tags: ['AI', 'Kotlin'],
      gradient: 'from-amber-500/20 to-orange-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-widest">
              {t('portfolio.badge')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-4">
              {t('portfolio.title')}
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
          >
            {t('portfolio.viewAll')}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.slice(0, 2).map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Tags */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {project.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 pb-0">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Mockup Area */}
              <div className={`mt-6 h-64 lg:h-80 bg-gradient-to-br ${project.gradient} flex items-end justify-center`}>
                <motion.div 
                  className="w-48 lg:w-56 transform translate-y-4"
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-card rounded-t-3xl p-2 shadow-2xl">
                    <div className="aspect-[9/16] bg-gradient-to-br from-card to-muted rounded-t-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 mx-auto mb-3 flex items-center justify-center">
                          <ArrowUpRight className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">{project.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Projects */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.slice(2).map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex gap-2 mb-4">
                {project.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 text-xs font-medium bg-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
