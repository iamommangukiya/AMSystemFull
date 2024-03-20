import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";

i18n

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar", "fr"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });
//   .use(LanguageDetector)

//   .use(initReactI18next)

//   .init({
//     debug: true,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     },
//     resources: {
//       en: {
//         translation: {

//         }
//       }
//     }
//   });

export default i18n;
