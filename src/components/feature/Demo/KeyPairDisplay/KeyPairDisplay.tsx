import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { EnhancedTooltip } from '../EnhancedTooltip';
import { KeyTextArea } from '../KeyTextArea/KeyTextArea';
import { Copy, Key, Shield, LockKeyhole, Edit, Save, RotateCcw } from 'lucide-react';
import { KeyPairDisplayProps } from './KeyPairDisplay.types';
import useTranslation from '@/hooks/useTranslation';


export const KeyPairDisplay: FC<KeyPairDisplayProps> = ({
  keyPair,
  onCopyPublicKey,
  onCopyPrivateKey,
  onPrivateKeyEdit,
  cryptoMode,
  keyPairTitle
}) => {
  const { t } = useTranslation(['demo', 'common']);
  const [isEditingPrivateKey, setIsEditingPrivateKey] = useState(false);
  const [editedPrivateKey, setEditedPrivateKey] = useState('');
  const [showFullPublicKey, setShowFullPublicKey] = useState(false);
  const [showFullPrivateKey, setShowFullPrivateKey] = useState(false); // For truncation, not reveal
  
  // Tooltip visibility states
  const [showPublicTooltip, setShowPublicTooltip] = useState(false);
  const [showPrivateTooltip, setShowPrivateTooltip] = useState(false);
  const [showCopyPublicTooltip, setShowCopyPublicTooltip] = useState(false);
  const [showCopyPrivateTooltip, setShowCopyPrivateTooltip] = useState(false);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [showCancelTooltip, setShowCancelTooltip] = useState(false);

  const handleSavePrivateKey = () => {
    if (onPrivateKeyEdit && editedPrivateKey.trim()) {
      onPrivateKeyEdit(editedPrivateKey);
    }
    setIsEditingPrivateKey(false);
  };
  
  const handleStartEditingPrivateKey = () => {
    setEditedPrivateKey(keyPair?.private_pem || '');
    setIsEditingPrivateKey(true);
    setShowFullPrivateKey(true); // Show full key when editing
  };
  
  const handleCancelEditPrivateKey = () => {
    setIsEditingPrivateKey(false);
    setEditedPrivateKey('');
  };
  
  if (!keyPair) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="relative">
        <div className="absolute -top-3 -right-3 w-24 h-24 bg-sky-600/10 rounded-full blur-2xl pointer-events-none z-0 md:-top-5 md:-right-5 md:w-32 md:h-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-full ${cryptoMode === 'ECDH' ? 'bg-teal-500/15' : 'bg-sky-500/15'} mr-3`}>
              <Key className={`w-5 h-5 ${cryptoMode === 'ECDH' ? 'text-teal-400' : 'text-sky-400'}`} />
            </div>
            <h2 className="text-xl font-semibold text-gray-100">
              {keyPairTitle || (cryptoMode === 'RSA' 
                ? t('keyGeneration.title', { ns: 'demo' })
                : t('keyGeneration.title', { ns: 'demo' }))
              }
            </h2>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Public Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-400 mr-2" />
                  <label className="block text-sm font-medium text-gray-300">
                    {cryptoMode === 'RSA'
                      ? t('keyGeneration.publicKeyLabel', { ns: 'demo' })
                      : keyPairTitle === t('keyGeneration.ecdhKeyPairTitleUserA', { ns: 'demo' }) 
                        ? t('keyGeneration.ecdhPublicKeyLabelUserA', {ns: 'demo'}) 
                        : t('keyGeneration.ecdhPublicKeyLabelUserB', {ns: 'demo'})
                    }
                  </label>
                  <EnhancedTooltip 
                    show={showPublicTooltip} 
                    text={t('keyGeneration.publicKeyTooltip', { ns: 'demo' })}
                    position="top"
                  >
                    <span 
                      className="ml-2 flex items-center justify-center w-5 h-5 text-xs bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 rounded-full cursor-help transition-colors"
                      onMouseEnter={() => setShowPublicTooltip(true)}
                      onMouseLeave={() => setShowPublicTooltip(false)}
                    >
                      ?
                    </span>
                  </EnhancedTooltip>
                </div>
                <EnhancedTooltip 
                  show={showCopyPublicTooltip} 
                  text={t('copy', { ns: 'common' })}
                  position="bottom"
                >
                  <Button
                    onClick={onCopyPublicKey}
                    variant="outline"
                    size="sm"
                    className="text-gray-400 hover:text-sky-300 border-gray-600 hover:border-sky-500/70 h-9 w-9 p-0 flex items-center justify-center"
                    onMouseEnter={() => setShowCopyPublicTooltip(true)}
                    onMouseLeave={() => setShowCopyPublicTooltip(false)}
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                </EnhancedTooltip>
              </div>
              <KeyTextArea 
                type='public'
                value={keyPair.public_pem}
                isFullView={showFullPublicKey}
                setFullView={setShowFullPublicKey}
                t={t}
              />
              <div className="text-xs text-gray-500">
                {cryptoMode === 'RSA'
                  ? t('keyGeneration.publicKeyInfo', { count: keyPair.public_pem.length, ns: 'demo' })
                  : t('keyGeneration.ecdhPublicKeyInfo', { count: keyPair.public_pem.length, ns: 'demo' })
                }
              </div>
            </div>

            {/* Private Key */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <LockKeyhole className="w-4 h-4 text-amber-400 mr-2" />
                  <label className="block text-sm font-medium text-gray-300">
                    {cryptoMode === 'RSA'
                      ? t('keyGeneration.privateKeyLabel', { ns: 'demo' })
                      : keyPairTitle === t('keyGeneration.ecdhKeyPairTitleUserA', { ns: 'demo' })
                        ? t('keyGeneration.ecdhPrivateKeyLabelUserA', {ns: 'demo'})
                        : t('keyGeneration.ecdhPrivateKeyLabelUserB', {ns: 'demo'})
                    }
                  </label>
                  <EnhancedTooltip 
                    show={showPrivateTooltip} 
                    text={t('keyGeneration.privateKeyTooltip', { ns: 'demo' })}
                    position="top"
                  >
                    <span 
                      className="ml-2 flex items-center justify-center w-5 h-5 text-xs bg-amber-800/80 hover:bg-amber-700/80 text-amber-300 rounded-full cursor-help transition-colors"
                      onMouseEnter={() => setShowPrivateTooltip(true)}
                      onMouseLeave={() => setShowPrivateTooltip(false)}
                    >
                      !
                    </span>
                  </EnhancedTooltip>
                </div>
                <div className="flex items-center space-x-2">
                  {!isEditingPrivateKey ? (
                    <>
                      <EnhancedTooltip 
                        show={showCopyPrivateTooltip} 
                        text={t('copy', { ns: 'common' })}
                        position="bottom"
                      >
                        <Button
                          onClick={onCopyPrivateKey}
                          variant="outline"
                          size="sm"
                          className="text-gray-400 hover:text-amber-300 border-gray-600 hover:border-amber-500/70 h-9 w-9 p-0 flex items-center justify-center"
                          onMouseEnter={() => setShowCopyPrivateTooltip(true)}
                          onMouseLeave={() => setShowCopyPrivateTooltip(false)}
                        >
                          <Copy className="w-5 h-5" />
                        </Button>
                      </EnhancedTooltip>
                      {onPrivateKeyEdit && (
                        <EnhancedTooltip 
                          show={showEditTooltip} 
                          text={t('edit', { ns: 'common', defaultValue: 'Edit Private Key'})}
                          position="bottom"
                        >
                          <Button
                            onClick={handleStartEditingPrivateKey}
                            variant="outline"
                            size="sm"
                            className="text-amber-400 hover:text-amber-300 border-amber-700/80 hover:border-amber-600 h-9 w-9 p-0 flex items-center justify-center"
                            onMouseEnter={() => setShowEditTooltip(true)}
                            onMouseLeave={() => setShowEditTooltip(false)}
                          >
                            <Edit className="w-5 h-5" />
                          </Button>
                        </EnhancedTooltip>
                      )}
                    </>
                  ) : (
                    <>
                      <EnhancedTooltip 
                        show={showSaveTooltip} 
                        text={t('save', {ns: 'common', defaultValue: 'Save'})}
                        position="bottom"
                      >
                        <Button
                          onClick={handleSavePrivateKey}
                          variant="outline"
                          size="sm"
                          className="text-green-400 hover:text-green-300 border-green-600 hover:border-green-500 h-9 w-9 p-0 flex items-center justify-center"
                          onMouseEnter={() => setShowSaveTooltip(true)}
                          onMouseLeave={() => setShowSaveTooltip(false)}
                        >
                          <Save className="w-5 h-5" />
                        </Button>
                      </EnhancedTooltip>
                      <EnhancedTooltip 
                        show={showCancelTooltip} 
                        text={t('cancel', {ns: 'common', defaultValue: 'Cancel'})}
                        position="bottom"
                      >
                        <Button
                          onClick={handleCancelEditPrivateKey}
                          variant="outline"
                          size="sm"
                          className="text-gray-400 hover:text-gray-200 border-gray-600 hover:border-gray-500 h-9 w-9 p-0 flex items-center justify-center"
                          onMouseEnter={() => setShowCancelTooltip(true)}
                          onMouseLeave={() => setShowCancelTooltip(false)}
                        >
                          <RotateCcw className="w-5 h-5" />
                        </Button>
                      </EnhancedTooltip>
                    </>
                  )}
                </div>
              </div>
              <KeyTextArea 
                type='private'
                value={keyPair.private_pem}
                isFullView={showFullPrivateKey}
                setFullView={setShowFullPrivateKey}
                t={t}
                isEditing={isEditingPrivateKey}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedPrivateKey(e.target.value)}
                placeholder={isEditingPrivateKey ? "Paste your private key here..." : undefined}
                editedPrivateKey={editedPrivateKey}
              />
              <div className="text-xs text-gray-500 flex items-center">
                {isEditingPrivateKey ? (
                  <span className="text-amber-400 mr-1">Edit mode: Paste your custom private key here</span>
                ) : (
                  <>
                    <span className={`mr-1 ${cryptoMode === 'RSA' ? 'text-amber-400' : (cryptoMode === 'ECDH' ? 'text-teal-400' : 'text-sky-400')}`}>•</span>
                    {cryptoMode === 'RSA'
                      ? t('keyGeneration.privateKeyInfo', { ns: 'demo' })
                      : t('keyGeneration.ecdhPrivateKeyInfo', { ns: 'demo' })
                    }
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