# Key Concepts

This guide explains the core concepts and principles behind Vaultic Crypto Engine.

## RSA Encryption

Vaultic Crypto Engine uses RSA (Rivest–Shamir–Adleman) encryption, one of the most widely used asymmetric encryption algorithms. RSA works with a pair of keys:

- **Public Key**: Used to encrypt data. Can be freely shared.
- **Private Key**: Used to decrypt data. Must be kept secret.

## How RSA Works

1. **Key Generation**: A pair of keys (public and private) is created using mathematical algorithms.
2. **Encryption**: Data is encrypted using the public key, creating ciphertext.
3. **Decryption**: The ciphertext can only be decrypted using the corresponding private key.

RSA security is based on the practical difficulty of factoring the product of two large prime numbers.

## Hybrid Encryption (RSA+AES)

While RSA is very secure, it has limitations:

- **Size Limitation**: RSA can only encrypt data smaller than the key size (minus padding).
- **Performance**: RSA is computationally expensive compared to symmetric algorithms.

To overcome these limitations, Vaultic Crypto Engine uses a hybrid approach for large data:

1. Generate a random AES key
2. Encrypt the data with the AES key (symmetric encryption)
3. Encrypt the AES key with RSA (asymmetric encryption)
4. Send both the encrypted data and the encrypted AES key

This combines the security of RSA with the performance and size capabilities of AES.

## Base64 Encoding

All encrypted data in Vaultic Crypto Engine is represented as Base64 strings. This encoding converts binary data to ASCII text, making it easier to:

- Store in databases
- Transmit over text-based protocols
- Include in JSON payloads
- Debug and inspect

## Key Formats

Vaultic Crypto Engine supports keys in PEM format (Privacy Enhanced Mail). PEM is a widely used format that encodes binary data in Base64 with header and footer lines:

```
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA8EmWJUZ/Osz4vXtUU2S+0M4BP9+s423gjMjoX+qP1iCnlcRcFWxG
...
-----END RSA PUBLIC KEY-----
```

## Automatic Size Detection

A key feature of Vaultic Crypto Engine is its ability to automatically detect the size of the data being encrypted and choose the appropriate method:

- **Small Data**: Uses direct RSA encryption
- **Large Data**: Automatically switches to hybrid RSA+AES encryption

This means you can use the same API for any data size without worrying about the technical details.

## Next Steps

Now that you understand the key concepts, you might want to check out the [Encryption Guide](../guides/encryption) for more detailed information on encryption options and best practices. 