import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { useVaulticCrypto } from "@/hooks/useVaulticCrypto";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { 
  MessageInput, 
  KeyPairDisplay, 
  EncryptionResults, 
  ProgressSteps,
  InfoPanel 
} from "@/components/feature/Demo";
import useTranslation from "@/hooks/useTranslation";
import { KeyPair } from "@/core/types/crypto.types";

const Demo = () => {
  const { t } = useTranslation(['demo', 'common']);
  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isMessageVerified, setIsMessageVerified] = useState(false);

  const {
    keyPair,
    encryptedMessage,
    decryptedMessage,
    isGenerating,
    isEncrypting,
    isDecrypting,
    generateKeyPair,
    encryptMessage,
    decryptMessage,
    resetCrypto,
    setKeyPair,
    setEncryptedMessage
  } = useVaulticCrypto();

  const { copyToClipboard } = useCopyToClipboard();

  // Update current step based on the state of the demo
  useEffect(() => {
    if (decryptedMessage) {
      setCurrentStep(3);
      // Check if message was verified successfully
      if (decryptedMessage === message) {
        setIsMessageVerified(true);
      } else {
        setIsMessageVerified(false);
      }
    } else if (encryptedMessage) {
      setCurrentStep(2);
    } else if (keyPair) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [keyPair, encryptedMessage, decryptedMessage, message]);

  // Handle message input change
  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  // Handle key pair generation
  const handleGenerateKeys = async () => {
    await generateKeyPair();
  };

  // Handle message encryption
  const handleEncrypt = async () => {
    if (message) {
      await encryptMessage(message);
    }
  };

  // Handle message decryption
  const handleDecrypt = async () => {
    if (encryptedMessage) {
      await decryptMessage(encryptedMessage);
    }
  };

  // Handle demo reset
  const handleReset = () => {
    setMessage("");
    setIsMessageVerified(false);
    resetCrypto();
  };

  // Handle copying public key
  const handleCopyPublicKey = () => {
    if (keyPair?.public_pem) {
      copyToClipboard(keyPair.public_pem, t('keyGeneration.copied', { ns: 'demo' }));
    }
  };

  // Handle copying private key
  const handleCopyPrivateKey = () => {
    if (keyPair?.private_pem) {
      copyToClipboard(keyPair.private_pem, t('keyGeneration.copied', { ns: 'demo' }));
    }
  };

  // Handle copying encrypted message
  const handleCopyEncrypted = () => {
    if (encryptedMessage) {
      copyToClipboard(encryptedMessage, t('copied', { ns: 'common' }));
    }
  };

  // Handle custom private key input
  const handlePrivateKeyEdit = (newPrivateKey: string) => {
    if (keyPair && newPrivateKey) {
      // Create new key pair with custom private key
      const updatedKeyPair: KeyPair = {
        ...keyPair,
        private_pem: newPrivateKey
      };
      setKeyPair(updatedKeyPair);
    }
  };

  // Handle custom encrypted message input
  const handleEncryptedMessageEdit = (newEncryptedMessage: string) => {
    if (newEncryptedMessage) {
      setEncryptedMessage(newEncryptedMessage);
    }
  };

  // Determine if we're using hybrid encryption (message > 245 bytes)
  const isHybridEncryption = message.length > 245;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                {t('title', { ns: 'demo' })}
              </span>
            </h1>
            <p className="text-center text-gray-300 mb-10">
              {t('description', { ns: 'demo' })}
            </p>
          </motion.div>

          {/* Progress Steps */}
          <ProgressSteps
            currentStep={currentStep}
            keyPairGenerated={Boolean(keyPair)}
            messageEncrypted={Boolean(encryptedMessage)}
            messageDecrypted={Boolean(decryptedMessage)}
            messageVerified={isMessageVerified}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Message Input */}
              <MessageInput
                message={message}
                onMessageChange={handleMessageChange}
                onGenerateKeyPair={handleGenerateKeys}
                onEncrypt={handleEncrypt}
                onDecrypt={handleDecrypt}
                onReset={handleReset}
                isGenerating={isGenerating}
                isEncrypting={isEncrypting}
                isDecrypting={isDecrypting}
                hasKeyPair={Boolean(keyPair)}
                hasEncryptedMessage={Boolean(encryptedMessage)}
              />

              {/* Key Pair Display */}
              <KeyPairDisplay
                keyPair={keyPair}
                onCopyPublicKey={handleCopyPublicKey}
                onCopyPrivateKey={handleCopyPrivateKey}
                onPrivateKeyEdit={handlePrivateKeyEdit}
              />

              {/* Encryption Results */}
              <EncryptionResults
                encryptedMessage={encryptedMessage}
                decryptedMessage={decryptedMessage}
                originalMessage={message}
                onCopyEncrypted={handleCopyEncrypted}
                onEncryptedMessageEdit={handleEncryptedMessageEdit}
                isHybridEncryption={isHybridEncryption}
                allowCustomEncrypted={Boolean(keyPair)}
              />
            </div>

            <div className="space-y-6">
              {/* Info Panel */}
              <InfoPanel />
            </div>
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
