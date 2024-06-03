/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_NOTIFICATIONS_SERVICE_URL: string
  readonly VITE_WALLET_PAY_SERVICE_URL: string
  readonly VITE_USER_VALIDATION_FUNCTION_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
