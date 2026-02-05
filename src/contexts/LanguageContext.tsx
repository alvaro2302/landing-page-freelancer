import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navbar
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.pricing': 'Precios',
    'nav.contact': 'Contactarme',
    
    // Hero
    'hero.badge': 'DESARROLLADOR TOP-RATED EN FIVERR',
    'hero.title1': 'Construyendo el',
    'hero.title2': 'Futuro con ',
    'hero.title3': 'Móvil',
    'hero.title4': 'Nativo',
    'hero.title5': ' e Integración',
    'hero.title6': 'de IA',
    'hero.subtitle': 'Especializado en apps iOS/Android de alto rendimiento e integraciones fluidas de LLM. 5 años de experiencia entregando más de 20 proyectos de clase mundial.',
    'hero.cta1': 'Ver Portafolio',
    'hero.cta2': 'Contratar en Fiverr',
    
    // Stats
    'stats.experience': 'Experiencia',
    'stats.years': 'Años',
    'stats.projects': 'Proyectos',
    'stats.rating': 'Calificación',
    'stats.clients': 'Clientes',
    
    // Services
    'services.badge': 'EXPERTISE',
    'services.title': 'Servicios Especializados',
    'services.subtitle': 'Creo experiencias móviles de alta gama combinando el rendimiento nativo de la plataforma con los últimos avances en IA.',
    'services.native.title': 'iOS/Android Nativo',
    'services.native.desc': 'Desarrollo de alto rendimiento en Swift y Kotlin para apps que exigen velocidad, capacidad de respuesta y características específicas de la plataforma.',
    'services.native.tech1': 'Swift & SwiftUI',
    'services.native.tech2': 'Kotlin & Jetpack Compose',
    'services.react.title': 'React Native',
    'services.react.desc': 'Soluciones multiplataforma rentables sin sacrificar calidad. Una base de código, dos plataformas, máximo alcance.',
    'services.react.feature1': 'Código Compartido',
    'services.react.feature2': 'Prototipado Rápido',
    'services.ai.title': 'Integración de IA',
    'services.ai.desc': 'Integra características de IA de vanguardia en tus apps existentes usando OpenAI, Gemini o flujos de trabajo LLM personalizados.',
    'services.ai.feature1': 'Pipelines LLM RAG',
    'services.ai.feature2': 'Búsqueda Vectorial',
    
    // Portfolio
    'portfolio.badge': 'PORTAFOLIO',
    'portfolio.title': 'Trabajos Seleccionados',
    'portfolio.viewAll': 'Ver Todos los Proyectos',
    'portfolio.project1.title': 'Nexus AI Assistant',
    'portfolio.project1.desc': 'Una herramienta integral de gestión de tareas integrada con OpenAI para programación automatizada y redacción de correos.',
    'portfolio.project2.title': 'Vortex Wallet',
    'portfolio.project2.desc': 'Billetera cripto de próxima generación con seguridad biométrica, seguimiento en tiempo real y alertas de trading automatizadas.',
    'portfolio.project3.title': 'HealthSync Pro',
    'portfolio.project3.desc': 'App de monitoreo de salud con IA que analiza patrones de sueño, actividad física y nutrición.',
    'portfolio.project4.title': 'VoiceNote AI',
    'portfolio.project4.desc': 'Transcripción de voz en tiempo real con resúmenes inteligentes usando Whisper y GPT-4.',
    
    // Testimonials
    'testimonials.title': 'Confiado por Clientes Globales de Fiverr',
    'testimonials.t1': '"¡Desarrollador increíble! Entregó mi app de IA 3 días antes de lo previsto. La integración con Gemini es impecable y el rendimiento es rapidísimo."',
    'testimonials.t2': '"El mejor desarrollador móvil con el que he trabajado en Fiverr. Realmente entiende UI/UX nativo y sabe cómo optimizar para ambas plataformas."',
    'testimonials.t3': '"Superó las expectativas con la integración de OpenAI. La implementación personalizada de RAG es exactamente lo que necesitábamos para nuestra app empresarial."',
    
    // Process
    'process.badge': 'PROCESO',
    'process.title': 'Cómo Trabajo',
    'process.step1.title': 'Consulta',
    'process.step1.desc': 'Discutimos tu visión, requisitos y objetivos del proyecto.',
    'process.step2.title': 'Propuesta',
    'process.step2.desc': 'Recibe un plan detallado con cronograma y presupuesto.',
    'process.step3.title': 'Desarrollo',
    'process.step3.desc': 'Construcción iterativa con actualizaciones regulares de progreso.',
    'process.step4.title': 'Entrega',
    'process.step4.desc': 'Testing exhaustivo y despliegue en las tiendas.',
    'process.step5.title': 'Soporte',
    'process.step5.desc': 'Mantenimiento continuo y actualizaciones post-lanzamiento.',
    
    // Pricing
    'pricing.badge': 'PRECIOS',
    'pricing.title': 'Paquetes Transparentes',
    'pricing.basic.name': 'Básico',
    'pricing.basic.desc': 'MVP y Corrección de Bugs',
    'pricing.basic.price': '$495',
    'pricing.basic.period': '/proyecto',
    'pricing.basic.f1': 'Plataforma Única (iOS/Android)',
    'pricing.basic.f2': 'Implementación UI Básica',
    'pricing.basic.f3': '3 Integraciones API',
    'pricing.basic.f4': 'Sin Funciones de IA',
    'pricing.standard.name': 'Estándar',
    'pricing.standard.desc': 'Desarrollo de App Completa',
    'pricing.standard.price': '$1,495',
    'pricing.standard.period': '/proyecto',
    'pricing.standard.f1': 'Multiplataforma (iOS/Flutter)',
    'pricing.standard.f2': 'UI/UX Personalizado Avanzado',
    'pricing.standard.f3': 'Integración Firebase/Auth',
    'pricing.standard.f4': 'Configuración OpenAI Estándar',
    'pricing.standard.recommended': 'Recomendado',
    'pricing.premium.name': 'Premium',
    'pricing.premium.desc': 'Empresarial + IA Personalizada',
    'pricing.premium.price': '$3,995',
    'pricing.premium.period': '/proyecto',
    'pricing.premium.f1': 'Desarrollo Nativo Dual',
    'pricing.premium.f2': 'Pipeline LLM RAG Completo',
    'pricing.premium.f3': 'Lógica Backend Personalizada',
    'pricing.premium.f4': '6 Meses de Mantenimiento',
    'pricing.cta': 'Contactarme',
    
    // CTA
    'cta.title': '¿Listo para comenzar?',
    'cta.button': 'Contrátame en Fiverr',
    
    // Footer
    'footer.tagline': 'Construyamos tu próxima gran idea con ingeniería de clase mundial e inteligencia de vanguardia.',
    'footer.rights': 'Todos los derechos reservados.',
  },
  en: {
    // Navbar
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact Me',
    
    // Hero
    'hero.badge': 'TOP-RATED FIVERR DEVELOPER',
    'hero.title1': 'Building the',
    'hero.title2': 'Future with ',
    'hero.title3': 'Native',
    'hero.title4': 'Mobile',
    'hero.title5': ' & AI',
    'hero.title6': 'Integration',
    'hero.subtitle': 'Specializing in high-performance iOS/Android apps and seamless LLM integrations. 5 years of experience delivering 20+ world-class projects.',
    'hero.cta1': 'View Portfolio',
    'hero.cta2': 'Hire on Fiverr',
    
    // Stats
    'stats.experience': 'Experience',
    'stats.years': 'Years',
    'stats.projects': 'Projects',
    'stats.rating': 'Rating',
    'stats.clients': 'Clients',
    
    // Services
    'services.badge': 'EXPERTISE',
    'services.title': 'Specialized Services',
    'services.subtitle': 'I build high-end mobile experiences by combining platform-native performance with the latest AI advancements.',
    'services.native.title': 'Native iOS/Android',
    'services.native.desc': 'High-performance Swift and Kotlin development for apps that demand speed, responsiveness, and platform-specific features.',
    'services.native.tech1': 'Swift & SwiftUI',
    'services.native.tech2': 'Kotlin & Jetpack Compose',
    'services.react.title': 'React Native',
    'services.react.desc': 'Cost-effective cross-platform solutions without sacrificing quality. One codebase, two platforms, maximum reach.',
    'services.react.feature1': 'Shared Codebase',
    'services.react.feature2': 'Fast Prototyping',
    'services.ai.title': 'AI Integration',
    'services.ai.desc': 'Integrate cutting-edge AI features into your existing apps using OpenAI, Gemini, or custom-built LLM workflows.',
    'services.ai.feature1': 'LLM RAG Pipelines',
    'services.ai.feature2': 'Custom Vector Search',
    
    // Portfolio
    'portfolio.badge': 'PORTFOLIO',
    'portfolio.title': 'Selected Works',
    'portfolio.viewAll': 'View All Projects',
    'portfolio.project1.title': 'Nexus AI Assistant',
    'portfolio.project1.desc': 'A comprehensive task management tool integrated with OpenAI for automated scheduling and email drafting.',
    'portfolio.project2.title': 'Vortex Wallet',
    'portfolio.project2.desc': 'Next-gen crypto wallet with biometric security, real-time tracking, and automated trading alerts.',
    'portfolio.project3.title': 'HealthSync Pro',
    'portfolio.project3.desc': 'AI-powered health monitoring app that analyzes sleep patterns, physical activity, and nutrition.',
    'portfolio.project4.title': 'VoiceNote AI',
    'portfolio.project4.desc': 'Real-time voice transcription with intelligent summaries using Whisper and GPT-4.',
    
    // Testimonials
    'testimonials.title': 'Trusted by Fiverr Global Clients',
    'testimonials.t1': '"Incredible developer! Delivered my AI app 3 days ahead of schedule. The integration with Gemini is flawless and the performance is lightning fast."',
    'testimonials.t2': '"The best mobile developer I\'ve worked with on Fiverr. He truly understands native UI/UX and knows how to optimize for both platforms."',
    'testimonials.t3': '"Exceeded expectations with the OpenAI integration. The custom RAG implementation is exactly what we needed for our enterprise app."',
    
    // Process
    'process.badge': 'PROCESS',
    'process.title': 'How I Work',
    'process.step1.title': 'Consultation',
    'process.step1.desc': 'We discuss your vision, requirements, and project goals.',
    'process.step2.title': 'Proposal',
    'process.step2.desc': 'Receive a detailed plan with timeline and budget.',
    'process.step3.title': 'Development',
    'process.step3.desc': 'Iterative building with regular progress updates.',
    'process.step4.title': 'Delivery',
    'process.step4.desc': 'Thorough testing and deployment to app stores.',
    'process.step5.title': 'Support',
    'process.step5.desc': 'Ongoing maintenance and post-launch updates.',
    
    // Pricing
    'pricing.badge': 'PRICING',
    'pricing.title': 'Transparent Packages',
    'pricing.basic.name': 'Basic',
    'pricing.basic.desc': 'MVP & Bug Fixes',
    'pricing.basic.price': '$495',
    'pricing.basic.period': '/project',
    'pricing.basic.f1': 'Single Platform (iOS/Android)',
    'pricing.basic.f2': 'Basic UI Implementation',
    'pricing.basic.f3': '3 API Integrations',
    'pricing.basic.f4': 'No AI Features',
    'pricing.standard.name': 'Standard',
    'pricing.standard.desc': 'Full App Development',
    'pricing.standard.price': '$1,495',
    'pricing.standard.period': '/project',
    'pricing.standard.f1': 'Cross-Platform (iOS/Flutter)',
    'pricing.standard.f2': 'Advanced Custom UI/UX',
    'pricing.standard.f3': 'Firebase/Auth Integration',
    'pricing.standard.f4': 'Standard OpenAI Config',
    'pricing.standard.recommended': 'Recommended',
    'pricing.premium.name': 'Premium',
    'pricing.premium.desc': 'Enterprise + Custom AI',
    'pricing.premium.price': '$3,995',
    'pricing.premium.period': '/project',
    'pricing.premium.f1': 'Dual Native Development',
    'pricing.premium.f2': 'Full LLM RAG Pipeline',
    'pricing.premium.f3': 'Custom Backend Logic',
    'pricing.premium.f4': '6 Months Maintenance',
    'pricing.cta': 'Contact Me',
    
    // CTA
    'cta.title': 'Ready to start?',
    'cta.button': 'Hire Me on Fiverr',
    
    // Footer
    'footer.tagline': "Let's build your next big idea with world-class engineering and cutting-edge intelligence.",
    'footer.rights': 'All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
