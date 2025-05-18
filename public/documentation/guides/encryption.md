# Encryption Guide

This guide provides detailed information about encrypting data with Vaultic Crypto Engine.

## Basic Encryption

To encrypt data using RSA, you need a public key. The most basic form of encryption looks like this:

```javascript
import { rsaEncryptBase64 } from 'vaultic-crypto-engine';

async function encryptMessage(publicKey, message) {
  const encrypted = await rsaEncryptBase64(publicKey, message);
  return encrypted;
}
```

The `rsaEncryptBase64` function automatically handles:
- Detecting the data size
- Choosing the appropriate encryption method (direct RSA or hybrid RSA+AES)
- Encoding the result as a Base64 string

## Encrypting Different Data Types

### Strings

Strings can be encrypted directly:

```javascript
const message = "This is a secret message";
const encrypted = await rsaEncryptBase64(publicKey, message);
```

### JSON Objects

For JSON objects, stringify them first:

```javascript
const data = {
  username: "user123",
  password: "securePassword",
  apiKey: "sk_12345"
};

const jsonString = JSON.stringify(data);
const encrypted = await rsaEncryptBase64(publicKey, jsonString);
```

### Binary Data

For binary data (like files), convert to Base64 first:

```javascript
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Example: Encrypting a file
async function encryptFile(publicKey, fileBuffer) {
  const base64Data = arrayBufferToBase64(fileBuffer);
  const encrypted = await rsaEncryptBase64(publicKey, base64Data);
  return encrypted;
}
```

## Advanced Encryption Options

Vaultic Crypto Engine provides advanced encryption options for specific use cases:

```javascript
import { rsaEncryptBase64WithOptions } from 'vaultic-crypto-engine';

async function encryptWithOptions(publicKey, data) {
  const options = {
    padding: 'OAEP', // 'PKCS1' (default) or 'OAEP'
    hashAlgorithm: 'SHA-256', // For OAEP padding
    forceMethod: 'hybrid', // 'direct', 'hybrid', or undefined (auto)
    aesKeySize: 256 // 128, 192, or 256 (default)
  };
  
  const encrypted = await rsaEncryptBase64WithOptions(publicKey, data, options);
  return encrypted;
}
```

### Padding Options

- **PKCS1** (default): Traditional RSA padding, widely compatible
- **OAEP**: More secure padding scheme, recommended for new applications

### Forcing Encryption Method

In most cases, the automatic method selection works best, but you can force a specific method:

```javascript
// Force direct RSA encryption (small data only)
const encryptedDirect = await rsaEncryptBase64WithOptions(
  publicKey, 
  smallData, 
  { forceMethod: 'direct' }
);

// Force hybrid RSA+AES encryption
const encryptedHybrid = await rsaEncryptBase64WithOptions(
  publicKey, 
  data, 
  { forceMethod: 'hybrid' }
);
```

## Encryption Result Format

When using hybrid encryption, the result is a Base64-encoded JSON string containing:

```json
{
  "method": "hybrid",
  "encryptedKey": "base64-encoded-encrypted-aes-key",
  "iv": "base64-encoded-initialization-vector",
  "encryptedData": "base64-encoded-encrypted-data",
  "aesKeySize": 256
}
```

For direct RSA encryption, the result is simply the Base64-encoded encrypted data.

Vaultic Crypto Engine automatically handles this format during decryption, so you don't need to parse it manually.

## Performance Considerations

- RSA encryption is relatively slow, especially for large keys
- For repeated encryption operations, consider reusing the same public key
- If you need to encrypt large amounts of data, the hybrid method is automatically used for efficiency
- For extremely large data or high-performance requirements, consider using a streaming approach

## Next Steps

Learn about decryption in the [Decryption Guide](decryption) or explore [Key Management](key-management) best practices. 