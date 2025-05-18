# Decryption Guide

This guide provides detailed information about decrypting data with Vaultic Crypto Engine.

## Basic Decryption

To decrypt data that was encrypted using RSA, you need the private key. The basic decryption process looks like this:

```javascript
import { rsaDecryptBase64 } from 'vaultic-crypto-engine';

async function decryptMessage(privateKey, encryptedData) {
  const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
  return decrypted;
}
```

The `rsaDecryptBase64` function automatically:
- Determines whether the data was encrypted using direct RSA or hybrid RSA+AES
- Handles the appropriate decryption method
- Returns the original data as a string

## Decrypting Different Data Types

### Strings

The decryption function returns the original string:

```javascript
const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
console.log(decrypted); // Original string message
```

### JSON Objects

For JSON data that was stringified before encryption, parse after decryption:

```javascript
const decryptedJsonString = await rsaDecryptBase64(privateKey, encryptedData);
const originalObject = JSON.parse(decryptedJsonString);

console.log(originalObject.username); // "user123"
```

### Binary Data

For binary data that was converted to Base64 before encryption:

```javascript
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Example: Decrypting a file
async function decryptFile(privateKey, encryptedFileData) {
  const decryptedBase64 = await rsaDecryptBase64(privateKey, encryptedFileData);
  const fileBuffer = base64ToArrayBuffer(decryptedBase64);
  return fileBuffer;
}
```

## Advanced Decryption Options

Vaultic Crypto Engine provides advanced decryption options for specific use cases:

```javascript
import { rsaDecryptBase64WithOptions } from 'vaultic-crypto-engine';

async function decryptWithOptions(privateKey, encryptedData) {
  const options = {
    padding: 'OAEP', // 'PKCS1' (default) or 'OAEP'
    hashAlgorithm: 'SHA-256', // For OAEP padding
    outputEncoding: 'utf8' // 'utf8' (default) or 'base64'
  };
  
  const decrypted = await rsaDecryptBase64WithOptions(privateKey, encryptedData, options);
  return decrypted;
}
```

### Padding Options

Ensure you use the same padding method that was used for encryption:

- **PKCS1** (default): Traditional RSA padding
- **OAEP**: More secure padding scheme

### Output Encoding

By default, decryption returns UTF-8 strings. For binary data, you may want Base64:

```javascript
// Get the decrypted data as Base64
const decryptedBase64 = await rsaDecryptBase64WithOptions(
  privateKey, 
  encryptedData, 
  { outputEncoding: 'base64' }
);
```

## Error Handling

Decryption errors can occur for several reasons:

1. **Wrong Private Key**: Using a private key that doesn't correspond to the public key used for encryption
2. **Data Corruption**: The encrypted data has been altered or corrupted
3. **Format Issues**: The encrypted data is not in the expected format

Always implement proper error handling:

```javascript
async function safeDecrypt(privateKey, encryptedData) {
  try {
    const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
    return { success: true, data: decrypted };
  } catch (error) {
    console.error('Decryption error:', error.message);
    return { success: false, error: error.message };
  }
}
```

## Handling Hybrid Encryption Results

The `rsaDecryptBase64` function automatically detects and handles both direct RSA and hybrid RSA+AES encrypted data. For hybrid encryption, it:

1. Parses the Base64-encoded JSON payload
2. Decrypts the AES key using the private RSA key
3. Uses the decrypted AES key to decrypt the actual data
4. Returns the original data

This happens transparently, so you don't need to handle this difference in your code.

## Performance Considerations

- RSA decryption is computationally intensive
- For applications that need to decrypt many messages, consider optimizing key usage
- Hybrid decryption (RSA+AES) is generally faster for large data
- Consider using a worker thread for decryption operations in browser environments

## Next Steps

Learn about best practices for managing keys in the [Key Management](key-management) guide or explore the [API Reference](../api-reference/functions/decrypt) for more details. 