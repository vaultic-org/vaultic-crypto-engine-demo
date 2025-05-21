import { CryptoMode } from '@/core/store/cryptoStore';

export interface MessageInputProps {
    message: string;
    onMessageChange: (message: string) => void;
    onGenerateKeyPair: () => void;
    onProcessPrimary: () => void;
    onProcessSecondary: () => void;
    onReset: () => void;
    isGenerating: boolean;
    isProcessingPrimary: boolean;
    isProcessingSecondary: boolean;
    hasKeyPair: boolean;
    hasProcessedData: boolean;
    cryptoMode: CryptoMode;
  }