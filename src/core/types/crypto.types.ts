export interface KeyPair {
  public_pem: string;
  private_pem: string;
}

export interface EncryptionResult {
  ciphertext: string;
  isHybrid: boolean;
}

export interface DecryptionResult {
  plaintext: string;
  verified: boolean;
}

// For vaultic-crypto-engine module declaration
declare module 'vaultic-crypto-engine' {
  export function generate_rsa_keypair_pem(): Promise<KeyPair>;
  export function rsa_encrypt_base64(publicKeyPem: string, message: string): Promise<string>;
  export function rsa_decrypt_base64(privateKeyPem: string, encryptedMessage: string): Promise<string>;
}