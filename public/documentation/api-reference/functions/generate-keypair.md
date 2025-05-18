# generateRsaKeypairPem

Generates a new RSA key pair in PEM format.

## Syntax

```javascript
import { generateRsaKeypairPem } from 'vaultic-crypto-engine';

const keypair = await generateRsaKeypairPem(options);
```

## Parameters

### options (optional)

An object with the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `keySize` | number | 2048 | The size of the RSA key in bits. Must be one of: 1024, 2048, 3072, 4096. |
| `format` | string | 'pem' | The format of the generated keys. Currently only 'pem' is supported. |

## Return Value

Returns a Promise that resolves to an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `privatePem` | string | The private key in PEM format. |
| `publicPem` | string | The public key in PEM format. |

## Examples

### Basic Usage

```javascript
import { generateRsaKeypairPem } from 'vaultic-crypto-engine';

async function generateKeys() {
  try {
    // Generate a default 2048-bit key pair
    const keypair = await generateRsaKeypairPem();
    
    console.log('Private Key:', keypair.privatePem);
    console.log('Public Key:', keypair.publicPem);
    
    return keypair;
  } catch (error) {
    console.error('Error generating key pair:', error);
  }
}
```

### Specifying Key Size

```javascript
import { generateRsaKeypairPem } from 'vaultic-crypto-engine';

async function generateStrongKeys() {
  try {
    // Generate a 4096-bit key pair for higher security
    const keypair = await generateRsaKeypairPem({ keySize: 4096 });
    return keypair;
  } catch (error) {
    console.error('Error generating key pair:', error);
  }
}
```

## Remarks

- Key generation can be computationally intensive, especially for larger key sizes
- 4096-bit keys provide higher security but are slower for encryption/decryption operations
- 1024-bit keys are faster but not recommended for sensitive data
- The default 2048-bit keys offer a good balance of security and performance

## Performance Considerations

Approximate key generation times on a modern machine:

| Key Size | Approximate Time |
|----------|------------------|
| 1024-bit | 100-200ms |
| 2048-bit | 300-500ms |
| 3072-bit | 700-1000ms |
| 4096-bit | 1000-2000ms |

These times can vary significantly based on hardware and system load.

## Browser Compatibility

This function works in all modern browsers that support WebAssembly and the Web Crypto API. For older browsers, consider implementing a fallback mechanism or generating keys server-side.

## See Also

- [rsaEncryptBase64](encrypt) - Encrypt data using a public key
- [rsaDecryptBase64](decrypt) - Decrypt data using a private key
- [Key Management Guide](../../guides/key-management) - Best practices for managing RSA keys 