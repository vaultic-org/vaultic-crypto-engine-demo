import { CryptoMode } from '@/core/store/cryptoStore';

export interface InfoStep {
    title: string;
    description: string;
    icon: React.ElementType;
  }

export interface InfoPanelProps {
  cryptoMode: CryptoMode;
}