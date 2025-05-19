import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import { Card } from '@/components/common/Card';
import { Copy, Key, Shield, LockKeyhole, Edit, Save, RotateCcw } from 'lucide-react';
import { Tooltip } from '@/components/common/Tooltip';
import { KeyPairDisplayProps } from './KeyPairDisplay.types';
import useTranslation from '@/hooks/useTranslation';

export const KeyPairDisplay: FC<KeyPairDisplayProps> = ({
  keyPair,
  onCopyPublicKey,
  onCopyPrivateKey,
  onPrivateKeyEdit,
}) => {
  const { t } = useTranslation(['demo', 'common']);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrivateKey, setEditedPrivateKey] = useState('');
  
  const handleSavePrivateKey = () => {
    if (onPrivateKeyEdit && editedPrivateKey.trim()) {
      onPrivateKeyEdit(editedPrivateKey);
    }
    setIsEditing(false);
  };
  
  const handleStartEditing = () => {
    setEditedPrivateKey(keyPair?.private_pem || '');
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPrivateKey('');
  };
  
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
                    {t('keyGeneration.publicKeyLabel', { ns: 'demo' })}
                  </label>
                  <div className="relative inline-block ml-2">
                    <Tooltip content={t('keyGeneration.publicKeyTooltip', { ns: 'demo' })} position="bottom">
                      <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-gray-700 text-gray-300 rounded-full cursor-help">?</span>
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <Tooltip content={t('copy', { ns: 'common' })}>
                    <Button
                      onClick={onCopyPublicKey}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white border border-gray-700 h-10 w-10 p-0"
                    >
                      <Copy className="w-5 h-5" />
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
                {t('keyGeneration.publicKeyInfo', { count: keyPair.public_pem.length, ns: 'demo' })}
              </div>
            </div>

            {/* Private Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <LockKeyhole className="w-4 h-4 text-amber-400 mr-2" />
                  <label className="block text-sm font-medium text-gray-300">
                    {t('keyGeneration.privateKeyLabel', { ns: 'demo' })}
                  </label>
                  <div className="relative inline-block ml-2">
                    <Tooltip content={t('keyGeneration.privateKeyTooltip', { ns: 'demo' })} position="bottom">
                      <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-amber-900 text-amber-300 rounded-full cursor-help">!</span>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-center">
                  {!isEditing ? (
                    <>
                      <Tooltip content={t('copy', { ns: 'common' })}>
                        <Button
                          onClick={onCopyPrivateKey}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white border border-gray-700 mr-2 h-10 w-10 p-0"
                        >
                          <Copy className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Override with your own private key">
                        <Button
                          onClick={handleStartEditing}
                          variant="ghost"
                          size="sm"
                          className="text-amber-400 hover:text-amber-300 border border-amber-800 h-10 w-10 p-0"
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip content="Save custom private key">
                        <Button
                          onClick={handleSavePrivateKey}
                          variant="ghost"
                          size="sm"
                          className="text-green-400 hover:text-green-300 border border-green-800 mr-2 h-10 w-10 p-0"
                        >
                          <Save className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Cancel">
                        <Button
                          onClick={handleCancelEdit}
                          variant="ghost"
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
              <div>
                <Textarea
                  value={isEditing ? editedPrivateKey : keyPair.private_pem}
                  onChange={isEditing ? (e) => setEditedPrivateKey(e.target.value) : undefined}
                  readOnly={!isEditing}
                  className={`font-mono text-xs resize-none h-32 bg-gray-800/50 border-gray-700 focus:border-blue-600 ${
                    isEditing ? 'border-amber-500 bg-gray-900/70' : ''
                  }`}
                  placeholder={isEditing ? "Paste your private key here..." : ""}
                />
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                {isEditing ? (
                  <span className="text-amber-400 mr-1">Edit mode: Paste your custom private key here</span>
                ) : (
                  <>
                    <span className="text-amber-400 mr-1">•</span>
                    {t('keyGeneration.privateKeyInfo', { ns: 'demo' })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default KeyPairDisplay; 