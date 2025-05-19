import { useState } from "react";
import useTranslation from "@/hooks/useTranslation";
import { Globe } from "lucide-react";

/**
 * Component to change the language of the application
 */
export const LanguageSwitcher = () => {
  const { t, changeLanguage, getCurrentLanguage, getAvailableLanguages } =
    useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = getCurrentLanguage();
  const languages = getAvailableLanguages();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
        aria-label={t("language.select")}
        aria-expanded={isOpen}
        aria-controls="language-menu"
      >
        <Globe size={18} className="mr-1" />
        <span className="font-medium">{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
            aria-hidden="true"
          />
          <div
            id="language-menu"
            className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20"
            role="menu"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentLang.startsWith(lang.code)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                  role="menuitem"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
