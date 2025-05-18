import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLogStore } from '@/core/store/logStore';

import { CodeExamplesProps } from './CodeExamples.types';

const CodeExamples = ({ language, title, code }: CodeExamplesProps) => {
  const [showCode, setShowCode] = useState(true);
  const { copyToClipboard } = useCopyToClipboard();
  const addLog = useLogStore(state => state.addLog);
  
  const handleCopyCode = () => {
    copyToClipboard(code, 'Code copied to clipboard!');
    addLog('Example code copied to clipboard', 'info');
  };
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <div className="flex space-x-2">
          <Button
            onClick={handleCopyCode}
            variant="ghost"
            size="sm"
          >
            <i className="fas fa-copy mr-1"></i> Copy
          </Button>
          <Button
            onClick={() => setShowCode(!showCode)}
            variant="ghost"
            size="sm"
          >
            {showCode ? (
              <>
                <i className="fas fa-eye-slash mr-1"></i> Hide
              </>
            ) : (
              <>
                <i className="fas fa-eye mr-1"></i> Show
              </>
            )}
          </Button>
        </div>
      </div>
      
      {showCode && (
        <div className="relative">
          <pre className={`language-${language} bg-gray-800 p-4 rounded-md overflow-auto`}>
            <code>{code}</code>
          </pre>
          <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
            {language}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExamples;