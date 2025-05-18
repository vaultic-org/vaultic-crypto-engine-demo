import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import InstallBlock from '../../InstallBlock';
import CargoTomlExample from '../../CargoTomlExample';
import { useRef } from 'react';

export const Installation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="installation">Installation</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
          Getting started with Vaultic is a breeze! You can use it in both Rust applications and JavaScript via WebAssembly.
        </p>
        
        <div id="javascript-installation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty">JavaScript / TypeScript</h2>
          <p className="text-gray-300 mb-4 text-pretty">Install using your favorite package manager:</p>
          <InstallBlock />
        </div>
        
        <div id="rust-installation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty">Rust</h2>
          <p className="text-gray-300 mb-4 text-pretty">Add Vaultic to your <code className="text-blue-300">Cargo.toml</code>:</p>
          <CargoTomlExample
            title="Cargo.toml"
            packageName="vaultic-crypto-engine"
            version="0.1.0"
          />
        </div>

        <div id="webassembly-installation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 mt-8 text-pretty">WebAssembly Support</h2>
          <p className="text-gray-300 mb-4 text-pretty">For WebAssembly support, enable the <code className="text-blue-300">wasm</code> feature:</p>
          <CargoTomlExample
            title="Cargo.toml with WASM"
            packageName="vaultic-crypto-engine"
            version="0.1.0"
            features={["wasm"]}
          />
        </div>
        
        <div id="building-wasm" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 mt-8 text-pretty">Building for WebAssembly</h2>
          <p className="text-gray-300 mb-4 text-pretty">To build the WebAssembly module for use in JavaScript:</p>
          <CodeExamples
            language="bash"
            title="Build Command"
            code={`wasm-pack build --release --target bundler -- --features wasm`}
          />
          <p className="text-gray-300 mt-4 mb-4 text-pretty">Then you can import and use it in your JavaScript/TypeScript project:</p>
          <CodeExamples
            language="javascript"
            title="JavaScript Import"
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