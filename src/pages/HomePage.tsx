import { Link } from "@tanstack/react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Button } from "@/components/common/Button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[50vh] flex items-center hero-section-bg">
          {/* Modern Metal Background */}
          <div className="cyber-background">
            <div className="metal-shine"></div>
            <div className="metal-particles"></div>
            <div className="glossy-overlay"></div>
          </div>

          <div className="container mx-auto px-6 py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-gradient rounded-2xl p-6 md:p-8 flex flex-col items-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="px-4 py-1.5 mb-4 text-xs font-semibold rounded-full glossy-card text-blue-400 shadow-md w-max"
              >
                Secure. Fast. Open Source.
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text tracking-tight leading-none"
              >
                Vaultic Crypto Engine
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                Enterprise-grade cryptographic library for secure RSA
                operations.
                <span className="block mt-2 text-blue-400">
                  Built for performance, designed for security.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  as={Link}
                  to="/demo"
                  variant="primary"
                  size="lg"
                  className="glossy-button group"
                >
                  Try Interactive Demo
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </Button>

                <Button
                  as={Link}
                  to="/documentation"
                  variant="outline"
                  size="lg"
                  className="glossy-button"
                >
                  <i className="fas fa-book mr-2"></i>
                  Documentation
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="py-20 relative overflow-hidden code-section-bg">
          <div className="features-background">
            <div className="features-grid"></div>
            <div className="features-shine"></div>
            <div className="features-particles"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4 gradient-text tracking-tight"
              >
                Simple to Use, Powerful by Design
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Implement enterprise-grade encryption in minutes with our
                intuitive API
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="feature-card p-6 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="feature-icon w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-shield-alt text-xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Military-Grade Security
                      </h3>
                      <p className="text-gray-400">
                        RSA-2048 encryption with timing attack protection and Vaultic's advanced hybrid RSA+AES encryption for any data size.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="feature-card p-6 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="feature-icon w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-bolt text-xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Optimized Performance
                      </h3>
                      <p className="text-gray-400">
                        Native Rust and WebAssembly support for maximum speed
                        across all platforms.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="feature-card p-6 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="feature-icon w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-code text-xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Developer Experience
                      </h3>
                      <p className="text-gray-400">
                        Simple API with automatic handling of data size and
                        comprehensive documentation.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="feature-card p-6 rounded-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="feature-icon w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-layer-group text-xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Vaultic Hybrid Technology
                      </h3>
                      <p className="text-gray-400">
                        Automatically switches between direct RSA and hybrid RSA+AES encryption for seamless handling of any data size.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="code-section rounded-xl overflow-hidden"
              >
                <div className="code-header p-4 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-400 ml-2">vaultic-crypto-engine.ts</span>
                </div>
                <div className="code-content p-6">
                    <SyntaxHighlighter
                      language="typescript"
                      style={vscDarkPlus}
                      customStyle={{
                        borderRadius: "0.75rem",
                        background: "rgba(15,23,42,0.95)",
                        fontSize: "1rem",
                        padding: "1.5rem",
                      }}
                    >
                      {`
import {
  generate_rsa_keypair_pem,
  rsa_encrypt_base64,
  rsa_decrypt_base64
} from "vaultic-crypto-engine";

// Generate a key pair
const keypair = await generate_rsa_keypair_pem();

// Encrypt a message - works with any data size!
// Vaultic auto-detects data size and uses either:
// - Direct RSA for small data
// - Hybrid RSA+AES for large data
const message = "Secret message with sensitive information";
const encrypted = await rsa_encrypt_base64(
  keypair.public_pem, 
  message
);

console.log(encrypted); // "eyJhbGciOiJFUzI1NiIsInR5..."

// Decrypt with unified API - works for both methods
const decrypted = await rsa_decrypt_base64(
  keypair.private_pem, 
  encrypted
);
console.log(decrypted); // "Secret message with sensitive information"
                    `}
                    </SyntaxHighlighter>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden cta-section-bg">
          <div className="cta-wow-bg"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 cta-wow-title tracking-tight">
              Ready to Enhance Your App's Security?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Get started with <span className="gradient-text font-bold">Vaultic Crypto Engine</span> today and implement
              enterprise-grade encryption in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as="a"
                href="https://github.com/vaultic-org/vaultic-crypto-engine"
                variant="primary"
                size="lg"
                className="cta-wow-btn group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github mr-2"></i>
                View on GitHub
              </Button>
              <Button as={Link} to="/demo" variant="outline" size="lg" className="cta-wow-btn">
                Try the Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage; 