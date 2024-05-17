import React, { useEffect } from 'react'
const title = import.meta.env.VITE_MODE_TITLE

import { useTelegram } from './hooks/telegram/useTelegram'
import { WebAppUserProvider } from './providers/tg-user.provider'
import { MainLayout } from './layouts/main.layout'
import { FavoritesProvider } from './providers/favorites.provider'

function App() {
  const tg = useTelegram()

  useEffect(() => {
    tg.ready()
    tg.setHeaderColor('secondary_bg_color')
    tg.expand()
  }, [tg])

  return (
    <WebAppUserProvider>
      <FavoritesProvider>
        <p className='text-green-500 text-sm'>{title}</p>
        <MainLayout />
      </FavoritesProvider>
    </WebAppUserProvider>
  )
}

export default App
