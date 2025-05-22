import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';
import InfoBlock from '../../InfoBlock';

export const PasswordProtection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  const keyPairProtectionCode = `import { 
  generate_rsa_keypair_pem, 
  protect_keypair, 
  unprotect_keypair 
} from '@vaultic/crypto-engine';

// Generate an RSA key pair
const keypair = generate_rsa_keypair_pem();

// Protect the key pair with a password
const passphrase = "strong-and-complex-password";
const protectedKeypair = protect_keypair(
  keypair.private_pem,
  keypair.public_pem,
  passphrase
);

// Returned structure containing protected information
console.log("Encrypted Private Key:", protectedKeypair.encrypted_private);
console.log("Public Key:", protectedKeypair.public_pem);
console.log("Salt:", protectedKeypair.salt);
console.log("Nonce:", protectedKeypair.nonce);

// Store this information securely
// ...

// Later, retrieve the key pair with the password
const recoveredKeypair = unprotect_keypair(protectedKeypair, passphrase);

// Verify that the keys match
console.log("Keys recovered successfully:", 
  keypair.private_pem === recoveredKeypair.private_pem);`;

  const messageProtectionCode = `import { 
  protect_message, 
  unprotect_message 
} from '@vaultic/crypto-engine';

// Message to protect
const message = "Confidential message to protect with a password";
const passphrase = "strong-and-complex-password";

// Protect the message with a password
const protectedMessage = protect_message(message, passphrase);

// Returned structure containing protected information
console.log("Encrypted Message:", protectedMessage.ciphertext);
console.log("Salt:", protectedMessage.salt);
console.log("Nonce:", protectedMessage.nonce);

// Store this information securely
// ...

// Later, retrieve the message with the password
const recoveredMessage = unprotect_message(
  protectedMessage.ciphertext,
  passphrase,
  protectedMessage.salt,
  protectedMessage.nonce
);

// Verify that the message matches
console.log("Message recovered successfully:", message === recoveredMessage);`;

  const passwordTipsCode = `// Best practices for password security
const goodPassphrase = "K7*mZ9#pL2@qR5$tF8!vC3&";  // Complex, random
const badPassphrase = "password123";                // Avoid!

// Key derivation with PBKDF2 (used internally by Vaultic)
// - Iteration count: 100,000+
// - Hash function: SHA-256
// - Random salt: 16 bytes
// - Derived key: 32 bytes (256 bits)`;

  const technicalDetailsCode = `// How password protection works
// 1. Generation of a random salt (16 bytes)
// 2. Derivation of a key with PBKDF2 (password + salt)
//    pbkdf2_hmac_sha256(password, salt, 100000, 32)
// 3. Generation of a random nonce for AES-GCM (12 bytes)
// 4. Encryption of data with AES-256-GCM
//    aes_256_gcm_encrypt(data, derived_key, nonce)
// 5. Combination of salt, nonce, and encrypted data`;

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-pretty" id="password-protection">
          {t('documentation:passwordProtection.title')}
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 w-full text-pretty">
          {t('documentation:passwordProtection.intro')}
        </p>

        <InfoBlock color="yellow" title={t('documentation:passwordProtection.security.title')}>
          <p>
            {t('documentation:passwordProtection.security.content')}
          </p>
        </InfoBlock>
        
        <div className="space-y-12 w-full mt-10">
          <section id="keypair-protection" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:passwordProtection.keypair.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:passwordProtection.keypair.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:passwordProtection.keypair.exampleTitle')}
              code={keyPairProtectionCode}
            />
            
            <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300 text-sm">
              <strong className="text-blue-400">{t('common:tip')}</strong> {t('documentation:passwordProtection.keypair.useCase')}
            </div>
          </section>
          
          <section id="message-protection" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:passwordProtection.message.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:passwordProtection.message.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:passwordProtection.message.exampleTitle')}
              code={messageProtectionCode}
            />
            
            <div className="flex gap-4 mt-4">
              <div className="flex-1 bg-gray-800/50 p-4 rounded-md text-gray-300 text-sm">
                <strong className="text-green-400">{t('common:tip')}</strong> {t('documentation:passwordProtection.message.advantage')}
              </div>
            </div>
          </section>
          
          <section id="password-best-practices" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:passwordProtection.bestPractices.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:passwordProtection.bestPractices.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:passwordProtection.bestPractices.exampleTitle')}
              code={passwordTipsCode}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-green-400 mb-2">{t('documentation:passwordProtection.bestPractices.recommendations.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>{t('documentation:passwordProtection.bestPractices.recommendations.item1')}</li>
                  <li>{t('documentation:passwordProtection.bestPractices.recommendations.item2')}</li>
                  <li>{t('documentation:passwordProtection.bestPractices.recommendations.item3')}</li>
                  <li>{t('documentation:passwordProtection.bestPractices.recommendations.item4')}</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-red-400 mb-2">{t('documentation:passwordProtection.bestPractices.avoid.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>{t('documentation:passwordProtection.bestPractices.avoid.item1')}</li>
                  <li>{t('documentation:passwordProtection.bestPractices.avoid.item2')}</li>
                  <li>{t('documentation:passwordProtection.bestPractices.avoid.item3')}</li>
                  <li>{t('documentation:passwordProtection.bestPractices.avoid.item4')}</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section id="technical-details" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:passwordProtection.technical.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:passwordProtection.technical.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:passwordProtection.technical.exampleTitle')}
              code={technicalDetailsCode}
            />
            
            <InfoBlock color="blue" title={t('documentation:passwordProtection.technical.keyDerivation.title')}>
              <p>
                {t('documentation:passwordProtection.technical.keyDerivation.content')}
              </p>
            </InfoBlock>
          </section>
        </div>
      </div>
      
      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default PasswordProtection; 