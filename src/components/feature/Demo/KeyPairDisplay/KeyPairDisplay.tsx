import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import { Card } from '@/components/common/Card';
import { Copy, Key, Shield, LockKeyhole } from 'lucide-react';
import { Tooltip } from '@/components/common/Tooltip';
import { KeyPairDisplayProps } from './KeyPairDisplay.types';

export const KeyPairDisplay: FC<KeyPairDisplayProps> = ({
  keyPair,
  onCopyPublicKey,
  onCopyPrivateKey,
}) => {
  if (!keyPair) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="mb-8 relative">
        {/* Visual accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-500/10 mr-3">
              <Key className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold">Vaultic RSA Key Pair</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Public Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-400 mr-2" />
                  <label className="block text-sm font-medium text-gray-300">
                    Public Key (for encryption):
                  </label>
                  <div className="relative inline-block ml-2">
                    <Tooltip content="Anyone can use this key to encrypt messages that only you can decrypt" position="bottom">
                      <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-700 text-gray-300 rounded-full cursor-help">?</span>
                    </Tooltip>
                  </div>
                </div>
                <div className="ml-4">
                  <Tooltip content="Copy public key">
                    <Button
                      onClick={onCopyPublicKey}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white border border-gray-700"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div>
                <Textarea
                  value={keyPair.public_pem}
                  readOnly
                  className="font-mono text-xs resize-none h-32 bg-gray-800/50 border-gray-700 focus:border-blue-600"
                />
              </div>
              <div className="text-xs text-gray-500">
                2048-bit RSA Public Key ({keyPair.public_pem.length} chars)
              </div>
            </div>

            {/* Private Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <LockKeyhole className="w-4 h-4 text-amber-400 mr-2" />
                  <label className="block text-sm font-medium text-gray-300">
                    Private Key (for decryption):
                  </label>
                  <div className="relative inline-block ml-2">
                    <Tooltip content="Keep this key secret! It's used to decrypt messages" position="bottom">
                      <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-amber-900 text-amber-300 rounded-full cursor-help">!</span>
                    </Tooltip>
                  </div>
                </div>
                <div className="ml-4">
                  <Tooltip content="Copy private key">
                    <Button
                      onClick={onCopyPrivateKey}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white border border-gray-700"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div>
                <Textarea
                  value={keyPair.private_pem}
                  readOnly
                  className="font-mono text-xs resize-none h-32 bg-gray-800/50 border-gray-700 focus:border-blue-600"
                />
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="text-amber-400 mr-1">•</span>
                Keep this key secure - never share your private key
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default KeyPairDisplay; 