import i18next, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../constants/locales/en.json'
import ru from '../constants/locales/ru.json'
import uk from '../constants/locales/ua.json'

const language_code = window.Telegram.WebApp.initDataUnsafe.user?.language_code

const config: InitOptions = {
  // debug: true,
  fallbackLng: 'en',
  resources: { en, ru, uk },
  lng: language_code,
}

i18next.use(initReactI18next).init(config)
