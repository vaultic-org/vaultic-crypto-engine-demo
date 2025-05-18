export interface MessageInputProps {
    message: string;
    onMessageChange: (message: string) => void;
    onGenerateKeyPair: () => void;
    onEncrypt: () => void;
    onDecrypt: () => void;
    onReset: () => void;
    isGenerating: boolean;
    isEncrypting: boolean;
    isDecrypting: boolean;
    hasKeyPair: boolean;
    hasEncryptedMessage: boolean;
  }