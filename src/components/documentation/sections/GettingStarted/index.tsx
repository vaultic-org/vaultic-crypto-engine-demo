import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';

export const GettingStarted = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <div id="introduction">
          <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="getting-started">Getting Started</h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
            Welcome to Vaultic Crypto Engine! This library is designed to make cryptography simple, safe, and fast for everyone. Whether you're building a web app, a backend service, or experimenting with cryptography, Vaultic gives you secure RSA operations with zero hassle—powered by Rust and ready for JavaScript and WebAssembly.
          </p>
        </div>

        <div id="what-can-you-do">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty">What can you do with Vaultic?</h2>
          <ul className="space-y-2 text-gray-300 mb-8 list-disc pl-5 text-pretty">
            <li>Generate RSA key pairs (2048-bit, secure by default)</li>
            <li>Encrypt and decrypt data with RSA-PKCS#1</li>
            <li>Protect against timing attacks and common vulnerabilities</li>
            <li>Encode and decode with Base64 for easy sharing</li>
            <li>Use in browsers (WebAssembly) or Node.js—no limits</li>
            <li>Handle any data size automatically</li>
          </ul>
        </div>

        <div id="security-notice" className="bg-blue-900/60 border border-blue-700 rounded-xl p-4 flex items-start gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div>
            <h3 className="font-semibold text-blue-300 mb-1 text-pretty">Security Notice</h3>
            <p className="text-gray-200 text-base leading-relaxed text-pretty">
              Vaultic uses a pure Rust RSA implementation with extra protections against the Marvin Attack (RUSTSEC-2023-0071). For highly sensitive projects, we recommend using a library with constant-time guarantees like <code className="text-blue-300">aws-lc-rs</code>.
            </p>
          </div>
        </div>
      </div>

      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default GettingStarted; 