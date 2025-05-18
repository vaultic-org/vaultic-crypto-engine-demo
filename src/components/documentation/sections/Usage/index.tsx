import CodeExamples from '../../CodeExamples';
import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';

export const Usage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="usage">Usage</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
          Vaultic is designed to be intuitive and developer-friendly. Here are some real-world examples to help you get started quickly with key generation, encryption, and decryption.
        </p>
        
        <div id="key-generation" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="key-generation-heading">Key Generation</h2>
          <p className="text-gray-300 mb-4 text-pretty">Generate a secure RSA key pair in just one line:</p>
          <CodeExamples
            language="javascript"
            title="Key Generation Example"
            code={`import { generate_rsa_keypair_pem } from 'vaultic-crypto-engine';

// Generate a 2048-bit RSA key pair (default)
const keypair = generate_rsa_keypair_pem();
console.log('Public Key:', keypair.public_pem);
console.log('Private Key:', keypair.private_pem);`}
          />
        </div>

        <div id="encryption" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="encryption-heading">Encryption</h2>
          <p className="text-gray-300 mb-4 text-pretty">Encrypt any message using your public key:</p>
          <CodeExamples
            language="javascript"
            title="Encryption Example"
            code={`import { rsa_encrypt_base64 } from 'vaultic-crypto-engine';

const message = 'Secret message';
const encrypted = rsa_encrypt_base64(keypair.public_pem, message);
console.log('Encrypted:', encrypted);`}
          />
        </div>

        <div id="decryption" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="decryption-heading">Decryption</h2>
          <p className="text-gray-300 mb-4 text-pretty">Decrypt messages with your private key:</p>
          <CodeExamples
            language="javascript"
            title="Decryption Example"
            code={`import { rsa_decrypt_base64 } from 'vaultic-crypto-engine';

const decrypted = rsa_decrypt_base64(keypair.private_pem, encrypted);
console.log('Decrypted:', decrypted);

// Verify we got our original message back
console.log('Original message restored:', message === decrypted);`}
          />
        </div>

        <div id="complete-example" className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty" id="complete-example-heading">Complete Example</h2>
          <p className="text-gray-300 mb-4 text-pretty">Here's a complete example that demonstrates the entire workflow:</p>
          <CodeExamples
            language="javascript"
            title="Complete Example"
            code={`import { generate_rsa_keypair_pem, rsa_encrypt_base64, rsa_decrypt_base64 } from 'vaultic-crypto-engine';

// Generate a key pair
const keypair = generate_rsa_keypair_pem();
    
// Message to encrypt
const message = "This is a secret message";
    
// Encrypt with the public key
const encrypted = rsa_encrypt_base64(keypair.public_pem, message);
console.log("Encrypted:", encrypted);
    
// Decrypt with the private key
const decrypted = rsa_decrypt_base64(keypair.private_pem, encrypted);
console.log("Decrypted:", decrypted);
    
// Verify original message was restored
console.assert(message === decrypted, "Decryption failed!");`}
          />
        </div>
      </div>
      
      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default Usage; 