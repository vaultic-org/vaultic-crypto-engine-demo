import { FC } from 'react';
import { Link } from '@tanstack/react-router';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="text-xl font-bold text-white">Vaultic</div>
            <p className="text-gray-400 max-w-xs">
              Enterprise-grade cryptographic library for secure RSA operations.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/vaultic-org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="https://twitter.com/vaultic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="https://discord.gg/vaultic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>
          
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Documentation</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/documentation"
                  search={{ section: 'getting-started' }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link 
                  to="/documentation"
                  search={{ section: 'installation' }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link 
                  to="/documentation"
                  search={{ section: 'api' }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link 
                  to="/documentation"
                  search={{ section: 'usage' }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Usage Examples
                </Link>
              </li>
            </ul>
          </nav>
          
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-white transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <a href="https://github.com/vaultic-org/vaultic-crypto-engine" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/org/vaultic" className="text-gray-400 hover:text-white transition-colors">
                  NPM Package
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Release Notes
                </a>
              </li>
            </ul>
          </nav>
          
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/license" className="text-gray-400 hover:text-white transition-colors">
                  License
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Vaultic. All rights reserved.</p>
          <p className="mt-2">
            <span className="inline-flex items-center">
              <i className="fas fa-shield-alt mr-2 text-blue-400"></i>
              Built for performance, designed for security.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;