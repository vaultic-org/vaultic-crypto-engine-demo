import { CryptoMode } from '@/core/store/cryptoStore';

export interface EncryptionResultsProps {
    processedData: string;
    decryptedMessage: string;
    originalMessage: string;
    onCopyProcessedData: () => void;
    onProcessedDataEdit?: (newProcessedData: string) => void;
    isHybridRsaEncryption?: boolean;
    allowCustomProcessedData?: boolean;
    cryptoMode: CryptoMode;
}