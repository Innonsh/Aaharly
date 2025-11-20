import * as RNLocalize from 'react-native-localize';
import { createContext, useEffect, useState } from 'react';
import LocalizedContent from 'react-localization';
import en from '../localisation/content/en.json';

export const DEFAULT_LANGUAGE = 'en';
export const APP_LANGUAGE = 'appLanguage';

export const languages = {
  en,
};

export const translations = new LocalizedContent(languages);

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
  formatString: () => {},
});

export function LocalizationProvider({ children }) {
  const [appLanguage, setAppLanguage] = 'en';

  useEffect(() => {
    initializeAppLanguage();
  }, [appLanguage]);

  const formatString = (...param) => translations.formatString(...param);

  const initializeAppLanguage = () => {
    let localeCode = DEFAULT_LANGUAGE;
    if (appLanguage) {
      translations.setLanguage(appLanguage);
      // setAppLanguage(appLanguage);
    } else {
      translations.setLanguage(DEFAULT_LANGUAGE);
      // setAppLanguage(DEFAULT_LANGUAGE);
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: appLanguage,
        appLanguage,
        initializeAppLanguage,
        formatString,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
}