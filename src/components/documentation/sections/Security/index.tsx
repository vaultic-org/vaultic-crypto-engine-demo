import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';

export const Security = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="security">Security</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
          Security is at the heart of Vaultic. Here's how we keep your data safe, and what you should know to use cryptography responsibly.
        </p>
        
        <div id="how-vaultic-protects" className="mb-6">
          <h2 className="text-xl font-semibold text-green-400 mb-2 text-pretty">How Vaultic protects you</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6 text-pretty">
            <li>Built on Rust's trusted RSA library</li>
            <li>Regular security audits and deep testing</li>
            <li>Memory safety to prevent leaks</li>
            <li>Protection against timing attacks</li>
          </ul>
        </div>
        
        <div id="security-reminders" className="mb-6">
          <h2 className="text-xl font-semibold text-yellow-300 mb-2 text-pretty">Security reminders</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6 text-pretty">
            <li>Never store private keys in plain text</li>
            <li>Use strong key sizes (2048 bits or more recommended)</li>
            <li>Protect your private keys with a strong password</li>
            <li>Never share your private keys</li>
          </ul>
        </div>
        
        <div id="best-practices" className="mb-6">
          <h2 className="text-xl font-semibold text-blue-300 mb-2 text-pretty">Best practices</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6 text-pretty">
            <li>Use different keys for encryption and signing</li>
            <li>Rotate your key pairs regularly</li>
            <li>Implement key rotation policies</li>
            <li>Monitor key usage</li>
            <li>Keep Vaultic up to date</li>
          </ul>
        </div>
        
        <div id="important-note" className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-red-900/60 to-gray-900/80 border border-red-500/30 shadow-lg flex flex-col sm:flex-row items-start gap-4">
          <div className="mt-1 flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          </div>
          <div>
            <h2 className="font-semibold text-red-400 mb-1 text-lg text-pretty">Important Note</h2>
            <p className="text-gray-200 text-base leading-relaxed text-pretty">
              Vaultic uses a Rust RSA implementation. While it's secure, always follow best practices and keep your keys up to date. For highly sensitive applications, consider libraries with constant-time guarantees.
            </p>
          </div>
        </div>
      </div>

      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default Security; 