import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import { Card } from '@/components/common/Card';
import { Copy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Tooltip } from '@/components/common/Tooltip';
import { EncryptionResultsProps } from './EncryptionResults.types';

export const EncryptionResults: FC<EncryptionResultsProps> = ({
  encryptedMessage,
  decryptedMessage,
  originalMessage,
  onCopyEncrypted,
  isHybridEncryption = false,
}) => {
  if (!encryptedMessage) return null;
  
  const isVerified = decryptedMessage && originalMessage && decryptedMessage === originalMessage;
  const hasDecrypted = Boolean(decryptedMessage);

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
          <h2 className="text-xl font-semibold">Encryption Results</h2>
          {isHybridEncryption && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-900/30 text-blue-400 rounded-full border border-blue-800">
              Hybrid RSA+AES
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Encrypted Message */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">
                Encrypted Message:
              </label>
              <Tooltip content="Copy encrypted message">
                <Button
                  onClick={onCopyEncrypted}
                  variant="outline"
                  size="sm"
                  className="text-gray-300 hover:text-white border border-blue-700 hover:bg-blue-700/30"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy encrypted message
                </Button>
              </Tooltip>
            </div>
            <div className="relative">
              <Textarea
                value={encryptedMessage}
                readOnly
                className="font-mono text-xs bg-gray-800/50 border-gray-700 focus:border-blue-600"
                rows={4}
              />
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              {isHybridEncryption ? (
                <>
                  <span className="text-blue-400 mr-1">•</span>
                  Using Vaultic's hybrid RSA+AES encryption for large data
                </>
              ) : (
                <>
                  <span className="text-green-400 mr-1">•</span>
                  Using direct RSA encryption
                </>
              )}
            </div>
          </div>

          {/* Decrypted Message */}
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Decrypted Message:
            </label>
            <Textarea
              value={decryptedMessage}
              readOnly
              className={`font-mono text-base bg-gray-800/50 border-gray-700 focus:border-blue-600 ${
                hasDecrypted ? "" : "text-gray-500 italic"
              }`}
              placeholder="Decrypted message will appear here..."
              rows={3}
            />
          </div>

          {/* Verification Result */}
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
                      ? "Verification successful!"
                      : "Verification failed!"}
                  </p>
                  <p className="text-sm opacity-80">
                    {isVerified
                      ? "The decrypted message matches the original. The encryption/decryption cycle is complete and verified."
                      : "The decrypted message differs from the original input."}
                  </p>
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