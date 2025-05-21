import { useState, useCallback } from 'react';
import { useLogStore } from '@/core/store/logStore';
import { useCryptoStore } from '@/core/store/cryptoStore';
import {
    generate_rsa_keypair_pem,
    rsa_encrypt_base64,
    rsa_decrypt_base64,
    generate_ecdsa_keypair_wasm,
    derive_p256_shared_secret_wasm,
    encrypt_with_shared_secret_wasm,
    decrypt_with_shared_secret_wasm,
    WasmEccCurve,
    protect_keypair,
    unprotect_keypair,
    protect_message,
    unprotect_message
} from '@vaultic/crypto-engine';
import { KeyPair, ProtectedKeyPair, ProtectedMessage } from '@/core/types/crypto.types';
import useTranslation from './useTranslation';

/**
 * Custom hook to provide Vaultic cryptography functionality
 * Handles RSA operations and ECDH hybrid encryption
 */
export const useVaulticCrypto = () => {
    const {
        cryptoMode,
        keyPair,
        keyPairA,
        keyPairB,
        originalMessage,
        processedData,
        decryptedMessage,
        setKeyPair: storeSetKeyPair,
        setKeyPairA: storeSetKeyPairA,
        setKeyPairB: storeSetKeyPairB,
        setOriginalMessage: storeSetOriginalMessage,
        setProcessedData: storeSetProcessedData,
        setDecryptedMessage: storeSetDecryptedMessage,
        resetState: storeResetState
    } = useCryptoStore();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isProcessingPrimary, setIsProcessingPrimary] = useState(false);
    const [isProcessingSecondary, setIsProcessingSecondary] = useState(false);
    const [isProtecting, setIsProtecting] = useState(false);
    const [isUnprotecting, setIsUnprotecting] = useState(false);

    const { t } = useTranslation(['demo', 'common']);
    const addLog = useLogStore(state => state.addLog);

    const generateKeyPair = useCallback(async (userType?: 'A' | 'B') => {
        try {
            setIsGenerating(true);
            addLog(t('demo:systemLogs.initializing'), 'info');
            
            let newKeyPair: KeyPair;

            if (cryptoMode === 'RSA') {
                addLog(t('demo:systemLogs.generatingKeyPair'), 'info');
                newKeyPair = await generate_rsa_keypair_pem();
                addLog(t('demo:systemLogs.keyPairProtection'), 'info');
                storeSetKeyPair(newKeyPair);
                addLog(t('demo:systemLogs.publicKeyGenerated', { length: newKeyPair.public_pem.length }), 'info');
                addLog(t('demo:systemLogs.privateKeyGenerated', { length: newKeyPair.private_pem.length }), 'info');
                addLog(t('demo:systemLogs.keyPairSuccess'), 'success');
            } else if (cryptoMode === 'ECDH') {
                if (!userType) {
                    addLog(t('demo:systemLogs.generatingEcdhKeyPair', { user: 'A', curve: 'P-256' }), 'info');
                    const eccKeyPairA = await generate_ecdsa_keypair_wasm(WasmEccCurve.P256);
                    const newKeyPairA = { public_pem: eccKeyPairA.public_pem, private_pem: eccKeyPairA.private_pem };
                    storeSetKeyPairA(newKeyPairA);
                    addLog(t('demo:systemLogs.publicKeyGeneratedUser', { user: 'A', length: newKeyPairA.public_pem.length }), 'info');
                    addLog(t('demo:systemLogs.privateKeyGeneratedUser', { user: 'A', length: newKeyPairA.private_pem.length }), 'info');
                    addLog(t('demo:systemLogs.ecdhKeyPairSuccess', { user: 'A' }), 'success');

                    addLog(t('demo:systemLogs.generatingEcdhKeyPair', { user: 'B', curve: 'P-256' }), 'info');
                    const eccKeyPairB = await generate_ecdsa_keypair_wasm(WasmEccCurve.P256);
                    const newKeyPairB = { public_pem: eccKeyPairB.public_pem, private_pem: eccKeyPairB.private_pem };
                    storeSetKeyPairB(newKeyPairB);
                    addLog(t('demo:systemLogs.publicKeyGeneratedUser', { user: 'B', length: newKeyPairB.public_pem.length }), 'info');
                    addLog(t('demo:systemLogs.privateKeyGeneratedUser', { user: 'B', length: newKeyPairB.private_pem.length }), 'info');
                    addLog(t('demo:systemLogs.ecdhKeyPairSuccess', { user: 'B' }), 'success');
                    return { keyPairA: newKeyPairA, keyPairB: newKeyPairB };
                } else {
                    addLog(t('demo:systemLogs.generatingEcdhKeyPair', { user: userType, curve: 'P-256' }), 'info');
                    const eccKeyPair = await generate_ecdsa_keypair_wasm(WasmEccCurve.P256);
                    newKeyPair = { public_pem: eccKeyPair.public_pem, private_pem: eccKeyPair.private_pem };
                    if (userType === 'A') {
                        storeSetKeyPairA(newKeyPair);
                    } else {
                        storeSetKeyPairB(newKeyPair);
                    }
                    addLog(t('demo:systemLogs.publicKeyGeneratedUser', { user: userType, length: newKeyPair.public_pem.length }), 'info');
                    addLog(t('demo:systemLogs.privateKeyGeneratedUser', { user: userType, length: newKeyPair.private_pem.length }), 'info');
                    addLog(t('demo:systemLogs.ecdhKeyPairSuccess', { user: userType }), 'success');
                }
            } else {
                 throw new Error(t('common:error.invalidMode'));
            }
            
            return newKeyPair;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            const logKey = cryptoMode === 'RSA' ? 'demo:systemLogs.keyGenError' : 'demo:systemLogs.ecdhKeyGenError';
            addLog(t(logKey, { error: errorMessage }), 'error');
            console.error('Key generation error:', error);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    }, [addLog, t, cryptoMode, storeSetKeyPair, storeSetKeyPairA, storeSetKeyPairB]);
    
    const processPrimaryAction = useCallback(async (messageToProcess: string) => {
        try {
            if (!messageToProcess) {
                addLog(t('demo:systemLogs.noMessageError'), 'error');
                throw new Error(t(cryptoMode === 'RSA' ? 'demo:errors.noMessageToEncrypt' : 'demo:errors.noMessageToEncryptEcdh'));
            }
           
            setIsProcessingPrimary(true);
            let resultData = '';

            if (cryptoMode === 'RSA') {
                 if (!keyPair?.public_pem) {
                    addLog(t('demo:systemLogs.noKeyPairError'), 'error');
                    throw new Error(t('demo:errors.noPublicKey'));
                }
                addLog(t('demo:systemLogs.encryptingMessage', { bytes: messageToProcess.length }), 'info');
                resultData = await rsa_encrypt_base64(keyPair.public_pem, messageToProcess);
                addLog(t('demo:systemLogs.encryptSuccess'), 'success');
                if (messageToProcess.length > 190) {
                    addLog(t('demo:systemLogs.hybridNotice'), 'info');
                }
                addLog(t('demo:systemLogs.privateKeyOnly'), 'info');
            } else if (cryptoMode === 'ECDH') {
                if (!keyPairA?.private_pem || !keyPairB?.public_pem) {
                    addLog(t('demo:systemLogs.noEcdhKeyPairsError'), 'error');
                    throw new Error(t('demo:errors.noEcdhKeysForEncryption'));
                }
                addLog(t('demo:systemLogs.derivingSecretEcdh', { userA: 'A', userB: 'B' }), 'info');
                const sharedSecret = await derive_p256_shared_secret_wasm(keyPairA.private_pem, keyPairB.public_pem);
                addLog(t('demo:systemLogs.sharedSecretDerivedEcdh'), 'success');

                addLog(t('demo:systemLogs.encryptingMessageEcdh', { bytes: messageToProcess.length }), 'info');
                const encryptedPayload = await encrypt_with_shared_secret_wasm(messageToProcess, sharedSecret);
                resultData = JSON.stringify(encryptedPayload);
                addLog(t('demo:systemLogs.encryptSuccessEcdh'), 'success');
            }
            storeSetProcessedData(resultData);
            storeSetOriginalMessage(messageToProcess);
            return resultData;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            const logKey = cryptoMode === 'RSA' ? 'demo:systemLogs.encryptError' : 'demo:systemLogs.encryptErrorEcdh';
            addLog(t(logKey, { message: errorMessage }), 'error');
            console.error('Primary processing (encryption) error:', error);
            throw error;
        } finally {
            setIsProcessingPrimary(false);
        }
    }, [keyPair, keyPairA, keyPairB, cryptoMode, addLog, t, storeSetProcessedData, storeSetOriginalMessage]);

    const processSecondaryAction = useCallback(async (dataToProcess: string) => {
        try {
            if (!dataToProcess) {
                 addLog(t(cryptoMode === 'RSA' ? 'demo:systemLogs.noEncryptedMessage' : 'demo:systemLogs.noEncryptedMessageEcdh'), 'error');
                throw new Error(t(cryptoMode === 'RSA' ? 'demo:errors.noEncryptedMessage' : 'demo:errors.noEncryptedMessageEcdh'));
            }

            setIsProcessingSecondary(true);
            let resultMessage = '';

            if (cryptoMode === 'RSA') {
                if (!keyPair?.private_pem) {
                    addLog(t('demo:systemLogs.noKeyPairError'), 'error');
                    throw new Error(t('demo:errors.noPrivateKey'));
                }
                addLog(t('demo:systemLogs.decryptingMessage'), 'info');
                resultMessage = await rsa_decrypt_base64(keyPair.private_pem, dataToProcess);
                addLog(t('demo:systemLogs.decryptSuccess'), 'success');
            } else if (cryptoMode === 'ECDH') {
                 if (!keyPairB?.private_pem || !keyPairA?.public_pem) {
                    addLog(t('demo:systemLogs.noEcdhKeyPairsError'), 'error');
                    throw new Error(t('demo:errors.noEcdhKeysForDecryption'));
                }
                addLog(t('demo:systemLogs.derivingSecretEcdh', { userA: 'B', userB: 'A' }), 'info');
                const sharedSecret = await derive_p256_shared_secret_wasm(keyPairB.private_pem, keyPairA.public_pem);
                addLog(t('demo:systemLogs.sharedSecretDerivedEcdh'), 'success');
                
                addLog(t('demo:systemLogs.decryptingMessageEcdh'), 'info');
                const encryptedPayload = JSON.parse(dataToProcess);
                resultMessage = await decrypt_with_shared_secret_wasm(encryptedPayload, sharedSecret);
                addLog(t('demo:systemLogs.decryptSuccessEcdh'), 'success');
            }
            storeSetDecryptedMessage(resultMessage);
            return resultMessage;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            const logKey = cryptoMode === 'RSA' ? 'demo:systemLogs.decryptError' : 'demo:systemLogs.decryptErrorEcdh';
            addLog(t(logKey, { message: errorMessage }), 'error');
            if (cryptoMode === 'RSA') {
                addLog(t('demo:systemLogs.wrongKeyError'), 'error');
            }
            console.error('Secondary processing (decryption) error:', error);
            throw error;
        } finally {
            setIsProcessingSecondary(false);
        }
    }, [keyPair, keyPairA, keyPairB, cryptoMode, addLog, t, storeSetDecryptedMessage, originalMessage]);

    const protectKeyPair = useCallback(async (passphrase: string, kp?: KeyPair) => {
        if (cryptoMode === 'ECDH') {
            addLog(t('demo:systemLogs.ecdhKeyProtectionNotSupported'), 'warning');
            return null;
        }
        try {
            const keyPairToUse = kp || keyPair;
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
            const protectedKeys = await protect_keypair(keyPairToUse.private_pem, keyPairToUse.public_pem, passphrase);
            addLog(t('demo:systemLogs.keyPairProtected'), 'success');
            return protectedKeys;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.keyProtectionError', { message: errorMessage }), 'error');
            throw error;
        } finally {
            setIsProtecting(false);
        }
    }, [keyPair, cryptoMode, addLog, t]);

    const unprotectKeyPair = useCallback(async (protectedKeyPair: ProtectedKeyPair, passphrase: string) => {
        if (cryptoMode === 'ECDH') {
            addLog(t('demo:systemLogs.ecdhKeyProtectionNotSupported'), 'warning');
            return null;
        }
        try {
            if (!passphrase) {
                addLog(t('demo:systemLogs.noPassphrase'), 'error');
                throw new Error(t('demo:errors.noPassphrase'));
            }
            setIsUnprotecting(true);
            addLog(t('demo:systemLogs.unprotectingKeyPair'), 'info');
            const unprotectedKP = await unprotect_keypair(protectedKeyPair, passphrase);
            addLog(t('demo:systemLogs.keyPairUnprotected'), 'success');
            return unprotectedKP;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.keyUnprotectionError', { message: errorMessage }), 'error');
            throw error;
        } finally {
            setIsUnprotecting(false);
        }
    }, [cryptoMode, addLog, t]);
    
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
            const protectedData = await protect_message(message, passphrase);
            addLog(t('demo:systemLogs.messageProtected'), 'success');
            return protectedData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.messageProtectionError', { message: errorMessage }), 'error');
            throw error;
        } finally {
            setIsProtecting(false);
        }
    }, [addLog, t]);

    const unprotectMessageWithPassword = useCallback(async (protectedMsg: ProtectedMessage, passphrase: string) => {
        try {
            if (!passphrase) {
                addLog(t('demo:systemLogs.noPassphrase'), 'error');
                throw new Error(t('demo:errors.noPassphrase'));
            }
            setIsUnprotecting(true);
            addLog(t('demo:systemLogs.unprotectingMessage'), 'info');
            const decryptedData = await unprotect_message(
                protectedMsg.ciphertext,
                passphrase,
                protectedMsg.salt,
                protectedMsg.nonce
            );
            addLog(t('demo:systemLogs.messageUnprotected'), 'success');
            return decryptedData;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : t('common:error.unknown');
            addLog(t('demo:systemLogs.messageUnprotectionError', { message: errorMessage }), 'error');
            throw error;
        } finally {
            setIsUnprotecting(false);
        }
    }, [addLog, t]);

    const resetCrypto = useCallback(() => {
        storeResetState();
        addLog(t('demo:systemLogs.demoReset'), 'info');
    }, [addLog, t, storeResetState]);

    return {
        cryptoMode,
        keyPair,
        keyPairA,
        keyPairB,
        originalMessage,
        processedData,
        decryptedMessage,
        isGenerating,
        isProcessingPrimary,
        isProcessingSecondary,
        isProtecting,
        isUnprotecting,
        generateKeyPair,
        processPrimaryAction,
        processSecondaryAction,
        protectKeyPair,
        unprotectKeyPair,
        protectMessageWithPassword,
        unprotectMessageWithPassword,
        resetCrypto,
        storeSetKeyPair,
        storeSetKeyPairA,
        storeSetKeyPairB,
        storeSetOriginalMessage,
        storeSetProcessedData,
        storeSetDecryptedMessage,
    };
};