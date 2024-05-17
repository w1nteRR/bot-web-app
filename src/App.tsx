import React, { useEffect } from 'react'

import { ProjectMode } from './components/misc/project-mode'

import { MainLayout } from './layouts/main.layout'

import { FavoritesProvider } from './providers/favorites.provider'
import { WebAppUserProvider } from './providers/tg-user.provider'

import { useTelegram } from './hooks/telegram/useTelegram'

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
        <ProjectMode />
        <MainLayout />
      </FavoritesProvider>
    </WebAppUserProvider>
  )
}

export default App
