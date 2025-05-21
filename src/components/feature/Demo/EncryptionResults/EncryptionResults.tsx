import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import { Card } from '@/components/common/Card';
import { Copy, RefreshCw, CheckCircle, XCircle, Edit, Save, RotateCcw } from 'lucide-react';
import { Tooltip } from '@/components/common/Tooltip';
import { EncryptionResultsProps } from './EncryptionResults.types';
import useTranslation from '@/hooks/useTranslation';

export const EncryptionResults: FC<EncryptionResultsProps> = ({
  processedData,
  decryptedMessage,
  originalMessage,
  onCopyProcessedData,
  onProcessedDataEdit,
  isHybridRsaEncryption = false,
  allowCustomProcessedData = false,
  cryptoMode
}) => {
  const { t } = useTranslation(['demo', 'common']);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProcessedData, setEditedProcessedData] = useState('');
  
  // Function to handle saving of edited processed data
  const handleSaveProcessedData = () => {
    if (onProcessedDataEdit && editedProcessedData.trim()) {
      onProcessedDataEdit(editedProcessedData);
    }
    setIsEditing(false);
  };
  
  // Function to start editing with the current message
  const handleStartEditing = () => {
    setEditedProcessedData(processedData || '');
    setIsEditing(true);
  };
  
  // Function to cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProcessedData('');
  };
  
  if (!processedData && !isEditing && !decryptedMessage) return null;
  
  const isVerified = decryptedMessage && originalMessage && decryptedMessage === originalMessage;

  const hasDecrypted = Boolean(decryptedMessage);

  const title = cryptoMode === 'RSA' ? t('encryption.result', { ns: 'demo' }) : t('encryption.result', { ns: 'demo' });
  const hybridText = cryptoMode === 'RSA' ? t('encryption.hybridNotice', { ns: 'demo' }) : '';
  const usingHybridText = cryptoMode === 'RSA' ? t('encryption.usingHybridRsa', { ns: 'demo' }) : '';
  const usingDirectText = cryptoMode === 'RSA' ? t('encryption.usingDirectRsa', { ns: 'demo' }) : '';
  const usingEcdhAesText = cryptoMode === 'ECDH' ? t('encryption.usingEcdhAes', { ns: 'demo' }) : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-blue-500/10 mr-3">
            <RefreshCw className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {isHybridRsaEncryption && cryptoMode === 'RSA' && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
              {hybridText}
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Processed Data (Encrypted/Signed) */}
          {(processedData || isEditing) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">
                {title}:
              </label>
              <div className="flex">
                {!isEditing ? (
                  <>
                    {processedData && (
                    <Tooltip content={t('copy', { ns: 'common' })}>
                      <Button
                        onClick={onCopyProcessedData}
                        variant="outline"
                        size="sm"
                        className="text-gray-300 hover:text-white border border-blue-700 hover:bg-blue-700/30 mr-2 h-10 w-10 p-0"
                      >
                        <Copy className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                    )}
                    {allowCustomProcessedData && (
                      <Tooltip content={cryptoMode === 'RSA' ? "Paste a custom encrypted message" : "Paste a custom signature"}>
                        <Button
                          onClick={handleStartEditing}
                          variant="outline"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 border border-blue-800 h-10 w-10 p-0"
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                    )}
                  </>
                ) : (
                  <>
                    <Tooltip content={cryptoMode === 'RSA' ? "Save custom encrypted message" : "Save custom signature"}>
                      <Button
                        onClick={handleSaveProcessedData}
                        variant="outline"
                        size="sm"
                        className="text-green-400 hover:text-green-300 border border-green-700 mr-2 h-10 w-10 p-0"
                      >
                        <Save className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Cancel">
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        size="sm"
                        className="text-gray-400 hover:text-white border border-gray-700 h-10 w-10 p-0"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <Textarea
                value={isEditing ? editedProcessedData : processedData}
                onChange={isEditing ? (e) => setEditedProcessedData(e.target.value) : undefined}
                readOnly={!isEditing}
                className={`font-mono text-xs bg-gray-800/50 border-gray-700 focus:border-blue-600 ${
                  isEditing ? 'border-blue-500 bg-gray-900/70' : ''
                }`}
                placeholder={isEditing ? (cryptoMode === 'RSA' ? "Paste your custom encrypted message here..." : "Paste your custom encrypted data here...") : ""}
                rows={4}
              />
            </div>
            {(processedData || isEditing) && (
            <div className="text-xs text-gray-500 flex items-center">
              {isEditing ? (
                <span className="text-blue-400 mr-1">{cryptoMode === 'RSA' ? "Edit mode: Paste your custom encrypted message here" : "Edit mode: Paste your custom encrypted data here"}</span>
              ) : cryptoMode === 'RSA' ? (
                isHybridRsaEncryption ? (
                  <>
                    <span className="text-blue-400 mr-1">•</span>
                    {usingHybridText}
                  </>
                ) : (
                  <>
                    <span className="text-green-400 mr-1">•</span>
                    {usingDirectText}
                  </>
                )
              ) : cryptoMode === 'ECDH' ? (
                <>
                  <span className="text-teal-400 mr-1">•</span>
                  {usingEcdhAesText}
                </>
              ) : null}
            </div>
            )}
          </div>
          )}

          {/* Decrypted Message / Verification Result */}
          {decryptedMessage && (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              {t('decryption.result', { ns: 'demo' })}:
            </label>
            <Textarea
              value={decryptedMessage}
              readOnly
              className={`font-mono text-base bg-gray-800/50 border-gray-700 focus:border-blue-600 ${
                hasDecrypted ? "" : "text-gray-500 italic"
              }`}
              placeholder={t('decryption.result', { ns: 'demo' })}
              rows={3}
            />
          </div>
          )}

          {/* Verification Result for RSA, or general success/failure for ECC */}
          {hasDecrypted && originalMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-4 rounded-md ${
                isVerified
                  ? "bg-green-500/20 text-green-300 border border-green-700/50"
                  : "bg-red-500/20 text-red-300 border border-red-700/50"
              }`}
            >
              <div className="flex items-start">
                {isVerified ? (
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {isVerified
                      ? t('decryption.success', { ns: 'demo' })
                      : t('decryption.error', { ns: 'demo' })}
                  </p>
                  {(cryptoMode === 'RSA' || isVerified) && (
                    <p className="text-sm opacity-80">
                      {isVerified
                        ? t('decryption.matchMessage', { ns: 'demo' })
                        : t('decryption.mismatchMessage', { ns: 'demo' })}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default EncryptionResults; 