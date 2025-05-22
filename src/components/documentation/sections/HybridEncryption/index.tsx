import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';
import InfoBlock from '../../InfoBlock';

export const HybridEncryption = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  const hybridRsaExample = `// Demonstration of hybrid encryption - works with messages of any size
const largeData = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
// (Imagine a 10+ KB message here)

// Vaultic automatically detects the size and uses hybrid mode
const encrypted = rsa_encrypt_base64(publicKey, largeData);

// Decryption is just as simple
const decrypted = rsa_decrypt_base64(privateKey, encrypted);`;

  const hybridFormatCode = `// Structure of the encrypted message in hybrid mode (JSON represented here)
{
  "version": 1,           // Format version
  "mode": "hybrid",       // Indicates hybrid mode
  "aes_key": "...",       // AES key encrypted with RSA (Base64)
  "aes_nonce": "...",     // Nonce for AES-GCM (Base64)
  "ciphertext": "..."     // Message encrypted with AES-GCM (Base64)
}`;

  const ecdhExampleCode = `// Generation of ECDH key pairs for Alice and Bob
const aliceKeys = generate_ecdsa_keypair_wasm(WasmEccCurve.P256);
const bobKeys = generate_ecdsa_keypair_wasm(WasmEccCurve.P256);

// Derivation of the shared secret (by Alice)
const sharedSecret = derive_p256_shared_secret_wasm(
  aliceKeys.private_pem,
  bobKeys.public_pem
);

// Encryption of a large message with the shared secret
const message = "A very long message to encrypt with ECDH+AES...";
const context = "chat-application-v1"; // Optional context for HKDF

const encrypted = encrypt_with_shared_secret_wasm(
  message,
  sharedSecret,
  context
);

// Bob can now decrypt with his derived shared secret
const bobSharedSecret = derive_p256_shared_secret_wasm(
  bobKeys.private_pem,
  aliceKeys.public_pem
);

const decrypted = decrypt_with_shared_secret_wasm(
  encrypted,
  bobSharedSecret,
  context
);`;

  const hybridComparisonCode = `// Performance comparison for a 1 MB message
// (Illustrative data)

// Direct RSA: Impossible (limited to ~190 bytes)

// RSA+AES hybrid: ~500 ms
// - RSA (2048-bit): ~100 ms to encrypt the AES key
// - AES-GCM (256-bit): ~400 ms for the 1 MB message

// ECDH+AES: ~450 ms
// - ECDH derivation: ~50 ms
// - AES-GCM (256-bit): ~400 ms for the 1 MB message`;

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-pretty" id="hybrid-encryption">
          {t('documentation:hybridEncryption.title')}
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 w-full text-pretty">
          {t('documentation:hybridEncryption.intro')}
        </p>

        <InfoBlock color="blue" title={t('documentation:hybridEncryption.whyUse.title')}>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('documentation:hybridEncryption.whyUse.item1')}</li>
            <li>{t('documentation:hybridEncryption.whyUse.item2')}</li>
            <li>{t('documentation:hybridEncryption.whyUse.item3')}</li>
            <li>{t('documentation:hybridEncryption.whyUse.item4')}</li>
          </ul>
        </InfoBlock>
        
        <div className="space-y-12 w-full mt-10">
          <section id="rsa-hybrid" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:hybridEncryption.rsaHybrid.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:hybridEncryption.rsaHybrid.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:hybridEncryption.rsaHybrid.exampleTitle')}
              code={hybridRsaExample}
            />
            
            <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300 text-sm">
              <strong className="text-blue-400">{t('common:tip')}</strong> {t('documentation:hybridEncryption.rsaHybrid.howItWorks')}
            </div>
          </section>
          
          <section id="hybrid-format" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:hybridEncryption.format.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:hybridEncryption.format.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:hybridEncryption.format.exampleTitle')}
              code={hybridFormatCode}
            />
            
            <div className="flex gap-4 mt-4">
              <div className="flex-1 bg-gray-800/50 p-4 rounded-md text-gray-300 text-sm">
                <strong className="text-green-400">{t('common:tip')}</strong> {t('documentation:hybridEncryption.format.advantage')}
              </div>
            </div>
          </section>
          
          <section id="ecdh-hybrid" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:hybridEncryption.ecdhHybrid.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:hybridEncryption.ecdhHybrid.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:hybridEncryption.ecdhHybrid.exampleTitle')}
              code={ecdhExampleCode}
            />
            
            <InfoBlock color="green" title={t('documentation:hybridEncryption.ecdhHybrid.ideal.title')}>
              <p>
                {t('documentation:hybridEncryption.ecdhHybrid.ideal.content')}
              </p>
            </InfoBlock>
          </section>
          
          <section id="hybrid-comparison" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:hybridEncryption.comparison.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:hybridEncryption.comparison.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:hybridEncryption.comparison.exampleTitle')}
              code={hybridComparisonCode}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">{t('documentation:hybridEncryption.comparison.rsaAes.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li><span className="text-green-400">✓</span> {t('documentation:hybridEncryption.comparison.rsaAes.pro1')}</li>
                  <li><span className="text-green-400">✓</span> {t('documentation:hybridEncryption.comparison.rsaAes.pro2')}</li>
                  <li><span className="text-red-400">✗</span> {t('documentation:hybridEncryption.comparison.rsaAes.con1')}</li>
                  <li><span className="text-red-400">✗</span> {t('documentation:hybridEncryption.comparison.rsaAes.con2')}</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">{t('documentation:hybridEncryption.comparison.ecdhAes.title')}</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li><span className="text-green-400">✓</span> {t('documentation:hybridEncryption.comparison.ecdhAes.pro1')}</li>
                  <li><span className="text-green-400">✓</span> {t('documentation:hybridEncryption.comparison.ecdhAes.pro2')}</li>
                  <li><span className="text-red-400">✗</span> {t('documentation:hybridEncryption.comparison.ecdhAes.con1')}</li>
                  <li><span className="text-red-400">✗</span> {t('documentation:hybridEncryption.comparison.ecdhAes.con2')}</li>
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

export default HybridEncryption; 