import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLogStore } from '@/core/store/logStore';
import useTranslation from '@/hooks/useTranslation';

const InstallBlock = () => {
  const [activeTab, setActiveTab] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const { copyToClipboard } = useCopyToClipboard();
  const addLog = useLogStore(state => state.addLog);
  const { t } = useTranslation(['documentation', 'common']);

  const installCommands = {
    npm: 'npm install @vaultic/crypto-engine',
    yarn: 'yarn add @vaultic/crypto-engine',
    pnpm: 'pnpm add @vaultic/crypto-engine'
  };

  const handleCopyCommand = () => {
    copyToClipboard(installCommands[activeTab], t('documentation:codeExample.copied'));
    addLog(t('documentation:installation.logCopied'), 'info');
  };

  return (
    <div className="mt-4">
      <div className="flex space-x-2 mb-4">
        <Button
          onClick={() => setActiveTab('npm')}
          variant={activeTab === 'npm' ? 'primary' : 'ghost'}
          size="sm"
        >
          npm
        </Button>
        <Button
          onClick={() => setActiveTab('yarn')}
          variant={activeTab === 'yarn' ? 'primary' : 'ghost'}
          size="sm"
        >
          yarn
        </Button>
        <Button
          onClick={() => setActiveTab('pnpm')}
          variant={activeTab === 'pnpm' ? 'primary' : 'ghost'}
          size="sm"
        >
          pnpm
        </Button>
      </div>

      <div className="relative bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <Button
            onClick={handleCopyCommand}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <i className="fas fa-copy mr-1"></i> {t('common:copy')}
          </Button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-gray-300">{installCommands[activeTab]}</code>
        </pre>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>{t('documentation:installation.typescriptNote')}</p>
      </div>
    </div>
  );
};

export default InstallBlock; 