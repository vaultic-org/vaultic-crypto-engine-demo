import { KeyPair } from '@/core/types/crypto.types';

export interface KeyPairDisplayProps {
    keyPair: KeyPair | null;
    onCopyPublicKey: () => void;
    onCopyPrivateKey: () => void;
    onPrivateKeyEdit?: (newPrivateKey: string) => void;
  }