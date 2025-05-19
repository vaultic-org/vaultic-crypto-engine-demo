import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Custom hook to use translations in the application
 * @param namespace The translation namespace to use (optional, default: ['common'])
 * @returns Functions and objects to use translations
 */
export const useTranslation = (namespace: string | string[] = ['common']) => {
  const { t, i18n } = useI18nTranslation(namespace);
  
  /**
   * Change the language of the application
   * @param lang Language code ('en' or 'fr')
   */
  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    // Store the language in localStorage for persistence
    localStorage.setItem('i18nextLng', lang);
    // Update the lang attribute on the HTML element for accessibility
    document.documentElement.lang = lang;
  };
  
  /**
   * Get the current language
   * @returns Current language code
   */
  const getCurrentLanguage = () => i18n.language || 'en';
  
  /**
   * Check if the current language is a specific language
   * @param lang Language code to check
   * @returns true if it's the current language
   */
  const isCurrentLanguage = (lang: string) => getCurrentLanguage().startsWith(lang);
  
  /**
   * Get all available languages
   * @returns List of available languages with codes and labels
   */
  const getAvailableLanguages = () => [
    { code: 'en', label: t('language.en', { ns: 'common' }) },
    { code: 'fr', label: t('language.fr', { ns: 'common' }) }
  ];
  
  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    isCurrentLanguage,
    getAvailableLanguages
  };
};

export default useTranslation; 