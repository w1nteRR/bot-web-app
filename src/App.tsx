import React, { useEffect } from 'react'

import { ProjectMode } from './components/misc/project-mode'
import { MainLayout } from './layouts/main.layout'

import { FavoritesProvider } from './providers/favorites.provider'
import { WebAppUserProvider } from './providers/tg-user.provider'

import { useTelegram } from './hooks/telegram/useTelegram'
import { useRecentUsersStore } from './store/recent-users.store'

function App() {
  const tg = useTelegram()

  const { init } = useRecentUsersStore()

  useEffect(() => {
    tg.ready()
    tg.setHeaderColor('secondary_bg_color')
    tg.setBackgroundColor('secondary_bg_color')
    tg.expand()
  }, [tg])

  useEffect(() => {
    init()
  }, [])

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
