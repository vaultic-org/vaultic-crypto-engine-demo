import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';
import InfoBlock from '../../InfoBlock';

export const Usage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="usage">{t('documentation:usage.title')}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
          {t('documentation:usage.intro')}
        </p>
        
        <div id="key-generation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="key-generation-heading">{t('documentation:usage.keyGeneration.title')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:usage.keyGeneration.description')}</p>
          
          <div className="mb-4 p-4 bg-blue-900/30 border border-blue-800 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">{t('documentation:usage.understandingKeyGeneration.title')}</h3>
            <p className="text-gray-300">
              {t('documentation:usage.understandingKeyGeneration.intro')}
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
              <li dangerouslySetInnerHTML={{ __html: t('documentation:usage.understandingKeyGeneration.publicKey') }} />
              <li dangerouslySetInnerHTML={{ __html: t('documentation:usage.understandingKeyGeneration.privateKey') }} />
              <li dangerouslySetInnerHTML={{ __html: t('documentation:usage.understandingKeyGeneration.pemFormat') }} />
            </ul>
          </div>
          
          <CodeExamples
            language="javascript"
            title={t('documentation:usage.keyGeneration.exampleTitle')}
            code={`import { generate_rsa_keypair_pem } from '@vaultic/crypto-engine';

// Generate a 2048-bit RSA key pair (default)
const keypair = await generate_rsa_keypair_pem();
console.log('Public Key:', keypair.public_pem);
console.log('Private Key:', keypair.private_pem);`}
          />
        </div>

        <div id="encryption" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="encryption-heading">{t('documentation:usage.encryption.title')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:usage.encryption.description')}</p>
          
          <div className="mb-4 p-4 bg-green-900/30 border border-green-800 rounded-lg">
            <h3 className="text-lg font-semibold text-green-300 mb-2">{t('documentation:usage.encryptionProcess.title')}</h3>
            <p className="text-gray-300">
              {t('documentation:usage.encryptionProcess.intro')}
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
              <li>{t('documentation:usage.encryptionProcess.smallMessages')}</li>
              <li>{t('documentation:usage.encryptionProcess.largeMessages')}</li>
              <li>{t('documentation:usage.encryptionProcess.base64Output')}</li>
              <li>{t('documentation:usage.encryptionProcess.noManualSizing')}</li>
            </ul>
          </div>
          
          <CodeExamples
            language="javascript"
            title={t('documentation:usage.encryption.exampleTitle')}
            code={`import { rsa_encrypt_base64 } from '@vaultic/crypto-engine';

// Works with messages of any size - hybrid encryption is automatic
const message = 'Secret message - can be any length, Vaultic handles it automatically';
const encrypted = await rsa_encrypt_base64(keypair.public_pem, message);
console.log('Encrypted:', encrypted);`}
          />
        </div>

        <div id="decryption" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="decryption-heading">{t('documentation:usage.decryption.title')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:usage.decryption.description')}</p>
          
          <div className="mb-4 p-4 bg-purple-900/30 border border-purple-800 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">{t('documentation:usage.decryptionProcess.title')}</h3>
            <p className="text-gray-300">
              {t('documentation:usage.decryptionProcess.intro')}
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
              <li>{t('documentation:usage.decryptionProcess.autoDetect')}</li>
              <li>{t('documentation:usage.decryptionProcess.privateKeyDecrypt')}</li>
              <li>{t('documentation:usage.decryptionProcess.autoBase64')}</li>
              <li>{t('documentation:usage.decryptionProcess.returnPlaintext')}</li>
            </ul>
          </div>
          
          <CodeExamples
            language="javascript"
            title={t('documentation:usage.decryption.exampleTitle')}
            code={`import { rsa_decrypt_base64 } from '@vaultic/crypto-engine';

// Automatically detects encryption method (direct RSA or hybrid)
const decrypted = await rsa_decrypt_base64(keypair.private_pem, encrypted);
console.log('Decrypted:', decrypted);`}
          />
        </div>

        <div id="key-protection" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="key-protection-heading">{t('documentation:usage.keyProtection.title')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:usage.keyProtection.description')}</p>
          
          <InfoBlock color="yellow" title={t('documentation:usage.whyProtectKeys.title')}>
            <p dangerouslySetInnerHTML={{ __html: t('documentation:usage.whyProtectKeys.content') }} />
          </InfoBlock>
          
          <div className="mb-4 p-4 bg-yellow-900/30 border border-yellow-800 rounded-lg mt-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">{t('documentation:usage.passwordProtectionProcess.title')}</h3>
            <p className="text-gray-300">
              {t('documentation:usage.passwordProtectionProcess.intro')}
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-300">
              <li>{t('documentation:usage.passwordProtectionProcess.aesGcm')}</li>
              <li>{t('documentation:usage.passwordProtectionProcess.pbkdf2')}</li>
              <li>{t('documentation:usage.passwordProtectionProcess.randomSalt')}</li>
              <li>{t('documentation:usage.passwordProtectionProcess.structuredObject')}</li>
            </ol>
          </div>
          
          <CodeExamples
            language="javascript"
            title={t('documentation:usage.keyProtection.exampleTitle')}
            code={`import { protect_keypair, unprotect_keypair } from '@vaultic/crypto-engine';

// Protect a key pair with a password
const passphrase = "secure-password-123";
const protectedKeypair = await protect_keypair(
  keypair.private_pem, 
  keypair.public_pem, 
  passphrase
);

// Store the protected key pair
console.log('Protected Private Key:', protectedKeypair.encrypted_private);
console.log('Salt:', protectedKeypair.salt);
console.log('Nonce:', protectedKeypair.nonce);

// Later, unprotect the key pair
const recoveredKeypair = await unprotect_keypair(protectedKeypair, passphrase);`}
          />
        </div>

        <div id="message-protection" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="message-protection-heading">{t('documentation:usage.messageProtection.title')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:usage.messageProtection.description')}</p>
          
          <div className="mb-4 p-4 bg-indigo-900/30 border border-indigo-800 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-300 mb-2">{t('documentation:usage.passwordVsRsa.title')}</h3>
            <p className="text-gray-300">
              {t('documentation:usage.passwordVsRsa.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="font-semibold text-indigo-200">{t('documentation:usage.passwordVsRsa.passwordBased.title')}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>{t('documentation:usage.passwordVsRsa.passwordBased.samePassword')}</li>
                  <li>{t('documentation:usage.passwordVsRsa.passwordBased.noKeyManagement')}</li>
                  <li>{t('documentation:usage.passwordVsRsa.passwordBased.secureSharing')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-200">{t('documentation:usage.passwordVsRsa.rsaBased.title')}</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>{t('documentation:usage.passwordVsRsa.rsaBased.publicKeyEncrypt')}</li>
                  <li>{t('documentation:usage.passwordVsRsa.rsaBased.complexButSecure')}</li>
                  <li>{t('documentation:usage.passwordVsRsa.rsaBased.noPasswordSharing')}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <CodeExamples
            language="javascript"
            title={t('documentation:usage.messageProtection.exampleTitle')}
            code={`import { protect_message, unprotect_message } from '@vaultic/crypto-engine';

// Protect a message with a password
const message = "Secret message protected with password";
const protectedMessage = await protect_message(message, passphrase);

// Store the protected message
console.log('Protected Message:', protectedMessage.ciphertext);
console.log('Salt:', protectedMessage.salt);
console.log('Nonce:', protectedMessage.nonce);

// Later, unprotect the message
const recoveredMessage = await unprotect_message(
  protectedMessage.ciphertext,
  passphrase,
  protectedMessage.salt,
  protectedMessage.nonce
);`}
          />
        </div>
      </div>
      
      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default Usage; 