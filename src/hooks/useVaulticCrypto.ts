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
import useTranslation from './useTranslation';

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

    const { t } = useTranslation(['demo', 'common']);
    const addLog = useLogStore(state => state.addLog);

    const generateKeyPair = useCallback(async () => {
        try {
            setIsGenerating(true);
            addLog(t('demo:systemLogs.initializing'), 'info');
            addLog(t('demo:systemLogs.generatingKeyPair'), 'info');

            // Generate the key pair
            const newKeyPair = await generate_rsa_keypair_pem();
            setKeyPair(newKeyPair);

            addLog(t('demo:systemLogs.publicKeyGenerated', { length: newKeyPair.public_pem.length }), 'info');
            addLog(t('demo:systemLogs.privateKeyGenerated', { length: newKeyPair.private_pem.length }), 'info');
            addLog(t('demo:systemLogs.keyPairProtection'), 'info');
            addLog(t('demo:systemLogs.keyPairSuccess'), 'success');

            return newKeyPair;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.keyGenError', { error: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    }, [addLog, t]);

    const encryptMessage = useCallback(async (message: string, publicKey?: string) => {
        try {
            if (!message) {
                addLog(t('demo:systemLogs.noMessageError'), 'error');
                throw new Error(t('demo:errors.noMessageToEncrypt'));
            }

            const publicKeyToUse = publicKey || keyPair?.public_pem;

            if (!publicKeyToUse) {
                addLog(t('demo:systemLogs.noKeyPairError'), 'error');
                throw new Error(t('demo:errors.noPublicKey'));
            }

            setIsEncrypting(true);
            addLog(t('demo:systemLogs.encryptingMessage', { bytes: message.length }), 'info');

            // The library now automatically handles hybrid encryption
            const encrypted = await rsa_encrypt_base64(publicKeyToUse, message);
            setEncryptedMessage(encrypted);

            addLog(t('demo:systemLogs.encryptSuccess'), 'success');
            // Hybrid encryption is now automatic based on message size
            if (message.length > 190) {
                addLog(t('demo:systemLogs.hybridNotice'), 'info');
            }
            addLog(t('demo:systemLogs.privateKeyOnly'), 'info');

            return encrypted;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.encryptError', { message: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsEncrypting(false);
        }
    }, [keyPair, addLog, t]);

    const decryptMessage = useCallback(async (encryptedData: string, privateKey?: string) => {
        try {
            if (!encryptedData) {
                addLog(t('demo:systemLogs.noEncryptedMessage'), 'error');
                throw new Error(t('demo:errors.noEncryptedMessage'));
            }

            const privateKeyToUse = privateKey || keyPair?.private_pem;

            if (!privateKeyToUse) {
                addLog(t('demo:systemLogs.noKeyPairError'), 'error');
                throw new Error(t('demo:errors.noPrivateKey'));
            }

            setIsDecrypting(true);
            addLog(t('demo:systemLogs.decryptingMessage'), 'info');

            try {
                // The library now automatically detects the encryption method
                const decrypted = await rsa_decrypt_base64(privateKeyToUse, encryptedData);
                setDecryptedMessage(decrypted);
                addLog(t('demo:systemLogs.decryptSuccess'), 'success');

                return decrypted;
            } catch (decryptError) {
                const errorMsg = decryptError instanceof Error ? decryptError.message : t('common:error.unknown');
                addLog(t('demo:systemLogs.decryptError', { message: errorMsg }), 'error');
                addLog(t('demo:systemLogs.wrongKeyError'), 'error');
                console.error('Decryption error details:', decryptError);
                throw decryptError;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.engineError', { message: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsDecrypting(false);
        }
    }, [keyPair, addLog, t]);

    const protectKeyPair = useCallback(async (passphrase: string, keyPairToProtect?: KeyPair) => {
        try {
            const keyPairToUse = keyPairToProtect || keyPair;
            if (!keyPairToUse) {
                addLog(t('demo:systemLogs.noKeyToProtect'), 'error');
                throw new Error(t('demo:errors.noKeyPairAvailable'));
            }

            if (!passphrase) {
                addLog(t('demo:systemLogs.noPassphrase'), 'error');
                throw new Error(t('demo:errors.noPassphrase'));
            }

            setIsProtecting(true);
            addLog(t('demo:systemLogs.protectingKeyPair'), 'info');

            const protectedKeys = await protect_keypair(
                keyPairToUse.private_pem,
                keyPairToUse.public_pem,
                passphrase
            );

            addLog(t('demo:systemLogs.keyPairProtected'), 'success');
            return protectedKeys;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.keyProtectionError', { message: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsProtecting(false);
        }
    }, [keyPair, addLog, t]);

    const unprotectKeyPair = useCallback(async (protectedKeyPair: ProtectedKeyPair, passphrase: string) => {
        try {
            if (!passphrase) {
                addLog(t('demo:systemLogs.noPassphrase'), 'error');
                throw new Error(t('demo:errors.noPassphrase'));
            }

            setIsUnprotecting(true);
            addLog(t('demo:systemLogs.unprotectingKeyPair'), 'info');

            const unprotectedKeyPair = await unprotect_keypair(protectedKeyPair, passphrase);
            
            addLog(t('demo:systemLogs.keyPairUnprotected'), 'success');
            return unprotectedKeyPair;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.keyUnprotectionError', { message: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsUnprotecting(false);
        }
    }, [addLog, t]);

    const protectMessageWithPassword = useCallback(async (message: string, passphrase: string) => {
        try {
            if (!message) {
                addLog(t('demo:systemLogs.noMessageToProtect'), 'error');
                throw new Error(t('demo:errors.noMessageToProtect'));
            }

            if (!passphrase) {
                addLog(t('demo:systemLogs.noPassphrase'), 'error');
                throw new Error(t('demo:errors.noPassphrase'));
            }

            setIsProtecting(true);
            addLog(t('demo:systemLogs.protectingMessage'), 'info');

            const protected_message = await protect_message(message, passphrase);
            
            addLog(t('demo:systemLogs.messageProtected'), 'success');
            return protected_message;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.messageProtectionError', { message: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsProtecting(false);
        }
    }, [addLog, t]);

    const unprotectMessageWithPassword = useCallback(async (
        protectedMessage: ProtectedMessage, 
        passphrase: string
    ) => {
        try {
            if (!passphrase) {
                addLog(t('demo:systemLogs.noPassphrase'), 'error');
                throw new Error(t('demo:errors.noPassphrase'));
            }

            setIsUnprotecting(true);
            addLog(t('demo:systemLogs.unprotectingMessage'), 'info');

            const decrypted = await unprotect_message(
                protectedMessage.ciphertext,
                passphrase,
                protectedMessage.salt,
                protectedMessage.nonce
            );
            
            addLog(t('demo:systemLogs.messageUnprotected'), 'success');
            return decrypted;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.messageUnprotectionError', { message: errorMessage }), 'error');
            console.error('Complete error:', error);
            throw error;
        } finally {
            setIsUnprotecting(false);
        }
    }, [addLog, t]);

    const resetCrypto = useCallback(() => {
        setKeyPair(null);
        setEncryptedMessage('');
        setDecryptedMessage('');
        addLog(t('demo:systemLogs.demoReset'), 'info');
    }, [addLog, t]);

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
        resetCrypto
    };
};