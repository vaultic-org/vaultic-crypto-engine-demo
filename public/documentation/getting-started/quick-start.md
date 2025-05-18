# Quick Start Guide

This guide will help you get started with Vaultic Crypto Engine quickly. We'll cover basic encryption and decryption operations.

## Basic Usage

### Importing the Library

First, import the necessary functions from the library:

```javascript
import { 
  generateRsaKeypairPem, 
  rsaEncryptBase64, 
  rsaDecryptBase64 
} from 'vaultic-crypto-engine';
```

### Generating a Key Pair

To encrypt or decrypt data, you first need a key pair:

```javascript
async function generateKeys() {
  try {
    const keypair = await generateRsaKeypairPem();
    console.log('Private Key:', keypair.privatePem);
    console.log('Public Key:', keypair.publicPem);
    return keypair;
  } catch (error) {
    console.error('Error generating keys:', error);
  }
}
```

### Encrypting Data

Once you have a key pair, you can encrypt data using the public key:

```javascript
async function encryptData(publicKey, data) {
  try {
    const encrypted = await rsaEncryptBase64(publicKey, data);
    console.log('Encrypted data:', encrypted);
    return encrypted;
  } catch (error) {
    console.error('Error encrypting data:', error);
  }
}
```

### Decrypting Data

To decrypt data, use the private key:

```javascript
async function decryptData(privateKey, encryptedData) {
  try {
    const decrypted = await rsaDecryptBase64(privateKey, encryptedData);
    console.log('Decrypted data:', decrypted);
    return decrypted;
  } catch (error) {
    console.error('Error decrypting data:', error);
  }
}
```

### Complete Example

Here's a complete example showing the entire process:

```javascript
import { 
  generateRsaKeypairPem, 
  rsaEncryptBase64, 
  rsaDecryptBase64 
} from 'vaultic-crypto-engine';

async function cryptoDemo() {
  // Generate a new key pair
  const keypair = await generateRsaKeypairPem();
  
  // Data to encrypt
  const originalData = "Secret message with sensitive information";
  
  // Encrypt the data with the public key
  const encrypted = await rsaEncryptBase64(keypair.publicPem, originalData);
  console.log('Encrypted:', encrypted);
  
  // Decrypt the data with the private key
  const decrypted = await rsaDecryptBase64(keypair.privatePem, encrypted);
  console.log('Decrypted:', decrypted);
  
  // Verify the decryption worked correctly
  console.log('Original equals decrypted:', originalData === decrypted);
}

cryptoDemo().catch(console.error);
```

## Next Steps

Now that you've learned the basics, check out the [Key Concepts](key-concepts) guide to understand how Vaultic Crypto Engine works under the hood. 