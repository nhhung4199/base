/* eslint-disable consistent-return */
import en from 'assets/lang/en';
import vi from 'assets/lang/vi';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';

export type Resource = typeof en & typeof vi;
const DEFAULT_LANG = 'en';

export function getLanguage() {
  const lan = getLocales();
  const listLng = ['vi', 'en'];
  try {
    const primaryLocate = lan[0];
    let tempLng = primaryLocate?.languageCode?.toLowerCase();

    const lng = listLng.includes(tempLng) ? tempLng : DEFAULT_LANG;
    // If you want to use DEFAULT_LANG only, comment above line + uncomment below line
    // const lng = DEFAULT_LANG;
    // store.dispatch(updateLanguageKey(lng));
    return lng;
  } catch (error) {
    return DEFAULT_LANG;
  }
}

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  lng: getLanguage(),
  fallbackLng: DEFAULT_LANG,
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
});

export const loadLocaleLanguage = () => {
  const lng = getLanguage();
  dayjs.locale(lng);
  i18next.addResourceBundle(lng, 'translation', lng === 'vi' ? vi : en);
  i18next.changeLanguage(lng);
};

export default i18next;
