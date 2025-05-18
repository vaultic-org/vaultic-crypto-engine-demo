import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Button } from "@/components/common/Button";

export const Route = createFileRoute("/_404")({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative mb-8 mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-[0_0_30px_rgba(59,130,246,0.2),inset_0_0_15px_rgba(59,130,246,0.1)]">
              <motion.div 
                className="absolute inset-0 bg-blue-500/20 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div 
                initial={{ rotateZ: 0 }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-dashed border-blue-400/30 rounded-full"
              />
              <motion.div className="absolute inset-0 flex items-center justify-center text-6xl text-blue-400">
                <i className="fas fa-lock-open"></i>
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-6xl md:text-8xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
              style={{ textShadow: "0 2px 15px rgba(59, 130, 246, 0.3)" }}
            >
              404
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold mb-6 text-gray-300"
            >
              Cryptographic key not found
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-gray-400 mb-12"
            >
              The page you're looking for seems to be encrypted or doesn't exist.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center"
            >
              <Button
                as="a"
                href="/"
                variant="primary"
                size="lg"
                className="glossy-button group"
              >
                <i className="fas fa-home mr-2"></i>
                Return to Homepage
                <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                  <i className="fas fa-arrow-up"></i>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default NotFoundPage; 