import i18n from "i18next";
import numeral from 'numeral';
import { useTranslation, initReactI18next } from "react-i18next";
import english from './lanugauges/en.json';

const numberFormatter = (value: any, format?: string) =>
  numeral(value).format(format);

i18n
  .use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: "en",
    interpolation: {
      format: (value, format) => numberFormatter(value, format),
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    lng: "en",
    react: {
      useSuspense: false
    },
    resources: {
      en: {
        translation: english
      }
    },

  });

  export default i18n;
  