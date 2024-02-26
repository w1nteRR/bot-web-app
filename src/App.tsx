import React, { useEffect } from 'react'

import { useTelegram } from './hooks/telegram/useTelegram'
import { WebAppUserProvider } from './providers/tg-user.provider'
import { MainLayout } from './layouts/main.layout'

function App() {
  const tg = useTelegram()

  useEffect(() => {
    tg.ready()
    tg.setHeaderColor('secondary_bg_color')
    tg.expand()
  }, [tg])

  return (
    <WebAppUserProvider>
      <MainLayout />
    </WebAppUserProvider>
  )
}

export default App
