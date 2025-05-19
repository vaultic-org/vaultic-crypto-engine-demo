import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogStore } from '@/core/store/logStore';
import { Button } from '@/components/common/Button';
import useTranslation from '@/hooks/useTranslation';

const ConsoleLog = () => {
  const { t } = useTranslation(['demo', 'common']);
  const [isMinimized, setIsMinimized] = useState(false);
  const logs = useLogStore(state => state.logs);
  const clearLogs = useLogStore(state => state.clearLogs);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new logs are added
  useEffect(() => {
    if (logContainerRef.current && !isMinimized) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isMinimized]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col shadow-2xl">
        <div 
          className="flex justify-between items-center bg-gray-900 p-3 rounded-t-lg cursor-pointer border-t border-l border-r border-blue-900/50"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center">
            <i className="fas fa-terminal text-blue-500 mr-2"></i>
            <h3 className="text-white font-semibold text-sm">{t('logs.title', { ns: 'demo' })}</h3>
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-800 rounded-full text-gray-400">
              {logs.length} {t('logs.entries', { ns: 'demo' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                clearLogs();
              }}
              variant="ghost"
              size="sm"
              className="!py-1 !px-2 opacity-70 hover:opacity-100"
              aria-label={t('logs.clear', { ns: 'demo' })}
            >
              <i className="fas fa-trash-alt text-xs"></i>
            </Button>
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={isMinimized ? t('logs.expand', { ns: 'demo' }) : t('logs.collapse', { ns: 'demo' })}
            >
              {isMinimized ? (
                <i className="fas fa-chevron-up"></i>
              ) : (
                <i className="fas fa-chevron-down"></i>
              )}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900 rounded-b-lg shadow-lg border-b border-l border-r border-blue-900/50"
            >
              <div 
                ref={logContainerRef}
                className="p-3 font-mono text-sm max-h-[300px] overflow-y-auto scroll-smooth"
                style={{ width: '500px' }}
              >
                {logs.length === 0 ? (
                  <div className="text-gray-500 italic text-center py-4">
                    {t('logs.empty', { ns: 'demo' })}
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div 
                      key={`${log.timestamp}-${index}`} 
                      className={`mb-1 ${
                        log.type === 'success' 
                          ? 'text-green-400' 
                          : log.type === 'error' 
                            ? 'text-red-400' 
                            : 'text-blue-400'
                      }`}
                    >
                      <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConsoleLog;