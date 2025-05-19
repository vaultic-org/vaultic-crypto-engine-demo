import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { KeyRound, Lock, Unlock, RotateCcw, Info } from 'lucide-react';
import { Tooltip } from '@/components/common/Tooltip';
import { MessageInputProps } from './MessageInput.types';
import useTranslation from '@/hooks/useTranslation';

export const MessageInput: FC<MessageInputProps> = ({
  message,
  onMessageChange,
  onGenerateKeyPair,
  onEncrypt,
  onDecrypt,
  onReset,
  isGenerating,
  isEncrypting,
  isDecrypting,
  hasKeyPair,
  hasEncryptedMessage,
}) => {
  const { t } = useTranslation(['demo', 'common']);

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
          <h2 className="text-xl font-semibold">{t('encryption.title', { ns: 'demo' })}</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            {t('encryption.description', { ns: 'demo' })}
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
          {message.length > 245 && (
            <p className="mt-2 text-xs text-amber-400 flex items-center">
              <Info className="w-3 h-3 mr-1" />
              {t('encryption.hybrid', { ns: 'demo' })}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Tooltip content={t('keyGeneration.description', { ns: 'demo' })}>
            <Button
              onClick={onGenerateKeyPair}
              isLoading={isGenerating}
              loadingText={t('loading', { ns: 'common' })}
              leftIcon={<KeyRound className="w-4 h-4" />}
              className="hover:shadow-blue-500/20 hover:shadow-lg transition-shadow"
            >
              {t('keyGeneration.generateButton', { ns: 'demo' })}
            </Button>
          </Tooltip>

          <Tooltip content={!hasKeyPair ? t('keyGeneration.generateButton', { ns: 'demo' }) : !message ? t('encryption.messagePlaceholder', { ns: 'demo' }) : t('encryption.encryptButton', { ns: 'demo' })}>
            <Button
              onClick={onEncrypt}
              isLoading={isEncrypting}
              loadingText={t('loading', { ns: 'common' })}
              leftIcon={<Lock className="w-4 h-4" />}
              disabled={!hasKeyPair || !message}
              variant="secondary"
              className="hover:shadow-purple-500/20 hover:shadow-lg transition-shadow"
            >
              {t('encryption.encryptButton', { ns: 'demo' })}
            </Button>
          </Tooltip>

          <Tooltip content={!hasEncryptedMessage ? t('encryption.encryptButton', { ns: 'demo' }) : t('decryption.decryptButton', { ns: 'demo' })}>
            <Button
              onClick={onDecrypt}
              isLoading={isDecrypting}
              loadingText={t('loading', { ns: 'common' })}
              leftIcon={<Unlock className="w-4 h-4" />}
              disabled={!hasEncryptedMessage}
              variant="secondary"
              className="hover:shadow-green-500/20 hover:shadow-lg transition-shadow"
            >
              {t('decryption.decryptButton', { ns: 'demo' })}
            </Button>
          </Tooltip>

          <Tooltip content={t('common.reset', { ns: 'common' })}>
            <Button
              onClick={onReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              disabled={!hasKeyPair && !message}
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