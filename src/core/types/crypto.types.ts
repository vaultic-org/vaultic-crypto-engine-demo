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

export interface ProtectedKeyPair {
  encrypted_private: string;
  encrypted_public: string;
  salt: string;
  nonce: string;
}

export interface ProtectedMessage {
  ciphertext: string;
  salt: string;
  nonce: string;
}

// For @vaultic/crypto-engine module declaration
declare module '@vaultic/crypto-engine' {
  export function generate_rsa_keypair_pem(): Promise<KeyPair>;
  export function rsa_encrypt_base64(publicKeyPem: string, message: string): Promise<string>;
  export function rsa_decrypt_base64(privateKeyPem: string, encryptedMessage: string): Promise<string>;
  export function protect_keypair(private_pem: string, public_pem: string, passphrase: string): Promise<ProtectedKeyPair>;
  export function unprotect_keypair(encrypted_result: ProtectedKeyPair, passphrase: string): Promise<KeyPair>;
  export function protect_message(plaintext: string, passphrase: string): Promise<ProtectedMessage>;
  export function unprotect_message(encrypted_data: string, passphrase: string, salt: string, nonce: string): Promise<string>;
}