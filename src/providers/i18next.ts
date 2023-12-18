import i18next, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../constants/locales/en.json'
import ru from '../constants/locales/ru.json'
import uk from '../constants/locales/ua.json'

const config: InitOptions = {
  // debug: true,
  fallbackLng: 'en',
  resources: { en, ru, uk },
}

i18next.use(initReactI18next).use(LanguageDetector).init(config)
