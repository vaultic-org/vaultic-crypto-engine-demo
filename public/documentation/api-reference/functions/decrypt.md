# rsaDecryptBase64

Decrypts data that was encrypted using RSA encryption and returns the original data.

## Syntax

```javascript
import { rsaDecryptBase64 } from 'vaultic-crypto-engine';

const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `privateKey` | string | The RSA private key in PEM format. |
| `encryptedData` | string | The encrypted data as a Base64 string. |

## Return Value

Returns a Promise that resolves to a string containing the decrypted data.

## Examples

### Basic Usage

```javascript
import { rsaDecryptBase64 } from 'vaultic-crypto-engine';

async function decryptMessage(privateKey, encryptedData) {
  try {
    const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
    console.log('Decrypted message:', decrypted);
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
  }
}
```

### Decrypting JSON Data

```javascript
import { rsaDecryptBase64 } from 'vaultic-crypto-engine';

async function decryptJsonData(privateKey, encryptedData) {
  try {
    // Decrypt the data
    const decryptedJsonString = await rsaDecryptBase64(privateKey, encryptedData);
    
    // Parse the JSON
    const data = JSON.parse(decryptedJsonString);
    
    return data;
  } catch (error) {
    console.error('Decryption error:', error);
  }
}

// Example usage
decryptJsonData(privateKeyPem, encryptedData)
  .then(data => {
    console.log('User ID:', data.id);
    console.log('API Key:', data.apiKey);
  });
```

## Advanced Usage

For more control over the decryption process, use `rsaDecryptBase64WithOptions`:

```javascript
import { rsaDecryptBase64WithOptions } from 'vaultic-crypto-engine';

async function decryptWithCustomOptions(privateKey, encryptedData) {
  const options = {
    padding: 'OAEP',
    hashAlgorithm: 'SHA-256',
    outputEncoding: 'utf8'
  };
  
  const decrypted = await rsaDecryptBase64WithOptions(privateKey, encryptedData, options);
  return decrypted;
}
```

Available options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `padding` | string | 'PKCS1' | The padding scheme to use. Must match the padding used for encryption. Can be 'PKCS1' or 'OAEP'. |
| `hashAlgorithm` | string | 'SHA-1' | The hash algorithm to use with OAEP padding. Must match the hash used for encryption. Can be 'SHA-1', 'SHA-256', 'SHA-384', or 'SHA-512'. |
| `outputEncoding` | string | 'utf8' | The encoding of the output. Can be 'utf8' or 'base64'. |

## Error Handling

The function will throw an error if:

- The private key is invalid or in an incorrect format
- The encrypted data is corrupted or not properly formatted
- The private key doesn't correspond to the public key used for encryption
- The padding or hash algorithm doesn't match what was used for encryption

Example with error handling:

```javascript
import { rsaDecryptBase64 } from 'vaultic-crypto-engine';

async function safeDecrypt(privateKey, encryptedData) {
  try {
    const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
    return {
      success: true,
      data: decrypted
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

## Automatic Method Detection

The `rsaDecryptBase64` function automatically detects whether the data was encrypted using direct RSA encryption or hybrid RSA+AES encryption. This detection is based on the format of the encrypted data:

- If the encrypted data is a valid JSON string containing fields for hybrid encryption, hybrid decryption is used
- Otherwise, direct RSA decryption is attempted

This automatic detection makes the API easy to use without needing to track which method was used for encryption.

## Browser Compatibility

This function works in all modern browsers that support WebAssembly and the Web Crypto API.

## See Also

- [rsaEncryptBase64](encrypt) - Encrypt data using a public key
- [generateRsaKeypairPem](generate-keypair) - Generate an RSA key pair
- [Decryption Guide](../../guides/decryption) - More detailed information about decryption 