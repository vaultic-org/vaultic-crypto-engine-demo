# rsaEncryptBase64

Encrypts data using an RSA public key and returns the result as a Base64 string.

## Syntax

```javascript
import { rsaEncryptBase64 } from 'vaultic-crypto-engine';

const encrypted = await rsaEncryptBase64(publicKey, data);
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `publicKey` | string | The RSA public key in PEM format. |
| `data` | string | The data to encrypt. |

## Return Value

Returns a Promise that resolves to a string containing the encrypted data in Base64 format.

- For small data (encrypted directly with RSA), this is a Base64-encoded string of the encrypted bytes.
- For large data (encrypted with hybrid RSA+AES), this is a Base64-encoded JSON string containing the encrypted data, encrypted AES key, and initialization vector.

## Examples

### Basic Usage

```javascript
import { rsaEncryptBase64 } from 'vaultic-crypto-engine';

async function encryptMessage(publicKey, message) {
  try {
    const encrypted = await rsaEncryptBase64(publicKey, message);
    console.log('Encrypted data:', encrypted);
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
  }
}

// Example usage
const message = "This is a secret message";
encryptMessage(publicKeyPem, message);
```

### Encrypting JSON Data

```javascript
import { rsaEncryptBase64 } from 'vaultic-crypto-engine';

async function encryptJsonData(publicKey, data) {
  try {
    // Convert data object to JSON string
    const jsonString = JSON.stringify(data);
    
    // Encrypt the JSON string
    const encrypted = await rsaEncryptBase64(publicKey, jsonString);
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
  }
}

// Example usage
const userData = {
  id: "user123",
  password: "securePassword",
  apiKey: "sk_test_12345"
};

encryptJsonData(publicKeyPem, userData);
```

## Advanced Usage

For more control over the encryption process, use `rsaEncryptBase64WithOptions`:

```javascript
import { rsaEncryptBase64WithOptions } from 'vaultic-crypto-engine';

async function encryptWithCustomOptions(publicKey, data) {
  const options = {
    padding: 'OAEP',
    hashAlgorithm: 'SHA-256',
    forceMethod: 'hybrid',
    aesKeySize: 256
  };
  
  const encrypted = await rsaEncryptBase64WithOptions(publicKey, data, options);
  return encrypted;
}
```

Available options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `padding` | string | 'PKCS1' | The padding scheme to use. Can be 'PKCS1' or 'OAEP'. |
| `hashAlgorithm` | string | 'SHA-1' | The hash algorithm to use with OAEP padding. Can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'. |
| `forceMethod` | string | undefined | Force a specific encryption method: 'direct' (RSA only) or 'hybrid' (RSA+AES). If undefined, the method is automatically selected based on data size. |
| `aesKeySize` | number | 256 | For hybrid encryption, the size of the AES key in bits. Can be 128, 192, or 256. |

## Remarks

- The maximum size of data that can be encrypted directly with RSA depends on the key size and padding scheme.
- For data exceeding the maximum size, hybrid encryption (RSA+AES) is automatically used.
- The function is secure for any data size due to automatic method selection.

## Data Size Limits for Direct RSA Encryption

| Key Size | PKCS1 Padding | OAEP Padding (SHA-1) | OAEP Padding (SHA-256) |
|----------|---------------|----------------------|------------------------|
| 1024-bit | 117 bytes | 86 bytes | 62 bytes |
| 2048-bit | 245 bytes | 214 bytes | 190 bytes |
| 3072-bit | 373 bytes | 342 bytes | 318 bytes |
| 4096-bit | 501 bytes | 470 bytes | 446 bytes |

Data exceeding these limits will automatically use hybrid encryption.

## Browser Compatibility

This function works in all modern browsers that support WebAssembly and the Web Crypto API.

## See Also

- [rsaDecryptBase64](decrypt) - Decrypt data using a private key
- [generateRsaKeypairPem](generate-keypair) - Generate an RSA key pair
- [Encryption Guide](../../guides/encryption) - More detailed information about encryption 