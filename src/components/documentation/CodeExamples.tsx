import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLogStore } from '@/core/store/logStore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeExamplesProps {
  language: string;
  title: string;
  code: string;
  badge?: string;
}

const CodeExamples = ({ language, title, code, badge }: CodeExamplesProps) => {
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
        <div className="relative bg-gray-800 border border-gray-700 rounded-lg">
          <button
            className="absolute top-2 right-2 text-xs text-gray-400 hover:text-blue-400 focus:outline-none"
            onClick={handleCopyCode}
            aria-label="Copy code"
          >
            {/* Placeholder for the copied state */}
          </button>
          <div className="overflow-x-auto w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                borderRadius: '0.5rem',
                background: 'rgba(31, 41, 55, 0.8)',
                fontSize: '0.875rem',
                padding: '1rem',
                margin: 0,
                overflowX: 'auto',
                whiteSpace: 'pre',
                wordBreak: 'normal',
                wordWrap: 'normal'
              }}
              wrapLongLines={false}
            >
              {code}
            </SyntaxHighlighter>
          </div>
          {badge && (
            <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
              {badge}
            </div>
          )}
        </div>
      )}
      {!SyntaxHighlighter && (
        <div className="overflow-x-auto w-full rounded-lg bg-gray-800 border border-gray-700" style={{ WebkitOverflowScrolling: 'touch' }}>
          <pre className="text-sm text-blue-200 font-mono select-all p-4 whitespace-pre">{code}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeExamples; 