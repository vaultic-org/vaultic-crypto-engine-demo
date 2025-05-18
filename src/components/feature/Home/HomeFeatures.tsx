import { motion } from "framer-motion";

const HomeFeatures = () => {
  const features = [
    {
      icon: "shield-alt",
      title: "Secure by Design",
      description: "Built with security-first principles, featuring RSA-2048 encryption and timing attack protections."
    },
    {
      icon: "bolt",
      title: "High Performance",
      description: "Optimized for both native Rust and WebAssembly environments, delivering fast cryptographic operations."
    },
    {
      icon: "code",
      title: "Easy Integration",
      description: "Simple API for both Rust and JavaScript/TypeScript, with automatic handling of data size."
    },
    {
      icon: "lock",
      title: "Hybrid Encryption",
      description: "Seamlessly switches between direct RSA and hybrid RSA+AES for optimal performance and security."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose <span className="text-blue-400">Vaultic</span>?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <i className={`fas fa-${feature.icon} text-blue-400 text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures; 