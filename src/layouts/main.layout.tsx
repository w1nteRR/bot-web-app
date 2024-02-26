import React, { FC } from 'react'
import { useRoutes } from 'react-router-dom'

import { SpinLoader } from '../components/ui/loaders/spin-loader'

import { routes } from '../navigation/routes'
import { useTelegram } from '../hooks/telegram/useTelegram'
import { useWebAppUserContext } from '../hooks/context/useWebAppUserContext'

export const MainLayout: FC = () => {
  const element = useRoutes(routes)
  const { themeParams } = useTelegram()
  const { isLoading } = useWebAppUserContext()

  if (isLoading) return <SpinLoader fullscreen />

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: themeParams.secondary_bg_color,
      }}
    >
      {element}
    </div>
  )
}
