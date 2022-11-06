import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationsEN from '@locales/en/translations.json';
import TranslationsJA from '@locales/ja/translations.json';

import HeaderEN from '@locales/en/header.json';
import HeaderJA from '@locales/ja/header.json';
import FooterEN from '@locales/en/footer.json';
import FooterJA from '@locales/ja/footer.json';

import HomeEN from '@locales/en/home.json';
import HomeJA from '@locales/ja/home.json';

export const defaultNS = 'translations';
export const resources = {
  en: {
    translations: TranslationsEN,
    home: HomeEN,
    header: HeaderEN,
    footer: FooterEN,
  },
  ja: {
    translations: TranslationsJA,
    home: HomeJA,
    header: HeaderJA,
    footer: FooterJA,
  },
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    // debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    ns: Object.keys(resources.en),
    defaultNS,
    resources,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
