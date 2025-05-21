import { create } from 'zustand';
import { KeyPair } from '@/core/types/crypto.types';

export type CryptoMode = 'RSA' | 'ECDH';

interface CryptoState {
  cryptoMode: CryptoMode;
  keyPair: KeyPair | null;
  keyPairA: KeyPair | null;
  keyPairB: KeyPair | null;
  originalMessage: string; // To store the message input by the user
  processedData: string;   // For RSA: encryptedMessage; For ECDH: AES-GCM encrypted output
  decryptedMessage: string;  // For RSA: decryptedMessage; For ECDH: AES-GCM decrypted output
  // Consider adding a more specific field for ECC verification boolean result if needed
  // verificationStatus: boolean | null; 

  setCryptoMode: (mode: CryptoMode) => void;
  setKeyPair: (keyPair: KeyPair | null) => void;
  setKeyPairA: (keyPair: KeyPair | null) => void;
  setKeyPairB: (keyPair: KeyPair | null) => void;
  setOriginalMessage: (message: string) => void;
  setProcessedData: (data: string) => void;
  setDecryptedMessage: (message: string) => void;
  // setVerificationStatus: (status: boolean | null) => void;
  resetState: () => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  cryptoMode: 'RSA',
  keyPair: null,
  keyPairA: null,
  keyPairB: null,
  originalMessage: '',
  processedData: '',
  decryptedMessage: '',
  // verificationStatus: null,

  setCryptoMode: (cryptoMode) => set({ 
    cryptoMode, 
    keyPair: null,
    keyPairA: null,
    keyPairB: null,
    originalMessage: '', 
    processedData: '', 
    decryptedMessage: '' 
  }),
  setKeyPair: (keyPair) => set({ keyPair }),
  setKeyPairA: (keyPairA) => set({ keyPairA }),
  setKeyPairB: (keyPairB) => set({ keyPairB }),
  setOriginalMessage: (originalMessage) => set({ originalMessage }),
  setProcessedData: (processedData) => set({ processedData }),
  setDecryptedMessage: (decryptedMessage) => set({ decryptedMessage }),
  // setVerificationStatus: (verificationStatus) => set({ verificationStatus }),

  resetState: () => set({
    keyPair: null,
    keyPairA: null,
    keyPairB: null,
    originalMessage: '',
    processedData: '',
    decryptedMessage: '',
    // verificationStatus: null,
    // cryptoMode: 'RSA', // Optionally reset mode to default or keep current mode
  })
}));