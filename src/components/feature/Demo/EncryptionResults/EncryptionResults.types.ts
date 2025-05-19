export interface EncryptionResultsProps {
    encryptedMessage: string;
    decryptedMessage: string;
    originalMessage: string;
    onCopyEncrypted: () => void;
    onEncryptedMessageEdit?: (newEncryptedMessage: string) => void;
    isHybridEncryption?: boolean;
    allowCustomEncrypted?: boolean;
}