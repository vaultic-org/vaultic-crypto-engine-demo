import { Link, useMatchRoute } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";
import { ReactNode, useState } from "react";
import { MoreVertical } from 'lucide-react';

const Navbar = ({ childrenLeft }: { childrenLeft?: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Use the useMatchRoute hook to detect the active route
  const matchRoute = useMatchRoute();
  const isDemoActive = matchRoute({ to: '/demo', fuzzy: true });
  const isDocsActive = matchRoute({ to: '/documentation', fuzzy: true });
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 w-full">
      <div className="w-full px-3 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {childrenLeft}
            <Link to="/" className="text-xl font-bold text-white">
              Vaultic
            </Link>
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              as={Link} 
              to="/demo" 
              variant="ghost" 
              size="sm"
              className={isDemoActive ? "bg-blue-900/40 text-blue-200 border-blue-600" : ""}
            >
              Demo
            </Button>
            <Button 
              as={Link} 
              to="/documentation" 
              variant="ghost" 
              size="sm"
              className={isDocsActive ? "bg-blue-900/40 text-blue-200 border-blue-600" : ""}
            >
              Documentation
            </Button>
            <a
              href="https://github.com/vaultic-org/vaultic-crypto-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
            >
              <i className="fab fa-github mr-2"></i>
              GitHub
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden relative">
            <button
              className="inline-flex items-center justify-center bg-gray-800 rounded-lg p-2 border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Open main menu"
            >
              <MoreVertical className="w-6 h-6 text-gray-200" />
            </button>
            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 animate-fade-in">
                <div className="flex flex-col py-2">
                  <Link 
                    to="/demo" 
                    className={`px-4 py-2 text-gray-200 hover:bg-gray-800 rounded transition-colors ${isDemoActive ? "bg-blue-900/40 text-blue-200 font-medium" : ""}`} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Demo
                  </Link>
                  <Link 
                    to="/documentation" 
                    className={`px-4 py-2 text-gray-200 hover:bg-gray-800 rounded transition-colors ${isDocsActive ? "bg-blue-900/40 text-blue-200 font-medium" : ""}`} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                  <a
                    href="https://github.com/vaultic-org/vaultic-crypto-engine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-gray-200 hover:bg-gray-800 rounded transition-colors flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fab fa-github mr-2"></i>
                    GitHub
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.18s cubic-bezier(.4,1,.6,1); }
      `}</style>
    </nav>
  );
};

export default Navbar;