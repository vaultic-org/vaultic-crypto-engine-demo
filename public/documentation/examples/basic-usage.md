# Basic Usage

This example demonstrates how to use Vaultic Crypto Engine for basic encryption and decryption operations.

## Complete Example

```javascript
import { 
  generateRsaKeypairPem, 
  rsaEncryptBase64, 
  rsaDecryptBase64 
} from 'vaultic-crypto-engine';

// Async function to demonstrate the complete flow
async function cryptoDemo() {
  try {
    // Step 1: Generate a new RSA key pair
    console.log('Generating RSA key pair...');
    const keypair = await generateRsaKeypairPem();
    console.log('Key pair generated successfully.');
    
    // Step 2: Define a message to encrypt
    const originalMessage = "This is a secret message that needs to be encrypted securely.";
    console.log(`Original message: "${originalMessage}"`);
    
    // Step 3: Encrypt the message using the public key
    console.log('Encrypting message...');
    const encryptedMessage = await rsaEncryptBase64(keypair.publicPem, originalMessage);
    console.log('Message encrypted successfully.');
    console.log(`Encrypted message (Base64): ${encryptedMessage.substring(0, 64)}...`);
    
    // Step 4: Decrypt the message using the private key
    console.log('Decrypting message...');
    const decryptedMessage = await rsaDecryptBase64(keypair.privatePem, encryptedMessage);
    console.log('Message decrypted successfully.');
    console.log(`Decrypted message: "${decryptedMessage}"`);
    
    // Step 5: Verify that the decryption worked correctly
    const isSuccessful = originalMessage === decryptedMessage;
    console.log(`Verification: ${isSuccessful ? 'Success! Original and decrypted messages match.' : 'Failed! Messages do not match.'}`);
    
    return {
      keypair,
      originalMessage,
      encryptedMessage,
      decryptedMessage,
      isSuccessful
    };
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

// Run the demo
cryptoDemo()
  .then(result => {
    console.log('Demo completed successfully!');
  })
  .catch(error => {
    console.error('Demo failed:', error);
  });
```

## Step-by-Step Explanation

### 1. Import the Required Functions

```javascript
import { 
  generateRsaKeypairPem, 
  rsaEncryptBase64, 
  rsaDecryptBase64 
} from 'vaultic-crypto-engine';
```

These three functions provide all the functionality needed for basic encryption and decryption:

- `generateRsaKeypairPem`: Creates a new RSA key pair
- `rsaEncryptBase64`: Encrypts data using the public key
- `rsaDecryptBase64`: Decrypts data using the private key

### 2. Generate a Key Pair

```javascript
const keypair = await generateRsaKeypairPem();
```

This function generates a new RSA key pair with the default key size (2048 bits). The result is an object containing:

- `privatePem`: The private key in PEM format
- `publicPem`: The public key in PEM format

### 3. Encrypt a Message

```javascript
const encryptedMessage = await rsaEncryptBase64(keypair.publicPem, originalMessage);
```

This function takes the public key and the message to encrypt. It returns a Base64-encoded string representing the encrypted data.

### 4. Decrypt the Message

```javascript
const decryptedMessage = await rsaDecryptBase64(keypair.privatePem, encryptedMessage);
```

This function takes the private key and the encrypted message. It returns the original message.

### 5. Verify the Result

```javascript
const isSuccessful = originalMessage === decryptedMessage;
```

This simple check verifies that the decrypted message matches the original message.

## Browser Usage

For browser environments, you can include the library via a script tag:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Vaultic Crypto Engine Demo</title>
  <script src="https://cdn.jsdelivr.net/npm/vaultic-crypto-engine@latest/dist/bundle.js"></script>
</head>
<body>
  <h1>Vaultic Crypto Engine Demo</h1>
  <div id="output"></div>
  
  <script>
    // The library is available as a global variable
    const { generateRsaKeypairPem, rsaEncryptBase64, rsaDecryptBase64 } = vaulticCryptoEngine;
    
    async function runDemo() {
      const output = document.getElementById('output');
      
      try {
        // Generate a key pair
        output.innerHTML += '<p>Generating key pair...</p>';
        const keypair = await generateRsaKeypairPem();
        
        // Encrypt a message
        const message = "This is a secret message";
        output.innerHTML += `<p>Original message: "${message}"</p>`;
        
        const encrypted = await rsaEncryptBase64(keypair.publicPem, message);
        output.innerHTML += `<p>Encrypted: ${encrypted.substring(0, 32)}...</p>`;
        
        // Decrypt the message
        const decrypted = await rsaDecryptBase64(keypair.privatePem, encrypted);
        output.innerHTML += `<p>Decrypted: "${decrypted}"</p>`;
        
        output.innerHTML += '<p><strong>Demo completed successfully!</strong></p>';
      } catch (error) {
        output.innerHTML += `<p style="color: red">Error: ${error.message}</p>`;
      }
    }
    
    // Run the demo when the page loads
    window.onload = runDemo;
  </script>
</body>
</html>
```

## Next Steps

Now that you understand the basics, you can:

- Learn about [Advanced Patterns](advanced-patterns) for more complex scenarios
- Explore the [API Reference](../api-reference/functions/generate-keypair) for detailed function documentation
- Read the [Guides](../guides/encryption) for best practices and in-depth explanations 