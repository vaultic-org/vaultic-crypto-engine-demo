import { create } from 'zustand';
import { KeyPair } from '@/core/types/crypto.types';

interface CryptoState {
  keyPair: KeyPair | null;
  encryptedMessage: string;
  decryptedMessage: string;
  setKeyPair: (keyPair: KeyPair | null) => void;
  setEncryptedMessage: (message: string) => void;
  setDecryptedMessage: (message: string) => void;
  resetState: () => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  keyPair: null,
  encryptedMessage: '',
  decryptedMessage: '',
  
  setKeyPair: (keyPair) => set({ keyPair }),
  setEncryptedMessage: (encryptedMessage) => set({ encryptedMessage }),
  setDecryptedMessage: (decryptedMessage) => set({ decryptedMessage }),
  
  resetState: () => set({
    keyPair: null,
    encryptedMessage: '',
    decryptedMessage: ''
  })
}));