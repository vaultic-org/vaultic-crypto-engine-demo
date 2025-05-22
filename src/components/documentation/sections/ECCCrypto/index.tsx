import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';
import InfoBlock from '../../InfoBlock';

export const ECCCrypto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  const ecdsaGenerationCode = `import { 
  generate_ecdsa_keypair_wasm, 
  WasmEccCurve 
} from '@vaultic/crypto-engine';

// Generate P-256 ECDSA key pair (secp256r1)
const p256Keypair = generate_ecdsa_keypair_wasm(WasmEccCurve.P256);
console.log("P-256 Public Key:", p256Keypair.public_pem);
console.log("P-256 Private Key:", p256Keypair.private_pem);

// Or generate K-256 ECDSA key pair (secp256k1)
const k256Keypair = generate_ecdsa_keypair_wasm(WasmEccCurve.K256);
console.log("K-256 Public Key:", k256Keypair.public_pem);
console.log("K-256 Private Key:", k256Keypair.private_pem);`;

  const ecdsaSigningCode = `import {
  ecdsa_sign_p256_wasm,
  ecdsa_verify_p256_wasm,
  ecdsa_sign_k256_wasm,
  ecdsa_verify_k256_wasm
} from '@vaultic/crypto-engine';

// Message to sign
const message = "Message to sign with ECDSA";

// Sign with P-256
const p256Signature = ecdsa_sign_p256_wasm(message, p256Keypair.private_pem);
console.log("P-256 Signature:", p256Signature);

// Verify P-256 signature
const isP256Valid = ecdsa_verify_p256_wasm(message, p256Signature, p256Keypair.public_pem);
console.log("P-256 signature valid:", isP256Valid);

// Sign with K-256
const k256Signature = ecdsa_sign_k256_wasm(message, k256Keypair.private_pem);
console.log("K-256 Signature:", k256Signature);

// Verify K-256 signature
const isK256Valid = ecdsa_verify_k256_wasm(message, k256Signature, k256Keypair.public_pem);
console.log("K-256 signature valid:", isK256Valid);`;

  const ecdhKeyAgreementCode = `import {
  derive_p256_shared_secret_wasm,
  derive_k256_shared_secret_wasm
} from '@vaultic/crypto-engine';

// User A and User B each have a P-256 key pair
const aliceP256Keypair = generate_ecdsa_keypair_wasm(WasmEccCurve.P256);
const bobP256Keypair = generate_ecdsa_keypair_wasm(WasmEccCurve.P256);

// Alice derives a shared secret using her private key and Bob's public key
const aliceSharedSecret = derive_p256_shared_secret_wasm(
  aliceP256Keypair.private_pem,
  bobP256Keypair.public_pem
);

// Bob derives the same secret using his private key and Alice's public key
const bobSharedSecret = derive_p256_shared_secret_wasm(
  bobP256Keypair.private_pem,
  aliceP256Keypair.public_pem
);

// Both shared secrets are identical
console.log("Shared secrets identical:", 
  JSON.stringify(aliceSharedSecret) === JSON.stringify(bobSharedSecret));`;

  const ecdhEncryptionCode = `import {
  encrypt_with_shared_secret_wasm,
  decrypt_with_shared_secret_wasm
} from '@vaultic/crypto-engine';

// Encrypt with the shared secret derived via ECDH
const message = "Message encrypted with ECDH shared secret";
const contextInfo = "p256-encryption-2023"; // Optional context for HKDF

// Alice encrypts a message for Bob
const encrypted = encrypt_with_shared_secret_wasm(
  message, 
  aliceSharedSecret, 
  contextInfo
);

// Bob decrypts Alice's message
const decrypted = decrypt_with_shared_secret_wasm(
  encrypted, 
  bobSharedSecret, 
  contextInfo
);

console.log("Decrypted message:", decrypted);`;

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-pretty" id="ecc-crypto">
          {t('documentation:eccCrypto.title')} 
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 w-full text-pretty">
          {t('documentation:eccCrypto.intro')}
        </p>

        <InfoBlock color="blue" title={t('documentation:eccCrypto.whyUseEcc.title')}>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('documentation:eccCrypto.whyUseEcc.item1')}</li>
            <li>{t('documentation:eccCrypto.whyUseEcc.item2')}</li>
            <li>{t('documentation:eccCrypto.whyUseEcc.item3')}</li>
            <li>{t('documentation:eccCrypto.whyUseEcc.item4')}</li>
          </ul>
        </InfoBlock>
        
        <div className="space-y-12 w-full mt-10">
          <section id="ecdsa-key-generation" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:eccCrypto.keyGeneration.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:eccCrypto.keyGeneration.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:eccCrypto.keyGeneration.exampleTitle')}
              code={ecdsaGenerationCode}
            />
            
            <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300 text-sm">
              <strong className="text-blue-400">{t('common:tip')}</strong> {t('documentation:eccCrypto.keyGeneration.note')}
            </div>
          </section>
          
          <section id="ecdsa-signing" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:eccCrypto.signing.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:eccCrypto.signing.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:eccCrypto.signing.exampleTitle')}
              code={ecdsaSigningCode}
            />
            
            <div className="flex gap-4 mt-4">
              <div className="flex-1 bg-gray-800/50 p-4 rounded-md text-gray-300 text-sm">
                <strong className="text-green-400">{t('common:tip')}</strong> {t('documentation:eccCrypto.signing.useCase')}
              </div>
              <div className="flex-1 bg-gray-800/50 p-4 rounded-md text-gray-300 text-sm">
                <strong className="text-yellow-400">{t('common:tip')}</strong> {t('documentation:eccCrypto.signing.security')}
              </div>
            </div>
          </section>
          
          <section id="ecdh-key-agreement" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:eccCrypto.keyAgreement.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:eccCrypto.keyAgreement.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:eccCrypto.keyAgreement.exampleTitle')}
              code={ecdhKeyAgreementCode}
            />
            
            <InfoBlock color="green" title={t('documentation:eccCrypto.keyAgreement.advantageTitle')}>
              <p>
                {t('documentation:eccCrypto.keyAgreement.advantageContent')}
              </p>
            </InfoBlock>
          </section>
          
          <section id="ecdh-encryption" className="w-full">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">{t('documentation:eccCrypto.encryption.title')}</h2>
            <p className="text-gray-300 mb-5">
              {t('documentation:eccCrypto.encryption.description')}
            </p>
            
            <CodeExamples
              language="javascript"
              title={t('documentation:eccCrypto.encryption.exampleTitle')}
              code={ecdhEncryptionCode}
            />
            
            <div className="bg-gray-800/50 p-4 rounded-md mt-4 text-gray-300 text-sm">
              <strong className="text-purple-400">{t('common:tip')}</strong> {t('documentation:eccCrypto.encryption.howItWorks')}
            </div>
          </section>
        </div>
      </div>
      
      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default ECCCrypto; 