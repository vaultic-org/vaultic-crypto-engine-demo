# Key Management

Proper key management is crucial for maintaining the security of encrypted data. This guide provides best practices for managing RSA keys with Vaultic Crypto Engine.

## Generating Keys

Vaultic Crypto Engine provides a simple way to generate RSA key pairs:

```javascript
import { generateRsaKeypairPem } from 'vaultic-crypto-engine';

async function createKeys() {
  const keypair = await generateRsaKeypairPem();
  
  // Key pair will contain:
  console.log(keypair.privatePem); // Private key in PEM format
  console.log(keypair.publicPem);  // Public key in PEM format
  
  return keypair;
}
```

### Key Size Options

By default, Vaultic Crypto Engine generates 2048-bit RSA keys. You can specify a different key size:

```javascript
// Generate a 4096-bit key pair
const keypair = await generateRsaKeypairPem({ keySize: 4096 });
```

Available key sizes:
- 1024 bits (not recommended for sensitive data)
- 2048 bits (default, good balance of security and performance)
- 3072 bits (higher security)
- 4096 bits (highest security, but slower)

## Storing Keys Securely

### Private Keys

Private keys should be protected with the highest level of security:

- **Never store private keys in client-side code or localStorage**
- **Never transmit private keys over insecure channels**
- **Never include private keys in your source code repository**

For server-side applications:
- Store private keys in a secure key management service (e.g., AWS KMS, Google Cloud KMS, HashiCorp Vault)
- Use environment variables that are securely injected at runtime
- Use file system permissions to restrict access to key files

```javascript
// Example: Loading a private key from an environment variable
const privateKey = process.env.RSA_PRIVATE_KEY;

// OR from a file with restricted permissions
const fs = require('fs');
const privateKey = fs.readFileSync('/secure/path/private.pem', 'utf8');
```

### Public Keys

Public keys can be distributed freely, but it's still important to ensure their integrity:

- Verify the source of public keys to prevent man-in-the-middle attacks
- Protect against unauthorized modification of public keys

## Key Rotation

Regularly rotating keys is a security best practice:

1. Generate a new key pair
2. Gradually transition to using the new keys for encryption
3. Keep the old private key available for decrypting existing data
4. Establish a retention policy for old keys

```javascript
// Example key rotation process
async function rotateKeys() {
  // Generate new key pair
  const newKeypair = await generateRsaKeypairPem();
  
  // Store new keys securely
  await saveKeys(newKeypair, 'current');
  
  // Move old keys to archive
  const oldKeypair = await loadKeys('current');
  await saveKeys(oldKeypair, 'previous');
  
  return newKeypair;
}
```

## Key Backup and Recovery

Plan for key backup and recovery:

1. Create secure backups of private keys
2. Store backups in physically separate locations
3. Encrypt key backups with a different mechanism
4. Test recovery procedures regularly

## Public Key Distribution

When distributing public keys to clients or other systems:

1. Use secure channels for initial key exchange
2. Consider using key fingerprints for verification
3. Implement certificate-based validation when appropriate

```javascript
// Example: Generating a key fingerprint
import { createHash } from 'crypto';

function getKeyFingerprint(publicKey) {
  const hash = createHash('sha256');
  hash.update(publicKey);
  return hash.digest('hex');
}

const fingerprint = getKeyFingerprint(keypair.publicPem);
console.log('Key fingerprint:', fingerprint);
```

## Key Access Control

Implement the principle of least privilege:

- Limit access to private keys to only the necessary systems and personnel
- Use different keys for different applications or data types
- Log all access to cryptographic keys
- Implement multi-factor authentication for key operations

## Next Steps

Learn about the specific API functions in the [API Reference](../api-reference/functions/generate-keypair) section or explore [Advanced Patterns](../examples/advanced-patterns) for more complex cryptographic scenarios. 