import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import InstallBlock from '../../InstallBlock';
import CargoTomlExample from '../../CargoTomlExample';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';

export const Installation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="installation">{t('documentation:installation.title')}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
          {t('documentation:installation.intro')}
        </p>
        
        <div id="javascript-installation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty">{t('documentation:installation.javascript')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:installation.using')}</p>
          <InstallBlock />
        </div>
        
        <div id="rust-installation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty">{t('documentation:installation.rust')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:installation.addCargo')}</p>
          <CargoTomlExample
            title="Cargo.toml"
            packageName="vaultic-crypto-engine"
            version="0.1.0"
          />
        </div>

        <div id="webassembly-installation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 mt-8 text-pretty">{t('documentation:installation.wasmSupport')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:installation.wasmFeature')}</p>
          <CargoTomlExample
            title="Cargo.toml with WASM"
            packageName="vaultic-crypto-engine"
            version="0.1.0"
            features={["wasm"]}
          />
        </div>
        
        <div id="building-wasm" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 mt-8 text-pretty">{t('documentation:installation.buildingWasm')}</h2>
          <p className="text-gray-300 mb-4 text-pretty">{t('documentation:installation.buildWasmInstructions')}</p>
          <CodeExamples
            language="bash"
            title={t('documentation:installation.buildCommand')}
            code={`wasm-pack build --release --target bundler -- --features wasm`}
          />
          <p className="text-gray-300 mt-4 mb-4 text-pretty">{t('documentation:installation.importInstructions')}</p>
          <CodeExamples
            language="javascript"
            title={t('documentation:installation.javascriptImport')}
            code={`import init, { generate_rsa_keypair_pem, rsa_encrypt_base64, rsa_decrypt_base64 } from 'vaultic-crypto-engine';

async function run() {
  await init();
  
  // Now you can use the functions
  const keypair = generate_rsa_keypair_pem();
  // ...
}`}
          />
        </div>
      </div>

      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default Installation; 