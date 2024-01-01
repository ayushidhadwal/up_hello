import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from './locales/en.json'
import Hindi from './locales/hn.json'
import Arabic from './locales/ar.json'
import Bangla from './locales/bn.json'

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: { translation: English },
        hn: { translation: Hindi },
        ar: { translation: Arabic },
        bn: { translation: Bangla }
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ['en', 'hn', 'ar','bn'],
    interpolation: {
        escapeValue: false
    }
});

export default i18n
