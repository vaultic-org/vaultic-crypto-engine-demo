# Vaultic Crypto Engine Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org)
[![Made with TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org)
[![Made with Vite](https://img.shields.io/badge/Vite-6.3-blue?logo=vite)](https://vitejs.dev)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f1ef9f20-6acb-427c-a731-e044bf41579d/deploy-status)](https://app.netlify.com/projects/crypto-engine/deploys)

Interactive demo application for the vaultic crypto-engine, showcasing browser-based cryptographic operations using WebAssembly.

🔗 **Live Demo**: [crypto.vaultic.app](https://crypto.vaultic.app)

## 🚀 What it does

- Generates RSA 2048-bit key pairs (client-side, in-browser)
- Encrypts and decrypts messages locally via WebAssembly
- Auto-switches between direct RSA and hybrid RSA+AES encryption based on data size
- Supports key pair and message protection with password-based encryption
- Logs all steps and failures for educational/debugging purposes
- Provides a user-friendly interface to test cryptographic operations

## 💻 System Requirements

- Node.js 18.x or higher
- pnpm 8.x or higher

## 📦 Installation

```bash
git clone https://github.com/vaultic-org/vaultic-crypto-engine-demo
cd vaultic-crypto-engine-demo
pnpm install
pnpm run dev
```

## 🔧 Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- WebAssembly

## 📚 Usage Examples

### Generate RSA Key Pair

```typescript
import { generate_rsa_keypair_pem } from '@vaultic/crypto-engine';

const { public_pem, private_pem } = await generate_rsa_keypair_pem();
```

### Encrypt a Message (Hybrid Encryption Automatically Applied)

```typescript
import { rsa_encrypt_base64 } from '@vaultic/crypto-engine';

// Works with any message size - hybrid encryption is automatic
const ciphertext = await rsa_encrypt_base64(publicKeyPem, message);
```

### Decrypt a Message

```typescript
import { rsa_decrypt_base64 } from '@vaultic/crypto-engine';

// Automatically detects and handles both direct RSA and hybrid encryption
const plaintext = await rsa_decrypt_base64(privateKeyPem, encryptedMessage);
```

### Protect a Key Pair with Password

```typescript
import { protect_keypair, unprotect_keypair } from '@vaultic/crypto-engine';

// Encrypt keys with a password
const passphrase = "secure-password";
const protectedKeys = await protect_keypair(privatePem, publicPem, passphrase);

// Decrypt later with the same password
const recoveredKeys = await unprotect_keypair(protectedKeys, passphrase);
```

### Protect a Message with Password

```typescript
import { protect_message, unprotect_message } from '@vaultic/crypto-engine';

// Encrypt message with password
const secretMessage = "Confidential information";
const protectedMessage = await protect_message(secretMessage, passphrase);

// Decrypt with the same password
const decryptedMessage = await unprotect_message(
  protectedMessage.ciphertext,
  passphrase, 
  protectedMessage.salt, 
  protectedMessage.nonce
);
```

## 🔍 Project Structure

```
/src
  /components - UI components
  /core - Core functionality
    /types - TypeScript interfaces
    /store - State management
  /hooks - Custom React hooks
  /pages - Application pages
  /routes - Router configuration
```

## 🐛 Troubleshooting

- If you encounter WebAssembly loading issues, ensure your browser supports WebAssembly
- For encryption/decryption failures, check the console for detailed logs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(feature): Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

MIT — © Vaultic Org
