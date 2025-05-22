import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';
import InfoBlock from '../../InfoBlock';

export const RSACrypto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  const rsaKeyGenerationCode = `import { generate_rsa_keypair_pem } from '@vaultic/crypto-engine';

// Générer une paire de clés RSA 2048-bit (taille par défaut)
const keypair = generate_rsa_keypair_pem();
console.log("Public Key:", keypair.public_pem);
console.log("Private Key:", keypair.private_pem);`;

  const rsaEncryptionCode = `import { rsa_encrypt_base64 } from '@vaultic/crypto-engine';

// Message à chiffrer
const message = "Message confidentiel à chiffrer avec RSA";

// Chiffrer avec la clé publique
const encrypted = rsa_encrypt_base64(keypair.public_pem, message);
console.log("Message chiffré:", encrypted);`;

  const rsaDecryptionCode = `import { rsa_decrypt_base64 } from '@vaultic/crypto-engine';

// Déchiffrer avec la clé privée
const decrypted = rsa_decrypt_base64(keypair.private_pem, encrypted);
console.log("Message déchiffré:", decrypted);`;

  const rsaHybridDescriptionCode = `// Pour les messages courts (< 190 bytes):
// -> Chiffrement RSA direct avec PKCS#1 v1.5 padding

// Pour les messages longs (>= 190 bytes):
// 1. Génération d'une clé AES-256 aléatoire
// 2. Chiffrement du message avec AES-GCM
// 3. Chiffrement de la clé AES avec RSA
// 4. Combinaison des résultats en format spécial`;

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-pretty" id="rsa-crypto">
          {t('documentation:rsaCrypto.title')}
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 w-full text-pretty">
          {t('documentation:rsaCrypto.intro')}
        </p>

        <InfoBlock color="yellow" title={t('documentation:rsaCrypto.marvinProtection.title')}>
          <p>
            {t('documentation:rsaCrypto.marvinProtection.content')}
          </p>
        </InfoBlock>
        
        <div className="space-y-12 w-full mt-10">
          <section id="rsa-key-generation" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:rsaCrypto.keyGeneration.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:rsaCrypto.keyGeneration.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:rsaCrypto.keyGeneration.title')}
              code={rsaKeyGenerationCode}
            />
            
            <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300 text-sm">
              <strong className="text-blue-400">{t('common:tip')}</strong> {t('documentation:rsaCrypto.keyGeneration.note')}
            </div>
          </section>
          
          <section id="rsa-encryption" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:rsaCrypto.encryption.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:rsaCrypto.encryption.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:rsaCrypto.encryption.title')}
              code={rsaEncryptionCode}
            />
            
            <div className="flex gap-4 mt-4">
              <div className="flex-1 bg-gray-800/50 p-4 rounded-md text-gray-300 text-sm">
                <strong className="text-green-400">{t('common:tip')}</strong> {t('documentation:rsaCrypto.encryption.automaticNote')}
              </div>
            </div>
          </section>
          
          <section id="rsa-decryption" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:rsaCrypto.decryption.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:rsaCrypto.decryption.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:rsaCrypto.decryption.title')}
              code={rsaDecryptionCode}
            />
            
            <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300 text-sm">
              <strong className="text-blue-400">{t('common:tip')}</strong> {t('documentation:rsaCrypto.decryption.formatNote')}
            </div>
          </section>
          
          <section id="hybrid-encryption" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:rsaCrypto.hybrid.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:rsaCrypto.hybrid.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title="Comment fonctionne le chiffrement hybride"
              code={rsaHybridDescriptionCode}
            />
            
            <InfoBlock color="green" title={t('documentation:rsaCrypto.hybrid.advantage.title')}>
              <p>
                {t('documentation:rsaCrypto.hybrid.advantage.content')}
              </p>
            </InfoBlock>
          </section>
          
          <section id="rsa-security" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:rsaCrypto.security.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">{t('documentation:rsaCrypto.security.bestPractices.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>{t('documentation:rsaCrypto.security.bestPractices.item1')}</li>
                  <li>{t('documentation:rsaCrypto.security.bestPractices.item2')}</li>
                  <li>{t('documentation:rsaCrypto.security.bestPractices.item3')}</li>
                  <li>{t('documentation:rsaCrypto.security.bestPractices.item4')}</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-red-400 mb-2">{t('documentation:rsaCrypto.security.limitations.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>{t('documentation:rsaCrypto.security.limitations.item1')}</li>
                  <li>{t('documentation:rsaCrypto.security.limitations.item2')}</li>
                  <li>{t('documentation:rsaCrypto.security.limitations.item3')}</li>
                  <li>{t('documentation:rsaCrypto.security.limitations.item4')}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default RSACrypto; 