import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Sidebar from '../../components/documentation/Sidebar';
import { Menu } from 'lucide-react';
import { GettingStarted, Installation, Usage, API, Security } from '../../components/documentation/sections';

const DOC_SECTIONS = [
  'getting-started',
  'installation',
  'usage',
  'api',
  'security',
];

export const Documentation = () => {
  // Extract the section from the URL
  const getInitialSection = () => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    return section && DOC_SECTIONS.includes(section) ? section : DOC_SECTIONS[0];
  };
  
  const [activeId, setActiveId] = useState<string>(getInitialSection());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Update the URL when activeId changes
  useEffect(() => {
    // Keep the existing hash
    const hash = window.location.hash;
    // Update the URL without navigation
    window.history.replaceState(
      {},
      '',
      `/documentation?section=${activeId}${hash}`
    );
  }, [activeId]);

  // Listen for URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      if (section && DOC_SECTIONS.includes(section) && section !== activeId) {
        setActiveId(section);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [activeId]);

  const renderContent = () => {
    switch (activeId) {
      case 'getting-started':
        return <GettingStarted />;
      case 'installation':
        return <Installation />;
      case 'usage':
        return <Usage />;
      case 'api':
        return <API />;
      case 'security':
        return <Security />;
      default:
        return <GettingStarted />;
    }
  };

  // Close the mobile drawer on navigation
  const handleNavigate = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-x-hidden">
      <Navbar
        childrenLeft={
          <button
            className="md:hidden inline-flex items-center justify-center bg-gray-800 rounded-lg p-2 border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open documentation menu"
          >
            <Menu className="w-6 h-6 text-gray-200" />
          </button>
        }
      />
      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex overflow-x-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 max-w-[100vw] h-full bg-gray-900 border-r border-gray-800 shadow-xl p-6 animate-slide-in-left z-50 overflow-x-hidden">
            <Sidebar activeId={activeId} onNavigate={handleNavigate} />
          </aside>
        </div>
      )}
      <div className="flex-1 flex flex-row w-full max-w-full overflow-x-hidden">
        <aside className="hidden md:flex w-72 h-full max-h-[calc(100vh-64px-64px)] overflow-y-auto border-r border-gray-800 bg-gray-900 py-8 px-4 flex-col">
          <Sidebar activeId={activeId} onNavigate={setActiveId} />
        </aside>
        <main className="flex-1 flex flex-col items-center py-8 px-4 w-full overflow-x-hidden">
          <div className="w-full max-w-[90%] md:max-w-3xl">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
      <style>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100%); opacity: 0.5; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left { animation: slide-in-left 0.25s cubic-bezier(.4,1,.6,1); }
        body { overflow-x: hidden !important; }
      `}</style>
    </div>
  );
};

export const Route = createFileRoute('/documentation/')({
  component: Documentation
});

export default Documentation;