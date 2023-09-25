import { Telegram } from '@twa-dev/types'

declare global {
  interface Window {
    Telegram: Telegram
  }
}

declare module 'colorthief'
