import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';

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