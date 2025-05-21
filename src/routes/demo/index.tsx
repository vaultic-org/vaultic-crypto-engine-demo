import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { useVaulticCrypto } from "@/hooks/useVaulticCrypto";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { 
  KeyPairDisplay, 
  EncryptionResults, 
  InfoPanel, 
  WorkflowStepsIndicator
} from "@/components/feature/Demo";
import { Step as WorkflowStepType } from "@/components/feature/Demo/WorkflowStepsIndicator";
import CryptoModeSelector from '@/components/feature/Demo/CryptoModeSelector';
import useTranslation from "@/hooks/useTranslation";
import { KeyPair } from "@/core/types/crypto.types";
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import { KeyRound, Lock, Unlock, RotateCcw, Edit3, CheckCircle, Info, Users, GitMerge } from 'lucide-react';

const Demo = () => {
  const { t } = useTranslation(['demo', 'common']);
  const [message, setMessage] = useState("");
  const [activeWorkflowStep, setActiveWorkflowStep] = useState('keyGeneration');

  // Refs for scrolling
  const keyGenerationSectionRef = useRef<HTMLDivElement>(null);
  const messageActionSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const {
    cryptoMode,
    keyPair,
    keyPairA,
    keyPairB,
    originalMessage,
    processedData,
    decryptedMessage,
    isGenerating,
    isProcessingPrimary,
    isProcessingSecondary,
    generateKeyPair,
    processPrimaryAction,
    processSecondaryAction,
    resetCrypto,
    storeSetKeyPair,
    storeSetKeyPairA,
    storeSetKeyPairB,
    storeSetProcessedData,
    storeSetDecryptedMessage,
  } = useVaulticCrypto();

  const prevKeyPair = useRef(keyPair);
  const prevKeyPairA = useRef(keyPairA);
  const prevKeyPairB = useRef(keyPairB);
  const prevProcessedData = useRef(processedData);
  const prevDecryptedMessage = useRef(decryptedMessage);

  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    setMessage("");
    storeSetProcessedData("");
    setActiveWorkflowStep('keyGeneration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cryptoMode, storeSetProcessedData]);

  // Scroll and manage active step for RSA
  useEffect(() => {
    if (cryptoMode === 'RSA') {
      if (keyPair && !prevKeyPair.current) {
        setActiveWorkflowStep('messageActions');
        setTimeout(() => {
          messageActionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100); 
      } else if (!keyPair && prevKeyPair.current) {
          setActiveWorkflowStep('keyGeneration');
      }
      prevKeyPair.current = keyPair;
    }
  }, [keyPair, cryptoMode]);

  // Scroll and manage active step for ECDH
  useEffect(() => {
    if (cryptoMode === 'ECDH') {
      if (keyPairA && keyPairB && (!prevKeyPairA.current || !prevKeyPairB.current)) {
        setActiveWorkflowStep('messageActions');
        setTimeout(() => {
          messageActionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else if ((!keyPairA || !keyPairB) && (prevKeyPairA.current || prevKeyPairB.current)) {
        setActiveWorkflowStep('keyGeneration');
      }
      prevKeyPairA.current = keyPairA;
      prevKeyPairB.current = keyPairB;
    }
  }, [keyPairA, keyPairB, cryptoMode]);

  useEffect(() => {
    const newProcessedDataAvailable = processedData && processedData !== prevProcessedData.current;
    if (newProcessedDataAvailable) { 
      setActiveWorkflowStep('results');
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100); 
    }
    prevProcessedData.current = processedData;
  }, [processedData]);
  
  useEffect(() => {
    const newDecryptedMessageAvailable = decryptedMessage && decryptedMessage !== prevDecryptedMessage.current;
    if (newDecryptedMessageAvailable) {
        setActiveWorkflowStep('results');
        if (!resultsSectionRef.current?.offsetParent || 
            (resultsSectionRef.current && resultsSectionRef.current.getBoundingClientRect().top < 0) || 
            (resultsSectionRef.current && resultsSectionRef.current.getBoundingClientRect().bottom > window.innerHeight) 
           ) {
             setTimeout(() => {
                resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100); 
        }
    }
    prevDecryptedMessage.current = decryptedMessage;
  }, [decryptedMessage]);

  const handleMessageChange = (value: string) => {
    setMessage(value);
    if ((cryptoMode === 'RSA' && keyPair) || (cryptoMode === 'ECDH' && keyPairA && keyPairB)) {
      setActiveWorkflowStep('messageActions');
    }
  };

  const handleGenerateKeys = async () => {
    if (cryptoMode === 'ECDH') {
      await generateKeyPair();
    } else {
      await generateKeyPair(); 
    }
  };

  const handlePrimaryAction = async () => {
    if (message) {
      await processPrimaryAction(message);
    }
  };

  const handleSecondaryAction = async () => {
    if (processedData) {
      await processSecondaryAction(processedData);
    }
  };

  const handleResetSection = () => {
    setMessage("");
  };
  
  const handleFullReset = () => {
    setMessage("");
    resetCrypto();
    setActiveWorkflowStep('keyGeneration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyKey = (keyMaterial: string | undefined, keyName: string) => {
    if (keyMaterial) {
      copyToClipboard(keyMaterial, t('keyGeneration.copied', { ns: 'demo', key: keyName }));
    }
  };

  const handleKeyEdit = (newKey: string, userType: 'A' | 'B' | 'RSA') => {
    if (!newKey) return;
    if (cryptoMode === 'RSA' && userType === 'RSA') {
      if(keyPair) {
        const updatedKeyPair: KeyPair = { ...keyPair, private_pem: newKey };
        storeSetKeyPair(updatedKeyPair);
      }
    } else if (cryptoMode === 'ECDH') {
      if (userType === 'A' && keyPairA) {
        const updatedKeyPairA: KeyPair = { ...keyPairA, private_pem: newKey };
        storeSetKeyPairA(updatedKeyPairA);
      } else if (userType === 'B' && keyPairB) {
        const updatedKeyPairB: KeyPair = { ...keyPairB, private_pem: newKey };
        storeSetKeyPairB(updatedKeyPairB);
      }
    }
    if (decryptedMessage) {
      storeSetDecryptedMessage(""); 
    }
  };

  const handleProcessedDataEdit = (newProcessedData: string) => {
    storeSetProcessedData(newProcessedData);
    if (decryptedMessage) {
       storeSetDecryptedMessage("");
    }
    const keysAvailable = cryptoMode === 'RSA' ? Boolean(keyPair) : Boolean(keyPairA && keyPairB);
    if (newProcessedData && keysAvailable) {
        setActiveWorkflowStep('results');
    } else if (!newProcessedData && activeWorkflowStep === 'results') {
        setActiveWorkflowStep('messageActions');
    }
  };
  
  const isHybridRsaEncryption = cryptoMode === 'RSA' && originalMessage.length > 190;
  
  const primaryActionText = cryptoMode === 'RSA' 
    ? t('encryption.encryptButtonRsa', { ns: 'demo' }) 
    : t('encryption.encryptButtonEcdh', { ns: 'demo' });
  const secondaryActionText = cryptoMode === 'RSA' 
    ? t('decryption.decryptButtonRsa', { ns: 'demo' }) 
    : t('decryption.decryptButtonEcdh', { ns: 'demo' });
  const generateButtonText = cryptoMode === 'RSA' 
    ? t('keyGeneration.generateButton', { ns: 'demo' }) 
    : t('keyGeneration.generateEcdhButton', { ns: 'demo' });

  const PrimaryIcon = cryptoMode === 'RSA' ? Lock : (cryptoMode === 'ECDH' ? GitMerge : Edit3);
  const SecondaryIcon = cryptoMode === 'RSA' ? Unlock : (cryptoMode === 'ECDH' ? KeyRound : CheckCircle);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const currentKeysAvailable = cryptoMode === 'RSA' ? Boolean(keyPair) : Boolean(keyPairA && keyPairB);

  const workflowSteps: WorkflowStepType[] = [
    {
      id: 'keyGeneration',
      label: t('keyGeneration.title', { ns: 'demo' }),
      isCompleted: currentKeysAvailable,
      isActive: activeWorkflowStep === 'keyGeneration',
      isReachable: true, 
    },
    {
      id: 'messageActions',
      label: cryptoMode === 'RSA' 
        ? t('encryption.title', { ns: 'demo' }) 
        : t('encryption.title', { ns: 'demo' }),
      isCompleted: currentKeysAvailable && (Boolean(processedData) || Boolean(decryptedMessage)),
      isActive: activeWorkflowStep === 'messageActions',
      isReachable: currentKeysAvailable, 
    },
    {
      id: 'results',
      label: cryptoMode === 'RSA'
        ? t('decryption.title', { ns: 'demo' })
        : t('decryption.title', { ns: 'demo' }),
      isCompleted: currentKeysAvailable && Boolean(processedData) && Boolean(decryptedMessage),
      isActive: activeWorkflowStep === 'results',
      isReachable: currentKeysAvailable && (Boolean(message) || Boolean(processedData)),
    },
  ];

  const handleStepClick = (stepId: string) => {
    const step = workflowSteps.find(s => s.id === stepId);
    if (step && step.isReachable) {
        setActiveWorkflowStep(stepId);
        if (stepId === 'keyGeneration') {
        keyGenerationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (stepId === 'messageActions') {
        messageActionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (stepId === 'results') {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600">
              {t('title', { ns: 'demo' })}
            </span>
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl md:max-w-3xl mx-auto">
            {t('description', { ns: 'demo' })}
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto mb-10 md:mb-12">
          <CryptoModeSelector />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full md:w-72 lg:w-80 md:sticky md:top-24 self-start">
             <WorkflowStepsIndicator steps={workflowSteps} onStepClick={handleStepClick} />
          </div>

          <div className="flex-grow space-y-8 md:space-y-10 max-w-3xl md:max-w-none mx-auto md:mx-0 w-full">
            <motion.section ref={keyGenerationSectionRef} variants={sectionVariants} initial="hidden" animate="visible">
              <Card className={`shadow-xl bg-gray-900/70 border backdrop-blur-sm transition-all duration-300 ease-out
                ${activeWorkflowStep === 'keyGeneration' ? 'border-sky-500 shadow-sky-500/20' : 'border-gray-700/50'}
              `}>
                <div className="flex items-center mb-4">
                  <KeyRound className="w-6 h-6 text-sky-400 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-100">
                    {t('keyGeneration.title', { ns: 'demo' })}
                  </h2>
                </div>
                <p className="text-gray-400 mb-6 text-sm">
                  {t('keyGeneration.description', { ns: 'demo' })}
                </p>
                
                {((cryptoMode === 'RSA' && !keyPair) || (cryptoMode === 'ECDH' && (!keyPairA || !keyPairB))) && (
                  <Button
                    onClick={handleGenerateKeys}
                    isLoading={isGenerating}
                    loadingText={t('loading', { ns: 'common' })}
                    leftIcon={cryptoMode === 'ECDH' ? <Users className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />}
                    variant="primary"
                    className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg transform transition-transform duration-150 hover:scale-105"
                  >
                    {generateButtonText}
                  </Button>
                )}

                {cryptoMode === 'RSA' && keyPair && (
                  <div className="space-y-6 mt-6">
                    <AnimatePresence>
                      <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="hidden">
                         <KeyPairDisplay
                          keyPair={keyPair}
                          onCopyPublicKey={() => handleCopyKey(keyPair.public_pem, 'RSA Public Key')}
                          onCopyPrivateKey={() => handleCopyKey(keyPair.private_pem, 'RSA Private Key')}
                          onPrivateKeyEdit={(newKey) => handleKeyEdit(newKey, 'RSA')}
                          cryptoMode={cryptoMode}
                          keyPairTitle={t('keyGeneration.title', {ns: 'demo'})}
                        />
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-xs text-green-400 text-center font-medium flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2"/> {t('systemLogs.keyPairSuccess', {ns: 'demo'})}
                    </p>
                  </div>
                )}
                {cryptoMode === 'ECDH' && keyPairA && keyPairB && (
                  <div className="space-y-8 mt-6">
                     <AnimatePresence>
                      <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="hidden">
                         <KeyPairDisplay
                          keyPair={keyPairA}
                          onCopyPublicKey={() => handleCopyKey(keyPairA.public_pem, 'User A Public Key')}
                          onCopyPrivateKey={() => handleCopyKey(keyPairA.private_pem, 'User A Private Key')}
                          onPrivateKeyEdit={(newKey) => handleKeyEdit(newKey, 'A')}
                          cryptoMode={cryptoMode}
                          keyPairTitle={t('keyGeneration.ecdhKeyPairTitleUserA', {ns: 'demo'})}
                        />
                      </motion.div>
                    </AnimatePresence>
                     <AnimatePresence>
                      <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="hidden">
                         <KeyPairDisplay
                          keyPair={keyPairB}
                          onCopyPublicKey={() => handleCopyKey(keyPairB.public_pem, 'User B Public Key')}
                          onCopyPrivateKey={() => handleCopyKey(keyPairB.private_pem, 'User B Private Key')}
                          onPrivateKeyEdit={(newKey) => handleKeyEdit(newKey, 'B')}
                          cryptoMode={cryptoMode}
                          keyPairTitle={t('keyGeneration.ecdhKeyPairTitleUserB', {ns: 'demo'})}
                        />
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-xs text-green-400 text-center font-medium flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2"/> 
                      {t('systemLogs.ecdhKeyPairSuccess', {ns: 'demo', user: 'A & B'})} 
                    </p>
                  </div>
                )}
              </Card>
            </motion.section>

            {currentKeysAvailable && (
              <motion.section ref={messageActionSectionRef} variants={sectionVariants} initial="hidden" animate="visible" custom={1} >
                <Card className={`shadow-xl bg-gray-900/70 border backdrop-blur-sm transition-all duration-300 ease-out
                  ${activeWorkflowStep === 'messageActions' ? 'border-sky-500 shadow-sky-500/20' : 'border-gray-700/50'}
                `}>
                  <div className="flex items-center mb-4">
                    <PrimaryIcon className="w-6 h-6 text-sky-400 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-100">
                       {cryptoMode === 'RSA' 
                         ? t('encryption.title', { ns: 'demo' }) 
                         : t('encryption.title', { ns: 'demo' })}                  
                    </h2>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">
                     {t('encryption.description', { ns: 'demo' })}
                  </p>
                  
                  <div className="mb-4 relative">
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      placeholder={t('encryption.messagePlaceholder', { ns: 'demo' })}
                      className="w-full bg-gray-800 border-gray-700 focus:border-sky-500 focus:ring-sky-500 text-gray-200 placeholder-gray-500 min-h-[100px] text-sm"
                      rows={4}
                    />
                    <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                      {message.length} chars
                    </div>
                  </div>
                  {cryptoMode === 'RSA' && message.length > 190 && (
                    <p className="mb-4 text-xs text-amber-400 flex items-center">
                      <Info className="w-3 h-3 mr-1.5 flex-shrink-0" />
                      {t('encryption.usingHybridRsa', { ns: 'demo' })}
                    </p>
                  )}
                  {cryptoMode === 'ECDH' && message.length > 0 && (
                     <p className="mb-4 text-xs text-teal-400 flex items-center">
                      <Info className="w-3 h-3 mr-1.5 flex-shrink-0" />
                      {t('encryption.usingEcdhAes', { ns: 'demo' })}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 items-center">
                    <Button
                      onClick={handlePrimaryAction}
                      isLoading={isProcessingPrimary}
                      loadingText={t('loading', { ns: 'common' })}
                      leftIcon={<PrimaryIcon className="w-5 h-5" />}
                      disabled={!message || isProcessingPrimary || isProcessingSecondary}
                      variant={message ? "secondary" : "outline"}
                      className={` ${message ? (cryptoMode === 'RSA' ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white' : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white') : ''} shadow-md transform transition-transform duration-150 hover:scale-105`}
                    >
                      {primaryActionText}
                    </Button>
                    <Button
                      onClick={handleSecondaryAction}
                      isLoading={isProcessingSecondary}
                      loadingText={t('loading', { ns: 'common' })}
                      leftIcon={<SecondaryIcon className="w-5 h-5" />}
                      disabled={!processedData || isProcessingPrimary || isProcessingSecondary}
                      variant={processedData ? "secondary" : "outline"}
                       className={` ${processedData ? (cryptoMode === 'RSA' ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white' : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white') : ''} shadow-md transform transition-transform duration-150 hover:scale-105`}
                    >
                      {secondaryActionText}
                    </Button>
                    <Button
                      onClick={handleResetSection}
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                      variant="ghost"
                      className="text-gray-400 hover:text-sky-400 ml-auto"
                      disabled={isProcessingPrimary || isProcessingSecondary}
                    >
                      {t('common.resetMessage', { ns: 'common', defaultValue: 'Reset Message' })}
                    </Button>
                  </div>
                </Card>
              </motion.section>
            )}

            {(processedData || decryptedMessage) && (
              <motion.section ref={resultsSectionRef} variants={sectionVariants} initial="hidden" animate="visible" custom={2}>
                <Card className={`shadow-xl bg-gray-900/70 border backdrop-blur-sm transition-all duration-300 ease-out
                    ${activeWorkflowStep === 'results' ? 'border-sky-500 shadow-sky-500/20' : 'border-gray-700/50'}
                `}>
                   <EncryptionResults
                      processedData={processedData}
                      decryptedMessage={decryptedMessage}
                      originalMessage={originalMessage} 
                      onCopyProcessedData={() => copyToClipboard(processedData, t('copied', { ns: 'common' }))}
                      onProcessedDataEdit={handleProcessedDataEdit}
                      isHybridRsaEncryption={isHybridRsaEncryption}
                      allowCustomProcessedData={currentKeysAvailable}
                      cryptoMode={cryptoMode}
                    />
                </Card>
              </motion.section>
            )}
            
            <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={3}>
              <div className="mt-10 text-center">
                  <Button
                      onClick={handleFullReset}
                      leftIcon={<RotateCcw className="w-5 h-5" />}
                      variant="outline"
                      className="border-red-500/70 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500 transition-colors shadow-md hover:shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
                      disabled={isGenerating || isProcessingPrimary || isProcessingSecondary}
                    >
                      {t('common.resetAll', { ns: 'common', defaultValue: "Reset Demo" })}
                  </Button>
              </div>
            </motion.section>

            <motion.section variants={sectionVariants} initial="hidden" animate="visible" custom={4} className="mt-12 md:mt-16">
              <InfoPanel cryptoMode={cryptoMode} />
            </motion.section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const Route = createFileRoute('/demo/')({
  component: Demo
})

export default Demo;
