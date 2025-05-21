import { KeyPair } from '@/core/types/crypto.types';
import { CryptoMode } from '@/core/store/cryptoStore';

export interface KeyPairDisplayProps {
    keyPair: KeyPair | null;
    onCopyPublicKey: () => void;
    onCopyPrivateKey: () => void;
    onPrivateKeyEdit?: (newPrivateKey: string) => void;
    cryptoMode: CryptoMode;
    keyPairTitle?: string;
  }