import { FC } from 'react';
import { useCryptoStore, CryptoMode } from '@/core/store/cryptoStore';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Lock, GitMerge } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

export const CryptoModeSelector: FC = () => {
  const { cryptoMode, setCryptoMode } = useCryptoStore();
  const { t } = useTranslation(['demo']);

  const modes: { labelKey: string; value: CryptoMode; icon: React.ElementType }[] = [
    { labelKey: 'RSA', value: 'RSA', icon: Lock }, 
    { labelKey: 'ECDH', value: 'ECDH', icon: GitMerge },
  ];

  return (
    <Card className="mb-8">
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-200">
          {t('cryptoModeSelector.title', { ns: 'demo' })}
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Button
              key={mode.value}
              onClick={() => setCryptoMode(mode.value)}
              variant={cryptoMode === mode.value ? 'primary' : 'outline'}
              className={`w-full sm:w-auto flex-1 transition-all duration-200 ease-in-out transform hover:scale-105 
                ${cryptoMode === mode.value 
                  ? 'shadow-lg shadow-blue-500/30' 
                  : 'border-gray-600 hover:bg-gray-700/30 text-gray-300 hover:text-white'
              }`}
              leftIcon={<Icon className={`w-4 h-4 mr-2 ${cryptoMode === mode.value ? '' : 'text-teal-400'}`} />}
            >
              {t(`cryptoModeSelector.${mode.labelKey.toLowerCase()}`, { ns: 'demo' })}
            </Button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {cryptoMode === 'RSA' ? 
          t('cryptoModeSelector.rsaDescription', { ns: 'demo' }) : 
          t('cryptoModeSelector.ecdhDescription', { ns: 'demo' })}
      </p>
    </Card>
  );
};

export default CryptoModeSelector; 