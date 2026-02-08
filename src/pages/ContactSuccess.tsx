import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

const ContactSuccessContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('contactFormData');
    if (storedData) {
      setContactData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card border border-white/5 rounded-2xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>

          <motion.h1
            className="text-2xl lg:text-3xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t('contactSuccess.title')}
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t('contactSuccess.subtitle')}
          </motion.p>

          {contactData && (
            <motion.div
              className="bg-secondary/50 rounded-xl p-6 mb-8 text-left space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {t('contactSuccess.summary')}
              </h3>

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('contact.name')}</p>
                  <p className="text-foreground">{contactData.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('contact.email')}</p>
                  <p className="text-foreground">{contactData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('contact.message')}</p>
                  <p className="text-foreground">{contactData.message}</p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium group hover-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('contactSuccess.backHome')}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const ContactSuccess = () => {
  return (
    <LanguageProvider>
      <ContactSuccessContent />
    </LanguageProvider>
  );
};

export default ContactSuccess;
