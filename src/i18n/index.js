import { createI18n } from 'vue-i18n';
import en from './locales/en/index.js';
export default createI18n({
  locale: 'en',
  fallback: 'en',
  globalInjection: true,
  legacy: false,
  messages: { en },
});
