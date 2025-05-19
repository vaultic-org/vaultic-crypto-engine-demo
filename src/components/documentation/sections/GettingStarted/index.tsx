import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';

export const GettingStarted = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <div id="introduction">
          <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="getting-started">{t('documentation:gettingStarted.title')}</h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
            {t('documentation:gettingStarted.welcome')}
          </p>
        </div>

        <div id="what-can-you-do">
          <h2 className="text-xl font-semibold text-white mb-2 text-pretty">{t('documentation:gettingStarted.capabilities.title')}</h2>
          <ul className="space-y-2 text-gray-300 mb-8 list-disc pl-5 text-pretty">
            <li>{t('documentation:gettingStarted.capabilities.generate')}</li>
            <li>{t('documentation:gettingStarted.capabilities.encrypt')}</li>
            <li>{t('documentation:gettingStarted.capabilities.protect')}</li>
            <li>{t('documentation:gettingStarted.capabilities.encode')}</li>
            <li>{t('documentation:gettingStarted.capabilities.use')}</li>
            <li>{t('documentation:gettingStarted.capabilities.handle')}</li>
          </ul>
        </div>

        <div id="security-notice" className="bg-blue-900/60 border border-blue-700 rounded-xl p-4 flex items-start gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <div>
            <h3 className="font-semibold text-blue-300 mb-1 text-pretty">{t('documentation:gettingStarted.securityNotice.title')}</h3>
            <p className="text-gray-200 text-base leading-relaxed text-pretty">
              {t('documentation:gettingStarted.securityNotice.content')}
            </p>
          </div>
        </div>
      </div>

      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default GettingStarted; 