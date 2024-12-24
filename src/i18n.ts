import i18n from 'i18next';
import i18nBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const getCurrentHost =
  import.meta.env.MODE == 'production'
    ? 'https://baseball-fan-cast-288548494819.us-central1.run.app'
    : 'http://localhost:8080';

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`
    }
    // requestOptions: { method: 'GET', mode: 'no-cors' }
  });

export default i18n;
