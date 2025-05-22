import React, { useState, useEffect } from 'react';
import { createFileRoute, useNavigate, useLocation } from '@tanstack/react-router';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Sidebar from '@/components/documentation/Sidebar';
import { Menu } from 'lucide-react';
import {
  GettingStarted,
  Installation,
  Usage,
  API,
  Security,
  RSACrypto,
  ECCCrypto,
  HybridEncryption,
  PasswordProtection,
} from '@/components/documentation/sections';
import { useTranslation } from 'react-i18next';

// Define the available documentation sections and their corresponding components
const DOC_SECTIONS_COMPONENTS: Record<string, React.FC> = {
  'getting-started': GettingStarted,
  'installation': Installation,
  'usage': Usage,
  'api': API,
  'security': Security,
  'rsa-crypto': RSACrypto,
  'ecc-crypto': ECCCrypto,
  'hybrid-encryption': HybridEncryption,
  'password-protection': PasswordProtection,
};

// Pour le débogage, afficher toutes les clés de sections disponibles
console.log('Available section keys:', Object.keys(DOC_SECTIONS_COMPONENTS));

// In TanStack Router, a file named $section.tsx creates a dynamic route
// with a param named 'section'
export const Route = createFileRoute('/documentation/$section')({
  component: DocumentationPage,
});

function DocumentationPage() {
  const { t } = useTranslation('documentation');
  const navigate = useNavigate();
  const location = useLocation();
  const params = Route.useParams();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('getting-started');

  // Log pour déboguer
  console.log('Route params:', params);
  console.log('Current pathname:', location.pathname);

  useEffect(() => {
    const baseDocPath = '/documentation';
    // Get the section from the URL params, default to 'getting-started' if empty
    let currentSectionKey = params.section || 'getting-started';
    
    console.log('Extracted section key:', currentSectionKey);

    if (!DOC_SECTIONS_COMPONENTS[currentSectionKey]) {
      // Si la section n'est pas valide, rediriger vers getting-started
      console.log('Invalid section key, defaulting to getting-started');
      currentSectionKey = 'getting-started';
      // Redirection explicite vers getting-started si la section est invalide
      if (location.pathname !== `${baseDocPath}/getting-started`) {
        // Utiliser as any pour contourner l'erreur de typage
        navigate({ to: `${baseDocPath}/getting-started` as any, replace: true });
        return; // Quitter pour éviter une mise à jour de l'état pendant la redirection
      }
    }
    
    console.log('Setting active section to:', currentSectionKey);
    setActiveSectionId(currentSectionKey);

    // Si l'URL est /documentation/ ou incorrecte, nous naviguons déjà plus haut
    // Nous n'avons pas besoin de vérifier la canonicalisation des URL valides
    
  }, [params.section, location.pathname, navigate]);

  // Get the component for the active section
  const ActiveSectionComponent = DOC_SECTIONS_COMPONENTS[activeSectionId] || GettingStarted;
  console.log('Active component:', ActiveSectionComponent.name || 'Component');

  // Cette fonction est appelée lorsqu'un lien de la barre latérale est cliqué
  const handleNavigate = (id: string) => {
    console.log('Navigation requested to:', id);
    
    if (id === activeSectionId) {
      console.log('Already on this section, ignoring navigation');
      setSidebarOpen(false);
      return;
    }
    
    const targetPath = `/documentation/${id}`;
    console.log('Navigating to:', targetPath);
    
    // Utiliser la syntaxe d'objet avec as any pour contourner l'erreur de typage
    navigate({ to: targetPath as any });
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (activeSectionId) {
      const sectionKey = `sidebar.${activeSectionId.replace(/-/g, '')}`;
      // Attempt to get a translated title, fallback to a formatted version of ID
      let title = t(sectionKey as any, { ns: 'documentation', defaultValue: '' });
      if (!title) {
        title = activeSectionId
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      document.title = t('title', { ns: 'documentation', defaultValue: 'Documentation' }) + ` - ${title} | Vaultic`;
    }
  }, [activeSectionId, t]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            aria-controls="documentation-sidebar"
            aria-expanded={sidebarOpen}
          >
            <Menu size={24} />
            <span className="sr-only">{t('sidebar.searchAria', { ns: 'documentation' })}</span>
          </button>
        </div>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-gray-900/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 shadow-xl">
              <Sidebar activeId={activeSectionId} onNavigate={handleNavigate} />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              aria-label={t('codeExample.hide', { ns: 'documentation' }) + ' menu'}
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24">
              <Sidebar activeId={activeSectionId} onNavigate={handleNavigate} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-code:bg-gray-700/50 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm">
              <ActiveSectionComponent />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DocumentationPage; 