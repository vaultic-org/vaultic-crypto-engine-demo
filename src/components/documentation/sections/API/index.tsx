import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';

const apiSections = [
  {
    id: 'generate_rsa_keypair_pem',
    label: 'generate_rsa_keypair_pem',
    signature: 'generate_rsa_keypair_pem(): KeyPair',
    returnType: 'KeyPair',
    example: `const keypair = generate_rsa_keypair_pem();
console.log("Public Key:", keypair.public_pem);
console.log("Private Key:", keypair.private_pem);`,
    type: `interface KeyPair {
  public_pem: string;
  private_pem: string;
}`
  },
  {
    id: 'rsa_encrypt_base64',
    label: 'rsa_encrypt_base64',
    signature: 'rsa_encrypt_base64(public_key: string, data: string): string',
    returnType: 'string',
    example: `const encrypted = rsa_encrypt_base64(keypair.public_pem, "Secret message");
console.log("Encrypted:", encrypted);`,
  },
  {
    id: 'rsa_decrypt_base64',
    label: 'rsa_decrypt_base64',
    signature: 'rsa_decrypt_base64(private_key: string, encrypted_data: string): string',
    returnType: 'string',
    example: `const decrypted = rsa_decrypt_base64(keypair.private_pem, encrypted);
console.log("Decrypted:", decrypted);`,
  },
];

export const API = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-pretty" id="api-reference">{t('documentation:api.title')}</h1>
        <p className="text-lg text-gray-300 mb-10 w-full text-pretty">
          {t('documentation:api.intro')}
        </p>
        <div className="space-y-16 w-full">
          {apiSections.map((section) => (
            <div key={section.id} id={section.id} className="w-full">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white tracking-tight text-pretty">{section.label}</h2>
                <span className="inline-block bg-blue-900/60 text-blue-300 text-xs font-semibold px-2 py-1 rounded-md border border-blue-700">{section.returnType}</span>
              </div>
              <div className="font-mono text-base bg-gray-800/80 rounded-lg px-4 py-3 mb-2 border border-gray-700 shadow-sm overflow-x-auto w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
                <code className="whitespace-pre">{section.signature}</code>
              </div>
              <p className="text-gray-400 mb-4 text-base text-pretty w-full">{t(`documentation:api.sections.${section.id}.description`)}</p>
              <div className="mb-2 overflow-x-auto w-full min-w-0">
                <CodeExamples
                  language="javascript"
                  title={t('documentation:api.example')}
                  code={section.example}
                />
              </div>
              {section.type && (
                <div className="mb-2 overflow-x-auto w-full min-w-0">
                  <CodeExamples
                    language="typescript"
                    title={t('documentation:api.type')}
                    code={section.type}
                  />
                </div>
              )}
              <div className="border-b border-gray-800 mt-8" />
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-white mt-16 mb-3 text-pretty" id="main-types">{t('documentation:api.mainTypes')}</h2>
        <div className="mb-2 overflow-x-auto w-full min-w-0">
          <CodeExamples
            language="typescript"
            title={t('documentation:api.types')}
            code={`interface KeyPair {
  public_pem: string;  // PEM-formatted public key
  private_pem: string; // PEM-formatted private key
}`}
          />
        </div>
        <h2 className="text-xl font-semibold text-white mt-12 mb-3 text-pretty" id="error-handling">{t('documentation:api.errorHandling')}</h2>
        <div className="mb-2 overflow-x-auto w-full min-w-0">
          <CodeExamples
            language="javascript"
            title={t('documentation:api.errorHandlingExample')}
            code={`try {
  const keypair = generate_rsa_keypair_pem();
  const encrypted = rsa_encrypt_base64(keypair.public_pem, "Secret message");
  const decrypted = rsa_decrypt_base64(keypair.private_pem, encrypted);
  console.log(decrypted);
} catch (error) {
  console.error("Crypto error:", error.message);
}`}
          />
        </div>
      </div>
      
      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default API; 