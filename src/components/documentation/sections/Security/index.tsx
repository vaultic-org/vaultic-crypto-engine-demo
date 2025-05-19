import OnThisPage from '../../OnThisPage';
import { useRef } from 'react';
import useTranslation from '@/hooks/useTranslation';

export const Security = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['documentation', 'common']);

  return (
    <>
      <div className="w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-white mb-4 text-pretty" id="security">{t('documentation:security.title')}</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6 text-pretty">
          {t('documentation:security.intro')}
        </p>
        
        <div id="how-vaultic-protects" className="mb-6">
          <h2 className="text-xl font-semibold text-green-400 mb-2 text-pretty">{t('documentation:security.protection.title')}</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6 text-pretty">
            <li>{t('documentation:security.protection.point1')}</li>
            <li>{t('documentation:security.protection.point2')}</li>
            <li>{t('documentation:security.protection.point3')}</li>
            <li>{t('documentation:security.protection.point4')}</li>
          </ul>
        </div>
        
        <div id="security-reminders" className="mb-6">
          <h2 className="text-xl font-semibold text-yellow-300 mb-2 text-pretty">{t('documentation:security.reminders.title')}</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6 text-pretty">
            <li>{t('documentation:security.reminders.point1')}</li>
            <li>{t('documentation:security.reminders.point2')}</li>
            <li>{t('documentation:security.reminders.point3')}</li>
            <li>{t('documentation:security.reminders.point4')}</li>
          </ul>
        </div>
        
        <div id="best-practices" className="mb-6">
          <h2 className="text-xl font-semibold text-blue-300 mb-2 text-pretty">{t('documentation:security.practices.title')}</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-6 text-pretty">
            <li>{t('documentation:security.practices.point1')}</li>
            <li>{t('documentation:security.practices.point2')}</li>
            <li>{t('documentation:security.practices.point3')}</li>
            <li>{t('documentation:security.practices.point4')}</li>
            <li>{t('documentation:security.practices.point5')}</li>
          </ul>
        </div>
        
        <div id="important-note" className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-red-900/60 to-gray-900/80 border border-red-500/30 shadow-lg flex flex-col sm:flex-row items-start gap-4">
          <div className="mt-1 flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          </div>
          <div>
            <h2 className="font-semibold text-red-400 mb-1 text-lg text-pretty">{t('documentation:security.warning.title')}</h2>
            <p className="text-gray-200 text-base leading-relaxed text-pretty">
              {t('documentation:security.warning.content')}
            </p>
          </div>
        </div>
      </div>

      <OnThisPage containerRef={containerRef} />
    </>
  );
};

export default Security; 