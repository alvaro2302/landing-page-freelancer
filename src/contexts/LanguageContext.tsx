import { createContext, useContext, useState, ReactNode } from 'react';
import AppPhoto from '@/assets/AppRevivePhoto.png';
import AppResume from '@/assets/appResume.png';
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
    'services.ai.feature1': 'Integraciones API',
    'services.ai.feature2': 'Detección con IA, generación de imágenes, análisis de audio, etc.,etc',
    
    // Portfolio
    'portfolio.badge': 'PORTAFOLIO',
    'portfolio.title': 'Trabajos Seleccionados',
    'portfolio.viewAll': 'Ver Todos los Proyectos',
    'portfolio.project1.title': 'PhotoRevive',
    'portfolio.project1.desc': 'Es una aplicación nativa de iOS que aprovecha la inteligencia artificial para restaurar fotografías antiguas, dañadas o descoloridas.',
    'portfolio.project1.photoApp': AppPhoto,
    'portfolio.project2.title': 'Resume AI',
    'portfolio.project2.desc': 'Una app inteligente que convierte tus audios en resúmenes claros y organizados, resaltando los puntos clave para que puedas repasar y estudiar en minutos.',
    'portfolio.project2.photoApp': AppResume,
    'portfolio.project3.title': 'TransportApp',
    'portfolio.project3.desc': 'Es una aplicación móvil que ofrece al usuario una agenda con la hora de salida  y ver en un mapa los lugares donde espera el transporte',
    'portfolio.project4.title': 'Geosites App',
    'portfolio.project4.desc': 'Una app de viajes que te permite descubrir y organizar sitios turísticos en Turquía y Francia. Busca tus destinos favoritos, guarda lugares imperdibles y navega directamente con Mapbox o Google Maps.',
    
    // Testimonials
    'testimonials.title': 'Confiado por Clientes Globales de Fiverr',
    'testimonials.t1': '"He trabajado con Álvaro y su equipo durante 4 años desarrollando varias versiones de una aplicación móvil. Esta vez, cambiamos el backend de la plataforma y él solucionó todos los problemas de transición. Siempre se muestra dispuesto a colaborar."',
    'testimonials.t2': '"Fue increíble trabajar con Álvaro. Muy profesional, capaz de trabajar de forma independiente y siempre dispuesto a encontrar soluciones a los desafíos que surgieron durante el proceso de desarrollo. Lo recomiendo ampliamente."',
    'testimonials.t3': '"Excelente en términos de tiempo y código."',
    
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
    'services.ai.feature1': 'API Integrations',
    'services.ai.feature2': 'AI with Detection, image Generation, Audio Analysis,etc',
    
    // Portfolio
    'portfolio.badge': 'PORTFOLIO',
    'portfolio.title': 'Selected Works',
    'portfolio.viewAll': 'View All Projects',
    'portfolio.project1.title': 'PhotoRevive',
    'portfolio.project1.desc': 'It is a native iOS application created with SwiftUI that leverages artificial intelligence to restore old, damaged, or faded photographs.',
    'portfolio.project1.photoApp': AppPhoto,
    'portfolio.project2.title': 'Resume AI',
    'portfolio.project2.desc': 'A smart app that turns your audio into clear and organized summaries, highlighting the key points so you can review and study in minutes.',
    'portfolio.project2.photoApp': AppResume,
    'portfolio.project3.title': 'TransportApp',
    'portfolio.project3.desc': 'It is a mobile application that offers the user a schedule with the departure time and shows on a map the places where the transport waits.',
    'portfolio.project4.title': 'Geosites App',
    'portfolio.project4.desc': 'A travel app that lets you discover and organize tourist sites in Türkiye and France. Search for your favorite destinations, save must-see places, and navigate directly with Mapbox or Google Maps.',
    
    // Testimonials
    'testimonials.title': 'Trusted by Fiverr Global Clients',
    'testimonials.t1': '"I have worked with Alvaro and his team for 4 years developing several versions of a mobile app. This time we changed the back end of the platform and he solved all of the transition issues. He is always cooperative."',
    'testimonials.t2': '"It was amazing working with Alvaro. Very profesional, able to work independently and always willing to find solutions to the challenges found on the way during the development process. Highly recommended."',
    'testimonials.t3': '"Excellent in terms of time and code."',
    
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
