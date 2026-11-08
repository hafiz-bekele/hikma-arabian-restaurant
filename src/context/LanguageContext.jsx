import React, { createContext, useContext, useState, useEffect } from 'react';
import am from '../i18n/am.js';
import en from '../i18n/en.js';

const translations = { am, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Amharic is the default per specification
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('hikma_lang') || 'am';
  });

  useEffect(() => {
    localStorage.setItem('hikma_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[lang];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to Amharic if key missing in English
        let fallback = translations.am;
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'am' ? 'en' : 'am'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isAmharic: lang === 'am' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
