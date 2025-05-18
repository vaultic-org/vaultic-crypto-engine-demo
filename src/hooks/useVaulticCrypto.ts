import { useState, useCallback } from 'react';
import { useLogStore } from '@/core/store/logStore';
import {
    generate_rsa_keypair_pem,
    rsa_encrypt_base64,
    rsa_decrypt_base64
} from 'vaultic-crypto-engine';
import { KeyPair } from '@/core/types/crypto.types';

/**
 * Custom hook to provide Vaultic cryptography functionality
 * Handles both direct RSA encryption and hybrid RSA+AES for larger data
 */
export const useVaulticCrypto = () => {
    const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [encryptedMessage, setEncryptedMessage] = useState<string>('');
    const [decryptedMessage, setDecryptedMessage] = useState<string>('');

    const addLog = useLogStore(state => state.addLog);

    /**
     * Unified Vaultic encryption function - automatically handles data of any size
     * @param {string} publicKeyPem - RSA public key in PEM format
     * @param {string} data - Data to encrypt
     * @returns {Promise<string>} - Encrypted data as an encoded string
     */
    const vaultic_encrypt = useCallback(async (publicKeyPem: string, data: string): Promise<string> => {
        // Convert to Uint8Array
        const dataArray = new TextEncoder().encode(data);

        // Determine max size for direct RSA (2048 bits = 256 bytes minus padding)
        const MAX_RSA_SIZE = 245; // For RSA-2048 with PKCS#1 v1.5 padding

        // Automatically choose the method based on data size
        if (dataArray.length <= MAX_RSA_SIZE) {
            // Simple case: use RSA directly
            return rsa_encrypt_base64(publicKeyPem, data);
        } else {
            // Complex case: use the hybrid approach
            addLog('Data exceeds RSA capacity, using hybrid RSA+AES encryption', 'info');
            
            // 1. Generate a random AES key (256 bits)
            const aesKey = crypto.getRandomValues(new Uint8Array(32));

            // 2. Generate a random IV for AES-GCM
            const iv = crypto.getRandomValues(new Uint8Array(12));

            // 3. Import the AES key into the Web Crypto API
            const cryptoKey = await window.crypto.subtle.importKey(
                "raw",
                aesKey,
                { name: "AES-GCM", length: 256 },
                false,
                ["encrypt"]
            );

            // 4. Encrypt the data with AES-GCM
            const encryptedData = await window.crypto.subtle.encrypt(
                { name: "AES-GCM", iv: iv },
                cryptoKey,
                dataArray
            );

            // 5. Encrypt the AES key with RSA
            const aesKeyBase64 = btoa(String.fromCharCode.apply(null, [...new Uint8Array(aesKey)]));
            const encryptedAesKey = await rsa_encrypt_base64(publicKeyPem, aesKeyBase64);

            // 6. Format and return the result
            return btoa(
                JSON.stringify({
                    mode: "hybrid",
                    iv: Array.from(iv),
                    encryptedKey: encryptedAesKey,
                    encryptedData: Array.from(new Uint8Array(encryptedData)),
                })
            );
        }
    }, [addLog]);

    /**
     * Unified Vaultic decryption function - automatically handles data of any size
     * @param {string} privateKeyPem - RSA private key in PEM format
     * @param {string} encryptedData - Encrypted data as an encoded string
     * @returns {Promise<string>} - Decrypted data as a string
     */
    const vaultic_decrypt = useCallback(async (privateKeyPem: string, encryptedData: string): Promise<string> => {
        try {
            // First try to detect if it's a hybrid format
            const potentialJson = atob(encryptedData);
            const parsed = JSON.parse(potentialJson);

            if (parsed.mode === "hybrid") {
                addLog('Detected hybrid RSA+AES encryption, using appropriate method', 'info');
                
                // 1. Decrypt the AES key with RSA
                const aesKeyBase64 = await rsa_decrypt_base64(privateKeyPem, parsed.encryptedKey);
                const aesKeyStr = atob(aesKeyBase64);
                const aesKey = new Uint8Array(aesKeyStr.length);
                for (let i = 0; i < aesKeyStr.length; i++) {
                    aesKey[i] = aesKeyStr.charCodeAt(i);
                }

                // 2. Import the AES key into the Web Crypto API
                const cryptoKey = await window.crypto.subtle.importKey(
                    "raw",
                    aesKey,
                    { name: "AES-GCM", length: 256 },
                    false,
                    ["decrypt"]
                );

                // 3. Decrypt the data with AES-GCM
                const iv = new Uint8Array(parsed.iv);
                const encryptedDataArray = new Uint8Array(parsed.encryptedData);
                const decryptedData = await window.crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: iv },
                    cryptoKey,
                    encryptedDataArray
                );

                // 4. Return the decrypted data as a string
                return new TextDecoder().decode(decryptedData);
            }
        } catch {
            // If we can't parse as JSON or if it's not hybrid,
            // it's probably direct RSA encryption
            addLog('Using standard RSA decryption', 'info');
        }

        // Default case: direct RSA
        return rsa_decrypt_base64(privateKeyPem, encryptedData);
    }, [addLog]);

    const generateKeyPair = useCallback(async () => {
        try {
            setIsGenerating(true);
            addLog('Initializing Vaultic crypto engine...', 'info');
            addLog('Generating RSA 2048-bit key pair with secure entropy...', 'info');

            // Generate the key pair
            const newKeyPair = await generate_rsa_keypair_pem();
            setKeyPair(newKeyPair);

            addLog(`Vaultic RSA public key generated (${newKeyPair.public_pem.length} chars)`, 'info');
            addLog(`Vaultic RSA private key generated (${newKeyPair.private_pem.length} chars)`, 'info');
            addLog('Key pairs include Vaultic\'s additional Marvin attack protections', 'info');
            addLog('✅ Vaultic RSA key pair successfully generated!', 'success');

            return newKeyPair;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Error in Vaultic key generation: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    }, [addLog]);

    const encryptMessage = useCallback(async (message: string, publicKey?: string) => {
        try {
            if (!message) {
                addLog('⚠️ Please enter a message to encrypt', 'error');
                throw new Error('No message to encrypt');
            }

            const publicKeyToUse = publicKey || keyPair?.public_pem;

            if (!publicKeyToUse) {
                addLog('⚠️ Please generate a Vaultic RSA key pair first', 'error');
                throw new Error('No public key available');
            }

            setIsEncrypting(true);
            addLog(`Vaultic engine encrypting message (${message.length} bytes)...`, 'info');

            // Use the enhanced encryption function that handles any data size
            const encrypted = await vaultic_encrypt(publicKeyToUse, message);
            setEncryptedMessage(encrypted);

            // Detect which method was used (simple heuristic based on result length)
            const isHybrid = encrypted.length > 500; // Simple estimation

            if (isHybrid) {
                addLog('✅ Message encrypted using Vaultic\'s hybrid RSA+AES encryption', 'success');
                addLog('Large data automatically handled with enterprise-grade security', 'info');
            } else {
                addLog('✅ Message encrypted using Vaultic\'s direct RSA encryption', 'success');
            }

            addLog('The message can now only be decrypted with the matching private key', 'info');

            return encrypted;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Vaultic encryption error: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsEncrypting(false);
        }
    }, [keyPair, addLog, vaultic_encrypt]);

    const decryptMessage = useCallback(async (encryptedData: string, privateKey?: string) => {
        try {
            if (!encryptedData) {
                addLog('⚠️ No encrypted message to decrypt', 'error');
                throw new Error('No encrypted message to decrypt');
            }

            const privateKeyToUse = privateKey || keyPair?.private_pem;

            if (!privateKeyToUse) {
                addLog('⚠️ Please generate a Vaultic RSA key pair first', 'error');
                throw new Error('No private key available');
            }

            setIsDecrypting(true);
            addLog('Vaultic engine decrypting message...', 'info');

            try {
                // Use the enhanced decryption function that auto-detects the encryption method
                const decrypted = await vaultic_decrypt(privateKeyToUse, encryptedData);
                setDecryptedMessage(decrypted);
                addLog('✅ Vaultic decryption successful', 'success');

                return decrypted;
            } catch (decryptError) {
                addLog(`❌ Vaultic decryption failed: ${decryptError instanceof Error ? decryptError.message : 'Unknown error'}`, 'error');
                addLog('This could be due to data corruption or using the wrong private key', 'error');
                console.error('Decryption error details:', decryptError);
                throw decryptError;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Vaultic engine error: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsDecrypting(false);
        }
    }, [keyPair, addLog, vaultic_decrypt]);

    const resetCrypto = useCallback(() => {
        setKeyPair(null);
        setEncryptedMessage('');
        setDecryptedMessage('');
        addLog('Vaultic demo reset. Ready for new encryption session.', 'info');
    }, [addLog]);

    return {
        keyPair,
        encryptedMessage,
        decryptedMessage,
        isGenerating,
        isEncrypting,
        isDecrypting,
        generateKeyPair,
        encryptMessage,
        decryptMessage,
        resetCrypto,
    };
};