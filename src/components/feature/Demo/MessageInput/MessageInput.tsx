import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { KeyRound, Lock, Unlock, RotateCcw, Info, Edit3, CheckCircle } from 'lucide-react';
import { Tooltip } from '@/components/common/Tooltip';
import { MessageInputProps } from './MessageInput.types';
import useTranslation from '@/hooks/useTranslation';

export const MessageInput: FC<MessageInputProps> = ({
  message,
  onMessageChange,
  onGenerateKeyPair,
  onProcessPrimary,
  onProcessSecondary,
  onReset,
  isGenerating,
  isProcessingPrimary,
  isProcessingSecondary,
  hasKeyPair,
  hasProcessedData,
  cryptoMode,
}) => {
  const { t } = useTranslation(['demo', 'common']);

  const primaryActionText = cryptoMode === 'RSA' ? t('encryption.encryptButton', { ns: 'demo' }) : t('encryption.signButton', { ns: 'demo' });
  const secondaryActionText = cryptoMode === 'RSA' ? t('decryption.decryptButton', { ns: 'demo' }) : t('decryption.verifyButton', { ns: 'demo' });
  const generateButtonText = cryptoMode === 'RSA' ? t('keyGeneration.generateButton', { ns: 'demo' }) : t('keyGeneration.generateEccButton', { ns: 'demo' });
  
  const PrimaryIcon = cryptoMode === 'RSA' ? Lock : Edit3;
  const SecondaryIcon = cryptoMode === 'RSA' ? Unlock : CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-blue-500/10 mr-3">
            <Info className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">
            {cryptoMode === 'RSA' ? t('encryption.title', { ns: 'demo' }) : t('encryption.title', { ns: 'demo' })}
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            {cryptoMode === 'RSA' ? t('encryption.description', { ns: 'demo' }) : t('encryption.description', { ns: 'demo' }) }
          </label>
          <div className="relative">
            <Input
              id="message"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder={t('encryption.messagePlaceholder', { ns: 'demo' })}
              className="w-full pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
              {message.length} chars
            </div>
          </div>
          {cryptoMode === 'RSA' && message.length > 190 && (
            <p className="mt-2 text-xs text-amber-400 flex items-center">
              <Info className="w-3 h-3 mr-1" />
              {t('encryption.hybrid', { ns: 'demo' })}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Tooltip content={cryptoMode === 'RSA' ? t('keyGeneration.description', { ns: 'demo' }) : t('keyGeneration.description', { ns: 'demo' }) }>
            <Button
              onClick={onGenerateKeyPair}
              isLoading={isGenerating}
              loadingText={t('loading', { ns: 'common' })}
              leftIcon={<KeyRound className="w-4 h-4" />}
              className="hover:shadow-blue-500/20 hover:shadow-lg transition-shadow"
            >
              {generateButtonText}
            </Button>
          </Tooltip>

          <Tooltip content={!hasKeyPair ? generateButtonText : !message ? t('encryption.messagePlaceholder', { ns: 'demo' }) : primaryActionText}>
            <Button
              onClick={onProcessPrimary}
              isLoading={isProcessingPrimary}
              loadingText={t('loading', { ns: 'common' })}
              leftIcon={<PrimaryIcon className="w-4 h-4" />}
              disabled={!hasKeyPair || !message}
              variant="secondary"
              className="hover:shadow-purple-500/20 hover:shadow-lg transition-shadow"
            >
              {primaryActionText}
            </Button>
          </Tooltip>

          <Tooltip content={!hasProcessedData ? primaryActionText : secondaryActionText}>
            <Button
              onClick={onProcessSecondary}
              isLoading={isProcessingSecondary}
              loadingText={t('loading', { ns: 'common' })}
              leftIcon={<SecondaryIcon className="w-4 h-4" />}
              disabled={!hasProcessedData}
              variant="secondary"
              className="hover:shadow-green-500/20 hover:shadow-lg transition-shadow"
            >
              {secondaryActionText}
            </Button>
          </Tooltip>

          <Tooltip content={t('common.reset', { ns: 'common' })}> 
            <Button
              onClick={onReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              disabled={!hasKeyPair && !message && !hasProcessedData}
              variant="ghost"
            >
              {t('common.reset', { ns: 'common' })}
            </Button>
          </Tooltip>
        </div>
      </Card>
    </motion.div>
  );
};

export default MessageInput; 