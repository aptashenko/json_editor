import i18n from '@/i18n';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

export const useSwitchLanguage = () => {
  const LANGUAGE_ENUMS = {
    en: 'English',
    fr: 'Français',
    pl: 'Polski',
    ro: 'Română',
    cs: 'Český',
    ru: 'Русский',
  };

  const locales = {
    en: () => import('dayjs/locale/en'),
    fr: () => import('dayjs/locale/fr'),
    pl: () => import('dayjs/locale/pl'),
    ro: () => import('dayjs/locale/ro'),
    cs: () => import('dayjs/locale/cs'),
    ru: () => import('dayjs/locale/ru'),
  };

  const defaultLocale = ref(import.meta.env.VITE_DEFAULT_LOCALE);

  const supportedLocales = ref(import.meta.env.VITE_SUPPORTED_LOCALES.split(','));

  const langsList = supportedLocales.value.map((lang) => ({
    id: lang,
    label: LANGUAGE_ENUMS[lang],
  }));

  const currentLocale = computed(() => i18n.global.locale.value);

  const usersBrowserLocale = computed(() => {
    const locale =
      window.navigator.language || window.navigator.userLanguage || defaultLocale.value;
    return {
      locale,
      localeNoRegion: locale.split('-')[0],
    };
  });

  const usersLocale = computed(() => {
    const query = new URLSearchParams(window.location.search);
    const langQuery = query.get('lang');
    const existLanguage = langQuery || localStorage.getItem('lang');
    if (existLanguage) {
      if (supportedLocales.value.includes(existLanguage)) {
        return existLanguage;
      } else {
        return defaultLocale.value;
      }
    } else {
      if (supportedLocales.value.includes(usersBrowserLocale.value.locale)) {
        return usersBrowserLocale.value.locale;
      } else if (supportedLocales.value.includes(usersBrowserLocale.value.localeNoRegion)) {
        return usersBrowserLocale.value.localeNoRegion;
      }
      return defaultLocale.value;
    }
  });

  const loadLocaleMessages = async (locale) => {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}/index.js`);
      i18n.global.setLocaleMessage(locale, messages.default);
    }
  };

  const loadLocale = async (language) => {
    await locales[language]().then(() => dayjs.locale(language));
  };

  const switchLanguage = async (newLocale = usersLocale.value) => {
    await loadLocaleMessages(newLocale);
    await loadLocale(newLocale);
    i18n.global.locale.value = newLocale;
    localStorage.setItem('lang', newLocale);
    document.querySelector('html').setAttribute('lang', newLocale);
    document.title = i18n.global.t('global.document_title');
  };

  return {
    usersLocale,
    currentLocale,
    LANGUAGE_ENUMS,
    supportedLocales,
    langsList,
    switchLanguage,
  };
};
