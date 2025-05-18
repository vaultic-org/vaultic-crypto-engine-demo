# KeyPair Type

The `KeyPair` type represents an RSA key pair used for encryption and decryption operations.

## Structure

```typescript
interface KeyPair {
  privatePem: string;
  publicPem: string;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `privatePem` | string | The private key in PEM format. Used for decryption. |
| `publicPem` | string | The public key in PEM format. Used for encryption. |

## Example

```javascript
// Key pair object returned by generateRsaKeypairPem
const keyPair = {
  privatePem: `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAvs4AZLwzHU2di1NMbLXK/MbUUvFP1BvI0nEh8nYKuI/1QjUJ
...
T35yiUfJCKHdgjXvEArKyBtPgUEZnd4oF/DJxHkG1JgE3zZ0
-----END RSA PRIVATE KEY-----`,
  publicPem: `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAvs4AZLwzHU2di1NMbLXK/MbUUvFP1BvI0nEh8nYKuI/1QjUJVPWQ
...
9b6SNfn48Jj5hd5gwQ1vLQ==
-----END RSA PUBLIC KEY-----`
};
```

## Usage

### Key Generation

The `KeyPair` type is returned by the key generation function:

```javascript
import { generateRsaKeypairPem } from 'vaultic-crypto-engine';

async function generateKeys() {
  const keyPair = await generateRsaKeypairPem();
  return keyPair;
}
```

### Encryption and Decryption

The public and private keys are used for encryption and decryption respectively:

```javascript
import { 
  generateRsaKeypairPem, 
  rsaEncryptBase64, 
  rsaDecryptBase64 
} from 'vaultic-crypto-engine';

async function cryptoExample() {
  // Generate a key pair
  const keyPair = await generateRsaKeypairPem();
  
  // Encrypt using the public key
  const message = "Secret data";
  const encrypted = await rsaEncryptBase64(keyPair.publicPem, message);
  
  // Decrypt using the private key
  const decrypted = await rsaDecryptBase64(keyPair.privatePem, encrypted);
  
  console.log(decrypted); // "Secret data"
}
```

## Key Formats

Both keys are stored in PEM (Privacy Enhanced Mail) format:

- PEM files are Base64-encoded DER (Distinguished Encoding Rules) certificates
- They include header and footer lines that identify the type of data
- The private key starts with `-----BEGIN RSA PRIVATE KEY-----` and ends with `-----END RSA PRIVATE KEY-----`
- The public key starts with `-----BEGIN RSA PUBLIC KEY-----` and ends with `-----END RSA PUBLIC KEY-----`

## Security Considerations

- The private key (`privatePem`) should be kept secret and securely stored
- The public key (`publicPem`) can be freely distributed without security concerns
- Never store private keys in client-side code or exposed files
- Consider using a key management service for storing and managing keys in production environments

## Compatibility

The PEM format is widely supported across different platforms and libraries, making it easy to use the key pair with other cryptographic tools.

## See Also

- [generateRsaKeypairPem](../functions/generate-keypair) - Generate an RSA key pair
- [rsaEncryptBase64](../functions/encrypt) - Encrypt data using a public key
- [rsaDecryptBase64](../functions/decrypt) - Decrypt data using a private key
- [Key Management Guide](../../guides/key-management) - Best practices for managing RSA keys 