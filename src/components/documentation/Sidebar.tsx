import { useState, useMemo, useRef } from 'react';
import { Search, Book, Compass, Shield, KeyRound } from 'lucide-react';
import useTranslation from '@/hooks/useTranslation';

const DOC_VERSION = '^0.1.6';

const contentData: Record<string, string> = {
  'getting-started': 'crypto engine secure encryption decryption RSA cryptography WebAssembly WASM introduction basics beginning',
  'installation': 'install setup configure Rust JavaScript WebAssembly npm cargo package.json cargo.toml dependencies build compile',
  'usage': 'examples code samples key generation encryption decryption implementation workflow data security',
  'api': 'functions methods generate_rsa_keypair_pem rsa_encrypt_base64 rsa_decrypt_base64 parameters returns types errors',
  'security': 'best practices security guidelines recommendations secure usage encryption standards compliance OWASP',
  'rsa-crypto': 'RSA cryptography asymmetric encryption decryption public key private key generation PKCS padding',
  'ecc-crypto': 'ECC elliptic curve cryptography ECDSA signatures ECDH key agreement P-256 K-256 secp256r1 secp256k1',
  'hybrid-encryption': 'hybrid encryption RSA+AES ECDH+AES performance large data encryption symmetric asymmetric',
  'password-protection': 'password protection keypair message PBKDF2 AES-GCM key derivation salt nonce security',
};

export default function Sidebar({ activeId, onNavigate }: { activeId: string, onNavigate: (id: string) => void }) {
  const [search, setSearch] = useState('');
  const firstResultRef = useRef<HTMLAnchorElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  const sections = useMemo(() => [
    {
      title: t('documentation:sidebar.introduction'),
      icon: <Book className="w-4 h-4 mr-1 text-gray-400" />,
      links: [
        { label: t('documentation:sidebar.gettingStarted'), id: 'getting-started', badge: 'JS' },
        { label: t('documentation:sidebar.installation'), id: 'installation', badge: 'JS' },
      ],
    },
    {
      title: t('documentation:sidebar.guides'),
      icon: <Compass className="w-4 h-4 mr-1 text-gray-400" />,
      links: [
        { label: t('documentation:sidebar.usage'), id: 'usage', badge: 'TS' },
        { label: t('documentation:sidebar.api'), id: 'api', badge: 'TS' },
      ],
    },
    {
      title: t('documentation:sidebar.cryptography'),
      icon: <KeyRound className="w-4 h-4 mr-1 text-gray-400" />,
      links: [
        { label: t('documentation:sidebar.rsa'), id: 'rsa-crypto', badge: 'TS' },
        { label: t('documentation:sidebar.ecc'), id: 'ecc-crypto', badge: 'TS' },
        { label: t('documentation:sidebar.hybrid'), id: 'hybrid-encryption', badge: 'TS' },
        { label: t('documentation:sidebar.password'), id: 'password-protection', badge: 'TS' },
      ],
    },
    {
      title: t('documentation:sidebar.securitySection'),
      icon: <Shield className="w-4 h-4 mr-1 text-gray-400" />,
      links: [
        { label: t('documentation:sidebar.security'), id: 'security', badge: 'TS' },
      ],
    },
  ], [t]);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    
    const q = search.toLowerCase();
    
    // Search in content data instead of just labels
    return sections
      .map(section => ({
        ...section,
        links: section.links.filter(link => 
          link.label.toLowerCase().includes(q) || 
          (contentData[link.id] && contentData[link.id].toLowerCase().includes(q))
        ),
      }))
      .filter(section => section.links.length > 0);
  }, [search, sections]);

  // Focus on first result when pressing Enter in search bar
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && firstResultRef.current) {
      firstResultRef.current.focus();
    }
  };

  // Handle navigation to a section
  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Sidebar: link clicked for section:', id);
    console.log('Sidebar: active section before navigation:', activeId);
    onNavigate(id);
  };

  return (
    <nav className="h-full flex flex-col gap-6">
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">Vaultic</span>
          <span className="ml-2 px-2 py-0.5 rounded bg-gray-800 text-xs text-gray-400 border border-gray-700">v{DOC_VERSION}</span>
        </div>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder={t('documentation:sidebar.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label={t('documentation:sidebar.searchAria')}
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredSections.length === 0 && (
          <div className="text-gray-500 text-sm px-3 py-6 text-center select-none">{t('documentation:sidebar.noResults')}</div>
        )}
        {filteredSections.map(section => (
          <div key={section.title} className="mb-6">
            <div className="flex items-center text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              {section.icon}
              {section.title}
            </div>
            <ul className="space-y-1 pl-3">
              {section.links.map((link, idx) => (
                <li key={link.id}>
                  <a
                    ref={idx === 0 ? firstResultRef : undefined}
                    href={`/documentation/${link.id}`}
                    onClick={(e) => handleLinkClick(link.id, e)}
                    className={`w-full flex items-center justify-between px-5 py-2 rounded-lg text-left transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${activeId === link.id ? 'bg-white/10 text-white outline outline-2 outline-blue-500 outline-offset-[-2px]' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold border shadow-sm cursor-help ${link.badge === 'TS' ? 'bg-blue-900/60 text-blue-300 border-blue-700' : 'bg-yellow-900/60 text-yellow-300 border-yellow-700'}`}
                        title={link.badge === 'TS' ? 'TypeScript' : 'JavaScript'}
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
} 