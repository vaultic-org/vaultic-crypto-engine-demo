import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importation des ressources de traduction de base pour le chargement initial
import commonEN from './locales/en/common.json';
import commonFR from './locales/fr/common.json';
import homeEN from './locales/en/home.json';
import homeFR from './locales/fr/home.json';
import demoEN from './locales/en/demo.json';
import demoFR from './locales/fr/demo.json';
import documentationEN from './locales/en/documentation.json';
import documentationFR from './locales/fr/documentation.json';
import gameEN from './locales/en/game.json';
import gameFR from './locales/fr/game.json';

// Ressources préchargées pour un démarrage rapide
const resources = {
  en: {
    common: commonEN,
    home: homeEN,
    demo: demoEN,
    documentation: documentationEN,
    game: gameEN
  },
  fr: {
    common: commonFR,
    home: homeFR,
    demo: demoFR,
    documentation: documentationFR,
    game: gameFR
  }
};

i18n
  // Load translations from the server
  .use(Backend)
  // Automatically detect the browser language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Translation namespaces
    ns: ['common', 'home', 'demo', 'documentation', 'game'],
    defaultNS: 'common',
    
    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    // Backend configuration for loading translation files
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n; 