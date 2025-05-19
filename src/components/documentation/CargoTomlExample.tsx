import { Button } from '@/components/common/Button';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLogStore } from '@/core/store/logStore';
import useTranslation from '@/hooks/useTranslation';

interface CargoTomlExampleProps {
  title: string;
  packageName: string;
  version: string;
  features?: string[];
}

const CargoTomlExample = ({ title, packageName, version, features }: CargoTomlExampleProps) => {
  const { copyToClipboard } = useCopyToClipboard();
  const addLog = useLogStore(state => state.addLog);
  const { t } = useTranslation(['documentation', 'common']);

  const getCodeContent = () => {
    if (features && features.length > 0) {
      return `[dependencies]\n${packageName} = { version = "${version}", features = [${features.map(f => `"${f}"`).join(', ')}] }`;
    }
    return `[dependencies]\n${packageName} = "${version}"`;
  };
  
  const handleCopyCode = () => {
    copyToClipboard(getCodeContent(), t('documentation:codeExample.copied'));
    addLog(t('documentation:cargoToml.logCopied'), 'info');
  };
  
  // Préparer le contenu à afficher
  const featureString = features?.length 
    ? `{ version = "${version}", features = [${features.map(f => `"${f}"`).join(', ')}] }`
    : `"${version}"`;
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <Button
          onClick={handleCopyCode}
          variant="ghost"
          size="sm"
        >
          <i className="fas fa-copy mr-1"></i> {t('common:copy')}
        </Button>
      </div>
      
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg">
        <div className="overflow-x-auto w-full p-4 font-mono text-sm" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="text-white">[dependencies]</div>
          <div>
            <span className="text-green-400">{packageName}</span>
            <span className="text-white"> = </span>
            <span className={features?.length ? "text-white" : "text-orange-300"}>{featureString}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoTomlExample; 