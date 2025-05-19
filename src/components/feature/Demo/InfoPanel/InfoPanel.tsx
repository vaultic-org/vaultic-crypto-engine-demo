import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/common/Card';
import { BookOpen, Lock, ShieldCheck, ArrowRight, Code } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { InfoStep } from './InfoPanel.types';
import useTranslation from '@/hooks/useTranslation';

export const InfoPanel: FC = () => {
  const { t } = useTranslation(['demo', 'common']);

  const infoSteps: InfoStep[] = [
    {
      title: t('keyGeneration.title', { ns: 'demo' }),
      description: t('keyGeneration.description', { ns: 'demo' }),
      icon: ShieldCheck,
    },
    {
      title: t('encryption.title', { ns: 'demo' }),
      description: t('encryption.hybrid', { ns: 'demo' }),
      icon: Code,
    },
    {
      title: t('security.title', { ns: 'demo' }),
      description: t('security.description', { ns: 'demo' }),
      icon: Lock,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-blue-500/10 mr-3">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">{t('howItWorks', { ns: 'demo' })}</h2>
        </div>
        
        <div className="space-y-6">
          <div className="text-sm text-gray-300">
            {t('description', { ns: 'demo' })}
          </div>
          
          <div className="space-y-4">
            {infoSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                  className="flex items-start"
                >
                  <div className="bg-blue-900/20 p-2 rounded-lg mr-3 mt-0.5">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">{step.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-2"
            >
              <Link 
                to="/documentation" 
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 font-medium"
              >
                {t('nav.documentation', { ns: 'common' })}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default InfoPanel; 