import { KeyPair } from '@/core/types/crypto.types';

export interface KeyPairDisplayProps {
    keyPair: KeyPair | null;
    onCopyPublicKey: () => void;
    onCopyPrivateKey: () => void;
  }