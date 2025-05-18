export interface EncryptionResultsProps {
    encryptedMessage: string;
    decryptedMessage: string;
    originalMessage: string;
    onCopyEncrypted: () => void;
    isHybridEncryption?: boolean;
}