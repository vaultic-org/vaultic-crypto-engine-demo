import { useState, useCallback } from 'react';
import { useLogStore } from '@/core/store/logStore';
import {
    generate_rsa_keypair_pem,
    rsa_encrypt_base64,
    rsa_decrypt_base64,
    protect_keypair,
    unprotect_keypair,
    protect_message,
    unprotect_message
} from '@vaultic/crypto-engine';
import { KeyPair, ProtectedKeyPair, ProtectedMessage } from '@/core/types/crypto.types';

/**
 * Custom hook to provide Vaultic cryptography functionality
 * Handles RSA operations with automatic hybrid encryption for larger data
 */
export const useVaulticCrypto = () => {
    const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [encryptedMessage, setEncryptedMessage] = useState<string>('');
    const [decryptedMessage, setDecryptedMessage] = useState<string>('');
    const [isProtecting, setIsProtecting] = useState(false);
    const [isUnprotecting, setIsUnprotecting] = useState(false);

    const addLog = useLogStore(state => state.addLog);

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

            // The library now automatically handles hybrid encryption
            const encrypted = await rsa_encrypt_base64(publicKeyToUse, message);
            setEncryptedMessage(encrypted);

            addLog('✅ Message encrypted successfully', 'success');
            // Hybrid encryption is now automatic based on message size
            if (message.length > 190) {
                addLog('Large data automatically handled with hybrid RSA+AES encryption', 'info');
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
    }, [keyPair, addLog]);

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
                // The library now automatically detects the encryption method
                const decrypted = await rsa_decrypt_base64(privateKeyToUse, encryptedData);
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
    }, [keyPair, addLog]);

    const protectKeyPair = useCallback(async (passphrase: string, keyPairToProtect?: KeyPair) => {
        try {
            const keyPairToUse = keyPairToProtect || keyPair;
            if (!keyPairToUse) {
                addLog('⚠️ No key pair available to protect', 'error');
                throw new Error('No key pair available');
            }

            if (!passphrase) {
                addLog('⚠️ Please provide a passphrase', 'error');
                throw new Error('No passphrase provided');
            }

            setIsProtecting(true);
            addLog('Protecting key pair with password...', 'info');

            const protectedKeys = await protect_keypair(
                keyPairToUse.private_pem,
                keyPairToUse.public_pem,
                passphrase
            );

            addLog('✅ Key pair protected successfully', 'success');
            return protectedKeys;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Key protection error: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsProtecting(false);
        }
    }, [keyPair, addLog]);

    const unprotectKeyPair = useCallback(async (protectedKeyPair: ProtectedKeyPair, passphrase: string) => {
        try {
            if (!passphrase) {
                addLog('⚠️ Please provide a passphrase', 'error');
                throw new Error('No passphrase provided');
            }

            setIsUnprotecting(true);
            addLog('Unprotecting key pair...', 'info');

            const unprotectedKeyPair = await unprotect_keypair(protectedKeyPair, passphrase);
            
            addLog('✅ Key pair unprotected successfully', 'success');
            return unprotectedKeyPair;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Key unprotection error: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsUnprotecting(false);
        }
    }, [addLog]);

    const protectMessageWithPassword = useCallback(async (message: string, passphrase: string) => {
        try {
            if (!message) {
                addLog('⚠️ Please enter a message to protect', 'error');
                throw new Error('No message to protect');
            }

            if (!passphrase) {
                addLog('⚠️ Please provide a passphrase', 'error');
                throw new Error('No passphrase provided');
            }

            setIsProtecting(true);
            addLog('Protecting message with password...', 'info');

            const protected_message = await protect_message(message, passphrase);
            
            addLog('✅ Message protected successfully with password', 'success');
            return protected_message;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Message protection error: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsProtecting(false);
        }
    }, [addLog]);

    const unprotectMessageWithPassword = useCallback(async (
        protectedMessage: ProtectedMessage, 
        passphrase: string
    ) => {
        try {
            if (!passphrase) {
                addLog('⚠️ Please provide a passphrase', 'error');
                throw new Error('No passphrase provided');
            }

            setIsUnprotecting(true);
            addLog('Unprotecting message...', 'info');

            const decrypted = await unprotect_message(
                protectedMessage.ciphertext,
                passphrase,
                protectedMessage.salt,
                protectedMessage.nonce
            );
            
            addLog('✅ Message unprotected successfully', 'success');
            return decrypted;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            addLog(`❌ Message unprotection error: ${errorMessage}`, 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsUnprotecting(false);
        }
    }, [addLog]);

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
        isProtecting,
        isUnprotecting,
        generateKeyPair,
        encryptMessage,
        decryptMessage,
        protectKeyPair,
        unprotectKeyPair,
        protectMessageWithPassword,
        unprotectMessageWithPassword,
        resetCrypto,
    };
};