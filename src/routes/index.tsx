import { Link, createFileRoute } from "@tanstack/react-router";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Button } from "@/components/common/Button";
import useTranslation from "@/hooks/useTranslation";
import CodeSnippetTabs from "@/components/common/CodeSnippetTabs";

const Home = () => {
  const { t } = useTranslation(["common", "home"]);

  const rsaCodeExample = `
import {
  generate_rsa_keypair_pem,
  rsa_encrypt_base64,
  rsa_decrypt_base64
} from "@vaultic/crypto-engine";

// Generate an RSA key pair
const keypair = await generate_rsa_keypair_pem();

// Encrypt a message - works with any data size!
// Vaultic auto-detects data size and uses either:
// - Direct RSA for small data
// - Hybrid RSA+AES for large data
const message = "Secret message for RSA encryption";
const encrypted = await rsa_encrypt_base64(
  keypair.public_pem,
  message
);

console.log("RSA Encrypted:", encrypted);

// Decrypt with unified API
const decrypted = await rsa_decrypt_base64(
  keypair.private_pem,
  encrypted
);
console.log("RSA Decrypted:", decrypted);
  `;

  const ecdhCodeExample = `
import {
  generate_ecdh_keypair_wasm,
  WasmEccCurve,
  ecdh_derive_secret_wasm
} from "@vaultic/crypto-engine";

// Generate ECDH P-256 key pairs for Alice and Bob
const aliceKeypair = generate_ecdh_keypair_wasm(WasmEccCurve.P256);
const bobKeypair = generate_ecdh_keypair_wasm(WasmEccCurve.P256);

// Alice derives a shared secret using her private key and Bob's public key
const sharedSecretAlice = ecdh_derive_secret_wasm(
  aliceKeypair.private_pem,
  bobKeypair.public_pem
);
console.log("ECDH Shared Secret (Alice):", sharedSecretAlice);

// Bob derives the same shared secret using his private key and Alice's public key
const sharedSecretBob = ecdh_derive_secret_wasm(
  bobKeypair.private_pem,
  aliceKeypair.public_pem
);
console.log("ECDH Shared Secret (Bob):", sharedSecretBob);

// Both shared secrets should be identical
console.log("Shared secrets are identical:", sharedSecretAlice === sharedSecretBob);
  `;

  const codeTabs = [
    {
      label: "RSA",
      language: "typescript",
      code: rsaCodeExample,
      icon: "fas fa-key",
    },
    {
      label: "ECDH",
      language: "typescript",
      code: ecdhCodeExample,
      icon: "fas fa-handshake",
    },
  ];

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
                {t("hero.secure", { ns: "home" })}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text tracking-tight leading-none"
              >
                {t("app.name", { ns: "common" })}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed text-center"
              >
                {t("hero.subtitle", { ns: "home" })}
                <span className="block mt-2 text-blue-400">
                  {t("footer.slogan", { ns: "common" })}
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
                  {t("hero.ctaDemo", { ns: "home" })}
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
                  {t("nav.documentation", { ns: "common" })}
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
                {t("features.title", { ns: "home" })}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                {t("features.subtitle", { ns: "home" })}
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
                        {t("features.security.title", { ns: "home" })}
                      </h3>
                      <p className="text-gray-400">
                        {t("features.security.description", { ns: "home" })}
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
                        {t("features.eccSupport.title", { ns: "home" })}
                      </h3>
                      <p className="text-gray-400">
                        {t("features.eccSupport.description", { ns: "home" })}
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
                      <i className="fas fa-tachometer-alt text-xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {t("features.performance.title", { ns: "home" })}
                      </h3>
                      <p className="text-gray-400">
                        {t("features.performance.description", { ns: "home" })}
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
                        {t("features.compatibility.title", { ns: "home" })}
                      </h3>
                      <p className="text-gray-400">
                        {t("features.compatibility.description", {
                          ns: "home",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="code-section rounded-xl overflow-hidden mx-auto w-full max-w-xl"
              >
                <CodeSnippetTabs tabs={codeTabs} defaultTab="RSA" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden cta-section-bg">
          <div className="cta-wow-bg"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 cta-wow-title tracking-tight">
              {t("cta.title", { ns: "home" })}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              {t("cta.description", { ns: "home" })}{" "}
              <span className="gradient-text font-bold">
                {t("app.name", { ns: "common" })}
              </span>{" "}
              {t("cta.descriptionEnd", { ns: "home" })}
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
                {t("cta.github", { ns: "home" })}
              </Button>
              <Button
                as={Link}
                to="/demo"
                variant="outline"
                size="lg"
                className="cta-wow-btn"
              >
                {t("cta.tryDemo", { ns: "home" })}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});

export default Home;
